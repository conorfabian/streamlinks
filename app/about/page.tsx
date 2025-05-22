import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
              <Link href="/about" className="text-gray-400 hover:text-white font-medium">
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

      {/* About Content */}
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-gray-400 mb-6 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">About StreamLinks</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6">
              StreamLinks is a curated directory of free streaming sites for various types of content including movies,
              shows, anime, manga, and sports. Our mission is to provide a clean, organized resource for finding quality
              streaming options across the web.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              The internet is filled with streaming sites, but finding reliable ones can be challenging. StreamLinks
              aims to solve this problem by:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Curating a collection of working streaming sites</li>
              <li>Organizing them by content category for easy discovery</li>
              <li>Providing information about each site's features and ad levels</li>
              <li>Regularly checking and updating site status</li>
              <li>Creating a clean, user-friendly interface to browse options</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How We Work</h2>
            <p className="text-gray-300 mb-6">
              Our team regularly reviews and tests each site in our directory to ensure they're operational and safe to
              use. We also rely on community submissions and feedback to keep our listings current and comprehensive.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Important Disclaimer</h2>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
              <p className="text-amber-400">
                StreamLinks does not host any content. We are simply a directory that provides links to third-party
                websites. We have no control over the content of these sites and take no responsibility for the content
                they provide. Users should use their own discretion and follow applicable laws when accessing these
                sites.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Support StreamLinks</h2>
            <p className="text-gray-300 mb-4">You can support StreamLinks in several ways:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Submit new streaming sites that aren't in our directory</li>
              <li>Report broken links or sites that are no longer working</li>
              <li>Share StreamLinks with others who might find it useful</li>
              <li>Provide feedback on how we can improve the service</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-6">
              Have questions, suggestions, or feedback? We'd love to hear from you! Visit our{" "}
              <Link href="/contact" className="text-blue-400 underline">
                Contact page
              </Link>{" "}
              to get in touch with our team.
            </p>

            <div className="flex justify-center mt-10">
              <Button asChild className="bg-gray-100 hover:bg-white text-gray-900">
                <Link href="/submit">Submit a Streaming Site</Link>
              </Button>
            </div>
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
                  <Link href="/category/manga" className="hover:text-white">
                    Manga
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
