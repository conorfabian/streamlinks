import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-gray-900">
            StreamLinks
          </Link>
          <div className="hidden md:block">
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                FAQ
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 mb-6 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-8">Have questions, suggestions, or feedback? We'd love to hear from you!</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-blue-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-800">Report a Site</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 text-sm">
                  Let us know if you find a broken link or a site that's no longer working.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-800">Suggest a Feature</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm">
                  Have an idea to improve StreamLinks? We're always looking for ways to enhance our directory.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-purple-800">General Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 text-sm">For any other questions or comments about our service.</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <Input id="name" placeholder="Your name" required />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="report">Report a Broken Site</SelectItem>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="question">Question</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name (if reporting a broken site)
                  </label>
                  <Input id="site-name" placeholder="e.g., AnimeHub, MovieStream" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry..."
                    className="h-32"
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Send Message</Button>
            </CardFooter>
          </Card>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-4">
              Before contacting us, you might find the answer to your question in our FAQ section.
            </p>
            <Button asChild variant="outline">
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">StreamLinks</h3>
              <p className="text-sm">A curated directory of free streaming sites for entertainment content.</p>
            </div>
            <div>
              <h4 className="text-white text-md font-medium mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/category/anime" className="hover:text-white">
                    Anime
                  </Link>
                </li>
                <li>
                  <Link href="/category/movies-tv" className="hover:text-white">
                    Movies & TV
                  </Link>
                </li>
                <li>
                  <Link href="/category/sports" className="hover:text-white">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link href="/category/live-tv" className="hover:text-white">
                    Live TV
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-md font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-white">
                    Submit a Site
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-md font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-white">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} StreamLinks. All rights reserved.</p>
            <p className="mt-2">This site does not host any content. We only provide links to other websites.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
