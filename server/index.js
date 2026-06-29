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
