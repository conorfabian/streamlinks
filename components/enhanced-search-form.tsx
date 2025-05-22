"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Film, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EnhancedSearchFormProps {
  initialQuery?: string
  initialType?: string
}

export function EnhancedSearchForm({ initialQuery = "", initialType = "sites" }: EnhancedSearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [searchType, setSearchType] = useState(initialType)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    const params = new URLSearchParams()
    params.set('q', query.trim())
    params.set('type', searchType)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="relative w-full max-w-2xl mx-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Search Type Selector */}
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-40 bg-transparent border-0 border-r border-gray-700 rounded-none focus:ring-0">
              <div className="flex items-center gap-2">
                {searchType === "content" ? (
                  <Film className="h-4 w-4" />
                ) : (
                  <Tv className="h-4 w-4" />
                )}
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="sites" className="text-gray-200 focus:bg-gray-700">
                <div className="flex items-center gap-2">
                  <Tv className="h-4 w-4" />
                  <span>Sites</span>
                </div>
              </SelectItem>
              <SelectItem value="content" className="text-gray-200 focus:bg-gray-700">
                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4" />
                  <span>Shows/Movies</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                searchType === "content" 
                  ? "Search for movies, shows, anime..." 
                  : "Search for streaming sites..."
              }
              className="pl-10 bg-transparent border-0 focus-visible:ring-0 text-gray-200 placeholder:text-gray-500"
            />
          </div>
          
          {/* Search Button */}
          <Button 
            type="submit" 
            size="sm" 
            className="m-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!query.trim()}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>
      
      {/* Search Type Description */}
      <p className="text-gray-500 text-sm mt-2 text-center">
        {searchType === "content" 
          ? "Find specific movies, shows, and anime with direct links to streaming sites"
          : "Search through our curated collection of streaming sites"
        }
      </p>
    </div>
  )
} 