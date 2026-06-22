import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Session } from "../types/session";
import { TreatmentLogPreview } from "./TreatmentLogPreview";

const sessions: Session[] = [
  {
    number: 1,
    date: "2026-03-12",
    treatments: ["Movilidad articular", "Fortalecimiento muscular"],
  },
  {
    number: 2,
    date: "2026-03-14",
    treatments: ["Terapia miofascial"],
  },
];

describe("TreatmentLogPreview", () => {
  it("marks the letterhead elements as preview only", () => {
    const { container } = render(<TreatmentLogPreview sessions={sessions} />);

    const previewOnlyElements = container.querySelectorAll(
      '[data-preview-only="true"]',
    );

    expect(previewOnlyElements).toHaveLength(3);
    expect(screen.getByText("LOGO")).not.toBeNull();
    expect(screen.getByText("Felipe Contreras Valenzuela")).not.toBeNull();
    expect(screen.getByText("www.physiohealth.com.mx")).not.toBeNull();
  });

  it("marks title and sessions as printable content", () => {
    const { container } = render(<TreatmentLogPreview sessions={sessions} />);

    const printableContent = container.querySelector(
      '[data-printable-content="true"]',
    );

    expect(printableContent).not.toBeNull();
    expect(printableContent?.textContent).toContain(
      "BITACORA DE TRATAMIENTO:",
    );
    expect(printableContent?.textContent).toContain("Sesión N° 1 (12/03/2026)");
    expect(printableContent?.textContent).toContain("Sesión N° 2 (14/03/2026)");
  });
});
