import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
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
              <Link href="/faq" className="text-gray-400 hover:text-white font-medium">
                FAQ
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-gray-400 mb-6 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-400 mb-8">
            Find answers to common questions about StreamLinks and our directory of streaming sites.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                What is StreamLinks?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                StreamLinks is a curated directory of free streaming sites for various types of content including
                movies, shows, anime, manga, and sports. We organize these sites by category and provide information
                about their features, ad levels, and current status.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                Does StreamLinks host any content?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                No, StreamLinks does not host any content. We are simply a directory that provides links to third-party
                websites. We have no control over the content of these sites and take no responsibility for the content
                they provide.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                Are these streaming sites legal?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                The legality of streaming sites varies by country and jurisdiction. Some sites in our directory are
                fully legal and licensed, while others may operate in sites in our directory are fully legal and
                licensed, while others may operate in legal gray areas. We recommend users familiarize themselves with
                the laws in their region and use their own discretion when accessing these sites.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                How do you determine if a site is "working"?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Our team regularly checks each site in our directory to verify it's operational. We mark a site as
                "working" if it loads properly and streams content as expected. Sites with minor issues but still
                functional are marked as "issues," while those that are completely down are marked accordingly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                How can I submit a streaming site to your directory?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                You can submit a streaming site through our{" "}
                <Link href="/submit" className="text-blue-400 underline">
                  submission form
                </Link>
                . We'll review your submission and, if it meets our criteria, add it to our directory. Please ensure the
                site is currently working and provide accurate information about its features.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                What do the ad level indicators mean?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Low:</strong> Few or no ads, minimal interruption to viewing experience
                  </li>
                  <li>
                    <strong>Medium:</strong> Moderate amount of ads, some pop-ups or overlays
                  </li>
                  <li>
                    <strong>High:</strong> Heavy ad presence, multiple pop-ups, overlays, or redirects
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                Is it safe to use these streaming sites?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                While we try to include sites that are relatively safe, we cannot guarantee the safety of any
                third-party website. We recommend using an ad blocker and having updated antivirus software when
                visiting streaming sites. Be cautious about downloading any files or clicking on suspicious ads.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                How often do you update the directory?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                We update our directory regularly, checking site statuses at least weekly. We also add new submissions
                and remove sites that have been consistently down for extended periods. The "last updated" information
                on each site listing shows when it was last verified.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                Do I need a VPN to use these streaming sites?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                While not strictly necessary, using a VPN can provide additional privacy and security when streaming
                online. Some sites may also be geo-restricted, and a VPN can help access content that's not available in
                your region. We don't specifically endorse or recommend any VPN services.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border-gray-800">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-white hover:no-underline">
                How can I report a broken link or site?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                If you find a site in our directory that's no longer working, please let us know through our{" "}
                <Link href="/contact" className="text-blue-400 underline">
                  contact form
                </Link>
                . Include the name of the site and any relevant details about the issue you're experiencing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-3">Still have questions?</h2>
            <p className="text-gray-300 mb-4">
              If you couldn't find the answer to your question in our FAQ, feel free to reach out to us directly.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gray-100 hover:bg-white text-gray-900 font-medium py-2 px-4 rounded-md transition-colors"
            >
              Contact Us
            </Link>
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
