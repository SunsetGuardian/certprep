function uniqueSortedIds(ids) {
  return [...new Set(ids)].sort();
}

function sameIdSet(left, right) {
  const normalizedLeft = uniqueSortedIds(left);
  const normalizedRight = uniqueSortedIds(right);

  return normalizedLeft.length === normalizedRight.length
    && normalizedLeft.every((value, index) => value === normalizedRight[index]);
}

function validDateMilliseconds(value) {
  if (!value) {
    return null;
  }

  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds) ? milliseconds : null;
}

export function gradeQuestionState(state) {
  if (!state?.question?.id) {
    throw new Error("A question state with a stable question ID is required for grading.");
  }

  const selectedAnswerIds = uniqueSortedIds(state.selectedAnswerIds ?? []);
  const correctAnswerIds = uniqueSortedIds(state.question.correctAnswerIds ?? []);

  if (correctAnswerIds.length === 0) {
    throw new Error(`Question ${state.question.id} does not define a correct answer.`);
  }

  const status = selectedAnswerIds.length === 0
    ? "unanswered"
    : sameIdSet(selectedAnswerIds, correctAnswerIds)
      ? "correct"
      : "incorrect";

  return {
    questionId: state.question.id,
    status,
    isAnswered: selectedAnswerIds.length > 0,
    isCorrect: status === "correct",
    selectedAnswerIds,
    correctAnswerIds,
  };
}

export function getElapsedMilliseconds(session) {
  const startedAt = validDateMilliseconds(session?.startedAt);
  const completedAt = validDateMilliseconds(session?.completedAt);

  if (startedAt === null || completedAt === null) {
    return null;
  }

  return Math.max(0, completedAt - startedAt);
}

export function formatElapsedTime(milliseconds) {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    return "Not available";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    const hourLabel = hours === 1 ? "hour" : "hours";
    const minuteLabel = minutes === 1 ? "minute" : "minutes";
    return minutes > 0
      ? `${hours} ${hourLabel}, ${minutes} ${minuteLabel}`
      : `${hours} ${hourLabel}`;
  }

  if (minutes > 0) {
    const minuteLabel = minutes === 1 ? "minute" : "minutes";
    const secondLabel = seconds === 1 ? "second" : "seconds";
    return seconds > 0
      ? `${minutes} ${minuteLabel}, ${seconds} ${secondLabel}`
      : `${minutes} ${minuteLabel}`;
  }

  return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
}

export function gradeQuizSession(session) {
  if (!Array.isArray(session?.questionOrder) || !session.questions) {
    throw new Error("A valid quiz session is required for grading.");
  }

  const questionResults = session.questionOrder.map((questionId, index) => {
    const state = session.questions[questionId];
    const grade = gradeQuestionState(state);

    return {
      ...grade,
      position: index + 1,
      state,
    };
  });

  const correct = questionResults.filter((result) => result.status === "correct").length;
  const incorrect = questionResults.filter((result) => result.status === "incorrect").length;
  const unanswered = questionResults.filter((result) => result.status === "unanswered").length;
  const total = questionResults.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const domainMap = new Map();

  for (const result of questionResults) {
    const domain = result.state.question.domain ?? { id: "", name: "Unassigned" };
    const key = `${domain.id}|${domain.name}`;

    if (!domainMap.has(key)) {
      domainMap.set(key, {
        id: domain.id,
        name: domain.name,
        total: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        percentage: 0,
      });
    }

    const domainResult = domainMap.get(key);
    domainResult.total += 1;
    domainResult[result.status] += 1;
  }

  const domains = [...domainMap.values()]
    .map((domain) => ({
      ...domain,
      percentage: domain.total > 0 ? Math.round((domain.correct / domain.total) * 100) : 0,
    }))
    .sort((left, right) => left.id.localeCompare(right.id, undefined, { numeric: true }));

  return {
    total,
    correct,
    incorrect,
    unanswered,
    percentage,
    elapsedMilliseconds: getElapsedMilliseconds(session),
    domains,
    questionResults,
  };
}
