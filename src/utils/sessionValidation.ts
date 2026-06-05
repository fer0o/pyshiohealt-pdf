import type { Session } from "../types/session";

export function hasSessionDate(session: Session) {
  return session.date.trim() !== "";
}

export function hasAtLeastOneTreatment(session: Session) {
  return session.treatments.some((treatment) => treatment.trim() !== "");
}

export function isSessionComplete(session: Session) {
  return hasSessionDate(session) && hasAtLeastOneTreatment(session);
}

export function areAllSessionsComplete(sessions: Session[]) {
  return sessions.length > 0 && sessions.every(isSessionComplete);
}

export function getSessionValidationMessage(session: Session) {
  const missingDate = !hasSessionDate(session);
  const missingTreatment = !hasAtLeastOneTreatment(session);

  if (missingDate && missingTreatment) {
    return "Agrega la fecha y al menos un tratamiento para continuar.";
  }

  if (missingDate) {
    return "Agrega la fecha de esta sesión para continuar.";
  }

  if (missingTreatment) {
    return "Agrega al menos un tratamiento para continuar.";
  }

  return "";
}
