"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Film, Tv, Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAutocomplete } from "@/hooks/use-autocomplete"
import { cn } from "@/lib/utils"

interface AutocompleteSearchProps {
  initialQuery?: string
  initialType?: string
  className?: string
}

export function AutocompleteSearch({ 
  initialQuery = "", 
  initialType = "sites",
  className 
}: AutocompleteSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const [searchType, setSearchType] = useState(initialType)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const { suggestions, loading, setSearchQuery, clearSuggestions } = useAutocomplete({
    searchType,
    debounceMs: 300,
    maxSuggestions: 8
  })

  // Update autocomplete query when user types
  useEffect(() => {
    setSearchQuery(query)
  }, [query, setSearchQuery])

  // Show suggestions when we have them and input is focused
  useEffect(() => {
    setShowSuggestions(suggestions.length > 0 && query.length >= 2)
  }, [suggestions, query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setShowSuggestions(false)
    clearSuggestions()
    
    const params = new URLSearchParams()
    params.set('q', query.trim())
    params.set('type', searchType)
    router.push(`/search?${params.toString()}`)
  }

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'site' && suggestion.url) {
      // For sites, open directly
      window.open(suggestion.url, '_blank')
    } else {
      // For content, go to search results
      const params = new URLSearchParams()
      params.set('q', suggestion.title)
      params.set('type', 'content')
      router.push(`/search?${params.toString()}`)
    }
    
    setShowSuggestions(false)
    setQuery(suggestion.title)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSubmit(e)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0 && query.length >= 2) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 150)
  }

  return (
    <div className={cn("relative w-full max-w-2xl mx-4", className)}>
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
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              placeholder={
                searchType === "content" 
                  ? "Search for movies, shows, anime..." 
                  : "Search for streaming sites..."
              }
              className="pl-10 bg-transparent border-0 focus-visible:ring-0 text-gray-200 placeholder:text-gray-500"
              autoComplete="off"
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

      {/* Autocomplete Suggestions */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {loading && (
            <div className="px-4 py-3 text-gray-400 text-sm">
              Searching...
            </div>
          )}
          
          {!loading && suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.id}`}
              className={cn(
                "px-4 py-3 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0",
                selectedIndex === index 
                  ? "bg-gray-700" 
                  : "hover:bg-gray-700"
              )}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {suggestion.icon === 'film' ? (
                    <Film className="h-4 w-4 text-blue-400" />
                  ) : suggestion.icon === 'tv' ? (
                    <Tv className="h-4 w-4 text-green-400" />
                  ) : (
                    <Search className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="text-white font-medium truncate">
                    {suggestion.title}
                  </div>
                  <div className="text-gray-400 text-sm truncate">
                    {suggestion.subtitle}
                  </div>
                </div>
                
                <div className="flex-shrink-0 flex items-center gap-2">
                  {suggestion.rating && (
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{suggestion.rating}</span>
                    </div>
                  )}
                  
                  {suggestion.type === 'site' && (
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  )}
                  
                  {suggestion.category && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                      {suggestion.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {!loading && suggestions.length === 0 && query.length >= 2 && (
            <div className="px-4 py-3 text-gray-400 text-sm text-center">
              No suggestions found for "{query}"
            </div>
          )}
        </div>
      )}
      
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