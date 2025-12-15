import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description: string;
}

export function StepIndicator({
  steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
}) {
  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="grid grid-cols-4 gap-4">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-colors ${
                step.id < currentStep
                  ? 'bg-blue-600 text-white'
                  : step.id === currentStep
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : 'bg-white border-2 border-gray-300 text-gray-500'
              }`}
            >
              {step.id < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                step.id
              )}
            </div>
            <div className="text-center">
              <div
                className={`text-sm font-medium ${
                  step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.name}
              </div>
              <div className="text-xs text-gray-500 hidden sm:block">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
