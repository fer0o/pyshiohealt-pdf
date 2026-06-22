import { describe, expect, it } from "vitest";
import type { Session } from "../types/session";
import { splitSessionsIntoColumns } from "./sessionLayout";

function createSession(number: number): Session {
  return {
    number,
    date: "2026-03-12",
    treatments: ["Movilidad articular"],
  };
}

function sessionNumbers(sessions: Session[]) {
  return sessions.map((session) => session.number);
}

describe("splitSessionsIntoColumns", () => {
  it("distributes fewer than ten sessions by odd and even session number", () => {
    const sessions = Array.from({ length: 5 }, (_, index) =>
      createSession(index + 1),
    );

    const { leftColumn, rightColumn } = splitSessionsIntoColumns(sessions);

    expect(sessionNumbers(leftColumn)).toEqual([1, 3, 5]);
    expect(sessionNumbers(rightColumn)).toEqual([2, 4]);
  });

  it("keeps the reference PDF distribution for ten sessions", () => {
    const sessions = Array.from({ length: 10 }, (_, index) =>
      createSession(index + 1),
    );

    const { leftColumn, rightColumn } = splitSessionsIntoColumns(sessions);

    expect(sessionNumbers(leftColumn)).toEqual([1, 2, 3, 4, 5]);
    expect(sessionNumbers(rightColumn)).toEqual([6, 7, 8, 9, 10]);
  });
});
