import 'dotenv/config'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
// Log incoming requests for debugging routing and to ensure API routes are invoked
app.use((req, res, next) => {
  try { console.log('REQ', req.method, req.path) } catch (e) {}
  next()
})

// Helper: fetch with timeout (protect from hanging external API calls)
async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}
const port = process.env.PORT || 5050
const isProduction = process.env.NODE_ENV === 'production'

if (!process.env.MONGODB_URI) {
  console.warn('Missing MONGODB_URI. Add it to .env before using account endpoints.')
}

if (!process.env.JWT_SECRET) {
  console.warn('Missing JWT_SECRET. Add a long random value to .env before using account endpoints.')
}

app.use(express.json({ limit: '32kb' }))

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 120,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    favoriteTeam: {
      type: String,
      trim: true,
      maxlength: 80,
      default: '',
    },
  },
  { timestamps: true },
)

userSchema.index({ email: 1 }, { unique: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

function getCookie(req, name) {
  const cookies = req.headers.cookie?.split(';') || []
  const cookie = cookies.find(item => item.trim().startsWith(`${name}=`))
  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : null
}

function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    favoriteTeam: user.favoriteTeam,
    createdAt: user.createdAt,
  }
}

function setAuthCookie(res, user) {
  const token = jwt.sign(
    { sub: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )

  res.cookie('ft_session', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  })
}

function clearAuthCookie(res) {
  res.clearCookie('ft_session', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
  })
}

async function requireAuth(req, res, next) {
  try {
    const token = getCookie(req, 'ft_session')
    if (!token) {
      return res.status(401).json({ message: 'Not signed in' })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.sub)
    if (!user) {
      clearAuthCookie(res)
      return res.status(401).json({ message: 'Account not found' })
    }

    req.user = user
    next()
  } catch {
    clearAuthCookie(res)
    return res.status(401).json({ message: 'Session expired. Sign in again.' })
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.post('/api/auth/register', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim()
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')
    const favoriteTeam = String(req.body.favoriteTeam || '').trim()

    if (name.length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters.' })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Enter a valid email address.' })
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'An account already exists for this email.' })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, passwordHash, favoriteTeam })
    setAuthCookie(res, user)

    return res.status(201).json({ user: publicUser(user) })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Could not create account.' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    setAuthCookie(res, user)
    return res.json({ user: publicUser(user) })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Could not sign in.' })
  }
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) })
})

app.patch('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const name = String(req.body.name || req.user.name).trim()
    const favoriteTeam = String(req.body.favoriteTeam || '').trim()

    if (name.length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters.' })
    }

    req.user.name = name
    req.user.favoriteTeam = favoriteTeam
    await req.user.save()

    res.json({ user: publicUser(req.user) })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not update account.' })
  }
})

app.post('/api/auth/logout', (_req, res) => {
  clearAuthCookie(res)
  res.json({ ok: true })
})

let matchCache = { data: null, timestamp: 0 }
app.get('/api/matches/today', async (req, res) => {
  try {
    const now = Date.now()
    if (matchCache.data && (now - matchCache.timestamp < 60000)) {
      return res.json(matchCache.data)
    }
    
    const keysString = process.env.FOOTBALL_API_KEYS || process.env.FOOTBALL_API_KEY || process.env.API_FOOTBALL_KEYS || process.env.API_FOOTBALL_KEY || ''
    const keys = keysString.split(',').map(k => k.trim()).filter(Boolean)

    if (keys.length === 0) {
      return res.json([])
    }

    let json = null
    let success = false

    for (const key of keys) {
      try {
        const response = await fetchWithTimeout('https://footballdata.io/api/v1/fixtures/today', {
          headers: { 'Authorization': `Bearer ${key}` }
        }, 10000)
        
        if (response.ok) {
          json = await response.json()
          success = true
          break
        }
      } catch (err) {
        // Silently catch fetch errors and try the next key
      }
    }
    
    if (!success) throw new Error('All API keys failed or rate limited')
    const matches = (json.data?.matches || []).map(m => {
      let status = 'PRE'
      if (m.status === 'in_progress') status = 'LIVE'
      if (m.status === 'complete') status = 'FT'
      
      // Attempt to parse match_date for time
      const dateObj = new Date(m.date_unix * 1000)
      const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
      const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'Asia/Kolkata' }).toUpperCase()
      
      return {
        id: String(m.match_id),
        teamA: m.home_team.team_name,
        teamB: m.away_team.team_name,
        logoA: m.home_team.team_logo,
        logoB: m.away_team.team_logo,
        scoreA: m.score.home,
        scoreB: m.score.away,
        status,
        time: status === 'LIVE' ? (m.status_localized || 'LIVE') : timeStr,
        venue: m.venue.stadium_name || 'TBA',
        city: m.venue.stadium_location || '',
        date: dateStr,
        xgA: m.xg?.home || 0,
        xgB: m.xg?.away || 0,
        odds: {
          home: m.odds?.home_win || 0,
          draw: m.odds?.draw || 0,
          away: m.odds?.away_win || 0
        },
        prob: {
          home: m.probabilities?.home_win || 33,
          draw: m.probabilities?.draw || 34,
          away: m.probabilities?.away_win || 33
        }
      }
    })
    
    matchCache = { data: matches, timestamp: now }
    res.json(matches)
  } catch (error) {
    console.error('Error fetching matches:', error)
    res.status(500).json({ message: 'Could not fetch live matches' })
  }
})

