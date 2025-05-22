import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-white">
            StreamLinks
          </Link>
          <div className="hidden md:block">
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white">
                About
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-white">
                FAQ
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Submit Form */}
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-gray-400 mb-6 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Submit a Streaming Site</h1>
          <p className="text-gray-400 mb-8">
            Help us grow our directory by submitting a streaming site that isn't already listed.
          </p>

          <Card className="bg-gray-800 border-gray-700 text-gray-200">
            <CardHeader>
              <CardTitle className="text-white">Site Information</CardTitle>
              <CardDescription className="text-gray-400">
                Please provide accurate information about the streaming site you want to submit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="site-name" className="block text-sm font-medium text-gray-300 mb-1">
                        Site Name *
                      </label>
                      <Input
                        id="site-name"
                        placeholder="e.g., AnimeHub, MovieStream"
                        required
                        className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500 focus-visible:ring-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="site-url" className="block text-sm font-medium text-gray-300 mb-1">
                        Site URL *
                      </label>
                      <Input
                        id="site-url"
                        type="url"
                        placeholder="https://example.com"
                        required
                        className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500 focus-visible:ring-gray-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Include the full URL with http:// or https://</p>
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                        Category *
                      </label>
                      <Select>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <SelectItem value="anime">Anime</SelectItem>
                          <SelectItem value="movies-shows">Movies & Shows</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="ad-level" className="block text-sm font-medium text-gray-300 mb-1">
                        Ad Level
                      </label>
                      <Select>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                          <SelectValue placeholder="Select ad level" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <SelectItem value="low">Low (Few or no ads)</SelectItem>
                          <SelectItem value="medium">Medium (Moderate ads)</SelectItem>
                          <SelectItem value="high">High (Many ads)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                        Description *
                      </label>
                      <Textarea
                        id="description"
                        placeholder="Briefly describe what this site offers..."
                        className="h-24 bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500 focus-visible:ring-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Features (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hd"
                            className="border-gray-600 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900"
                          />
                          <label htmlFor="hd" className="text-sm text-gray-300">
                            HD Quality
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="subtitles"
                            className="border-gray-600 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900"
                          />
                          <label htmlFor="subtitles" className="text-sm text-gray-300">
                            Subtitles
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="no-registration"
                            className="border-gray-600 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900"
                          />
                          <label htmlFor="no-registration" className="text-sm text-gray-300">
                            No Registration
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="multiple-servers"
                            className="border-gray-600 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900"
                          />
                          <label htmlFor="multiple-servers" className="text-sm text-gray-300">
                            Multiple Servers
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="fast-loading"
                            className="border-gray-600 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900"
                          />
                          <label htmlFor="fast-loading" className="text-sm text-gray-300">
                            Fast Loading
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mobile-friendly"
                            className="border-gray-600 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900"
                          />
                          <label htmlFor="mobile-friendly" className="text-sm text-gray-300">
                            Mobile Friendly
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="additional-info" className="block text-sm font-medium text-gray-300 mb-1">
                        Additional Information
                      </label>
                      <Textarea
                        id="additional-info"
                        placeholder="Any other details you'd like to share..."
                        className="h-24 bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500 focus-visible:ring-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Email (Optional)
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500 focus-visible:ring-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll only use this to contact you if we need more information.
                  </p>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    className="mt-1 border-gray-600 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900"
                    required
                  />
                  <div>
                    <label htmlFor="terms" className="text-sm text-gray-300">
                      I confirm this site is working and the information provided is accurate *
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      We manually review all submissions before adding them to our directory.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                Cancel
              </Button>
              <Button className="bg-gray-100 hover:bg-white text-gray-900">Submit Site</Button>
            </CardFooter>
          </Card>

          <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-400 mb-2">Submission Guidelines</h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>Make sure the site is currently working</li>
              <li>Check that the site isn't already in our directory</li>
              <li>Provide accurate information about the site's content and features</li>
              <li>We don't accept sites with excessive pop-ups or malicious ads</li>
              <li>Submissions are reviewed manually and may take 1-3 days to appear</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 mt-12 border-t border-gray-800">
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
                  <Link href="/category/movies-shows" className="hover:text-white">
                    Movies & Shows
                  </Link>
                </li>
                <li>
                  <Link href="/category/sports" className="hover:text-white">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link href="/category/anime" className="hover:text-white">
                    Anime
                  </Link>
                </li>
                <li>
                  <Link href="/category/books" className="hover:text-white">
                    Books
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
