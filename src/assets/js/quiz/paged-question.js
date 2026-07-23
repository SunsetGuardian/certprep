import { createAnswerDomState } from "./paged-answer-dom.js";
import {
  answerInputType,
  savedAnswerStatus,
  updatePagedAnswerSelection,
} from "./paged-answers.js";
import {
  createPagedHistoryState,
  createPagedNavigationTransition,
  resolvePagedHistoryPosition,
  shouldHandlePagedNavigationClick,
} from "./paged-client-navigation.js";
import { createPagedCompletionModel } from "./paged-completion.js";
import { createPagedFlagPresentation } from "./paged-flag.js";
import { createPagedNavigationModel } from "./paged-navigation.js";
import { createPagedReportContext } from "./paged-report.js";
import { createQuestionReporter } from "./reporting.js";
import { restorePagedQuizSession } from "./paged-session.js";
import {
  completeQuizSession,
  getCurrentQuestionState,
  moveToQuestion,
  setSelectedAnswerIds,
  toggleQuestionFlag,
} from "./session.js";
import { saveStoredSession } from "./storage.js";

const app = document.querySelector("[data-paged-question-app]");

if (app) {
  initializePagedQuestion(app);
}

function initializePagedQuestion(root) {
  const position = Number(root.dataset.questionPosition);
  const testId = root.dataset.testId;
  const result = restorePagedQuizSession({
    storage: window.sessionStorage,
    testId,
    position,
  });
  const restoredView = root.querySelector('[data-paged-view="restored"]');
  const unavailableView = root.querySelector('[data-paged-view="unavailable"]');

  if (!restoredView || !unavailableView) {
    throw new Error("The paged question interface is incomplete.");
  }

  restoredView.hidden = true;
  unavailableView.hidden = true;

  if (result.status === "restored") {
    renderRestoredSession(root, restoredView, result);
    bindPagedFlag(restoredView, result);
    bindPagedReporting(root, restoredView, result);
    bindPagedCompletion(restoredView, result);
    bindPagedClientNavigation(root, restoredView, result);
    initializePagedHistory(result);
    bindPagedHistoryNavigation(root, restoredView, result);
    restoredView.hidden = false;
    root.removeAttribute("aria-busy");
    return;
  }

  renderUnavailableSession(unavailableView, result);
  unavailableView.hidden = false;
  root.removeAttribute("aria-busy");
}

function setText(root, selector, value) {
  const element = root.querySelector(selector);

  if (!element) {
    throw new Error(`Missing paged question element: ${selector}`);
  }

  element.textContent = value;
}

function announce(root, message) {
  const liveRegion = root.querySelector("[data-paged-live]");

  if (!liveRegion) {
    return;
  }

  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 20);
}

function updatePagedRouteIdentity(root, position) {
  root.dataset.questionPosition = String(position);

  const pageHeading = root.querySelector(".paged-quiz__title");
  if (pageHeading) {
    pageHeading.textContent = `Question ${position}`;
  }

  const breadcrumb = document.querySelector(
    '.breadcrumbs [aria-current="page"]',
  );
  if (breadcrumb) {
    breadcrumb.textContent = `Question ${position}`;
  }

  document.title = document.title.replace(
    /Security\+ SY0-701 Practice Test Question \d+/,
    `Security+ SY0-701 Practice Test Question ${position}`,
  );
}

