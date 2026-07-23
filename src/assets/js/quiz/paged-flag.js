export function createPagedFlagPresentation(flagged) {
  if (typeof flagged !== "boolean") {
    throw new TypeError("Flagged state must be a boolean.");
  }

  return {
    pressed: String(flagged),
    label: flagged ? "Remove flag" : "Flag for review",
    announcement: flagged
      ? "Question flagged for review."
      : "Question flag removed.",
  };
}
