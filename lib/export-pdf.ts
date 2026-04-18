import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface ExportPDFOptions {
  filename?: string
  scale?: number
  quality?: "low" | "medium" | "high"
  orientation?: "portrait" | "landscape"
}

/**
 * Create a plain HTML copy without any CSS that could cause parsing errors
 */
function createPlainHTMLCopy(element: HTMLElement): HTMLElement {
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = element.innerHTML
  tempDiv.style.cssText =
    "color: black; background: white; margin: 0; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;"

  // Strip all problematic styles from all descendants
  const stripElement = (el: HTMLElement) => {
    // Remove classes
    el.className = ""
    // Reset inline styles
    el.style.cssText = ""

    // Add basic readable styles
    if (el.tagName === "H1" || el.tagName === "H2" || el.tagName === "H3") {
      el.style.cssText = "margin-top: 10px; margin-bottom: 10px; font-weight: bold;"
    } else if (el.tagName === "P") {
      el.style.cssText = "margin: 5px 0; color: black;"
    } else if (el.tagName === "DIV") {
      el.style.cssText = "margin: 0; color: black;"
    } else {
      el.style.cssText = "color: black; background: transparent;"
    }
  }

  stripElement(tempDiv)
  tempDiv.querySelectorAll("*").forEach((el) => stripElement(el as HTMLElement))

  return tempDiv
}

export async function exportElementToPDF(
  element: HTMLElement,
  options: ExportPDFOptions = {}
): Promise<void> {
  const { filename = "document.pdf", orientation = "portrait" } = options

  try {
    if (!element) {
      throw new Error("Element is null or undefined")
    }

    console.log("Starting PDF export...", { filename })

    // Create a plain HTML copy
    console.log("Creating plain HTML copy...")
    const plainCopy = createPlainHTMLCopy(element)
    plainCopy.style.position = "absolute"
    plainCopy.style.left = "-10000px"
    plainCopy.style.top = "-10000px"
    plainCopy.style.zIndex = "-1"
    document.body.appendChild(plainCopy)

    // Temporarily disable all stylesheets to prevent lab() colors
    console.log("Disabling stylesheets...")
    const stylesheets: HTMLLinkElement[] = []
    document.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
      const htmlLink = link as HTMLLinkElement
      stylesheets.push(htmlLink)
      htmlLink.disabled = true
    })

    // Also disable inline style tags that might have problematic colors
    const styleTags: HTMLStyleElement[] = []
    document.querySelectorAll("style").forEach((style) => {
      styleTags.push(style as HTMLStyleElement)
      style.disabled = true
    })

    try {
      // Small delay to let DOM render
      await new Promise((resolve) => setTimeout(resolve, 150))

      console.log("Rendering to canvas...")

      const canvas = await html2canvas(plainCopy, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        timeout: 60000,
        imageTimeout: 30000,
        windowHeight: plainCopy.scrollHeight,
        windowWidth: plainCopy.scrollWidth,
        removeContainer: true,
      } as any)

      console.log("Canvas created, converting to PDF...")

      const imgData = canvas.toDataURL("image/png", 0.9)

      // Create PDF
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: "a4",
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pageWidth - 20 // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let position = 10 // 10mm top margin
      let remainingHeight = imgHeight
      let pageNum = 1

      // Add first page
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight)

      // Add additional pages if needed
      while (remainingHeight > pageHeight - 20) {
        pdf.addPage()
        remainingHeight -= pageHeight
        position = 10 - remainingHeight
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight)
        pageNum++
      }

      console.log(`PDF created (${pageNum} pages), downloading...`)
      pdf.save(filename)
    } finally {
      // Re-enable all stylesheets
      console.log("Re-enabling stylesheets...")
      stylesheets.forEach((link) => {
        link.disabled = false
      })
      styleTags.forEach((style) => {
        style.disabled = false
      })

      // Remove the temporary copy
      if (plainCopy.parentNode) {
        document.body.removeChild(plainCopy)
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("PDF export failed:", errorMessage, error)
    throw new Error(`Failed to generate PDF: ${errorMessage}`)
  }
}

/**
 * Export CV data to PDF
 */
export async function exportCVToPDF(
  element: HTMLElement,
  firstName: string,
  lastName: string,
  options: ExportPDFOptions = {}
): Promise<void> {
  const filename = `${firstName}_${lastName}_CV.pdf`
  await exportElementToPDF(element, {
    ...options,
    filename,
  })
}

/**
 * Export to PDF with error handling and user feedback
 */
export async function exportToPDFWithFeedback(
  element: HTMLElement,
  filename: string,
  onSuccess?: () => void,
  onError?: (error: string) => void
): Promise<void> {
  try {
    await exportElementToPDF(element, { filename })
    onSuccess?.()
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"
    console.error("PDF export error:", errorMessage)
    onError?.(errorMessage)
  }
}
