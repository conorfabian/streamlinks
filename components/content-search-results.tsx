"use client"

import Link from "next/link"
import { ExternalLink, Star, Calendar, PlayCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ContentSearchResult } from "@/lib/content-search"

interface ContentSearchResultsProps {
  results: ContentSearchResult[]
  loading: boolean
  query: string
}

export function ContentSearchResults({ results, loading, query }: ContentSearchResultsProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-gray-400">Searching for "{query}"...</p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
        <PlayCircle className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h2 className="text-xl font-medium text-white mb-2">No content found</h2>
        <p className="text-gray-400 mb-4">
          We couldn't find any movies, shows, or content matching "{query}". Try different keywords or check the spelling.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild className="bg-gray-100 hover:bg-white text-gray-900">
            <Link href="/">Browse Categories</Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800">
            <Link href="/submit">Submit a Site</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Content Search Results</h2>
        <p className="text-gray-400">
          Found {results.length} content {results.length === 1 ? 'item' : 'items'} for "{query}"
        </p>
      </div>

      {results.map((result, index) => (
        <Card key={result.content.id} className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex gap-6">
              {/* Content Poster */}
              {result.content.poster && (
                <div className="flex-shrink-0">
                  <img 
                    src={result.content.poster} 
                    alt={result.content.title}
                    className="w-24 h-36 object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
              
              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2 break-words">
                      {result.content.title}
                      {result.content.year && (
                        <span className="text-gray-400 font-normal ml-2">({result.content.year})</span>
                      )}
                    </CardTitle>
                    {result.content.originalTitle && result.content.originalTitle !== result.content.title && (
                      <p className="text-gray-500 text-sm mb-2">
                        Original: {result.content.originalTitle}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge 
                      variant="secondary" 
                      className={`${getContentTypeColor(result.content.type)} text-xs font-medium`}
                    >
                      {getContentTypeLabel(result.content.type)}
                    </Badge>
                    {result.content.rating && result.content.rating > 0 && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">
                          {result.content.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {result.content.overview && (
                  <CardDescription className="text-gray-400 mb-3 line-clamp-3">
                    {result.content.overview}
                  </CardDescription>
                )}
                
                {result.content.genres && result.content.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {result.content.genres.slice(0, 4).map((genre, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Watch on {result.availableOn.length} streaming {result.availableOn.length === 1 ? 'site' : 'sites'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.availableOn.map((siteLink, siteIndex) => (
                  <Link 
                    key={siteIndex} 
                    href={siteLink.directSearchUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className="bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-gray-500 transition-all duration-200 h-full">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                            {siteLink.site.name}
                          </h5>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getConfidenceColor(siteLink.confidence)}`}
                          >
                            {siteLink.confidence}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {siteLink.site.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                              <span>{siteLink.site.rating}/5</span>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${getAdLevelColor(siteLink.site.adLevel)}`}>
                              {siteLink.site.adLevel} Ads
                            </span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-500">
                          Updated: {siteLink.site.lastUpdated}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              {result.availableOn.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <p>No streaming sites with search functionality found for this content type.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Helper functions for styling
function getContentTypeColor(type: string): string {
  switch (type) {
    case 'anime': return 'bg-red-900/50 text-red-400 border-red-700'
    case 'movie': return 'bg-blue-900/50 text-blue-400 border-blue-700'
    case 'tv': return 'bg-green-900/50 text-green-400 border-green-700'
    case 'manga': return 'bg-purple-900/50 text-purple-400 border-purple-700'
    default: return 'bg-gray-700 text-gray-300 border-gray-600'
  }
}

function getContentTypeLabel(type: string): string {
  switch (type) {
    case 'anime': return 'Anime'
    case 'movie': return 'Movie'
    case 'tv': return 'TV Show'
    case 'manga': return 'Manga'
    default: return 'Content'
  }
}

function getConfidenceColor(confidence: string): string {
  switch (confidence) {
    case 'high': return 'border-green-600 text-green-400 bg-green-900/20'
    case 'medium': return 'border-yellow-600 text-yellow-400 bg-yellow-900/20'
    case 'low': return 'border-red-600 text-red-400 bg-red-900/20'
    default: return 'border-gray-600 text-gray-400 bg-gray-900/20'
  }
}

function getAdLevelColor(adLevel: string): string {
  switch (adLevel) {
    case 'Low': return 'bg-green-900/50 text-green-400'
    case 'Medium': return 'bg-yellow-900/50 text-yellow-400'
    case 'High': return 'bg-red-900/50 text-red-400'
    default: return 'bg-gray-700 text-gray-300'
  }
} 