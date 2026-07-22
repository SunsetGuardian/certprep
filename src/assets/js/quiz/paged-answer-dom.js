export function createAnswerDomState(
  displayedAnswerIds,
  selectedAnswerIds,
) {
  if (!Array.isArray(displayedAnswerIds)) {
    throw new TypeError("Displayed answer IDs must be an array.");
  }

  const selected = new Set(
    Array.isArray(selectedAnswerIds) ? selectedAnswerIds : [],
  );

  return displayedAnswerIds.map((answerId) => ({
    answerId,
    checked: selected.has(answerId),
    selected: selected.has(answerId),
  }));
}
