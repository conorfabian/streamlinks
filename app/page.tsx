import { Search } from "lucide-react"
import Link from "next/link"
import CategoryCard from "@/components/category-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPopularSites } from "@/lib/site-data"

export default function Home() {
  const popularSites = getPopularSites(6)

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
          <a href="submit">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">Submit Link</Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 py-16 md:py-24 border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Free Streaming Sites</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            A curated collection of links to free streaming platforms for movies, shows, anime, books, and sports.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#categories">
              <Button className="bg-gray-100 hover:bg-white text-gray-900">Browse Categories</Button>
            </a>
            <a href="#popular">
              <Button className="bg-gray-100 hover:bg-white text-gray-900">Most Popular</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Movies & Shows"
              count={20}
              icon="film"
              color="bg-gray-800"
              textColor="text-blue-400"
              href="/category/movies-shows"
            />
            <CategoryCard
              title="Sports"
              count={9}
              icon="tv"
              color="bg-gray-800"
              textColor="text-green-400"
              href="/category/live-tv"
            />
            <CategoryCard
              title="Anime"
              count={12}
              icon="tv"
              color="bg-gray-800"
              textColor="text-red-400"
              href="/category/anime"
            />
            <CategoryCard
              title="Books"
              count={12}
              icon="book-open"
              color="bg-gray-800"
              textColor="text-purple-400"
              href="/category/books"
            />
          </div>
        </div>
      </section>

      {/* Popular Links Section */}
      <section id="popular" className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">Popular Streaming Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularSites.map((site, index) => (
              <Link key={index} href={site.url} target="_blank" rel="noopener noreferrer">
                <div
                  className="bg-gray-800 rounded-xl shadow-md border border-gray-700 overflow-hidden transition-all hover:shadow-lg hover:border-gray-600 h-full flex flex-col"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium text-white">{site.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(site.category)}`}>
                        {site.category}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm">{site.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <span>⭐ {site.rating}/5</span>
                        <span>•</span>
                        <span>{site.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#categories">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">View All Sites</Button>
            </a>
          </div>
        </div>
      </section>

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
                    Live TV
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

// Helper function for category colors
function getCategoryColor(category: string) {
  switch (category.toLowerCase()) {
    case "anime":
      return "bg-red-900/50 text-red-400"
    case "movies & shows":
      return "bg-blue-900/50 text-blue-400"
    case "live tv":
      return "bg-green-900/50 text-green-400"
    case "books":
      return "bg-purple-900/50 text-purple-400"
    default:
      return "bg-gray-700 text-gray-300"
  }
}
