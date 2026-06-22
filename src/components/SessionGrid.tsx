import type { Session } from "../types/session";
import { splitSessionsIntoColumns } from "../utils/sessionLayout";
import { SessionColumn } from "./SessionColumn";

type SessionGridProps = {
  sessions: Session[];
};

export function SessionGrid({ sessions }: SessionGridProps) {
  const { leftColumn, rightColumn } = splitSessionsIntoColumns(sessions);
  const isFullSheetLayout = sessions.length === 10;

  return (
    <section
      className={`mt-7 grid grid-cols-2 gap-x-[74px] ${
        isFullSheetLayout ? "h-[560px]" : ""
      }`}
    >
      <SessionColumn
        isFullSheetLayout={isFullSheetLayout}
        side="left"
        sessions={leftColumn}
      />
      <SessionColumn
        isFullSheetLayout={isFullSheetLayout}
        side="right"
        sessions={rightColumn}
      />
    </section>
  );
}
