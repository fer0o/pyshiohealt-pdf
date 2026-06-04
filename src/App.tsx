import "./App.css";

type Session = {
  number: number;
  date: string;
  treatments: string[];
};

const sessions: Session[] = [
  {
    number: 1,
    date: "12/03/2026",
    treatments: [
      "Terapia manual ortopédica",
      "Movilidad articular",
      "Fortalecimiento muscular",
      "Tecarterapia",
    ],
  },
  {
    number: 2,
    date: "14/03/2026",
    treatments: [
      "Terapia miofascial",
      "Movilidad articular",
      "Fortalecimiento muscular",
    ],
  },
  {
    number: 3,
    date: "17/03/2026",
    treatments: [
      "Terapia manual ortopédica",
      "Movilidad articular",
      "Fortalecimiento muscular",
    ],
  },
  {
    number: 4,
    date: "18/03/2026",
    treatments: [
      "Terapia miofascial",
      "Movilidad articular",
      "Fortalecimiento muscular",
    ],
  },
  {
    number: 5,
    date: "19/03/2026",
    treatments: [
      "Terapia manual ortopédica",
      "Movilidad articular",
      "Fortalecimiento muscular",
    ],
  },
  {
    number: 6,
    date: "20/03/2026",
    treatments: [
      "Terapia manual ortopédica",
      "Movilidad articular",
      "Fortalecimiento muscular",
    ],
  },
  {
    number: 7,
    date: "23/03/2026",
    treatments: [
      "Terapia manual ortopédica",
      "Movilidad articular",
      "Fortalecimiento muscular",
    ],
  },
  {
    number: 8,
    date: "25/03/2026",
    treatments: [
      "Terapia manual ortopédica",
      "Movilidad articular",
      "Fortalecimiento muscular",
      "Terapia Miofascial",
    ],
  },
  {
    number: 9,
    date: "27/03/2026",
    treatments: ["Movilidad articular", "Fortalecimiento muscular"],
  },
  {
    number: 10,
    date: "30/03/2026",
    treatments: ["Movilidad articular", "Fortalecimiento muscular"],
  },
];

const leftColumn = sessions.slice(0, 5);
const rightColumn = sessions.slice(5);

function App() {
  return (
    <main className="min-h-screen bg-neutral-200 px-4 py-8 text-[#555555]">
      <article className="mx-auto flex min-h-[1056px] w-full max-w-[816px] flex-col overflow-hidden bg-white shadow-xl print:min-h-screen print:max-w-none print:shadow-none">
        <section className="flex flex-1 flex-col px-[76px] pb-6 pt-[82px]">
          <div className="mx-auto flex h-[88px] w-[176px] items-center justify-center border-2 border-black text-sm font-semibold text-black">
            LOGO
          </div>

          <h1 className="mt-10 text-left text-[15px] font-bold uppercase tracking-normal text-[#565656]">
            BITACORA DE TRATAMIENTO:
          </h1>

          <section className="mt-7 grid grid-cols-2 gap-x-[74px]">
            <SessionColumn sessions={leftColumn} />
            <SessionColumn sessions={rightColumn} />
          </section>

          <section className="mt-auto flex flex-col items-center text-center">
            <div className="mb-2 h-[58px] w-[116px] border-b-2 border-black" />
            <p className="text-[14px] font-bold leading-tight text-[#555555]">
              Felipe Contreras Valenzuela
            </p>
            <p className="text-[14px] font-bold leading-tight text-[#555555]">
              Cédula Profesional 12415532
            </p>
          </section>
        </section>

        <footer className="pb-9 text-center text-[#243a68]">
          <div className="h-3 bg-[#b7b7b7]" />
          <div className="h-4 bg-[#09a9d6]" />
          <div className="h-4 bg-[#263b70]" />

          <div className="mt-7 px-12 text-[13px] leading-[1.35]">
            <p>
              Av. Circunvalación Agustín Yáñez #2575 Local 1B Col. Arcos
              Vallarta C.P. 44130
            </p>
            <p className="font-bold">
              33 2161 7374 / 33 1707 6292 contactophysiohealth@gmail.com
            </p>
            <p className="mt-1">www.physiohealth.com.mx</p>
          </div>
        </footer>
      </article>
    </main>
  );
}

function SessionColumn({ sessions }: { sessions: Session[] }) {
  return (
    <div className="space-y-[50px]">
      {sessions.map((session) => (
        <section key={session.number} className="min-h-[98px] text-left">
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
      ))}
    </div>
  );
}

export default App;