function renderRestoredSession(appRoot, viewRoot, result) {
  const { question } = result.state;
  updatePagedRouteIdentity(appRoot, result.position);

  setText(
    viewRoot,
    "[data-paged-position]",
    `Question ${result.position} of ${result.total}`,
  );
  setText(viewRoot, "[data-paged-question-id]", question.id);
  setText(
    viewRoot,
    "[data-paged-domain]",
    `${question.domain.id} ${question.domain.name}`,
  );
  setText(viewRoot, "[data-paged-topic]", question.topic);
  setText(viewRoot, "[data-paged-question-text]", question.text);
  setText(
    viewRoot,
    "[data-paged-answer-status]",
    savedAnswerStatus(result.state.selectedAnswerIds),
  );

  const questionHeading = viewRoot.querySelector("[data-paged-question-text]");
  if (questionHeading) {
    questionHeading.tabIndex = -1;
  }

  const instruction = viewRoot.querySelector("[data-paged-instruction]");
  if (!instruction) {
    throw new Error("Missing paged question instruction.");
  }

  instruction.textContent = question.instruction || "";
  instruction.hidden = !question.instruction;

  const answers = viewRoot.querySelector("[data-paged-answers]");
  if (!answers) {
    throw new Error("Missing paged question answers.");
  }

  renderAnswers(answers, viewRoot, result);
  renderPagedFlag(viewRoot, result);
  renderPagedNavigation(viewRoot, result);
}

function renderAnswers(container, viewRoot, result) {
  const state = result.state;
  const question = state.question;
  const answerById = new Map(
    question.answers.map((answer) => [answer.id, answer]),
  );
  const inputType = answerInputType(question.type);

  container.replaceChildren();

  state.displayedAnswerIds.forEach((answerId, index) => {
    const answer = answerById.get(answerId);

    if (!answer) {
      throw new Error(`Answer ${answerId} is missing from the question snapshot.`);
    }

    const label = document.createElement("label");
    const input = document.createElement("input");
    const letter = document.createElement("span");
    const text = document.createElement("span");

    label.className = "quiz-answer";
    label.classList.toggle(
      "is-selected",
      state.selectedAnswerIds.includes(answerId),
    );

    input.type = inputType;
    input.name = "paged-quiz-answer";
    input.value = answerId;
    input.checked = state.selectedAnswerIds.includes(answerId);
    input.className = "quiz-answer__input";

    letter.className = "quiz-answer__letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);

    text.className = "quiz-answer__text";
    text.textContent = answer.text;

    input.addEventListener("change", () => {
      const selectedAnswerIds = updatePagedAnswerSelection({
        questionType: question.type,
        answerId,
        checked: input.checked,
        selectedAnswerIds: state.selectedAnswerIds,
        displayedAnswerIds: state.displayedAnswerIds,
      });

      setSelectedAnswerIds(result.session, question.id, selectedAnswerIds);
      saveStoredSession(
        window.sessionStorage,
        result.storageKey,
        result.session,
      );
      syncRenderedAnswers(container, state);
      setText(
        viewRoot,
        "[data-paged-answer-status]",
        savedAnswerStatus(state.selectedAnswerIds),
      );
      renderPagedNavigation(viewRoot, result);
      announce(viewRoot, `Answer saved for question ${result.position}.`);
    });

    label.append(input, letter, text);
    container.append(label);
  });
}

function renderPagedFlag(root, result) {
  const button = root.querySelector("[data-paged-flag]");

  if (!button) {
    throw new Error("Missing paged flag button.");
  }

  const presentation = createPagedFlagPresentation(
    result.state.flaggedForReview,
  );
  button.setAttribute("aria-pressed", presentation.pressed);
  button.classList.toggle("is-flagged", result.state.flaggedForReview);
  button.textContent = presentation.label;
}

function bindPagedFlag(root, result) {
  const button = root.querySelector("[data-paged-flag]");

  if (!button) {
    throw new Error("Missing paged flag button.");
  }

  button.addEventListener("click", () => {
    const flagged = toggleQuestionFlag(
      result.session,
      result.state.question.id,
    );
    saveStoredSession(
      window.sessionStorage,
      result.storageKey,
      result.session,
    );
    renderPagedFlag(root, result);
    renderPagedNavigation(root, result);

    const presentation = createPagedFlagPresentation(flagged);
    announce(root, presentation.announcement);
  });
}

