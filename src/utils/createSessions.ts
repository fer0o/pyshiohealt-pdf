import type { Session } from "../types/session";

export const MIN_SESSION_COUNT = 1;
export const MAX_SESSION_COUNT = 10;
export const DEFAULT_TREATMENT_FIELDS = 5;

export function clampSessionCount(count: number) {
  return Math.min(MAX_SESSION_COUNT, Math.max(MIN_SESSION_COUNT, count));
}

export function createEmptySession(number: number): Session {
  return {
    number,
    date: "",
    treatments: Array.from({ length: DEFAULT_TREATMENT_FIELDS }, () => ""),
  };
}

export function createSessions(count: number, currentSessions: Session[] = []): Session[] {
  const sessionCount = clampSessionCount(count);

  return Array.from({ length: sessionCount }, (_, index) => {
    const sessionNumber = index + 1;
    const existingSession = currentSessions.find(
      (session) => session.number === sessionNumber,
    );

    if (existingSession) {
      return {
        ...existingSession,
        treatments: Array.from(
          { length: DEFAULT_TREATMENT_FIELDS },
          (_, treatmentIndex) => existingSession.treatments[treatmentIndex] ?? "",
        ),
      };
    }

    return createEmptySession(sessionNumber);
  });
}
