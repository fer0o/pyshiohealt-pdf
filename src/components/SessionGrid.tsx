import type { Session } from "../types/session";
import { splitSessionsIntoColumns } from "../utils/sessionLayout";
import { SessionColumn } from "./SessionColumn";

type SessionGridProps = {
  sessions: Session[];
};

export function SessionGrid({ sessions }: SessionGridProps) {
  const { leftColumn, rightColumn } = splitSessionsIntoColumns(sessions);

  return (
    <section className="mt-7 grid grid-cols-2 gap-x-[74px]">
      <SessionColumn side="left" sessions={leftColumn} />
      <SessionColumn side="right" sessions={rightColumn} />
    </section>
  );
}
