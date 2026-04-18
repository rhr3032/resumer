"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCV } from "@/lib/cv-context"
import { CheckCircle, Clock, FilePlus } from "lucide-react"

export default function Dashboard() {
  const { currentStep, setCurrentStep, cvData } = useCV()

  const steps = [
    { id: 1, title: "Create CV", description: "Create or enter your CV data" },
    { id: 2, title: "Preview CV", description: "Review your CV" },
    { id: 3, title: "Download PDF", description: "Generate and download PDF" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          CV Generator Dashboard
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Follow the workflow below to generate your Swiss-format CV
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FilePlus className="h-5 w-5" />
              Create New CV
            </CardTitle>
            <CardDescription>
              Start from scratch and create a new CV manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Perfect if you're creating your first CV or want complete control
              over the content.
            </p>
            <Link href="/dashboard/create">
              <Button className="w-full" variant="default">
                Start Creating
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Progress</CardTitle>
          <CardDescription>Step {currentStep} of 3</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-4 rounded-lg p-4 ${
                  step.id <= currentStep
                    ? "bg-slate-100 dark:bg-slate-800"
                    : "bg-slate-50 dark:bg-slate-900"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold dark:bg-slate-800">
                  {step.id < currentStep ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : step.id === currentStep ? (
                    <Clock className="h-6 w-6 text-blue-600" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900 dark:text-slate-50">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current CV Information</CardTitle>
          <CardDescription>
            Name: {cvData.personalInfo.firstName}{" "}
            {cvData.personalInfo.lastName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Email
              </p>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                {cvData.personalInfo.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Phone
              </p>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                {cvData.personalInfo.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Location
              </p>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                {cvData.personalInfo.location}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Experience
              </p>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                {cvData.experience.length} positions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link href="/dashboard/create" className="flex-1">
          <Button className="w-full">Get Started</Button>
        </Link>
      </div>
    </div>
  )
}
