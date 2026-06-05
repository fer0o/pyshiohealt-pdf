import { useState } from "react";
import "./App.css";
import { PreviewPage } from "./pages/PreviewPage";
import { WizardPage } from "./pages/WizardPage";
import { clampSessionCount, createSessions } from "./utils/createSessions";
import { areAllSessionsComplete } from "./utils/sessionValidation";
import type { Session } from "./types/session";

type AppView = "wizard" | "preview";
type AppNotice = {
  message: string;
  tone: "success" | "info";
};

function App() {
  const [view, setView] = useState<AppView>("wizard");
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [isSessionCountConfirmed, setIsSessionCountConfirmed] = useState(false);
  const [notice, setNotice] = useState<AppNotice | null>(null);
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

  const canPreview = isSessionCountConfirmed && areAllSessionsComplete(sessions);

  if (view === "preview") {
    return (
      <PreviewPage
        onDownloadComplete={() => {
          setNotice({
            message: "La bitácora se descargó correctamente.",
            tone: "success",
          });
          setView("wizard");
        }}
        sessions={sessions}
        onEditClick={() => {
          setView("wizard");
        }}
        onPrintComplete={() => {
          setNotice({
            message: "Se cerró el diálogo de impresión de la bitácora.",
            tone: "info",
          });
          setView("wizard");
        }}
      />
    );
  }

  return (
    <WizardPage
      currentSessionIndex={currentSessionIndex}
      isSessionCountConfirmed={isSessionCountConfirmed}
      notice={notice}
      onCurrentSessionChange={updateSession}
      onDismissNotice={() => {
        setNotice(null);
      }}
      onNextSession={() => {
        setCurrentSessionIndex((currentIndex) =>
          Math.min(currentIndex + 1, sessions.length - 1),
        );
      }}
      onPreviewClick={() => {
        if (canPreview) {
          setNotice(null);
          setView("preview");
        }
      }}
      onPreviousSession={() => {
        setCurrentSessionIndex((currentIndex) => Math.max(currentIndex - 1, 0));
      }}
      onSelectSession={(index) => {
        setCurrentSessionIndex(index);
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