function bindPagedReporting(root, viewRoot, result) {
  const button = viewRoot.querySelector("[data-paged-report]");

  if (!button) {
    throw new Error("Missing paged report button.");
  }

  const reporter = createQuestionReporter({
    root,
    getSession: () => result.session,
    announce: (message) => announce(viewRoot, message),
  });

  button.addEventListener("click", async () => {
    const context = createPagedReportContext(
      result.session,
      result.position,
    );
    await reporter.open({
      ...context,
      opener: button,
    });
  });
}

function configurePagedLink(link, path, targetPosition) {
  if (!link) {
    throw new Error("A paged navigation link is missing.");
  }

  if (path && Number.isInteger(targetPosition)) {
    link.href = path;
    link.dataset.pagedTargetPosition = String(targetPosition);
    link.hidden = false;
    link.removeAttribute("aria-disabled");
    return;
  }

  link.removeAttribute("href");
  delete link.dataset.pagedTargetPosition;
  link.hidden = true;
  link.setAttribute("aria-disabled", "true");
}

function renderPagedNavigation(root, result) {
  const model = createPagedNavigationModel(
    result.session,
    result.position,
  );

  setText(
    root,
    "[data-paged-summary]",
    `${model.answered} answered, ${model.unanswered} unanswered, ${model.flagged} flagged`,
  );

  const progress = root.querySelector("[data-paged-progress]");
  if (!progress) {
    throw new Error("Missing paged question progress bar.");
  }

  progress.value = model.currentPosition;
  progress.max = model.total;
  progress.textContent = `${model.currentPosition} of ${model.total}`;

  configurePagedLink(
    root.querySelector("[data-paged-previous]"),
    model.previousPath,
    model.previousPath ? model.currentPosition - 1 : null,
  );
  configurePagedLink(
    root.querySelector("[data-paged-next]"),
    model.nextPath,
    model.nextPath ? model.currentPosition + 1 : null,
  );

  const completion = createPagedCompletionModel(
    result.session,
    result.position,
  );
  const finishButton = root.querySelector("[data-paged-finish]");

  if (!finishButton) {
    throw new Error("Missing paged finish button.");
  }

  finishButton.hidden = !completion.isFinal;

  const navigator = root.querySelector("[data-paged-navigator]");
  if (!navigator) {
    throw new Error("Missing paged question navigator.");
  }

  navigator.replaceChildren();

  for (const item of model.items) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = item.path;
    link.dataset.pagedTargetPosition = String(item.position);
    link.className = "quiz-navigator__button";
    link.classList.toggle("is-answered", item.answered);
    link.classList.toggle("is-flagged", item.flagged);
    link.classList.toggle("is-current", item.current);
    link.textContent = String(item.position);
    link.setAttribute("aria-label", item.ariaLabel);

    if (item.current) {
      link.setAttribute("aria-current", "step");
    }

    listItem.append(link);
    navigator.append(listItem);
  }
}

function bindPagedClientNavigation(appRoot, viewRoot, result) {
  viewRoot.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest("a[data-paged-target-position]");
    if (!link || !viewRoot.contains(link)) {
      return;
    }

    if (
      !shouldHandlePagedNavigationClick(event) ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    ) {
      return;
    }

    const targetPosition = Number(link.dataset.pagedTargetPosition);
    if (!Number.isInteger(targetPosition)) {
      return;
    }

    event.preventDefault();
    navigateToPagedQuestion(appRoot, viewRoot, result, targetPosition);
  });
}

function initializePagedHistory(result) {
  const transition = createPagedNavigationTransition(
    result.session,
    result.position,
    result.position,
  );
  const historyState = createPagedHistoryState(
    window.history.state,
    result.position,
    result.total,
  );

  window.history.replaceState(historyState, "", transition.path);
}

