import { treatmentOptions } from "../data/treatmentOptions";
import type { Session } from "../types/session";
import { DEFAULT_TREATMENT_FIELDS } from "../utils/createSessions";
import {
  clampSessionDate,
  getTodayInputDate,
  MIN_SESSION_DATE,
} from "../utils/dateRules";
import {
  getSessionValidationMessage,
  isSessionComplete,
} from "../utils/sessionValidation";

type SessionEditorProps = {
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onSessionChange: (session: Session) => void;
  session: Session;
  totalSessions: number;
};

export function SessionEditor({
  currentIndex,
  onNext,
  onPrevious,
  onSessionChange,
  session,
  totalSessions,
}: SessionEditorProps) {
  const canGoPrevious = currentIndex > 0;
  const isComplete = isSessionComplete(session);
  const canGoNext = currentIndex < totalSessions - 1 && isComplete;
  const maxSessionDate = getTodayInputDate();
  const validationMessage = getSessionValidationMessage(session);

  const updateTreatment = (treatmentIndex: number, value: string) => {
    const treatments = Array.from(
      { length: DEFAULT_TREATMENT_FIELDS },
      (_, index) => session.treatments[index] ?? "",
    );

    treatments[treatmentIndex] = value;
    onSessionChange({ ...session, treatments });
  };

  const isTreatmentSelectedElsewhere = (
    treatment: string,
    treatmentIndex: number,
  ) =>
    session.treatments.some(
      (selectedTreatment, index) =>
        index !== treatmentIndex && selectedTreatment === treatment,
    );

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-normal text-neutral-500">
            Paso 2
          </p>
          <h3 className="mt-2 text-lg font-bold text-neutral-900">
            Sesión {session.number}
          </h3>
        </div>

        <p className="rounded-full bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#263b70]">
          {isComplete ? "Completada" : "Pendiente"} · {currentIndex + 1} de{" "}
          {totalSessions}
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-neutral-700">
          Fecha
          <input
            className="h-11 rounded-md border border-neutral-300 px-3 text-sm text-neutral-800 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            max={maxSessionDate}
            min={MIN_SESSION_DATE}
            type="date"
            value={session.date}
            onChange={(event) => {
              onSessionChange({
                ...session,
                date: clampSessionDate(event.target.value, maxSessionDate),
              });
            }}
          />
        </label>

        <div className="grid gap-3">
          <p className="text-sm font-semibold text-neutral-700">
            Tratamientos
          </p>
          {Array.from({ length: DEFAULT_TREATMENT_FIELDS }, (_, index) => (
            <label
              className="grid gap-2 text-sm font-semibold text-neutral-700"
              key={index}
            >
              <span className="text-xs uppercase tracking-normal text-neutral-500">
                Tratamiento {index + 1}
              </span>
              <select
                className="h-11 rounded-md border border-neutral-300 px-3 text-sm text-neutral-800 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                value={session.treatments[index] ?? ""}
                onChange={(event) => {
                  updateTreatment(index, event.target.value);
                }}
              >
                <option value="">Seleccionar tratamiento</option>
                {treatmentOptions.map((treatment) => (
                  <option
                    disabled={isTreatmentSelectedElsewhere(treatment, index)}
                    key={treatment}
                    value={treatment}
                  >
                    {treatment}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>

      {validationMessage ? (
        <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
          {validationMessage}
        </p>
      ) : (
        <p className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          Esta sesión está lista.
        </p>
      )}

      <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-neutral-200 pt-5">
        <button
          className="h-10 rounded-md border border-neutral-300 px-4 text-sm font-bold text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-45"
          disabled={!canGoPrevious}
          type="button"
          onClick={onPrevious}
        >
          Anterior
        </button>
        <button
          className="h-10 rounded-md bg-[#263b70] px-4 text-sm font-bold text-white transition hover:bg-[#1c2d58] disabled:cursor-not-allowed disabled:opacity-45"
          disabled={!canGoNext}
          type="button"
          onClick={onNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
