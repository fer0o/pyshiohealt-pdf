import { MAX_SESSION_COUNT, MIN_SESSION_COUNT } from "../utils/createSessions";

type SessionCountControlProps = {
  sessionCount: number;
  onSessionCountChange: (count: number) => void;
};

export function SessionCountControl({
  sessionCount,
  onSessionCountChange,
}: SessionCountControlProps) {
  return (
    <section className="mx-auto mb-6 flex w-full max-w-[816px] items-center justify-between gap-4 rounded-lg border border-neutral-300 bg-white px-5 py-4 text-left shadow-sm print:hidden">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-normal text-neutral-700">
          Bitácora
        </h2>
        <p className="text-sm text-neutral-500">{sessionCount} sesiones</p>
      </div>

      <label className="flex items-center gap-3 text-sm font-semibold text-neutral-700">
        Número de sesiones
        <input
          className="h-10 w-20 rounded-md border border-neutral-300 px-3 text-center text-base font-bold text-neutral-800 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
          aria-label="Número de sesiones"
          inputMode="numeric"
          maxLength={String(MAX_SESSION_COUNT).length}
          pattern="[0-9]*"
          type="text"
          value={sessionCount}
          onChange={(event) => {
            const numericValue = event.target.value.replace(/\D/g, "");
            const nextCount =
              numericValue === "" ? MIN_SESSION_COUNT : Number(numericValue);

            onSessionCountChange(nextCount);
          }}
        />
      </label>
    </section>
  );
}
