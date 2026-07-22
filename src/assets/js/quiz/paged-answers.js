export function answerInputType(questionType) {
  return questionType === "multi_select" ? "checkbox" : "radio";
}

function requireDisplayedAnswer(answerId, displayedAnswerIds) {
  if (!Array.isArray(displayedAnswerIds) || !displayedAnswerIds.includes(answerId)) {
    throw new RangeError("The selected answer is not displayed for this question.");
  }
}

function uniqueDisplayedSelections(selectedAnswerIds, displayedAnswerIds) {
  const selected = new Set(
    Array.isArray(selectedAnswerIds) ? selectedAnswerIds : [],
  );

  return displayedAnswerIds.filter((answerId) => selected.has(answerId));
}

export function updatePagedAnswerSelection({
  questionType,
  answerId,
  checked,
  selectedAnswerIds,
  displayedAnswerIds,
}) {
  requireDisplayedAnswer(answerId, displayedAnswerIds);

  if (questionType !== "multi_select") {
    return checked ? [answerId] : [];
  }

  const selected = new Set(
    uniqueDisplayedSelections(selectedAnswerIds, displayedAnswerIds),
  );

  if (checked) {
    selected.add(answerId);
  } else {
    selected.delete(answerId);
  }

  return displayedAnswerIds.filter((displayedId) => selected.has(displayedId));
}

export function savedAnswerStatus(selectedAnswerIds) {
  const count = Array.isArray(selectedAnswerIds)
    ? selectedAnswerIds.length
    : 0;

  if (count === 0) {
    return "No answer saved yet";
  }

  return `${count} saved answer${count === 1 ? "" : "s"}`;
}
