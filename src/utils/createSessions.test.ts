import { describe, expect, it } from "vitest";
import {
  DEFAULT_TREATMENT_FIELDS,
  clampSessionCount,
  createSessions,
} from "./createSessions";

describe("session creation", () => {
  it("clamps session count between one and ten", () => {
    expect(clampSessionCount(0)).toBe(1);
    expect(clampSessionCount(5)).toBe(5);
    expect(clampSessionCount(11)).toBe(10);
  });

  it("creates empty sessions with five treatment fields", () => {
    const sessions = createSessions(2);

    expect(sessions).toHaveLength(2);
    expect(sessions[0].number).toBe(1);
    expect(sessions[1].number).toBe(2);
    expect(sessions[0].treatments).toHaveLength(DEFAULT_TREATMENT_FIELDS);
  });

  it("preserves existing session data when resizing", () => {
    const sessions = createSessions(2, [
      {
        number: 1,
        date: "2026-03-12",
        treatments: ["Movilidad articular"],
      },
    ]);

    expect(sessions[0]).toEqual({
      number: 1,
      date: "2026-03-12",
      treatments: ["Movilidad articular", "", "", "", ""],
    });
    expect(sessions[1]).toEqual({
      number: 2,
      date: "",
      treatments: ["", "", "", "", ""],
    });
  });
});
