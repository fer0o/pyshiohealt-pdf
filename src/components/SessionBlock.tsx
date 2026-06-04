import type { Session } from "../types/session";

type SessionBlockProps = {
  session: Session;
};

export function SessionBlock({ session }: SessionBlockProps) {
  return (
    <section className="min-h-[98px] text-left" data-session-number={session.number}>
      <h2 className="text-[14px] font-bold leading-tight text-[#555555]">
        Sesión N° {session.number} ({session.date})
      </h2>
      <ul className="mt-5 space-y-0 text-[14px] leading-[1.18] text-[#595959]">
        {session.treatments.map((treatment) => (
          <li key={treatment} className="grid grid-cols-[24px_1fr]">
            <span>-</span>
            <span>{treatment}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
