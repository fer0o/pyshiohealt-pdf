import type { Session } from "../types/session";
import { isSessionComplete } from "../utils/sessionValidation";

type SessionProgressProps = {
  currentIndex: number;
  onSelectSession: (index: number) => void;
  sessions: Session[];
};

export function SessionProgress({
  currentIndex,
  onSelectSession,
  sessions,
}: SessionProgressProps) {
  return (
    <section className="mb-6 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-normal text-neutral-500">
            Sesiones
          </p>
          <p className="mt-1 text-sm font-semibold text-neutral-800">
            Progreso de captura
          </p>
        </div>
        <p className="text-xs font-bold text-neutral-500">
          {sessions.filter(isSessionComplete).length} de {sessions.length}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {sessions.map((session, index) => {
          const complete = isSessionComplete(session);
          const active = index === currentIndex;

          return (
            <button
              className={`min-h-10 rounded-md border px-3 text-sm font-bold transition ${
                active
                  ? "border-[#09a9d6] bg-[#e8f8fc] text-[#263b70]"
                  : complete
                    ? "border-[#263b70] bg-[#263b70] text-white hover:bg-[#1c2d58]"
                    : "border-neutral-300 bg-white text-neutral-500 hover:bg-neutral-100"
              }`}
              key={session.number}
              type="button"
              onClick={() => {
                onSelectSession(index);
              }}
            >
              <span className="block">Sesion {session.number}</span>
              <span className="block text-[11px] font-semibold">
                {complete ? "Completa" : "Pendiente"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
