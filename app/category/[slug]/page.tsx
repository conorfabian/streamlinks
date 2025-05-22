import { ArrowLeft, ExternalLink, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSitesByCategory } from "@/lib/site-data"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const category = getCategoryInfo(slug)
  const sites = getSitesByCategory(slug)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-white">
            StreamLinks
          </Link>
          <div className="relative w-full max-w-md mx-4">
            <form action="/search" method="GET">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="search"
                name="q"
                placeholder="Search for streaming sites..."
                className="pl-10 bg-gray-800 border-0 focus-visible:ring-gray-700 text-gray-200 placeholder:text-gray-500"
              />
            </form>
          </div>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
            Submit Link
          </Button>
        </div>
      </header>

      {/* Category Header */}
      <div className={`py-12 ${category.bgColor}`}>
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-gray-400 mb-6 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to categories
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{category.title}</h1>
              <p className="text-gray-400 text-lg">
                {sites.length} free streaming sites for {category.title.toLowerCase()}
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Select defaultValue="rating">
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="newest">Sort by Newest</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="working">Working Only</SelectItem>
                  <SelectItem value="down">Down</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Sites List */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site, index) => (
            <Link key={index} href={site.url} target="_blank" rel="noopener noreferrer">
              <Card
                className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-md hover:border-gray-600 transition-all h-full flex flex-col"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-white">{site.name}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(site.status)}`}>
                      {site.status}
                    </span>
                  </div>
                  <CardDescription className="text-gray-400">{site.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {site.features.map((feature, i) => (
                      <span key={i} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{site.rating}/5</span>
                    </div>
                    <div>Updated: {site.lastUpdated}</div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <div className="text-sm text-gray-400">
                    {site.adLevel === "Low" ? (
                      <span className="text-green-400">Low Ads</span>
                    ) : site.adLevel === "Medium" ? (
                      <span className="text-yellow-400">Medium Ads</span>
                    ) : (
                      <span className="text-red-400">High Ads</span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
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
                  <Link href="/category/live-tv" className="hover:text-white">
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

// Helper functions
function getCategoryInfo(slug: string) {
  const categories = {
    anime: {
      title: "Anime",
      bgColor: "bg-gray-900 border-b border-gray-800",
      textColor: "text-red-400",
    },
    "movies-shows": {
      title: "Movies & Shows",
      bgColor: "bg-gray-900 border-b border-gray-800",
      textColor: "text-blue-400",
    },
    "live-tv": {
      title: "Sports",
      bgColor: "bg-gray-900 border-b border-gray-800",
      textColor: "text-green-400",
    },
    sports: {
      title: "Sports",
      bgColor: "bg-gray-900 border-b border-gray-800",
      textColor: "text-green-400",
    },
    books: {
      title: "Books",
      bgColor: "bg-gray-900 border-b border-gray-800",
      textColor: "text-purple-400",
    },
  }

  return (
    categories[slug as keyof typeof categories] || {
      title: "Category",
      bgColor: "bg-gray-900 border-b border-gray-800",
      textColor: "text-gray-400",
    }
  )
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "working":
      return "bg-green-900/50 text-green-400"
    case "issues":
      return "bg-yellow-900/50 text-yellow-400"
    case "down":
      return "bg-red-900/50 text-red-400"
    default:
      return "bg-gray-700 text-gray-300"
  }
}
