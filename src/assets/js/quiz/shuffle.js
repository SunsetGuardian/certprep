/**
 * Return a shuffled copy without modifying the original array.
 * The optional random source makes the function deterministic in tests.
 */
export function shuffleCopy(items, random = Math.random) {
  if (!Array.isArray(items)) {
    throw new TypeError("shuffleCopy expects an array.");
  }

  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const value = Number(random());

    if (!Number.isFinite(value) || value < 0 || value >= 1) {
      throw new RangeError("The random source must return a number from 0 up to, but not including, 1.");
    }

    const swapIndex = Math.floor(value * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

/**
 * Select a unique random subset from an array.
 */
export function sampleWithoutReplacement(items, count, random = Math.random) {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError("Question count must be a positive integer.");
  }

  if (count > items.length) {
    throw new RangeError(`Cannot select ${count} items from a collection of ${items.length}.`);
  }

  return shuffleCopy(items, random).slice(0, count);
}
