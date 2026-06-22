import { describe, expect, it } from "vitest";
import type { Session } from "../types/session";
import {
  areAllSessionsComplete,
  getSessionValidationMessage,
  isSessionComplete,
} from "./sessionValidation";

function createSession(overrides: Partial<Session> = {}): Session {
  return {
    number: 1,
    date: "",
    treatments: ["", "", "", "", ""],
    ...overrides,
  };
}

describe("session validation", () => {
  it("requires a date and at least one treatment", () => {
    expect(isSessionComplete(createSession())).toBe(false);
    expect(
      isSessionComplete(createSession({ date: "2026-03-12" })),
    ).toBe(false);
    expect(
      isSessionComplete(createSession({ treatments: ["Movilidad articular"] })),
    ).toBe(false);
    expect(
      isSessionComplete(
        createSession({
          date: "2026-03-12",
          treatments: ["Movilidad articular"],
        }),
      ),
    ).toBe(true);
  });

  it("reports all sessions complete only when every session is valid", () => {
    const completeSession = createSession({
      date: "2026-03-12",
      treatments: ["Movilidad articular"],
    });

    expect(areAllSessionsComplete([])).toBe(false);
    expect(areAllSessionsComplete([completeSession])).toBe(true);
    expect(areAllSessionsComplete([completeSession, createSession()])).toBe(
      false,
    );
  });

  it("returns the expected validation messages", () => {
    expect(getSessionValidationMessage(createSession())).toBe(
      "Agrega la fecha y al menos un tratamiento para continuar.",
    );
    expect(
      getSessionValidationMessage(
        createSession({ treatments: ["Movilidad articular"] }),
      ),
    ).toBe("Agrega la fecha de esta sesión para continuar.");
    expect(
      getSessionValidationMessage(createSession({ date: "2026-03-12" })),
    ).toBe("Agrega al menos un tratamiento para continuar.");
  });
});
