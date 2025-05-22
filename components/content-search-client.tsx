"use client"

import { useState, useEffect } from "react"
import { ContentSearchResults } from "@/components/content-search-results"
import { searchContent, searchContentFallback, type ContentSearchResult } from "@/lib/content-search"

interface ContentSearchClientProps {
  query: string
}

export function ContentSearchClient({ query }: ContentSearchClientProps) {
  const [results, setResults] = useState<ContentSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const performSearch = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Try TMDB search first, fallback to simple search if no API key
        const contentResults = await searchContent(query)
        
        if (contentResults.length === 0) {
          // If no results from TMDB, try fallback search
          const fallbackResults = searchContentFallback(query)
          setResults(fallbackResults)
        } else {
          setResults(contentResults)
        }
      } catch (err) {
        console.error('Content search error:', err)
        setError('Failed to search content. Please try again.')
        
        // Use fallback search on error
        try {
          const fallbackResults = searchContentFallback(query)
          setResults(fallbackResults)
          setError(null)
        } catch (fallbackErr) {
          console.error('Fallback search error:', fallbackErr)
          setResults([])
        }
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [query])

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <ContentSearchResults 
      results={results} 
      loading={loading} 
      query={query}
    />
  )
} 