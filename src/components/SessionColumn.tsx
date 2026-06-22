import type { Session } from "../types/session";
import { SessionBlock } from "./SessionBlock";

type SessionColumnProps = {
  isFullSheetLayout?: boolean;
  side: "left" | "right";
  sessions: Session[];
};

export function SessionColumn({
  isFullSheetLayout = false,
  side,
  sessions,
}: SessionColumnProps) {
  return (
    <div
      className={
        isFullSheetLayout
          ? "flex h-full flex-col justify-between"
          : "space-y-[50px]"
      }
      data-session-column={side}
    >
      {sessions.map((session) => (
        <SessionBlock key={session.number} session={session} />
      ))}
    </div>
  );
}
