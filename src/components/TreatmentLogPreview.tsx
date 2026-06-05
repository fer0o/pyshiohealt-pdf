import { forwardRef } from "react";
import type { Session } from "../types/session";
import { LogoPlaceholder } from "./LogoPlaceholder";
import { SessionGrid } from "./SessionGrid";
import { SignatureBlock } from "./SignatureBlock";
import { TreatmentLogFooter } from "./TreatmentLogFooter";

type TreatmentLogPreviewProps = {
  sessions: Session[];
};

export const TreatmentLogPreview = forwardRef<
  HTMLElement,
  TreatmentLogPreviewProps
>(function TreatmentLogPreview({ sessions }, ref) {
  return (
    <article
      className="mx-auto flex min-h-[1056px] w-full max-w-[816px] flex-col overflow-hidden bg-white shadow-xl print:min-h-screen print:max-w-none print:shadow-none"
      data-pdf-export="true"
      ref={ref}
    >
      <section className="flex flex-1 flex-col px-[76px] pb-6 pt-[82px]">
        <LogoPlaceholder />

        <h1 className="mt-10 text-left text-[15px] font-bold uppercase tracking-normal text-[#565656]">
          BITACORA DE TRATAMIENTO:
        </h1>

        <SessionGrid sessions={sessions} />
        <SignatureBlock />
      </section>

      <TreatmentLogFooter />
    </article>
  );
});
