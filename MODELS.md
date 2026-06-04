# Project Context For AI/Codex

This file is meant to help another AI assistant, Codex session, or future maintainer understand the current project quickly.

## Project Summary

The app is a Vite + React + TypeScript + Tailwind CSS web project for creating a Physio Health treatment log sheet.

The desired final output is a printable page similar to the reference PDF:

```txt
/Users/fernandomedellin/Downloads/bitacoraa.pdf
```

The current work is intentionally focused on layout and app flow. PDF generation has not started yet.

## Product Goal

The user wants a web interface where a clinic user can:

1. Select how many treatment sessions will be included.
2. Fill each session one by one.
3. Enter or choose the session date.
4. Enter or choose treatments/exercises for that session.
5. Move to the next session.
6. Preview the final sheet.
7. Print it, and later possibly export it as a PDF.

## Current State

Completed:

- Base Vite React TypeScript project exists.
- Tailwind CSS 4 is configured through `@tailwindcss/vite`.
- The Vite starter UI was replaced with a treatment log preview.
- The preview is separated into small components.
- A session count control exists.
- Session count input is text-based, accepts digits only, and clamps from `0` to `10`.
- Session layout is dynamic.

Not completed:

- Session wizard/editor.
- Real session data entry.
- Dropdown treatment selection.
- Print polish.
- PDF export.
- Real logo.

## Visual Layout Requirements

The treatment log preview should resemble the PDF reference:

- White letter-style sheet centered on a neutral page background.
- Logo area centered near the top.
- For now, the logo is only a black bordered placeholder.
- Title text: `BITACORA DE TRATAMIENTO:`
- Session blocks in two columns.
- Signature area near the lower center.
- Footer with three horizontal color lines:
  - gray
  - cyan/blue
  - dark blue
- Contact information below the lines.

The UI controls should stay outside the printable sheet and should be hidden when printing.

## Session Layout Rule

The current layout rule is in:

```txt
src/utils/sessionLayout.ts
```

Rules:

- If there are exactly `10` sessions, preserve the original PDF distribution:
  - left column: sessions `1, 2, 3, 4, 5`
  - right column: sessions `6, 7, 8, 9, 10`
- If there are fewer than `10` sessions, distribute by odd/even:
  - left column: odd session numbers
  - right column: even session numbers

Example:

```txt
5 sessions -> left: 1, 3, 5 | right: 2, 4
10 sessions -> left: 1, 2, 3, 4, 5 | right: 6, 7, 8, 9, 10
```

This rule may change after the client confirms the preferred layout.

## Current Data Model

The current TypeScript type is:

```ts
export type Session = {
  number: number;
  date: string;
  treatments: string[];
};
```

Current location:

```txt
src/types/session.ts
```

Temporary example data is stored in:

```txt
src/data/exampleSessions.ts
```

The next phase should likely keep this same shape but make `sessions` editable from React state.

## Important Files

```txt
src/App.tsx
src/components/SessionBlock.tsx
src/components/SessionColumn.tsx
src/components/SessionCountControl.tsx
src/components/SessionGrid.tsx
src/components/SignatureBlock.tsx
src/components/TreatmentLogFooter.tsx
src/components/TreatmentLogPreview.tsx
src/data/exampleSessions.ts
src/types/session.ts
src/utils/createSessions.ts
src/utils/sessionLayout.ts
```

## Suggested Next Step

Build the first version of the session wizard.

Suggested flow:

1. Keep `SessionCountControl`.
2. Store sessions in `App` state instead of deriving them only from example data.
3. Create a `SessionEditor` component.
4. Add current session index state.
5. In `SessionEditor`, show:
   - session number
   - date input
   - treatment/exercise fields
   - `Anterior` and `Siguiente` buttons
6. Update the preview live as each session changes.

Start simple:

- Use text inputs or basic selects first.
- Add a fixed treatment list later.
- Do not start PDF export until the app flow is approved.

## User Preferences And Decisions

- Do not rush into implementation without confirming the approach.
- The user prefers step-by-step work.
- The PDF generation should wait until the layout and capture flow are clear.
- The current logo should remain a placeholder for now.
- Footer contact information should remain visible.
- The app should eventually be printable.

## Verification

After code changes, run:

```bash
npm run build
```

Known harmless warning:

```txt
[DEP0205] DeprecationWarning: `module.register()` is deprecated.
```

The build has passed with this warning.
