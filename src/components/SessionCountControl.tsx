import { useState } from "react";
import { MAX_SESSION_COUNT, MIN_SESSION_COUNT } from "../utils/createSessions";

type SessionCountControlProps = {
  isConfirmed: boolean;
  onConfirm: () => void;
  sessionCount: number;
  onSessionCountChange: (count: number) => void;
};

export function SessionCountControl({
  isConfirmed,
  onConfirm,
  sessionCount,
  onSessionCountChange,
}: SessionCountControlProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftCount, setDraftCount] = useState(String(sessionCount));

  const updateDraftCount = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue === "") {
      setDraftCount("");
      return;
    }

    const nextCount = Math.min(
      MAX_SESSION_COUNT,
      Math.max(MIN_SESSION_COUNT, Number(numericValue)),
    );
    setDraftCount(String(nextCount));
  };

  const confirmCount = () => {
    const nextCount =
      draftCount === ""
        ? MIN_SESSION_COUNT
        : Math.min(
            MAX_SESSION_COUNT,
            Math.max(MIN_SESSION_COUNT, Number(draftCount)),
          );

    onSessionCountChange(nextCount);
    onConfirm();
    setDraftCount(String(nextCount));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraftCount(String(sessionCount));
    setIsEditing(false);
  };

  return (
    <div>
      <p className="mt-2 text-sm font-semibold text-neutral-800">
        Número de sesiones
      </p>
      {isConfirmed ? (
        <p className="mt-1 text-xs font-bold uppercase tracking-normal text-[#263b70]">
          Confirmado
        </p>
      ) : (
        <p className="mt-1 text-xs text-neutral-500">
          Confirma para activar la captura
        </p>
      )}

      <div
        className={`mt-5 flex min-h-10 items-center gap-3 ${
          isEditing ? "justify-start" : "justify-center"
        }`}
      >
        {isEditing ? (
          <input
            className="h-10 w-20 rounded-md border border-neutral-300 px-3 text-center text-base font-bold text-neutral-800 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            aria-label="Número de sesiones"
            autoFocus
            inputMode="numeric"
            maxLength={String(MAX_SESSION_COUNT).length}
            pattern="[0-9]*"
            type="text"
            value={draftCount}
            onChange={(event) => {
              updateDraftCount(event.target.value);
            }}
          />
        ) : (
          <strong className="flex h-10 w-20 items-center justify-center text-base text-neutral-900">
            {sessionCount}
          </strong>
        )}
      </div>

      <div
        className={`mt-5 flex flex-wrap gap-2 ${
          isEditing ? "justify-start" : "justify-center"
        }`}
      >
        {isEditing ? (
          <>
            <button
              className="h-9 rounded-md bg-[#263b70] px-4 text-sm font-bold text-white transition hover:bg-[#1c2d58]"
              type="button"
              onClick={confirmCount}
            >
              Confirmar
            </button>
            <button
              className="h-9 rounded-md border border-neutral-300 px-4 text-sm font-bold text-neutral-700 transition hover:bg-neutral-100"
              type="button"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className="h-9 rounded-md border border-neutral-300 px-4 text-sm font-bold text-neutral-700 transition hover:bg-neutral-100"
              type="button"
              onClick={() => {
                setDraftCount(String(sessionCount));
                setIsEditing(true);
              }}
            >
              Editar
            </button>
            {!isConfirmed ? (
              <button
                className="h-9 rounded-md bg-[#263b70] px-4 text-sm font-bold text-white transition hover:bg-[#1c2d58]"
                type="button"
                onClick={onConfirm}
              >
                Confirmar paso 1
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
