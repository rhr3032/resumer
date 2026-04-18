"use client"

import { useRef, useEffect } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCV } from "@/lib/cv-context"
import { Download, Printer } from "lucide-react"

function CVPreview({ data }: { data: any }) {
  return (
    <div className="space-y-6 bg-white p-8 text-black">
      {/* Header */}
      <div className="border-b-2 border-slate-300 pb-4">
        <h1 className="text-4xl font-bold">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{data.personalInfo.location}</p>
        <p className="text-xs text-slate-600">
          {data.personalInfo.email} | {data.personalInfo.phone}
        </p>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="mb-2 text-xl font-bold">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-bold">Work Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{exp.position}</h3>
                  <span className="text-xs text-slate-600">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{exp.company}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-bold">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu: any) => (
              <div key={edu.id}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="text-xs text-slate-600">{edu.year}</span>
                </div>
                <p className="text-sm text-slate-600">{edu.institution}</p>
                <p className="text-sm text-slate-600">{edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="rounded bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-bold">Languages</h2>
          <p className="text-sm text-slate-700">{data.languages.join(", ")}</p>
        </div>
      )}
    </div>
  )
}

export default function PreviewPage() {
  const { cvData, setCurrentStep } = useCV()
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentStep(2)
  }, [setCurrentStep])

  const generatePDF = async () => {
    if (!previewRef.current) return

    try {
      // Create canvas from the div
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      // Create PDF
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Calculate dimensions to fit A4
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      // Add pages if content is longer than one page
      while (heightLeft >= 0) {
        if (position !== 0) {
          pdf.addPage()
        }
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= 297 // A4 height in mm
        position -= 297
      }

      // Save the PDF
      pdf.save(
        `${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_CV.pdf`
      )
      setCurrentStep(6)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Step 5: Preview CV
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Review your CV and download as PDF
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button onClick={generatePDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* PDF Preview */}
      <Card>
        <CardHeader>
          <CardTitle>CV Preview</CardTitle>
          <CardDescription>
            This is how your CV will appear in the PDF
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            ref={previewRef}
            className="rounded-lg bg-white shadow-lg min-h-275"
          >
            <CVPreview data={cvData} />
          </div>
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card>
        <CardHeader>
          <CardTitle>Download Options</CardTitle>
          <CardDescription>
            Choose how you want to save your CV
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onClick={generatePDF}
            variant="default"
          >
            <Download className="mr-2 h-4 w-4" />
            Download as PDF
          </Button>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              ✓ Your CV has been successfully generated in Swiss format
            </p>
            <p className="text-xs mt-1 text-blue-800 dark:text-blue-200">
              The PDF is ready to download and share with employers
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
      </div>
    </div>
  )
}
