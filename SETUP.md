# StreamLinks Setup Guide

## Content Search Feature Setup

The content search feature allows users to search for specific movies, TV shows, and anime to find direct links to streaming sites. This feature requires a free API key from The Movie Database (TMDB).

### Required API Keys

#### TMDB API Key (Required for Content Search)

1. **Get a free TMDB API key:**
   - Go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Create a free account if you don't have one
   - Request an API key (it's instant and free)

2. **Set up your environment variables:**
   Create a `.env.local` file in your project root and add:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

   Alternatively, you can use the server-side only version:
   ```
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

### How It Works

- **Without API Key**: Content search will fall back to a simple search that shows all relevant streaming sites
- **With API Key**: Content search will fetch movie/TV data from TMDB, show rich content information (posters, descriptions, ratings), and provide direct links to search for that specific content on streaming sites

### Features

1. **Site Search** (Default)
   - Search through curated streaming sites
   - Filter by name, description, and features
   - No API key required

2. **Content Search** (Enhanced with TMDB)
   - Search for specific movies, TV shows, anime
   - Rich content information with posters and descriptions
   - Direct links to search for content on relevant streaming sites
   - Confidence scoring for site recommendations
   - Automatic anime detection
   - Genre and rating information

### Testing

- **Site Search**: Should work immediately without any setup
- **Content Search**: 
  - Without API key: Will show fallback search with all relevant sites
  - With API key: Will show rich content cards with TMDB data

### Development

To run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Deployment

When deploying to platforms like Vercel, Netlify, or others, make sure to add your environment variables in the platform's settings:

- `NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key`

### Troubleshooting

1. **Content search not working**: Check that your TMDB API key is correctly set
2. **CORS errors**: The TMDB API should work from the browser, but if you encounter issues, you may need to make the API calls server-side
3. **Rate limiting**: TMDB has generous rate limits, but in high-traffic scenarios, consider implementing caching 