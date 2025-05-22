import { getAllSites, generateDirectSearchUrl, type StreamingSite } from './site-data'

// Content types
export type ContentType = 'movie' | 'tv' | 'anime' | 'manga'

// Content item from external API
export interface ContentItem {
  id: string
  title: string
  originalTitle?: string
  year?: number
  type: ContentType
  poster?: string
  overview?: string
  genres?: string[]
  rating?: number
  popularity?: number
}

// Streaming site with direct link
export interface StreamingSiteWithDirectLink {
  site: StreamingSite & { category: string }
  directSearchUrl: string
  confidence: 'high' | 'medium' | 'low'
}

// Content search result
export interface ContentSearchResult {
  content: ContentItem
  availableOn: StreamingSiteWithDirectLink[]
}

// TMDB API configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

// Get TMDB API key from environment variables
function getTMDBApiKey(): string | null {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY
  if (!apiKey) {
    console.warn('TMDB API key not found. Using fallback search only.')
    return null
  }
  return apiKey
}

// Search TMDB for movies and TV shows
async function searchTMDB(query: string): Promise<ContentItem[]> {
  try {
    const apiKey = getTMDBApiKey()
    if (!apiKey) {
      console.log('No TMDB API key available, skipping TMDB search')
      return []
    }
    
    const encodedQuery = encodeURIComponent(query)
    
    // Search both movies and TV shows
    const [moviesResponse, tvResponse] = await Promise.all([
      fetch(`${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&query=${encodedQuery}&page=1`),
      fetch(`${TMDB_BASE_URL}/search/tv?api_key=${apiKey}&query=${encodedQuery}&page=1`)
    ])

    if (!moviesResponse.ok || !tvResponse.ok) {
      throw new Error('Failed to fetch from TMDB')
    }

    const [moviesData, tvData] = await Promise.all([
      moviesResponse.json(),
      tvResponse.json()
    ])

    const movies: ContentItem[] = moviesData.results?.slice(0, 5).map((movie: any) => ({
      id: movie.id.toString(),
      title: movie.title,
      originalTitle: movie.original_title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
      type: 'movie' as ContentType,
      poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : undefined,
      overview: movie.overview,
      genres: movie.genre_ids?.map((id: number) => getGenreName(id, 'movie')) || [],
      rating: movie.vote_average,
      popularity: movie.popularity
    })) || []

    const tvShows: ContentItem[] = tvData.results?.slice(0, 5).map((show: any) => ({
      id: show.id.toString(),
      title: show.name,
      originalTitle: show.original_name,
      year: show.first_air_date ? new Date(show.first_air_date).getFullYear() : undefined,
      type: isAnime(show) ? 'anime' : 'tv' as ContentType,
      poster: show.poster_path ? `${TMDB_IMAGE_BASE_URL}${show.poster_path}` : undefined,
      overview: show.overview,
      genres: show.genre_ids?.map((id: number) => getGenreName(id, 'tv')) || [],
      rating: show.vote_average,
      popularity: show.popularity
    })) || []

    return [...movies, ...tvShows].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
  } catch (error) {
    console.error('Error searching TMDB:', error)
    return []
  }
}

// Check if a TV show is likely anime
function isAnime(show: any): boolean {
  const animeGenres = [16] // Animation genre ID
  const animeCountries = ['JP', 'KR'] // Japan, Korea
  const animeKeywords = ['anime', 'manga', 'japanese', 'korean']
  
  const hasAnimeGenre = show.genre_ids?.some((id: number) => animeGenres.includes(id))
  const hasAnimeCountry = show.origin_country?.some((country: string) => animeCountries.includes(country))
  const hasAnimeKeywords = animeKeywords.some(keyword => 
    show.name?.toLowerCase().includes(keyword) || 
    show.original_name?.toLowerCase().includes(keyword) ||
    show.overview?.toLowerCase().includes(keyword)
  )
  
  return hasAnimeGenre && (hasAnimeCountry || hasAnimeKeywords)
}

// Simple genre mapping (you can expand this)
function getGenreName(genreId: number, type: 'movie' | 'tv'): string {
  const movieGenres: { [key: number]: string } = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
  }

  const tvGenres: { [key: number]: string } = {
    10759: 'Action & Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 10762: 'Kids',
    9648: 'Mystery', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy',
    10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics', 37: 'Western'
  }

  const genres = type === 'movie' ? movieGenres : tvGenres
  return genres[genreId] || 'Unknown'
}

// Find relevant streaming sites for content
function findRelevantSites(content: ContentItem): (StreamingSite & { category: string })[] {
  const allSites = getAllSites()
  
  return allSites.filter(site => {
    // Only include sites that have search functionality
    if (!site.hasSearch) return false
    
    // Filter based on content type and site category
    switch (content.type) {
      case 'anime':
        return site.category === 'Anime'
      case 'movie':
      case 'tv':
        return site.category === 'Movies & Shows'
      case 'manga':
        return site.category === 'Books'
      default:
        return false
    }
  })
}