function bindPagedHistoryNavigation(appRoot, viewRoot, result) {
  window.addEventListener("popstate", (event) => {
    const targetPosition = resolvePagedHistoryPosition(
      event.state,
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
      result.session.questionOrder.length,
    );

    if (!Number.isInteger(targetPosition)) {
      return;
    }

    navigateToPagedQuestion(
      appRoot,
      viewRoot,
      result,
      targetPosition,
      { historyMode: "replace" },
    );
  });
}

function navigateToPagedQuestion(
  appRoot,
  viewRoot,
  result,
  targetPosition,
  { historyMode = "push" } = {},
) {
  const transition = createPagedNavigationTransition(
    result.session,
    result.position,
    targetPosition,
  );

  if (!transition.changed) {
    return;
  }

  moveToQuestion(result.session, transition.targetIndex);
  result.position = transition.targetPosition;
  result.total = result.session.questionOrder.length;
  result.state = getCurrentQuestionState(result.session);

  saveStoredSession(
    window.sessionStorage,
    result.storageKey,
    result.session,
  );
  renderRestoredSession(appRoot, viewRoot, result);

  const historyState = createPagedHistoryState(
    window.history.state,
    transition.targetPosition,
    result.total,
  );

  if (historyMode === "push") {
    window.history.pushState(historyState, "", transition.path);
  } else if (historyMode === "replace") {
    window.history.replaceState(historyState, "", transition.path);
  } else {
    throw new Error(`Unsupported paged history mode: ${historyMode}`);
  }

  const questionHeading = viewRoot.querySelector("[data-paged-question-text]");
  questionHeading?.focus();
  announce(
    viewRoot,
    `Question ${transition.targetPosition} of ${result.total}.`,
  );
}

function bindPagedCompletion(root, result) {
  const finishButton = root.querySelector("[data-paged-finish]");

  if (!finishButton) {
    throw new Error("Missing paged finish button.");
  }

  finishButton.addEventListener("click", () => {
    const completion = createPagedCompletionModel(
      result.session,
      result.position,
    );

    if (!completion.isFinal) {
      return;
    }

    if (
      completion.confirmationMessage &&
      !window.confirm(completion.confirmationMessage)
    ) {
      return;
    }

    completeQuizSession(result.session);
    saveStoredSession(
      window.sessionStorage,
      result.storageKey,
      result.session,
    );
    window.location.assign(completion.resultsPath);
  });
}

function syncRenderedAnswers(container, state) {
  const domStates = createAnswerDomState(
    state.displayedAnswerIds,
    state.selectedAnswerIds,
  );
  const stateById = new Map(
    domStates.map((item) => [item.answerId, item]),
  );

  for (const input of container.querySelectorAll(".quiz-answer__input")) {
    const domState = stateById.get(input.value);

    if (!domState) {
      throw new Error(
        `Rendered answer ${input.value} is not part of this question.`,
      );
    }

    input.checked = domState.checked;
    const label = input.closest(".quiz-answer");

    if (label) {
      label.classList.toggle("is-selected", domState.selected);
    }
  }
}

function renderUnavailableSession(root, result) {
  let heading = "No active test was found in this tab.";
  let detail =
    "Start a randomized practice test, then use a numbered question route in the same browser tab.";

  if (result.status === "invalid-position") {
    heading = "This question position is not valid.";
    detail = "Return to the practice-test page and start a new session.";
  } else if (result.status === "invalid-session") {
    heading = "The saved test could not be restored.";
    detail =
      "The unusable browser-session data was cleared. Start a new randomized practice test.";
  } else if (result.status === "outside-session") {
    heading = `This session contains ${result.total} questions.`;
    detail =
      `Question ${result.position} is outside the active test. ` +
      `Open a numbered route from 1 through ${result.total}.`;
  } else if (result.status === "completed") {
    heading = "This test is already complete.";
    detail =
      "Return to the working practice-test page to view the saved results.";
  }

  setText(root, "[data-paged-unavailable-heading]", heading);
  setText(root, "[data-paged-unavailable-detail]", detail);
}
