import {
  answerInputType,
  savedAnswerStatus,
  updatePagedAnswerSelection,
} from "./paged-answers.js";
import { restorePagedQuizSession } from "./paged-session.js";
import { setSelectedAnswerIds } from "./session.js";
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

  restoredView.hidden = result.status !== "restored";
  unavailableView.hidden = result.status === "restored";

  if (result.status === "restored") {
    renderRestoredSession(restoredView, result);
    return;
  }

  renderUnavailableSession(unavailableView, result);
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

function renderRestoredSession(root, result) {
  const { question } = result.state;

  setText(
    root,
    "[data-paged-position]",
    `Question ${result.position} of ${result.total}`,
  );
  setText(root, "[data-paged-question-id]", question.id);
  setText(root, "[data-paged-domain]", `${question.domain.id} ${question.domain.name}`);
  setText(root, "[data-paged-topic]", question.topic);
  setText(root, "[data-paged-question-text]", question.text);
  setText(
    root,
    "[data-paged-answer-status]",
    savedAnswerStatus(result.state.selectedAnswerIds),
  );

  const instruction = root.querySelector("[data-paged-instruction]");
  if (!instruction) {
    throw new Error("Missing paged question instruction.");
  }

  instruction.textContent = question.instruction || "";
  instruction.hidden = !question.instruction;

  const answers = root.querySelector("[data-paged-answers]");
  if (!answers) {
    throw new Error("Missing paged question answers.");
  }

  renderAnswers(answers, root, result);
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

      setSelectedAnswerIds(
        result.session,
        question.id,
        selectedAnswerIds,
      );
      saveStoredSession(
        window.sessionStorage,
        result.storageKey,
        result.session,
      );

      renderRestoredSession(viewRoot, result);
      announce(
        viewRoot,
        `Answer saved for question ${result.position}.`,
      );
    });

    label.append(input, letter, text);
    container.append(label);
  });
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
      `Question ${result.position} is outside the active test. Open a numbered route from 1 through ${result.total}.`;
  } else if (result.status === "completed") {
    heading = "This test is already complete.";
    detail =
      "Return to the working practice-test page to view the saved results.";
  }

  setText(root, "[data-paged-unavailable-heading]", heading);
  setText(root, "[data-paged-unavailable-detail]", detail);
}
