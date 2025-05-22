import { useState, useEffect, useCallback } from 'react'

interface Suggestion {
  type: 'site' | 'content'
  id: string
  title: string
  subtitle: string
  category?: string
  rating?: number
  url?: string
  icon: string
  year?: number
  contentType?: string
}

interface UseAutocompleteProps {
  searchType: string
  debounceMs?: number
  maxSuggestions?: number
}

export function useAutocomplete({ 
  searchType, 
  debounceMs = 300, 
  maxSuggestions = 8 
}: UseAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        q: query,
        type: searchType,
        limit: maxSuggestions.toString()
      })

      const response = await fetch(`/api/search/suggestions?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }

      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (err) {
      console.error('Autocomplete error:', err)
      setError('Failed to load suggestions')
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [searchType, maxSuggestions])

  // Debounced search
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchQuery, debounceMs])

  useEffect(() => {
    fetchSuggestions(debouncedQuery)
  }, [debouncedQuery, fetchSuggestions])

  return {
    suggestions,
    loading,
    error,
    setSearchQuery,
    clearSuggestions: () => setSuggestions([])
  }
} 