import { buildQuestionPath } from "./routes.js";

export function isClassicQuizMode(search = "") {
  if (typeof search !== "string") {
    return false;
  }

  const params = new URLSearchParams(search);
  return params.get("mode") === "classic";
}

export function getPagedEntryPath(session, search = "") {
  if (isClassicQuizMode(search)) {
    return null;
  }

  if (
    !session ||
    session.completedAt ||
    !Array.isArray(session.questionOrder) ||
    session.questionOrder.length === 0 ||
    !Number.isInteger(session.currentIndex) ||
    session.currentIndex < 0 ||
    session.currentIndex >= session.questionOrder.length
  ) {
    return null;
  }

  return buildQuestionPath(session.currentIndex + 1);
}
