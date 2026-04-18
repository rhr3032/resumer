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
    <div className="flex bg-white p-8 text-black" style={{ minHeight: "100vh" }}>
      {/* Left Sidebar */}
      <div className="w-64 border-r border-slate-300 pr-6 space-y-8">
        {/* Profile Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-bold">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-xs text-blue-600 font-semibold">
            {data.personalInfo.title || "Professional"}
          </p>
          <div className="text-xs space-y-1 text-slate-600">
            <p>� {data.personalInfo.email}</p>
            <p>� {data.personalInfo.phone}</p>
            <p>� {data.personalInfo.location}</p>
          </div>
          <div className="text-xs space-y-1 text-blue-600 pt-2">
            {data.personalInfo.socialLinks?.linkedin && (
              <p>🔗 LinkedIn: {data.personalInfo.socialLinks.linkedin}</p>
            )}
            {data.personalInfo.socialLinks?.behance && (
              <p>🎨 Behance: {data.personalInfo.socialLinks.behance}</p>
            )}
            {data.personalInfo.socialLinks?.portfolio && (
              <p>🌐 Portfolio: {data.personalInfo.socialLinks.portfolio}</p>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <h3 className="text-sm font-bold mb-3 text-slate-900 uppercase">Skills</h3>
            <div className="space-y-1">
              {data.skills.map((skill: string, idx: number) => (
                <p key={idx} className="text-xs text-slate-700">
                  • {skill}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h3 className="text-sm font-bold mb-3 text-slate-900 uppercase">Languages</h3>
            <div className="space-y-1">
              {data.languages.map((lang: string, idx: number) => (
                <p key={idx} className="text-xs text-slate-700">
                  • {lang}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Design Tools */}
        {data.designTools && data.designTools.length > 0 && (
          <div>
            <h3 className="text-sm font-bold mb-3 text-slate-900 uppercase">Design Tools</h3>
            <div className="space-y-1">
              {data.designTools.map((tool: string, idx: number) => (
                <p key={idx} className="text-xs text-slate-700">
                  • {tool}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Development Tools */}
        {data.developmentTools && data.developmentTools.length > 0 && (
          <div>
            <h3 className="text-sm font-bold mb-3 text-slate-900 uppercase">Dev Tools</h3>
            <div className="space-y-1">
              {data.developmentTools.map((tool: string, idx: number) => (
                <p key={idx} className="text-xs text-slate-700">
                  • {tool}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <div>
            <h3 className="text-sm font-bold mb-3 text-slate-900 uppercase">Interests</h3>
            <div className="space-y-1">
              {data.interests.map((interest: string, idx: number) => (
                <p key={idx} className="text-xs text-slate-700">
                  • {interest}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-6 space-y-8">
        {/* Professional Summary */}
        {data.personalInfo.summary && (
          <div>
            <h2 className="text-sm font-bold mb-3 text-slate-900 uppercase">Summary</h2>
            <p className="text-xs leading-relaxed text-slate-700">
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold mb-4 text-slate-900 uppercase">Work Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp: any) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-xs text-slate-600">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 font-semibold">{exp.company}</p>
                  <p className="text-xs leading-relaxed text-slate-700 mt-1">
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
            <h2 className="text-sm font-bold mb-4 text-slate-900 uppercase">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu: any) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                    <span className="text-xs text-slate-600">{edu.year}</span>
                  </div>
                  <p className="text-xs text-blue-600 font-semibold">{edu.institution}</p>
                  <p className="text-xs text-slate-600">{edu.field}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold mb-4 text-slate-900 uppercase">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((proj: any) => (
                <div key={proj.id}>
                  <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                  <p className="text-xs text-slate-700">{proj.description}</p>
                  {proj.tools && (
                    <p className="text-xs text-slate-600 mt-1">Tools: {proj.tools}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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
      setCurrentStep(2)
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
          Preview & Download
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Review your CV and download as PDF
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
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
    </div>
  )
}
