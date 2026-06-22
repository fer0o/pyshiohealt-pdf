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
      className="relative mx-auto h-[1056px] w-full max-w-[816px] overflow-hidden bg-white shadow-xl print:h-[11in] print:w-[8.5in] print:max-w-none print:shadow-none"
      data-pdf-export="true"
      ref={ref}
    >
      <section className="absolute inset-x-0 top-0 bottom-[164px] flex flex-col px-[76px] pb-4 pt-[82px]">
        <div data-preview-only="true">
          <LogoPlaceholder />
        </div>

        <section data-printable-content="true">
          <h1 className="mt-10 text-left text-[15px] font-bold uppercase tracking-normal text-[#565656]">
            BITACORA DE TRATAMIENTO:
          </h1>

          <SessionGrid sessions={sessions} />
        </section>
      </section>

      <div
        className="absolute inset-x-[76px] bottom-[164px]"
        data-preview-only="true"
      >
        <SignatureBlock />
      </div>

      <div className="absolute inset-x-0 bottom-0" data-preview-only="true">
        <TreatmentLogFooter />
      </div>
    </article>
  );
});
