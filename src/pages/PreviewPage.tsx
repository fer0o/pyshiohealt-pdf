import { useRef, useState } from "react";
import { TreatmentLogPreview } from "../components/TreatmentLogPreview";
import { WizardStepper } from "../components/WizardStepper";
import type { Session } from "../types/session";
import { downloadPreviewPdf } from "../utils/downloadPreviewPdf";

type PreviewPageProps = {
  onDownloadComplete: () => void;
  sessions: Session[];
  onEditClick: () => void;
  onPrintComplete: () => void;
};

export function PreviewPage({
  onDownloadComplete,
  sessions,
  onEditClick,
  onPrintComplete,
}: PreviewPageProps) {
  const previewRef = useRef<HTMLElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!previewRef.current) {
      return;
    }

    setIsDownloading(true);

    try {
      await downloadPreviewPdf(previewRef.current);
      onDownloadComplete();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    const handleAfterPrint = () => {
      window.removeEventListener("afterprint", handleAfterPrint);
      onPrintComplete();
    };

    window.addEventListener("afterprint", handleAfterPrint);
    window.print();
  };

  return (
    <main className="min-h-screen bg-neutral-200 px-4 py-8 text-[#555555]">
      <section className="mx-auto w-full max-w-[816px] print:hidden">
        <WizardStepper currentStep={3} />
      </section>

      <section className="mx-auto mb-6 flex w-full max-w-[816px] items-center justify-between gap-4 rounded-lg border border-neutral-300 bg-white px-5 py-4 text-left shadow-sm print:hidden">
        <div>
          <h1 className="text-sm font-bold uppercase tracking-normal text-neutral-700">
            Vista previa
          </h1>
          <p className="text-sm text-neutral-500">{sessions.length} sesiones</p>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <button
            className="h-10 rounded-md border border-neutral-300 px-4 text-sm font-bold text-neutral-700 transition hover:bg-neutral-100"
            type="button"
            onClick={onEditClick}
          >
            Editar
          </button>
          <button
            className="h-10 rounded-md border border-neutral-300 px-4 text-sm font-bold text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-wait disabled:opacity-60"
            disabled={isDownloading}
            type="button"
            onClick={handleDownload}
          >
            {isDownloading ? "Descargando" : "Descargar"}
          </button>
          <button
            className="h-10 rounded-md bg-[#263b70] px-4 text-sm font-bold text-white transition hover:bg-[#1c2d58]"
            type="button"
            onClick={handlePrint}
          >
            Imprimir
          </button>
        </div>
      </section>

      <TreatmentLogPreview ref={previewRef} sessions={sessions} />
    </main>
  );
}
