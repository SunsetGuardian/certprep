const maxQuestionCount = 50;

export default {
  maxQuestionCount,
  questionPositions: Array.from(
    { length: maxQuestionCount },
    (_, index) => index + 1,
  ),
};
