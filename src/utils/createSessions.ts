import { exampleSessions } from "../data/exampleSessions";
import type { Session } from "../types/session";

export const MIN_SESSION_COUNT = 0;
export const MAX_SESSION_COUNT = 10;

export function clampSessionCount(count: number) {
  return Math.min(MAX_SESSION_COUNT, Math.max(MIN_SESSION_COUNT, count));
}

export function createSessions(count: number): Session[] {
  const sessionCount = clampSessionCount(count);

  return Array.from({ length: sessionCount }, (_, index) => {
    const existingSession = exampleSessions[index];

    if (existingSession) {
      return existingSession;
    }

    return {
      number: index + 1,
      date: "",
      treatments: [],
    };
  });
}
