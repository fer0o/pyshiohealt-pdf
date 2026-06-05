import { TreatmentLogPreview } from "../components/TreatmentLogPreview";
import { WizardStepper } from "../components/WizardStepper";
import type { Session } from "../types/session";

type PreviewPageProps = {
  sessions: Session[];
  onEditClick: () => void;
};

export function PreviewPage({ sessions, onEditClick }: PreviewPageProps) {
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
            className="h-10 rounded-md border border-neutral-300 px-4 text-sm font-bold text-neutral-400 disabled:cursor-not-allowed disabled:opacity-60"
            disabled
            type="button"
            title="Descarga PDF pendiente de implementar"
          >
            Descargar
          </button>
          <button
            className="h-10 rounded-md bg-[#263b70] px-4 text-sm font-bold text-white transition hover:bg-[#1c2d58]"
            type="button"
            onClick={() => window.print()}
          >
            Imprimir
          </button>
        </div>
      </section>

      <TreatmentLogPreview sessions={sessions} />
    </main>
  );
}
