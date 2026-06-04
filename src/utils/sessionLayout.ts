import type { Session } from "../types/session";

export function splitSessionsIntoColumns(sessions: Session[]) {
  if (sessions.length < 10) {
    return {
      leftColumn: sessions.filter((session) => session.number % 2 !== 0),
      rightColumn: sessions.filter((session) => session.number % 2 === 0),
    };
  }

  const midpoint = Math.ceil(sessions.length / 2);

  return {
    leftColumn: sessions.slice(0, midpoint),
    rightColumn: sessions.slice(midpoint),
  };
}
