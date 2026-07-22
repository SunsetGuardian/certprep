export const PAGED_RESULTS_PATH =
  "/security-plus/sy0-701/practice-test/";

function requireSession(session) {
  if (
    !session ||
    !Array.isArray(session.questionOrder) ||
    session.questionOrder.length === 0 ||
    !session.questions ||
    typeof session.questions !== "object"
  ) {
    throw new TypeError("A valid quiz session is required.");
  }
}

export function createPagedCompletionModel(
  session,
  currentPosition,
) {
  requireSession(session);

  const total = session.questionOrder.length;

  if (
    !Number.isInteger(currentPosition) ||
    currentPosition < 1 ||
    currentPosition > total
  ) {
    throw new RangeError(
      `Current position must be an integer from 1 through ${total}.`,
    );
  }

  const unanswered = session.questionOrder.reduce(
    (count, questionId) => {
      const state = session.questions[questionId];

      if (!state || !Array.isArray(state.selectedAnswerIds)) {
        throw new TypeError(
          `Question state ${questionId} is missing answer data.`,
        );
      }

      return count + (state.selectedAnswerIds.length === 0 ? 1 : 0);
    },
    0,
  );

  const isFinal = currentPosition === total;

  return {
    isFinal,
    total,
    unanswered,
    resultsPath: PAGED_RESULTS_PATH,
    confirmationMessage:
      isFinal && unanswered > 0
        ? `Finish this test with ${unanswered} unanswered question${
            unanswered === 1 ? "" : "s"
          }?`
        : null,
  };
}
