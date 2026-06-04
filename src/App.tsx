import { useMemo, useState } from "react";
import "./App.css";
import { SessionCountControl } from "./components/SessionCountControl";
import { TreatmentLogPreview } from "./components/TreatmentLogPreview";
import { clampSessionCount, createSessions } from "./utils/createSessions";

function App() {
  const [sessionCount, setSessionCount] = useState(10);
  const sessions = useMemo(() => createSessions(sessionCount), [sessionCount]);

  return (
    <main className="min-h-screen bg-neutral-200 px-4 py-8 text-[#555555]">
      <SessionCountControl
        sessionCount={sessionCount}
        onSessionCountChange={(count) => {
          setSessionCount(clampSessionCount(count));
        }}
      />
      <TreatmentLogPreview sessions={sessions} />
    </main>
  );
}

export default App;