// GOLDEN BOOT: Top scorers endpoint with 60s cache
let goldenBootCache = { data: null, timestamp: 0 }
app.get('/api/stats/goldenboot', async (req, res) => {
  console.log('/api/stats/goldenboot route invoked')
  try {
    const now = Date.now()
    if (goldenBootCache.data && (now - goldenBootCache.timestamp < 60000)) {
      return res.json(goldenBootCache.data)
    }

    const keysString = process.env.FOOTBALL_API_KEYS || process.env.FOOTBALL_API_KEY || process.env.API_FOOTBALL_KEYS || process.env.API_FOOTBALL_KEY || ''
    const keys = keysString.split(',').map(k => k.trim()).filter(Boolean)

    if (keys.length === 0) {
      console.warn('/api/stats/goldenboot: No FOOTBALL_API_KEY(S) configured')
      return res.status(503).json({ error: 'No FOOTBALL_API_KEY(S) configured on server' })
    }

    const endpoints = [
      'https://footballdata.io/api/v1/stats/topscorers',
      'https://footballdata.io/api/v1/stats/top_scorers',
      'https://footballdata.io/api/v1/players/topscorers',
      'https://footballdata.io/api/v1/players/top_scorers',
      'https://footballdata.io/api/v1/stats/scorers',
      'https://footballdata.io/api/v1/scorers'
    ]

    let json = null
    let success = false
    let usedEndpoint = null
    let usedKeyIdx = null

    for (let kIdx = 0; kIdx < keys.length; kIdx++) {
      const key = keys[kIdx]
      for (const ep of endpoints) {
        // Try multiple common auth header formats to support different providers (footballdata, api-football, rapidapi)
        const headerVariants = [
          { 'Authorization': `Bearer ${key}` },
          { 'x-apisports-key': key },
          { 'x-rapidapi-key': key, 'x-rapidapi-host': 'api-football-v1.p.rapidapi.com' }
        ]

        for (const headers of headerVariants) {
          try {
            const response = await fetchWithTimeout(ep, { headers }, 10000)
            if (!response.ok) continue
            json = await response.json()
            // Accept several shapes
            const candidates = json.data && (Array.isArray(json.data) ? json.data : json.data.scorers || json.data.top_scorers)
            const rootArray = Array.isArray(json) ? json : null
            if (Array.isArray(candidates) && candidates.length > 0) {
              json = { scorers: candidates }
              success = true
              usedEndpoint = ep
              usedKeyIdx = kIdx
              // Log which header variant succeeded (index) for debugging
              console.log(`/api/stats/goldenboot: successful headers variant for endpoint ${ep}`)
              break
            } else if (Array.isArray(rootArray) && rootArray.length > 0) {
              json = { scorers: rootArray }
              success = true
              usedEndpoint = ep
              usedKeyIdx = kIdx
              console.log(`/api/stats/goldenboot: successful root-array response for endpoint ${ep}`)
              break
            }
          } catch (err) {
            // try next header variant
          }
        }

        if (success) break
      }
      if (success) break
    }

    if (success) {
      console.log(`/api/stats/goldenboot: fetched ${Array.isArray(json.scorers) ? json.scorers.length : 0} scorers from ${usedEndpoint} using key index ${usedKeyIdx}`)
    }

    if (!success) throw new Error('All API keys/endpoints failed or returned no data')

    const raw = json.scorers || []
    const normalized = raw.map((s, idx) => {
      const player = s.player || s.player_info || {}
      const team = s.team || s.team_info || s.club || {}
      return {
        rank: s.rank || s.position || idx + 1,
        name: player.name || s.name || s.full_name || (player.first_name ? `${player.first_name} ${player.last_name}` : 'Unknown'),
        playerId: player.id || s.player_id || null,
        code: team.code || team.tla || s.team_code || (team.name ? team.name.substring(0,3).toUpperCase() : ''),
        country: team.name || s.country || s.team_name || '',
      logo: team.team_logo || team.logo || team.logo_url || s.team_logo || s.logo || null,
      goals: Number(s.goals || s.totalGoals || s.goals_scored || 0),
      assists: Number(s.assists || s.totalAssists || 0),
      mins: Number(s.minutes_played || s.mins || s.minutes || 0),
      eliminated: !!s.eliminated
      }
    })

    // Sort: goals desc, assists desc, mins asc
    normalized.sort((a,b) => {
      if (b.goals !== a.goals) return b.goals - a.goals
      if (b.assists !== a.assists) return b.assists - a.assists
      return a.mins - b.mins
    })

    // Reassign ranks
    const final = normalized.map((r, i) => ({ ...r, rank: i + 1 }))

    goldenBootCache = { data: final, timestamp: now }
    res.json(final)
  } catch (error) {
    console.error('Error fetching golden boot:', error)
    res.status(500).json([])
  }
})

const distPath = path.resolve(__dirname, '../dist')
if (existsSync(path.join(distPath, 'index.html'))) {
  app.use(express.static(distPath))
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

try {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB Atlas')
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
} catch (error) {
  console.error('Failed to start server:', error.message)
  process.exit(1)
}
