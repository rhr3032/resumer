import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FilePlus, FileUp } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-20">
        {/* Header */}
        <header className="mb-20 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            CV Generator
          </h1>
          <p className="text-xl text-slate-300">
            Create your perfect Swiss-format CV in minutes
          </p>
        </header>

        {/* Hero Section */}
        <div className="rounded-lg bg-linear-to-r from-blue-600 to-purple-600 p-12 text-center text-white shadow-2xl mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Professional CVs Made Easy
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Create a new CV or upload an existing one and convert it to Swiss format instantly
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Get Started Now
            </Button>
          </Link>
        </div>

        {/* Two Path Options */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilePlus className="h-6 w-6 text-blue-600" />
                Create New CV
              </CardTitle>
              <CardDescription>Start from scratch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Build your CV from the ground up with our easy-to-use form.
                Perfect for creating your first professional CV.
              </p>
              <Link href="/dashboard/create" className="block">
                <Button className="w-full" variant="default">
                  Create New CV
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileUp className="h-6 w-6 text-purple-600" />
                Upload Existing CV
              </CardTitle>
              <CardDescription>Upload & convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Already have a CV? Upload your PDF or DOCX file and we&rsquo;ll
                convert it to Swiss format.
              </p>
              <Link href="/dashboard/upload" className="block">
                <Button className="w-full" variant="outline">
                  Upload File
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-4 rounded-full bg-blue-100 p-4 w-12">
              <div className="text-2xl">📝</div>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">Create or Upload</h3>
            <p className="text-slate-600">
              Choose to create from scratch or upload your existing CV
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-4 rounded-full bg-purple-100 p-4 w-12">
              <div className="text-2xl">✏️</div>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">Edit & Customize</h3>
            <p className="text-slate-600">
              Review and customize all your information with ease
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-4 rounded-full bg-green-100 p-4 w-12">
              <div className="text-2xl">📥</div>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">Download PDF</h3>
            <p className="text-slate-600">
              Generate and download your CV in Swiss-format PDF
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
