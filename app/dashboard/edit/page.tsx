"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
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
import { Plus, Trash2, X } from "lucide-react"

export default function EditPage() {
  const router = useRouter()
  const { cvData, setCVData, updatePersonalInfo, setCurrentStep } = useCV()
  const [activeTab, setActiveTab] = useState<string>("personal")

  useEffect(() => {
    setCurrentStep(1)
  }, [setCurrentStep])

  const handlePersonalInfoChange = (
    key: keyof typeof cvData.personalInfo,
    value: any
  ) => {
    updatePersonalInfo(key, value)
  }

  const handleSocialLinkChange = (
    key: keyof typeof cvData.personalInfo.socialLinks,
    value: string
  ) => {
    setCVData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        socialLinks: {
          ...(cvData.personalInfo.socialLinks || {}),
          [key]: value,
        },
      },
    })
  }

  const handleExperienceChange = (
    id: string,
    field: string,
    value: string
  ) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    })
  }

  const handleEducationChange = (
    id: string,
    field: string,
    value: string
  ) => {
    setCVData({
      ...cvData,
      education: cvData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    })
  }

  const handleProjectChange = (
    id: string,
    field: string,
    value: string
  ) => {
    setCVData({
      ...cvData,
      projects: cvData.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    })
  }

  const handleAddExperience = () => {
    setCVData({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const handleDeleteExperience = (id: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  const handleAddEducation = () => {
    setCVData({
      ...cvData,
      education: [
        ...cvData.education,
        {
          id: Date.now().toString(),
          institution: "",
          degree: "",
          field: "",
          year: "",
        },
      ],
    })
  }

  const handleDeleteEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  const handleAddProject = () => {
    setCVData({
      ...cvData,
      projects: [
        ...cvData.projects,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          tools: "",
          link: "",
        },
      ],
    })
  }

  const handleDeleteProject = (id: string) => {
    setCVData({
      ...cvData,
      projects: cvData.projects.filter((proj) => proj.id !== id),
    })
  }

  const handleAddSkill = (type: "skills" | "languages" | "designTools" | "developmentTools") => {
    setCVData({
      ...cvData,
      [type]: [...cvData[type], ""],
    })
  }

  const handleSkillChange = (
    type: "skills" | "languages" | "designTools" | "developmentTools",
    index: number,
    value: string
  ) => {
    const updated = [...cvData[type]]
    updated[index] = value
    setCVData({
      ...cvData,
      [type]: updated,
    })
  }

  const handleDeleteSkill = (
    type: "skills" | "languages" | "designTools" | "developmentTools",
    index: number
  ) => {
    setCVData({
      ...cvData,
      [type]: cvData[type].filter((_, i) => i !== index),
    })
  }

  const handleAddInterest = () => {
    setCVData({
      ...cvData,
      interests: [...cvData.interests, ""],
    })
  }

  const handleInterestChange = (index: number, value: string) => {
    const updated = [...cvData.interests]
    updated[index] = value
    setCVData({
      ...cvData,
      interests: updated,
    })
  }

  const handleDeleteInterest = (index: number) => {
    setCVData({
      ...cvData,
      interests: cvData.interests.filter((_, i) => i !== index),
    })
  }

  const handleContinue = () => {
    setCurrentStep(2)
    router.push("/dashboard/preview")
  }

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills & Tools" },
    { id: "projects", label: "Projects" },
    { id: "interests", label: "Interests" },
  ]

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Step 3: Edit & Validate Data
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Review and edit all your CV information
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-slate-900 text-slate-900 dark:border-slate-50 dark:text-slate-50"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Personal Information Tab */}
      {activeTab === "personal" && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Edit your basic contact details and summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={cvData.personalInfo.firstName}
                  onChange={(e) =>
                    handlePersonalInfoChange("firstName", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={cvData.personalInfo.lastName}
                  onChange={(e) =>
                    handlePersonalInfoChange("lastName", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={(e) =>
                    handlePersonalInfoChange("email", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={cvData.personalInfo.phone}
                  onChange={(e) =>
                    handlePersonalInfoChange("phone", e.target.value)
                  }
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={cvData.personalInfo.location}
                  onChange={(e) =>
                    handlePersonalInfoChange("location", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-50">
                Social Links
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="/in/yourprofile"
                    value={cvData.personalInfo.socialLinks?.linkedin || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("linkedin", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="behance">Behance Portfolio</Label>
                  <Input
                    id="behance"
                    placeholder="/yourprofile"
                    value={cvData.personalInfo.socialLinks?.behance || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("behance", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio Website</Label>
                  <Input
                    id="portfolio"
                    placeholder="yourportfolio.com or /yourprofile"
                    value={cvData.personalInfo.socialLinks?.portfolio || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("portfolio", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="border-t pt-6">
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <textarea
                  id="summary"
                  title="Professional Summary"
                  placeholder="Enter your professional summary..."
                  className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  rows={5}
                  value={cvData.personalInfo.summary}
                  onChange={(e) =>
                    handlePersonalInfoChange("summary", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experience Tab */}
      {activeTab === "experience" && (
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Edit your professional experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {cvData.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900 dark:text-slate-50">
                    Position {idx + 1}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteExperience(exp.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, "company", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, "position", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, "endDate", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea
                    title="Experience description"
                    placeholder="Describe your responsibilities and achievements..."
                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                    rows={3}
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddExperience} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Education Tab */}
      {activeTab === "education" && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Edit your educational background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {cvData.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="font-medium text-slate-900 dark:text-slate-50">
                    Education {idx + 1}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEducation(edu.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(
                          edu.id,
                          "institution",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(edu.id, "degree", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) =>
                        handleEducationChange(edu.id, "field", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) =>
                        handleEducationChange(edu.id, "year", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddEducation} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Skills & Tools Tab */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          {/* Professional Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Skills</CardTitle>
              <CardDescription>Add your key professional skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cvData.skills.map((skill, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={skill}
                    placeholder="e.g., Product Design, UX Research"
                    onChange={(e) =>
                      handleSkillChange("skills", idx, e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSkill("skills", idx)}
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => handleAddSkill("skills")}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </CardContent>
          </Card>

          {/* Design Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Design Tools & Software</CardTitle>
              <CardDescription>List your design tools proficiency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cvData.designTools.map((tool, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={tool}
                    placeholder="e.g., Figma, Adobe XD, Framer"
                    onChange={(e) =>
                      handleSkillChange("designTools", idx, e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSkill("designTools", idx)}
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => handleAddSkill("designTools")}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Design Tool
              </Button>
            </CardContent>
          </Card>

          {/* Development Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Development & Tech Skills</CardTitle>
              <CardDescription>List your development skills and technologies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cvData.developmentTools.map((tool, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={tool}
                    placeholder="e.g., HTML & CSS, JavaScript, React"
                    onChange={(e) =>
                      handleSkillChange("developmentTools", idx, e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSkill("developmentTools", idx)}
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => handleAddSkill("developmentTools")}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Dev Tool
              </Button>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
              <CardDescription>Add languages you speak</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cvData.languages.map((lang, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={lang}
                    placeholder="e.g., English, Bengali, Spanish"
                    onChange={(e) =>
                      handleSkillChange("languages", idx, e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSkill("languages", idx)}
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => handleAddSkill("languages")}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Language
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Add your notable projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {cvData.projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900 dark:text-slate-50">
                    Project {idx + 1}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProject(proj.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input
                    value={proj.title}
                    placeholder="e.g., E-commerce Mobile App"
                    onChange={(e) =>
                      handleProjectChange(proj.id, "title", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea
                    title="Project description"
                    placeholder="Describe your project and your role..."
                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                    rows={2}
                    value={proj.description}
                    onChange={(e) =>
                      handleProjectChange(proj.id, "description", e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tools & Technologies</Label>
                    <Input
                      value={proj.tools}
                      placeholder="e.g., Figma, React, Node.js"
                      onChange={(e) =>
                        handleProjectChange(proj.id, "tools", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Project Link (Optional)</Label>
                    <Input
                      value={proj.link || ""}
                      placeholder="https://... or Preview"
                      onChange={(e) =>
                        handleProjectChange(proj.id, "link", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddProject} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Interests Tab */}
      {activeTab === "interests" && (
        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
            <CardDescription>Add your interests and hobbies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cvData.interests.map((interest, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  value={interest}
                  placeholder="e.g., Designing, Gaming, Reading"
                  onChange={(e) => handleInterestChange(idx, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteInterest(idx)}
                >
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={handleAddInterest}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Interest
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 sticky bottom-0 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button className="flex-1" onClick={handleContinue}>
          Continue to Template Selection
        </Button>
      </div>
    </div>
  )
}
