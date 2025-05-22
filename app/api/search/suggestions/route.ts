import { NextRequest, NextResponse } from 'next/server'
import { getAllSites, searchSites } from '@/lib/site-data'
import { searchContentFallback, searchContent } from '@/lib/content-search'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const type = searchParams.get('type') || 'all'
  const limit = parseInt(searchParams.get('limit') || '8')

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  const suggestions: any[] = []

  try {
    // Search sites
    if (type === 'all' || type === 'sites') {
      const siteResults = searchSites(query)
        .slice(0, limit)
        .map(site => ({
          type: 'site',
          id: site.name,
          title: site.name,
          subtitle: site.description,
          category: site.category,
          rating: site.rating,
          url: site.url,
          icon: 'tv'
        }))
      suggestions.push(...siteResults)
    }

    // Search content (shows/movies)
    if (type === 'all' || type === 'content') {
      let contentResults: any[] = []
      
      try {
        // Try TMDB first if API key is available
        const tmdbApiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY
        if (tmdbApiKey) {
          console.log('Using TMDB API for content search')
          const tmdbResults = await searchContent(query)
          contentResults = tmdbResults.slice(0, limit)
        } else {
          console.log('No TMDB API key found, using fallback')
        }
      } catch (tmdbError) {
        console.log('TMDB search failed, using fallback:', tmdbError)
      }
      
      // If TMDB failed or no results, use fallback
      if (contentResults.length === 0) {
        console.log('Using fallback content search')
        contentResults = searchContentFallback(query).slice(0, limit)
      }
      
      const formattedResults = contentResults.map(result => {
        const content = result.content
        const type = content.type || 'movie'
        const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
        const year = content.year
        
        return {
          type: 'content',
          id: content.title || 'unknown',
          title: content.title || 'Untitled',
          subtitle: `${typeLabel}${year ? ` • ${year}` : ''}`,
          year: year,
          contentType: type,
          icon: type === 'movie' ? 'film' : 'tv'
        }
      })
      
      suggestions.push(...formattedResults)
    }

    // Sort by relevance (exact matches first, then partial matches)
    const lowerQuery = query.toLowerCase()
    suggestions.sort((a, b) => {
      const aExact = a.title.toLowerCase().startsWith(lowerQuery) ? 1 : 0
      const bExact = b.title.toLowerCase().startsWith(lowerQuery) ? 1 : 0
      return bExact - aExact
    })

    return NextResponse.json({ 
      suggestions: suggestions.slice(0, limit),
      query,
      debug: {
        hasApiKey: !!(process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY),
        environment: process.env.NODE_ENV,
        totalSuggestions: suggestions.length
      }
    })
  } catch (error) {
    console.error('Search suggestions error:', error)
    
    // Return at least site results if content search fails
    try {
      const siteResults = searchSites(query)
        .slice(0, limit)
        .map(site => ({
          type: 'site',
          id: site.name,
          title: site.name,
          subtitle: site.description,
          category: site.category,
          rating: site.rating,
          url: site.url,
          icon: 'tv'
        }))
      
      return NextResponse.json({ 
        suggestions: siteResults,
        query,
        error: 'Partial failure - only site results available',
        debug: {
          hasApiKey: !!(process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY),
          environment: process.env.NODE_ENV,
          fallbackMode: true
        }
      })
    } catch (fallbackError) {
      console.error('Complete failure:', fallbackError)
      return NextResponse.json({ 
        suggestions: [],
        error: 'Failed to fetch suggestions' 
      }, { status: 500 })
    }
  }
} 