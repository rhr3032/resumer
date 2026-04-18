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
import { CheckCircle, AlertCircle } from "lucide-react"

export default function ExtractPage() {
  const router = useRouter()
  const { cvData, setCurrentStep } = useCV()

  const handleContinue = () => {
    setCurrentStep(3)
    router.push("/dashboard/edit")
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Step 2: Data Extraction Review
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Review the extracted data from your CV
        </p>
      </div>

      {/* Extraction Status */}
      <Card>
        <CardHeader>
          <CardTitle>Extraction Status</CardTitle>
          <CardDescription>
            Data successfully extracted from your CV
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-medium text-green-900 dark:text-green-100">
                Extraction completed successfully
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extracted Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Extracted from your CV</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                First Name
              </p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-slate-50">
                {cvData.personalInfo.firstName}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last Name
              </p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-slate-50">
                {cvData.personalInfo.lastName}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-slate-50">
                {cvData.personalInfo.email}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-slate-50">
                {cvData.personalInfo.phone}
              </p>
            </div>
            <div className="col-span-2 rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Location
              </p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-slate-50">
                {cvData.personalInfo.location}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extracted Experience Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>
            {cvData.experience.length} positions extracted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cvData.experience.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                      {exp.position}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {exp.startDate} to {exp.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Extracted Education Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>
            {cvData.education.length} qualifications extracted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cvData.education.map((edu) => (
              <div
                key={edu.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                  {edu.degree}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {edu.institution} • {edu.field}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {edu.year}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills & Languages Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Skills ({cvData.skills.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Languages
            </p>
            <div className="flex flex-wrap gap-2">
              {cvData.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="rounded bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note about editing */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                Ready to continue?
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                On the next step, you'll be able to edit and refine all the
                extracted information before generating your CV.
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
          Continue to Edit Information
        </Button>
      </div>
    </div>
  )
}
