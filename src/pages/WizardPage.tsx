import { SessionEditor } from "../components/SessionEditor";
import { SessionProgress } from "../components/SessionProgress";
import { SessionCountControl } from "../components/SessionCountControl";
import { WizardStepper } from "../components/WizardStepper";
import type { Session } from "../types/session";
import { areAllSessionsComplete } from "../utils/sessionValidation";

type WizardPageProps = {
  currentSessionIndex: number;
  isSessionCountConfirmed: boolean;
  onCurrentSessionChange: (session: Session) => void;
  onNextSession: () => void;
  onSelectSession: (index: number) => void;
  sessionCount: number;
  sessions: Session[];
  onPreviousSession: () => void;
  onSessionCountChange: (count: number) => void;
  onSessionCountConfirm: () => void;
  onPreviewClick: () => void;
};

export function WizardPage({
  currentSessionIndex,
  isSessionCountConfirmed,
  onCurrentSessionChange,
  onNextSession,
  onSelectSession,
  onPreviousSession,
  sessionCount,
  sessions,
  onSessionCountChange,
  onSessionCountConfirm,
  onPreviewClick,
}: WizardPageProps) {
  const currentSession = sessions[currentSessionIndex];
  const currentStep = isSessionCountConfirmed ? 2 : 1;
  const allSessionsComplete = areAllSessionsComplete(sessions);
  const canPreview = isSessionCountConfirmed && allSessionsComplete;

  return (
    <main className="min-h-screen bg-neutral-200 px-4 py-8 text-[#555555]">
      <section className="mx-auto w-full max-w-[816px]">
        <header className="mb-6">
          <p className="text-sm font-bold uppercase tracking-normal text-neutral-500">
            Physio Health
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-normal text-neutral-900">
            Crear bitácora de tratamiento
          </h1>
        </header>

        <WizardStepper currentStep={currentStep} />

        <section className="rounded-lg border border-neutral-300 bg-white px-6 py-7 shadow-sm">
          <div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                Captura de sesiones
              </h2>
              <p className="mt-2 max-w-[520px] text-sm leading-6 text-neutral-600">
                Aquí irá el formulario para llenar fecha y tratamientos de cada
                sesión. Por ahora esta vista separa el flujo de captura de la
                vista previa final.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-neutral-200 pt-6 lg:grid-cols-[240px_1fr]">
            <div className="grid gap-4">
              <div className="rounded-md border border-dashed border-neutral-300 px-4 py-5">
                <p className="text-xs font-bold uppercase tracking-normal text-neutral-500">
                  Paso 1
                </p>
                <SessionCountControl
                  isConfirmed={isSessionCountConfirmed}
                  onConfirm={onSessionCountConfirm}
                  sessionCount={sessionCount}
                  onSessionCountChange={onSessionCountChange}
                />
              </div>

              <div className="rounded-md border border-dashed border-neutral-300 px-4 py-5">
                <p className="text-xs font-bold uppercase tracking-normal text-neutral-500">
                  Paso 3
                </p>
                <p className="mt-2 text-sm font-semibold text-neutral-800">
                  Revisar e imprimir
                </p>
                <p className="mt-3 text-xs leading-5 text-neutral-500">
                  {allSessionsComplete
                    ? "Todas las sesiones están listas."
                    : "Completa todas las sesiones para activar la vista previa."}
                </p>
                <button
                  className="mt-5 h-10 w-full rounded-md bg-[#263b70] px-4 text-sm font-bold text-white transition hover:bg-[#1c2d58] disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={!canPreview}
                  type="button"
                  onClick={onPreviewClick}
                >
                  Vista previa
                </button>
              </div>
            </div>

            <div className="rounded-md border border-dashed border-neutral-300 px-4 py-5">
              {isSessionCountConfirmed && currentSession ? (
                <>
                  <SessionProgress
                    currentIndex={currentSessionIndex}
                    onSelectSession={onSelectSession}
                    sessions={sessions}
                  />
                  <SessionEditor
                    currentIndex={currentSessionIndex}
                    onNext={onNextSession}
                    onPrevious={onPreviousSession}
                    onSessionChange={onCurrentSessionChange}
                    session={currentSession}
                    totalSessions={sessions.length}
                  />
                </>
              ) : (
                <div>
                  <p className="text-xs font-bold uppercase tracking-normal text-neutral-500">
                    Paso 2
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-neutral-400">
                    Fecha y tratamientos
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-500">
                    Confirma el número de sesiones para habilitar la captura.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
