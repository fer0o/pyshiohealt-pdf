import { Fragment } from "react";

type Step = {
  label: string;
  number: number;
};

type WizardStepperProps = {
  currentStep: number;
};

const steps: Step[] = [
  { number: 1, label: "Sesiones" },
  { number: 2, label: "Captura" },
  { number: 3, label: "Vista previa" },
];

export function WizardStepper({ currentStep }: WizardStepperProps) {
  return (
    <nav
      aria-label="Progreso de la bitácora"
      className="mb-6 rounded-lg border border-neutral-300 bg-white px-5 py-4 shadow-sm print:hidden"
    >
      <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {steps.map((step, index) => (
          <Fragment key={step.number}>
            <li className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                  step.number < currentStep
                    ? "border-[#263b70] bg-[#263b70] text-white"
                    : step.number === currentStep
                      ? "border-[#09a9d6] bg-[#e8f8fc] text-[#263b70]"
                      : "border-neutral-300 bg-white text-neutral-400"
                }`}
              >
                {step.number}
              </span>
              <span>
                <span
                  className={`block text-xs font-bold uppercase tracking-normal ${
                    step.number <= currentStep
                      ? "text-[#263b70]"
                      : "text-neutral-400"
                  }`}
                >
                  Paso {step.number}
                </span>
                <span
                  className={`block text-sm font-semibold ${
                    step.number <= currentStep
                      ? "text-neutral-900"
                      : "text-neutral-400"
                  }`}
                >
                  {step.label}
                </span>
              </span>
            </li>

            {index < steps.length - 1 ? (
              <li
                aria-hidden="true"
                className={`hidden h-px w-12 md:block ${
                  step.number < currentStep ? "bg-[#263b70]" : "bg-neutral-300"
                }`}
              />
            ) : null}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
