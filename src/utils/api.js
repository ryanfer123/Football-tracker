// Simple in-memory cache
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Cache helper functions
function getCacheKey(url, options = {}) {
  return `${url}:${JSON.stringify(options)}`
}

function getCachedResponse(key) {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

function setCachedResponse(key, data) {
  cache.set(key, { data, timestamp: Date.now() })
}

// Centralized API client with caching
export async function apiFetch(url, options = {}) {
  const cacheKey = getCacheKey(url, options)
  
  // Check cache for GET requests
  if (!options.method || options.method === 'GET') {
    const cached = getCachedResponse(cacheKey)
    if (cached) {
      return cached
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Cache successful GET requests
    if (!options.method || options.method === 'GET') {
      setCachedResponse(cacheKey, data)
    }

    return data
  } catch (error) {
    console.error('API fetch error:', error)
    throw error
  }
}

// Auth-specific API methods
export const authAPI = {
  async checkSession() {
    return apiFetch('/api/auth/me')
  },

  async register(name, email, password) {
    return apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  },

  async login(email, password) {
    return apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  async logout() {
    return apiFetch('/api/auth/logout', { method: 'POST' })
  },

  async updateProfile(data) {
    return apiFetch('/api/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },
}

// Clear cache helper
export function clearCache() {
  cache.clear()
}

// Clear specific cache key
export function clearCacheKey(url, options = {}) {
  const key = getCacheKey(url, options)
  cache.delete(key)
}
