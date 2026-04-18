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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCV } from "@/lib/cv-context"
import { Plus } from "lucide-react"

export default function CreateNewPage() {
  const router = useRouter()
  const { setCVData, setCurrentStep } = useCV()

  const handleCreateNewCV = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    // Create new CV with user input
    const newCVData = {
      personalInfo: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        location: formData.get("location") as string,
        summary: formData.get("summary") as string,
        socialLinks: {
          linkedin: "",
          behance: "",
          portfolio: "",
        },
      },
      experience: [],
      education: [],
      skills: [],
      languages: [],
      designTools: [],
      developmentTools: [],
      projects: [],
      interests: [],
    }

    setCVData(newCVData)
    setCurrentStep(3)
    router.push("/dashboard/edit")
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Create New CV
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Start from scratch and create your CV manually
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter your basic details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateNewCV} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+41 79 123 4567"
                  required
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Zurich, Switzerland"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <textarea
                id="summary"
                name="summary"
                title="Professional Summary"
                placeholder="Brief overview of your professional background and objectives..."
                className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                rows={4}
              />
            </div>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                ℹ️ After entering your basic information, you'll be able to add
                work experience, education, skills, and languages in the next step.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Create CV & Add Details
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
