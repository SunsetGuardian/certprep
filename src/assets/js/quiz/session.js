import { sampleWithoutReplacement, shuffleCopy } from "./shuffle.js";

export const QUIZ_SESSION_VERSION = 1;

function isoNow() {
  return new Date().toISOString();
}

function fallbackSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function createSessionId() {
  return globalThis.crypto?.randomUUID?.() ?? fallbackSessionId();
}

function cloneQuestion(question) {
  return JSON.parse(JSON.stringify(question));
}

function touch(session, now = isoNow) {
  session.updatedAt = now();
  return session;
}

export function createQuizSession({
  test,
  dataVersion,
  questions,
  questionCount,
  random = Math.random,
  now = isoNow,
  sessionId = createSessionId,
}) {
  if (!test?.testId) {
    throw new Error("A test ID is required to create a quiz session.");
  }

  if (!dataVersion) {
    throw new Error("A data version is required to create a quiz session.");
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("At least one question is required to create a quiz session.");
  }

  const selectedQuestions = sampleWithoutReplacement(questions, questionCount, random);
  const questionOrder = selectedQuestions.map((question) => question.id);
  const questionStates = {};

  for (const sourceQuestion of selectedQuestions) {
    const question = cloneQuestion(sourceQuestion);
    const answerIds = question.answers.map((answer) => answer.id);

    questionStates[question.id] = {
      question,
      displayedAnswerIds: shuffleCopy(answerIds, random),
      selectedAnswerIds: [],
      flaggedForReview: false,
    };
  }

  const timestamp = now();

  return {
    sessionVersion: QUIZ_SESSION_VERSION,
    sessionId: sessionId(),
    test: { ...test },
    dataVersion,
    startedAt: timestamp,
    updatedAt: timestamp,
    completedAt: null,
    currentIndex: 0,
    questionOrder,
    questions: questionStates,
  };
}

export function isValidQuizSession(session, expectedTestId = null) {
  if (!session || typeof session !== "object") {
    return false;
  }

  if (session.sessionVersion !== QUIZ_SESSION_VERSION) {
    return false;
  }

  if (!session.test?.testId || !session.dataVersion || !session.sessionId) {
    return false;
  }

  if (expectedTestId && session.test.testId !== expectedTestId) {
    return false;
  }

  if (!Array.isArray(session.questionOrder) || session.questionOrder.length === 0) {
    return false;
  }

  if (!session.questions || typeof session.questions !== "object") {
    return false;
  }

  if (!Number.isInteger(session.currentIndex) || session.currentIndex < 0 || session.currentIndex >= session.questionOrder.length) {
    return false;
  }

  const uniqueQuestionIds = new Set(session.questionOrder);
  if (uniqueQuestionIds.size !== session.questionOrder.length) {
    return false;
  }

  for (const questionId of session.questionOrder) {
    const state = session.questions[questionId];
    const answerIds = state?.question?.answers?.map((answer) => answer.id);
    const correctAnswerIds = state?.question?.correctAnswerIds;

    if (!state || !Array.isArray(answerIds) || answerIds.length === 0) {
      return false;
    }

    if (!Array.isArray(correctAnswerIds) || correctAnswerIds.length === 0) {
      return false;
    }

    if (!correctAnswerIds.every((answerId) => answerIds.includes(answerId))) {
      return false;
    }

    if (!Array.isArray(state.displayedAnswerIds) || state.displayedAnswerIds.length !== answerIds.length) {
      return false;
    }

    if (new Set(state.displayedAnswerIds).size !== answerIds.length) {
      return false;
    }

    if (!state.displayedAnswerIds.every((answerId) => answerIds.includes(answerId))) {
      return false;
    }

    if (!Array.isArray(state.selectedAnswerIds)) {
      return false;
    }

    if (new Set(state.selectedAnswerIds).size !== state.selectedAnswerIds.length) {
      return false;
    }

    if (!state.selectedAnswerIds.every((answerId) => answerIds.includes(answerId))) {
      return false;
    }
  }

  return true;
}

export function getCurrentQuestionId(session) {
  return session.questionOrder[session.currentIndex];
}

export function getQuestionState(session, questionId) {
  const state = session.questions[questionId];

  if (!state) {
    throw new Error(`Question ${questionId} is not part of this session.`);
  }

  return state;
}

export function getCurrentQuestionState(session) {
  return getQuestionState(session, getCurrentQuestionId(session));
}

export function setSelectedAnswerIds(session, questionId, selectedAnswerIds, now = isoNow) {
  const state = getQuestionState(session, questionId);
  const allowedAnswerIds = new Set(state.question.answers.map((answer) => answer.id));
  const normalizedIds = [...new Set(selectedAnswerIds)];

  if (!normalizedIds.every((answerId) => allowedAnswerIds.has(answerId))) {
    throw new Error(`A selected answer does not belong to question ${questionId}.`);
  }

  if (["single_choice", "best_available"].includes(state.question.type) && normalizedIds.length > 1) {
    throw new Error(`Question ${questionId} accepts only one answer.`);
  }

  state.selectedAnswerIds = normalizedIds;
  touch(session, now);
  return session;
}

export function toggleQuestionFlag(session, questionId, now = isoNow) {
  const state = getQuestionState(session, questionId);
  state.flaggedForReview = !state.flaggedForReview;
  touch(session, now);
  return state.flaggedForReview;
}

export function moveToQuestion(session, index, now = isoNow) {
  if (!Number.isInteger(index) || index < 0 || index >= session.questionOrder.length) {
    throw new RangeError("Question index is outside this test.");
  }

  session.currentIndex = index;
  touch(session, now);
  return session;
}

export function getAnsweredCount(session) {
  return session.questionOrder.reduce((count, questionId) => {
    return count + (session.questions[questionId].selectedAnswerIds.length > 0 ? 1 : 0);
  }, 0);
}

export function getFlaggedCount(session) {
  return session.questionOrder.reduce((count, questionId) => {
    return count + (session.questions[questionId].flaggedForReview ? 1 : 0);
  }, 0);
}

export function getUnansweredCount(session) {
  return session.questionOrder.length - getAnsweredCount(session);
}

export function completeQuizSession(session, now = isoNow) {
  const timestamp = now();
  session.completedAt = timestamp;
  session.updatedAt = timestamp;
  return session;
}

export function reopenQuizSession(session, now = isoNow) {
  session.completedAt = null;
  touch(session, now);
  return session;
}
