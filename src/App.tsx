import { useState } from "react";
import "./App.css";
import { PreviewPage } from "./pages/PreviewPage";
import { WizardPage } from "./pages/WizardPage";
import { clampSessionCount, createSessions } from "./utils/createSessions";
import type { Session } from "./types/session";

type AppView = "wizard" | "preview";

function App() {
  const [view, setView] = useState<AppView>("wizard");
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [isSessionCountConfirmed, setIsSessionCountConfirmed] = useState(false);
  const [sessions, setSessions] = useState<Session[]>(() => createSessions(1));

  const updateSessionCount = (count: number) => {
    const nextCount = clampSessionCount(count);

    setSessions((currentSessions) => createSessions(nextCount, currentSessions));
    setCurrentSessionIndex((currentIndex) =>
      Math.min(currentIndex, nextCount - 1),
    );
  };

  const updateSession = (updatedSession: Session) => {
    setSessions((currentSessions) =>
      currentSessions.map((session) =>
        session.number === updatedSession.number ? updatedSession : session,
      ),
    );
  };

  if (view === "preview") {
    return (
      <PreviewPage
        sessions={sessions}
        onEditClick={() => {
          setView("wizard");
        }}
      />
    );
  }

  return (
    <WizardPage
      currentSessionIndex={currentSessionIndex}
      isSessionCountConfirmed={isSessionCountConfirmed}
      onCurrentSessionChange={updateSession}
      onNextSession={() => {
        setCurrentSessionIndex((currentIndex) =>
          Math.min(currentIndex + 1, sessions.length - 1),
        );
      }}
      onPreviewClick={() => {
        if (isSessionCountConfirmed) {
          setView("preview");
        }
      }}
      onPreviousSession={() => {
        setCurrentSessionIndex((currentIndex) => Math.max(currentIndex - 1, 0));
      }}
      onSessionCountConfirm={() => {
        setIsSessionCountConfirmed(true);
      }}
      onSessionCountChange={(count) => {
        updateSessionCount(count);
      }}
      sessionCount={sessions.length}
      sessions={sessions}
    />
  );
}

export default App;
