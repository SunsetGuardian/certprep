export function quizSessionStorageKey(testId) {
  return `certprep.quiz.${testId}.session.v1`;
}

export function loadStoredSession(storage, key) {
  try {
    const serialized = storage.getItem(key);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
}

export function saveStoredSession(storage, key, session) {
  storage.setItem(key, JSON.stringify(session));
}

export function clearStoredSession(storage, key) {
  storage.removeItem(key);
}
