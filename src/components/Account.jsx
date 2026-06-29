import { useEffect, useState } from 'react'
import { ALL_TEAM_NAMES } from '../data/teams'

const sortedTeamNames = [...ALL_TEAM_NAMES].sort()
const initialForm = {
  name: '',
  email: '',
  password: '',
  favoriteTeam: '',
}

async function request(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }
  return data
}

export default function Account({ onAuthSuccess }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(initialForm)
  const [profileForm, setProfileForm] = useState({ name: '', favoriteTeam: '' })
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('Checking session...')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    request('/api/auth/me')
      .then(({ user: currentUser }) => {
        setUser(currentUser)
        setProfileForm({
          name: currentUser.name,
          favoriteTeam: currentUser.favoriteTeam || '',
        })
        setStatus('')
        if (onAuthSuccess) {
          onAuthSuccess(currentUser)
        }
      })
      .catch(() => {
        setStatus('')
      })
  }, [onAuthSuccess])

  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updateProfileForm = (event) => {
    setProfileForm({ ...profileForm, [event.target.name]: event.target.value })
  }

  const submitAuth = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setStatus('')

    try {
      const path = mode === 'register' ? '/api/auth/register' : '/api/auth/login'
      const payload = mode === 'register'
        ? form
        : { email: form.email, password: form.password }
      const { user: nextUser } = await request(path, {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setUser(nextUser)
      if (onAuthSuccess) {
        onAuthSuccess(nextUser)
      }
      setForm(initialForm)
      setStatus(mode === 'register' ? 'Account created.' : 'Signed in.')
    } catch (authError) {
      setError(authError.message)
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setStatus('')

    try {
      const { user: nextUser } = await request('/api/auth/me', {
        method: 'PATCH',
        body: JSON.stringify(profileForm),
      })
      setUser(nextUser)
      setStatus('Profile updated.')
    } catch (profileError) {
      setError(profileError.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError('')
    await request('/api/auth/logout', { method: 'POST' }).catch(() => {})
    setUser(null)
    setProfileForm({ name: '', favoriteTeam: '' })
    setStatus('Signed out.')
    setLoading(false)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Account</h1>
        <p className="page-subtitle">Save your fan profile and personalize the tracker</p>
      </div>

      <div className="account-grid">
        <section className="account-card">
          {user ? (
            <>
              <div className="account-eyebrow">Signed in</div>
              <h2 className="account-title">{user.name}</h2>
              <p className="account-copy">{user.email}</p>

              <form className="account-form" onSubmit={saveProfile}>
                <label>
                  Display name
                  <input className="input" name="name" value={profileForm.name} onChange={updateProfileForm} />
                </label>
                <label>
                  Favorite team
                  <select className="input" name="favoriteTeam" value={profileForm.favoriteTeam} onChange={updateProfileForm}>
                    <option value="">No favorite selected</option>
                    {sortedTeamNames.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </label>
                <div className="account-actions">
                  <button className="btn btn-primary" disabled={loading}>Save profile</button>
                  <button className="btn" type="button" onClick={logout} disabled={loading}>Sign out</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="auth-switch">
                <button className={`filter-btn ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Sign in</button>
                <button className={`filter-btn ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>Create account</button>
              </div>

              <form className="account-form" onSubmit={submitAuth}>
                {mode === 'register' && (
                  <label>
                    Name
                    <input className="input" name="name" value={form.name} onChange={updateForm} autoComplete="name" />
                  </label>
                )}
                <label>
                  Email
                  <input className="input" name="email" type="email" value={form.email} onChange={updateForm} autoComplete="email" />
                </label>
                <label>
                  Password
                  <input className="input" name="password" type="password" value={form.password} onChange={updateForm} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} />
                </label>
                {mode === 'register' && (
                  <label>
                    Favorite team
                    <select className="input" name="favoriteTeam" value={form.favoriteTeam} onChange={updateForm}>
                      <option value="">Choose later</option>
                      {sortedTeamNames.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </label>
                )}
                <button className="btn btn-primary" disabled={loading}>
                  {mode === 'register' ? 'Create account' : 'Sign in'}
                </button>
              </form>
            </>
          )}

          {status && <div className="account-message success">{status}</div>}
          {error && <div className="account-message error">{error}</div>}
        </section>

        <section className="account-card account-card-dark">
          <div className="account-eyebrow">What accounts unlock</div>
          <h2 className="account-title">A proper fan profile.</h2>
          <ul className="account-list">
            <li>Secure email/password sign in backed by MongoDB Atlas.</li>
            <li>Hashed passwords with httpOnly session cookies.</li>
            <li>Favorite-team profile data ready for saved predictions and alerts.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