// Calculate confidence score for content-site matching
function calculateConfidence(site: StreamingSite & { category: string }, content: ContentItem): 'high' | 'medium' | 'low' {
  let score = 0
  
  // High rating sites get bonus points
  if (site.rating >= 4.8) score += 3
  else if (site.rating >= 4.5) score += 2
  else if (site.rating >= 4.0) score += 1
  
  // Low ad level gets bonus points
  if (site.adLevel === 'Low') score += 2
  else if (site.adLevel === 'Medium') score += 1
  
  // Recent updates get bonus points
  const daysSinceUpdate = getDaysSinceUpdate(site.lastUpdated)
  if (daysSinceUpdate <= 3) score += 2
  else if (daysSinceUpdate <= 7) score += 1
  
  // Large library features get bonus points
  const libraryFeatures = ['Huge Library', 'Large Library', 'Vast Library', 'Wide Selection', 'Vast Collection']
  if (site.features.some(feature => libraryFeatures.includes(feature))) score += 2
  
  // Determine confidence level
  if (score >= 6) return 'high'
  if (score >= 3) return 'medium'
  return 'low'
}

// Helper function to calculate days since last update
function getDaysSinceUpdate(lastUpdated: string): number {
  const updatePatterns = [
    { pattern: /(\d+)\s*days?\s*ago/i, multiplier: 1 },
    { pattern: /(\d+)\s*weeks?\s*ago/i, multiplier: 7 },
    { pattern: /yesterday/i, days: 1 },
    { pattern: /today/i, days: 0 }
  ]
  
  for (const { pattern, multiplier, days } of updatePatterns) {
    const match = lastUpdated.match(pattern)
    if (match) {
      return days !== undefined ? days : parseInt(match[1]) * (multiplier || 1)
    }
  }
  
  return 30 // Default to 30 days if pattern not recognized
}

// Main content search function
export async function searchContent(query: string): Promise<ContentSearchResult[]> {
  if (!query.trim()) return []
  
  try {
    // Search external APIs for content
    const contentResults = await searchTMDB(query)
    
    // For each content item, find relevant streaming sites
    const results: ContentSearchResult[] = contentResults.map(content => {
      const relevantSites = findRelevantSites(content)
      const sitesWithLinks: StreamingSiteWithDirectLink[] = relevantSites.map(site => ({
        site,
        directSearchUrl: generateDirectSearchUrl(site, content.title),
        confidence: calculateConfidence(site, content)
      }))
      
      // Sort sites by confidence and rating
      sitesWithLinks.sort((a, b) => {
        const confidenceOrder = { high: 3, medium: 2, low: 1 }
        const confidenceDiff = confidenceOrder[b.confidence] - confidenceOrder[a.confidence]
        if (confidenceDiff !== 0) return confidenceDiff
        return b.site.rating - a.site.rating
      })
      
      return {
        content,
        availableOn: sitesWithLinks
      }
    })
    
    return results.filter(result => result.availableOn.length > 0)
  } catch (error) {
    console.error('Error in content search:', error)
    return []
  }
}

// Fallback search for when TMDB is not available
export function searchContentFallback(query: string): ContentSearchResult[] {
  if (!query.trim()) return []
  
  // Try to determine content type from query
  const lowerQuery = query.toLowerCase()
  let contentType: ContentType = 'movie' // Default
  
  // Check for anime keywords
  if (lowerQuery.includes('anime') || lowerQuery.includes('manga') || 
      lowerQuery.includes('naruto') || lowerQuery.includes('dragon ball') ||
      lowerQuery.includes('one piece') || lowerQuery.includes('attack on titan')) {
    contentType = 'anime'
  }
  // Check for TV show keywords
  else if (lowerQuery.includes('series') || lowerQuery.includes('show') ||
           lowerQuery.includes('season') || lowerQuery.includes('episode')) {
    contentType = 'tv'
  }
  
  // Create a mock content item based on user query
  const mockContent: ContentItem = {
    id: 'fallback-' + Date.now(),
    title: query,
    type: contentType,
    overview: `Search for "${query}" across streaming sites`,
    year: new Date().getFullYear() // Use current year as fallback
  }
  
  // Find all sites with search capability
  const allSites = getAllSites().filter(site => site.hasSearch)
  
  const sitesWithLinks: StreamingSiteWithDirectLink[] = allSites.map(site => ({
    site,
    directSearchUrl: generateDirectSearchUrl(site, query),
    confidence: calculateConfidence(site, mockContent)
  }))
  
  // Sort by confidence and rating
  sitesWithLinks.sort((a, b) => {
    const confidenceOrder = { high: 3, medium: 2, low: 1 }
    const confidenceDiff = confidenceOrder[b.confidence] - confidenceOrder[a.confidence]
    if (confidenceDiff !== 0) return confidenceDiff
    return b.site.rating - a.site.rating
  })
  
  return [{
    content: mockContent,
    availableOn: sitesWithLinks
  }]
} 