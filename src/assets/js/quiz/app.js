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

  const showView = (name) => {
    for (const view of elements.views) {
      view.hidden = view.dataset.quizView !== name;
    }
  };

  const renderSetup = () => {
    showView("setup");
    elements.resumePanel.hidden = true;
  };

  const renderCompletion = () => {
    const answered = getAnsweredCount(session);
    const unanswered = getUnansweredCount(session);

    elements.completionAnswered.textContent = String(answered);
    elements.completionUnanswered.textContent = String(unanswered);
    elements.completionFlagged.textContent = String(getFlaggedCount(session));
    showView("complete");
  };

  const renderQuestion = ({ focusHeading = false, focusAnswerId = null } = {}) => {
    const questionId = getCurrentQuestionId(session);
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
      const selectedInput = [...elements.answers.querySelectorAll("input")].find((input) => input.value === focusAnswerId);
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
    renderCompletion();
    announce("Test completed. Your answers remain saved in this browser tab.");
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
    if (session && !session.completedAt) {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  if (session?.completedAt) {
    renderCompletion();
  } else if (session) {
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
    completionAnswered: get("[data-completion-answered]"),
    completionUnanswered: get("[data-completion-unanswered]"),
    completionFlagged: get("[data-completion-flagged]"),
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
