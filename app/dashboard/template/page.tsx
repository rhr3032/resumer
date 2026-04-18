"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCV } from "@/lib/cv-context"
import { Check } from "lucide-react"

export default function TemplatePage() {
  const router = useRouter()
  const { selectedTemplate, setSelectedTemplate, setCurrentStep } = useCV()

  const templates = [
    {
      id: "male",
      name: "Male Template",
      description: "Professional Swiss-format CV template optimized for male presentation",
      color: "bg-blue-50 dark:bg-blue-950",
      accent: "border-blue-300 dark:border-blue-700",
    },
    {
      id: "female" as const,
      name: "Female Template",
      description: "Professional Swiss-format CV template optimized for female presentation",
      color: "bg-purple-50 dark:bg-purple-950",
      accent: "border-purple-300 dark:border-purple-700",
    },
  ]

  const handleContinue = () => {
    setCurrentStep(5)
    router.push("/dashboard/preview")
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Step 4: Select Template
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Choose your preferred CV format template
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative cursor-pointer rounded-lg border-2 transition-all ${
              selectedTemplate === template.id
                ? `border-slate-900 ${template.accent} bg-white dark:border-slate-50 dark:bg-slate-900`
                : "border-slate-200 dark:border-slate-700"
            }`}
            onClick={() => setSelectedTemplate(template.id as "male" | "female")}
          >
            {selectedTemplate === template.id && (
              <div className="absolute right-4 top-4">
                <div className="rounded-full bg-slate-900 p-2 dark:bg-slate-50">
                  <Check className="h-5 w-5 text-white dark:text-slate-900" />
                </div>
              </div>
            )}

            <Card className="cursor-pointer border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className={`mb-4 rounded-lg p-8 ${template.color}`}>
                  <div className="flex flex-col gap-3">
                    <div className="h-8 w-24 rounded bg-slate-300 dark:bg-slate-600" />
                    <div className="h-4 w-full rounded bg-slate-300 dark:bg-slate-600" />
                    <div className="h-4 w-5/6 rounded bg-slate-300 dark:bg-slate-600" />
                    <div className="mt-2 space-y-2">
                      <div className="h-3 w-full rounded bg-slate-300 dark:bg-slate-600" />
                      <div className="h-3 w-4/5 rounded bg-slate-300 dark:bg-slate-600" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>✓ Professional formatting</p>
                  <p>✓ ATS-friendly layout</p>
                  <p>✓ Easy to customize</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Details</CardTitle>
          <CardDescription>
            Selected: {templates.find((t) => t.id === selectedTemplate)?.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This Swiss-format template is optimized for the Swiss job market
              and follows professional CV standards. It highlights your key
              achievements and skills in a clear, concise manner.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Format</p>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                Swiss Standard
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Language</p>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                English
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Pages</p>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                1-2 pages
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">File Type</p>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                PDF
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button className="flex-1" onClick={handleContinue}>
          Continue to Preview & Download
        </Button>
      </div>
    </div>
  )
}
