"use client"

import React, { createContext, useContext, useState } from "react"
import { CVData, DEMO_CV_DATA } from "@/lib/demo-data"

interface CVContextType {
  cvData: CVData
  setCVData: (data: CVData) => void
  updatePersonalInfo: (key: keyof CVData["personalInfo"], value: any) => void
  selectedTemplate: "male" | "female"
  setSelectedTemplate: (template: "male" | "female") => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

const CVContext = createContext<CVContextType | undefined>(undefined)

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(DEMO_CV_DATA)
  const [selectedTemplate, setSelectedTemplate] = useState<"male" | "female">(
    "male"
  )
  const [currentStep, setCurrentStep] = useState(1)

  const updatePersonalInfo = (
    key: keyof CVData["personalInfo"],
    value: any
  ) => {
    setCVData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: value,
      },
    }))
  }

  return (
    <CVContext.Provider
      value={{
        cvData,
        setCVData,
        updatePersonalInfo,
        selectedTemplate,
        setSelectedTemplate,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  const context = useContext(CVContext)
  if (!context) {
    throw new Error("useCV must be used within CVProvider")
  }
  return context
}
