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
import { Upload, CheckCircle } from "lucide-react"

export default function UploadPage() {
  const router = useRouter()
  const { setCurrentStep } = useCV()

  const handleUpload = () => {
    // Simulate file extraction with demo data
    // In a real app, this would parse PDF/DOCX and extract data
    setCurrentStep(2)
    router.push("/dashboard/extract")
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Step 1: Upload CV
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Upload your CV file (PDF or DOCX) to extract data
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your CV</CardTitle>
          <CardDescription>
            Supported formats: PDF, DOCX
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-12 dark:border-slate-700 dark:bg-slate-900">
            <Upload className="mb-4 h-12 w-12 text-slate-400" />
            <p className="mb-2 text-center font-medium text-slate-900 dark:text-slate-50">
              Drag and drop your CV here
            </p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              or click to browse files
            </p>
            <input
              type="file"
              title="Upload CV file"
              placeholder="Select file"
              onClick={() => {}}
              accept=".pdf,.docx"
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Demo Note:
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This demo uses pre-loaded CV data. In production, uploaded files
              would be parsed and data extracted using AI.
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg bg-green-50 p-4 dark:bg-green-950">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-medium text-green-900 dark:text-green-100">
                Demo data loaded
              </p>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200">
              Sample CV data is ready for preview. Continue to edit and customize it.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button className="flex-1" onClick={handleUpload}>
          Continue to Data Review
        </Button>
      </div>
    </div>
  )
}
