"use client"

import { useCV } from "@/lib/cv-context"
import { CheckCircle } from "lucide-react"

export function ProgressBar() {
  const { currentStep } = useCV()

  const steps = [
    {
      id: 1,
      title: "Edit Information",
    },
    {
      id: 2,
      title: "Preview & Download",
    },
  ]

  return (
    <div className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-white">
      <div className="mx-auto px-8 py-2">
        <div className="flex items-center justify-center gap-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-6">
              {/* Step Circle */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all font-semibold text-xs ${
                    step.id < currentStep
                      ? "border-green-600 bg-green-600 text-white"
                      : step.id === currentStep
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-400 dark:border-slate-300 dark:bg-white"
                  }`}
                >
                  {step.id < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-xs">{step.id}</span>
                  )}
                </div>
                <div className="text-center whitespace-nowrap">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">
                    {step.title}
                  </p>
                  <p
                    className={`text-xs leading-tight ${
                      step.id < currentStep
                        ? "text-green-600"
                        : step.id === currentStep
                        ? "text-blue-600"
                        : "text-slate-500"
                    }`}
                  >
                    {step.id < currentStep
                      ? "Completed"
                      : step.id === currentStep
                      ? "In Progress"
                      : "Pending"}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 ${
                    step.id < currentStep
                      ? "bg-green-600"
                      : "bg-slate-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
