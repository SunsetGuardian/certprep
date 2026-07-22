import {
  formatElapsedTime,
  gradeQuizSession,
} from "./grading.js";
import { getPagedEntryPath } from "./paged-entry.js";
import { createQuestionReporter } from "./reporting.js";
import {
  completeQuizSession,
  createQuizSession,
  getAnsweredCount,
  getCurrentQuestionId,
  getCurrentQuestionState,
  getFlaggedCount,
  getQuestionState,
  getUnansweredCount,
  isValidQuizSession,
  moveToQuestion,
  reopenQuizSession,
  setSelectedAnswerIds,
  toggleQuestionFlag,
} from "./session.js";
import {
  clearStoredSession,
  loadStoredSession,
  quizSessionStorageKey,
  saveStoredSession,
} from "./storage.js";

const app = document.querySelector("[data-quiz-app]");

if (app) {
  initializeQuiz(app).catch((error) => {
    console.error(error);
    showFatalError(app, "The practice test could not be loaded. Please refresh the page and try again.");
  });
}

async function initializeQuiz(root) {
  const testId = root.dataset.testId;
  const questionsUrl = root.dataset.questionsUrl;
  const currentDataVersion = root.dataset.currentVersion;
  const storageKey = quizSessionStorageKey(testId);
  const storage = window.sessionStorage;
  const elements = collectElements(root);
  let allowIntentionalNavigation = false;

  const enterPagedQuiz = (path, { replace = false } = {}) => {
    allowIntentionalNavigation = true;
    if (replace) {
      window.location.replace(path);
    } else {
      window.location.assign(path);
    }
  };

  const response = await fetch(questionsUrl, {
    headers: { Accept: "application/json" },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Question data request failed with status ${response.status}.`);
  }

  const questionPayload = await response.json();

  if (questionPayload.test?.testId !== testId) {
    throw new Error("The question file does not match this practice test.");
  }

  let session = loadStoredSession(storage, storageKey);

  if (session && !isValidQuizSession(session, testId)) {
    clearStoredSession(storage, storageKey);
    session = null;
  }

  const persist = () => saveStoredSession(storage, storageKey, session);

  const announce = (message) => {
    elements.liveRegion.textContent = "";
    window.setTimeout(() => {
      elements.liveRegion.textContent = message;
    }, 20);
  };

  const reporter = createQuestionReporter({
    root,
    getSession: () => session,
    announce,
  });

  const showView = (name) => {
    for (const view of elements.views) {
      view.hidden = view.dataset.quizView !== name;
    }
  };

  const renderSetup = () => {
    showView("setup");
    elements.resumePanel.hidden = true;
  };

  const renderResults = ({ focusHeading = false } = {}) => {
    const results = gradeQuizSession(session);
    const needsReview = results.questionResults.filter((result) => result.status !== "correct");
    const correctResults = results.questionResults.filter((result) => result.status === "correct");

    elements.scorePercentage.textContent = `${results.percentage}%`;
    elements.resultCorrect.textContent = String(results.correct);
    elements.resultIncorrect.textContent = String(results.incorrect);
    elements.resultUnanswered.textContent = String(results.unanswered);
    elements.resultTime.textContent = formatElapsedTime(results.elapsedMilliseconds);
    elements.resultsSummary.textContent = `You answered ${results.correct} of ${results.total} questions correctly.`;

    renderDomainResults(elements.domainResults, results.domains);
    const openReportFromReview = (result, opener) => reporter.open({
      questionId: result.questionId,
      questionPosition: result.position,
      opener,
    });
    renderReviewList(elements.primaryReviewList, needsReview, openReportFromReview);
    elements.primaryReviewEmpty.hidden = needsReview.length > 0;

    elements.correctReviewDetails.hidden = correctResults.length === 0;
    elements.correctReviewSummary.textContent = `Review ${correctResults.length} correct answer${correctResults.length === 1 ? "" : "s"}`;
    renderReviewList(elements.correctReviewList, correctResults, openReportFromReview);

    showView("results");

    if (focusHeading) {
      elements.resultsHeading.focus({ preventScroll: false });
    }
  };

  const renderQuestion = ({ focusHeading = false, focusAnswerId = null } = {}) => {
    const state = getCurrentQuestionState(session);
    const question = state.question;
    const total = session.questionOrder.length;
    const position = session.currentIndex + 1;
    const answered = getAnsweredCount(session);
    const flagged = getFlaggedCount(session);

    elements.position.textContent = `Question ${position} of ${total}`;
    elements.progress.value = position;
    elements.progress.max = total;
    elements.progress.textContent = `${position} of ${total}`;
    elements.progressText.textContent = `${answered} answered, ${total - answered} unanswered, ${flagged} flagged`;
    elements.domain.textContent = `${question.domain.id} ${question.domain.name}`;
    elements.topic.textContent = question.topic;
    elements.questionHeading.textContent = question.text;

    if (question.instruction) {
      elements.instruction.textContent = question.instruction;
      elements.instruction.hidden = false;
    } else {
      elements.instruction.textContent = "";
      elements.instruction.hidden = true;
    }

    renderAnswers(elements.answers, state, session, persist, announce, renderQuestion);
    renderNavigator(elements.navigator, session, (targetIndex) => {
      moveToQuestion(session, targetIndex);
      persist();
      renderQuestion({ focusHeading: true });
    });

    elements.previous.disabled = session.currentIndex === 0;
    elements.next.disabled = session.currentIndex === total - 1;
    elements.flagButton.setAttribute("aria-pressed", String(state.flaggedForReview));
    elements.flagButton.classList.toggle("is-flagged", state.flaggedForReview);
    elements.flagButton.textContent = state.flaggedForReview ? "Flagged for review" : "Flag for review";

    showView("active");

    if (focusHeading) {
      elements.questionHeading.focus({ preventScroll: false });
    } else if (focusAnswerId) {
      const selectedInput = [...elements.answers.querySelectorAll("input")]
        .find((input) => input.value === focusAnswerId);
      selectedInput?.focus({ preventScroll: true });
    }
  };

  elements.setupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (session && !session.completedAt) {
      const confirmed = window.confirm("Start a new test and replace the unfinished test in this browser tab?");
      if (!confirmed) {
        return;
      }
    }

    const formData = new FormData(elements.setupForm);
    const questionCount = Number(formData.get("question-count"));

    session = createQuizSession({
      test: questionPayload.test,
      dataVersion: questionPayload.dataVersion,
      questions: questionPayload.questions,
      questionCount,
    });

    persist();

    const pagedEntryPath = getPagedEntryPath(
      session,
      window.location.search,
    );

    if (pagedEntryPath) {
      enterPagedQuiz(pagedEntryPath);
      return;
    }

    renderQuestion({ focusHeading: true });
    announce(`Started a ${questionCount}-question practice test.`);
  });

  elements.previous.addEventListener("click", () => {
    moveToQuestion(session, session.currentIndex - 1);
    persist();
    renderQuestion({ focusHeading: true });
  });

  elements.next.addEventListener("click", () => {
    moveToQuestion(session, session.currentIndex + 1);
    persist();
    renderQuestion({ focusHeading: true });
  });

  elements.reportButton.addEventListener("click", () => {
    reporter.open({
      questionId: getCurrentQuestionId(session),
      questionPosition: session.currentIndex + 1,
      opener: elements.reportButton,
    });
  });

  elements.flagButton.addEventListener("click", () => {
    const questionId = getCurrentQuestionId(session);
    const flagged = toggleQuestionFlag(session, questionId);
    persist();
    renderQuestion();
    announce(flagged ? "Question flagged for review." : "Question flag removed.");
  });

  elements.finish.addEventListener("click", () => {
    const unanswered = getUnansweredCount(session);
    const message = unanswered > 0
      ? `Finish this test with ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}?`
      : "Finish this test?";

    if (!window.confirm(message)) {
      return;
    }

    completeQuizSession(session);
    persist();
    renderResults({ focusHeading: true });
    announce(`Test completed. Your score is ${gradeQuizSession(session).percentage} percent.`);
  });

  elements.returnToTest.addEventListener("click", () => {
    reopenQuizSession(session);
    persist();
    renderQuestion({ focusHeading: true });
  });

  elements.startAnother.addEventListener("click", () => {
    clearStoredSession(storage, storageKey);
    session = null;
    renderSetup();
    elements.setupHeading.focus();
  });

  window.addEventListener("beforeunload", (event) => {
    if (
      session &&
      !session.completedAt &&
      !allowIntentionalNavigation
    ) {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  if (session?.completedAt) {
    renderResults();
    const versionMessage = session.dataVersion === currentDataVersion
      ? "Your completed practice test and results were restored."
      : "Your completed practice test was restored using its original question snapshot.";
    announce(versionMessage);
  } else if (session) {
    const pagedEntryPath = getPagedEntryPath(
      session,
      window.location.search,
    );

    if (pagedEntryPath) {
      enterPagedQuiz(pagedEntryPath, { replace: true });
      return;
    }

    renderQuestion();
    const versionMessage = session.dataVersion === currentDataVersion
      ? "Your unfinished practice test was restored."
      : "Your unfinished practice test was restored using its original question snapshot.";
    announce(versionMessage);
  } else {
    renderSetup();
  }
}

function renderAnswers(container, state, session, persist, announce, renderQuestion) {
  container.replaceChildren();

  const answerById = new Map(state.question.answers.map((answer) => [answer.id, answer]));
  const isMultiSelect = state.question.type === "multi_select";
  const inputType = isMultiSelect ? "checkbox" : "radio";

  state.displayedAnswerIds.forEach((answerId, index) => {
    const answer = answerById.get(answerId);
    const label = document.createElement("label");
    const input = document.createElement("input");
    const letter = document.createElement("span");
    const text = document.createElement("span");

    label.className = "quiz-answer";
    label.classList.toggle("is-selected", state.selectedAnswerIds.includes(answerId));
    input.type = inputType;
    input.name = "quiz-answer";
    input.value = answerId;
    input.checked = state.selectedAnswerIds.includes(answerId);
    input.className = "quiz-answer__input";

    letter.className = "quiz-answer__letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);

    text.className = "quiz-answer__text";
    text.textContent = answer.text;

    input.addEventListener("change", () => {
      let selectedAnswerIds;

      if (isMultiSelect) {
        selectedAnswerIds = [...container.querySelectorAll("input:checked")].map((item) => item.value);
      } else {
        selectedAnswerIds = [input.value];
      }

      setSelectedAnswerIds(session, state.question.id, selectedAnswerIds);
      persist();
      renderQuestion({ focusAnswerId: input.value });
      announce(`Answer saved for question ${session.currentIndex + 1}.`);
    });

    label.append(input, letter, text);
    container.append(label);
  });
}

function renderNavigator(container, session, onNavigate) {
  container.replaceChildren();

  session.questionOrder.forEach((questionId, index) => {
    const state = getQuestionState(session, questionId);
    const item = document.createElement("li");
    const button = document.createElement("button");
    const statuses = [];

    if (state.selectedAnswerIds.length > 0) {
      statuses.push("answered");
    } else {
      statuses.push("unanswered");
    }

    if (state.flaggedForReview) {
      statuses.push("flagged");
    }

    if (index === session.currentIndex) {
      statuses.push("current question");
    }

    button.type = "button";
    button.className = "quiz-navigator__button";
    button.classList.toggle("is-answered", state.selectedAnswerIds.length > 0);
    button.classList.toggle("is-flagged", state.flaggedForReview);
    button.classList.toggle("is-current", index === session.currentIndex);
    button.textContent = String(index + 1);
    button.setAttribute("aria-label", `Question ${index + 1}, ${statuses.join(", ")}`);

    if (index === session.currentIndex) {
      button.setAttribute("aria-current", "step");
    }

    button.addEventListener("click", () => onNavigate(index));
    item.append(button);
    container.append(item);
  });
}

function renderDomainResults(container, domains) {
  container.replaceChildren();

  for (const domain of domains) {
    const item = document.createElement("article");
    const heading = document.createElement("h3");
    const score = document.createElement("strong");
    const detail = document.createElement("p");

    item.className = "quiz-domain-result";
    heading.textContent = `${domain.id} ${domain.name}`.trim();
    score.textContent = `${domain.correct} of ${domain.total} correct`;
    detail.textContent = `${domain.incorrect} incorrect, ${domain.unanswered} unanswered`;

    item.append(heading, score, detail);
    container.append(item);
  }
}

function renderReviewList(container, questionResults, onReport) {
  container.replaceChildren();

  for (const result of questionResults) {
    container.append(createReviewCard(result, onReport));
  }
}

function createReviewCard(result, onReport) {
  const { state, status, position } = result;
  const { question } = state;
  const answerById = new Map(question.answers.map((answer) => [answer.id, answer]));
  const article = document.createElement("article");
  const header = document.createElement("header");
  const badge = document.createElement("span");
  const identity = document.createElement("p");
  const heading = document.createElement("h3");
  const metadata = document.createElement("dl");
  const answerSummary = document.createElement("div");
  const answerList = document.createElement("div");
  const correctExplanation = document.createElement("section");
  const actions = document.createElement("div");
  const reportButton = document.createElement("button");

  article.className = `quiz-review-card quiz-review-card--${status}`;
  badge.className = `quiz-result-badge quiz-result-badge--${status}`;
  badge.textContent = status === "correct" ? "Correct" : status === "incorrect" ? "Incorrect" : "Unanswered";

  identity.className = "quiz-review-card__identity";
  identity.append(`Question ${position} · `);
  const questionCode = document.createElement("code");
  questionCode.textContent = question.id;
  identity.append(questionCode);

  header.className = "quiz-review-card__header";
  header.append(badge, identity);

  heading.textContent = question.text;

  metadata.className = "quiz-review-card__metadata";
  appendDefinition(metadata, "Domain", `${question.domain.id} ${question.domain.name}`);
  appendDefinition(metadata, "Objective", `${question.objective.id} ${question.objective.text}`);
  appendDefinition(metadata, "Topic", question.topic);

  answerSummary.className = "quiz-review-summary";
  appendAnswerSummary(
    answerSummary,
    "Your answer",
    formatAnswerSelections(state.selectedAnswerIds, state, answerById) || "No answer selected",
  );
  appendAnswerSummary(
    answerSummary,
    "Correct answer",
    formatAnswerSelections(question.correctAnswerIds, state, answerById),
  );

  answerList.className = "quiz-review-answers";
  state.displayedAnswerIds.forEach((answerId, index) => {
    const answer = answerById.get(answerId);
    const isSelected = state.selectedAnswerIds.includes(answerId);
    const isCorrect = question.correctAnswerIds.includes(answerId);
    answerList.append(createReviewAnswer(answer, index, isSelected, isCorrect));
  });

  const explanationHeading = document.createElement("h4");
  const explanationText = document.createElement("p");
  correctExplanation.className = "quiz-correct-explanation";
  explanationHeading.textContent = "Why the correct answer is right";
  explanationText.textContent = question.correctExplanation;
  correctExplanation.append(explanationHeading, explanationText);

  actions.className = "quiz-review-card__actions";
  reportButton.type = "button";
  reportButton.className = "button button--secondary button--small";
  reportButton.textContent = "Report this question";
  reportButton.addEventListener("click", () => onReport?.(result, reportButton));
  actions.append(reportButton);

  article.append(header, heading);

  if (question.instruction) {
    const instruction = document.createElement("p");
    instruction.className = "quiz-review-card__instruction";
    instruction.textContent = question.instruction;
    article.append(instruction);
  }

  article.append(metadata, answerSummary, answerList, correctExplanation, actions);
  return article;
}

function createReviewAnswer(answer, index, isSelected, isCorrect) {
  const item = document.createElement("section");
  const heading = document.createElement("div");
  const letter = document.createElement("span");
  const text = document.createElement("strong");
  const badges = document.createElement("span");
  const explanation = document.createElement("p");

  item.className = "quiz-review-answer";
  item.classList.toggle("is-selected", isSelected);
  item.classList.toggle("is-correct", isCorrect);
  item.classList.toggle("is-selected-wrong", isSelected && !isCorrect);

  heading.className = "quiz-review-answer__heading";
  letter.className = "quiz-review-answer__letter";
  letter.textContent = String.fromCharCode(65 + index);
  letter.setAttribute("aria-hidden", "true");
  text.textContent = answer.text;
  badges.className = "quiz-review-answer__badges";

  if (isSelected) {
    badges.append(createInlineBadge("Your answer", "selected"));
  }

  if (isCorrect) {
    badges.append(createInlineBadge("Correct answer", "correct"));
  }

  explanation.className = "quiz-review-answer__explanation";
  explanation.textContent = answer.explanation;

  heading.append(letter, text, badges);
  item.append(heading, explanation);
  return item;
}

function createInlineBadge(text, modifier) {
  const badge = document.createElement("span");
  badge.className = `quiz-inline-badge quiz-inline-badge--${modifier}`;
  badge.textContent = text;
  return badge;
}

function appendDefinition(list, termText, descriptionText) {
  const group = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");
  term.textContent = termText;
  description.textContent = descriptionText;
  group.append(term, description);
  list.append(group);
}

function appendAnswerSummary(container, label, value) {
  const paragraph = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;
  paragraph.append(strong, value);
  container.append(paragraph);
}

function formatAnswerSelections(answerIds, state, answerById) {
  return answerIds
    .map((answerId) => {
      const index = state.displayedAnswerIds.indexOf(answerId);
      const answer = answerById.get(answerId);
      const letter = index >= 0 ? String.fromCharCode(65 + index) : "?";
      return answer ? `${letter}. ${answer.text}` : null;
    })
    .filter(Boolean)
    .join("; ");
}

function collectElements(root) {
  const get = (selector) => {
    const element = root.querySelector(selector);
    if (!element) {
      throw new Error(`Missing quiz interface element: ${selector}`);
    }
    return element;
  };

  return {
    views: [...root.querySelectorAll("[data-quiz-view]")],
    setupForm: get("[data-quiz-setup-form]"),
    setupHeading: get("[data-quiz-setup-heading]"),
    resumePanel: get("[data-quiz-resume-panel]"),
    position: get("[data-quiz-position]"),
    progress: get("[data-quiz-progress]"),
    progressText: get("[data-quiz-progress-text]"),
    domain: get("[data-quiz-domain]"),
    topic: get("[data-quiz-topic]"),
    questionHeading: get("[data-quiz-question-heading]"),
    instruction: get("[data-quiz-instruction]"),
    answers: get("[data-quiz-answers]"),
    navigator: get("[data-quiz-navigator]"),
    previous: get("[data-quiz-previous]"),
    next: get("[data-quiz-next]"),
    finish: get("[data-quiz-finish]"),
    flagButton: get("[data-quiz-flag]"),
    reportButton: get("[data-quiz-report]"),
    resultsHeading: get("[data-results-heading]"),
    resultsSummary: get("[data-results-summary]"),
    scorePercentage: get("[data-results-percentage]"),
    resultCorrect: get("[data-results-correct]"),
    resultIncorrect: get("[data-results-incorrect]"),
    resultUnanswered: get("[data-results-unanswered]"),
    resultTime: get("[data-results-time]"),
    domainResults: get("[data-results-domains]"),
    primaryReviewList: get("[data-review-primary]"),
    primaryReviewEmpty: get("[data-review-primary-empty]"),
    correctReviewDetails: get("[data-review-correct-details]"),
    correctReviewSummary: get("[data-review-correct-summary]"),
    correctReviewList: get("[data-review-correct]"),
    returnToTest: get("[data-quiz-return]"),
    startAnother: get("[data-quiz-restart]"),
    liveRegion: get("[data-quiz-live]"),
  };
}

function showFatalError(root, message) {
  for (const view of root.querySelectorAll("[data-quiz-view]")) {
    view.hidden = view.dataset.quizView !== "error";
  }

  const errorMessage = root.querySelector("[data-quiz-error-message]");
  if (errorMessage) {
    errorMessage.textContent = message;
  }
}
