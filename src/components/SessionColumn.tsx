import type { Session } from "../types/session";
import { SessionBlock } from "./SessionBlock";

type SessionColumnProps = {
  side: "left" | "right";
  sessions: Session[];
};

export function SessionColumn({ side, sessions }: SessionColumnProps) {
  return (
    <div className="space-y-[50px]" data-session-column={side}>
      {sessions.map((session) => (
        <SessionBlock key={session.number} session={session} />
      ))}
    </div>
  );
}
