import { useState, useEffect, useRef } from 'react'
import './index.css'
import Today from './components/Today'
import Bracket from './components/Bracket'
import Predict from './components/Predict'
import Teams from './components/Teams'
import Groups from './components/Groups'
import GoldenBoot from './components/GoldenBoot'
import Tracker from './components/Tracker'
import DreamXI from './components/DreamXI'
import Profile from './components/Profile'
import Account from './components/Account'

import { TEAMS } from './data/teams'
import { PLAYERS } from './data/players'
import { FlagComponent } from './components/shared'

const SVG_ICONS = {
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  today: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <rect x="2" y="7" width="20" height="15" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  ),
  tracker: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  ),
  bracket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  predict: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  'dream-xi': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d="m15 4-2 2M19 8l-2-2M21 4l-4 4M3 21l9-9M12 9l-9 9" />
    </svg>
  ),
  teams: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  groups: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  'golden-boot': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  profile: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
}

const TABS = [
  { id: 'today', label: 'TODAY' },
  { id: 'tracker', label: 'TRACKER' },
  { id: 'bracket', label: 'BRACKET' },
  { id: 'predict', label: 'PREDICT' },
  { id: 'dream-xi', label: 'DREAM XI' },
  { id: 'teams', label: 'TEAMS' },
  { id: 'groups', label: 'GROUPS' },
  { id: 'golden-boot', label: 'GOLDEN BOOT' },
]

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [authChecking, setAuthChecking] = useState(true)

  const [activeTab, setActiveTab] = useState('today')
  const [selectedTeamName, setSelectedTeamName] = useState(null)
  const [selectedPlayerName, setSelectedPlayerName] = useState(null)
  const [selectedMatchId, setSelectedMatchId] = useState(null)

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)

  // Custom Toast notification states
  const [toasts, setToasts] = useState([])

  // Request browser Notification API permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Check authentication session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setCurrentUser(data.user)
        } else {
          setCurrentUser(null)
        }
      } catch {
        setCurrentUser(null)
      } finally {
        setAuthChecking(false)
      }
    }
    checkSession()
  }, [])

  // Escape key close search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-focus search input
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
      setSearchQuery('')
    }
  }, [isSearchOpen])

  const viewTeamProfile = (name) => {
    setSelectedTeamName(name)
    setActiveTab('teams')
    setIsSearchOpen(false)
  }

  const viewPlayerGoldenBoot = (name) => {
    setSelectedPlayerName(name)
    setActiveTab('golden-boot')
    setIsSearchOpen(false)
  }

  const viewMatchToday = (id) => {
    setSelectedMatchId(id)
    setActiveTab('today')
    setIsSearchOpen(false)
  }

  // Trigger Goal Notification (Browser push + neobrutalist Toast UI)
  const handleGoalScored = (scoringTeam, match) => {
    const title = '⚽ GOAL SCORED!'
    const message = `${scoringTeam.toUpperCase()} HAVE SCORED! (${match.teamA} ${match.scoreA}–${match.scoreB} ${match.teamB})`

    // 1. HTML5 Desktop notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message })
    }

    // 2. Custom Toast UI
    const toastId = Date.now()
    setToasts(prev => [...prev, { id: toastId, title, message }])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId))
    }, 5000)
  }

  // Attach goal simulation globally so Profile.jsx can trigger it
  useEffect(() => {
    window.simulateGoal = () => {
      handleGoalScored('Brazil', { teamA: 'Brazil', teamB: 'Japan', scoreA: 2, scoreB: 0 })
    }
    return () => {
      window.simulateGoal = null
    }
  }, [])

  const renderTab = () => {
    switch (activeTab) {
      case 'today': 
        return (
          <Today 
            onNavigateToTeam={viewTeamProfile} 
            selectedMatchId={selectedMatchId} 
            setSelectedMatchId={setSelectedMatchId} 
            onGoalScored={handleGoalScored}
          />
        )
      case 'tracker': 
        return <Tracker onNavigateToTeam={viewTeamProfile} onGoToTeams={() => setActiveTab('teams')} />
      case 'bracket': 
        return <Bracket />
      case 'predict': 
        return <Predict />
      case 'dream-xi': 
        return <DreamXI />
      case 'teams': 
        return <Teams selectedTeamName={selectedTeamName} setSelectedTeamName={setSelectedTeamName} />
      case 'groups': 
        return <Groups onNavigateToTeam={viewTeamProfile} />
      case 'golden-boot': 
        return <GoldenBoot selectedPlayerName={selectedPlayerName} setSelectedPlayerName={setSelectedPlayerName} />
      case 'profile':
        return (
          <Profile 
            onNavigateToPredict={() => setActiveTab('predict')} 
            currentUser={currentUser}
            onLogout={() => setCurrentUser(null)}
            onUpdateUser={(user) => setCurrentUser(user)}
          />
        )
      default: 
        return <Today onNavigateToTeam={viewTeamProfile} onGoalScored={handleGoalScored} />
    }
  }

  // Filter Search lists
  const matchingTeams = searchQuery.trim() === '' ? [] : Object.keys(TEAMS).filter(tName => 
    tName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (TEAMS[tName].code && TEAMS[tName].code.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const matchingPlayers = searchQuery.trim() === '' ? [] : PLAYERS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.team.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Today matches + upcoming matches for search
  const allMatchesList = [
    { id: 'bra-jpn', teamA: 'Brazil', teamB: 'Japan', status: 'LIVE', time: '12:00' },
    { id: 'ger-par', teamA: 'Germany', teamB: 'Paraguay', status: 'PRE', time: '16:30' },
    { id: 'ned-mar', teamA: 'Netherlands', teamB: 'Morocco', status: 'PRE', time: '21:00' },
    { id: 'civ-nor', teamA: 'Ivory Coast', teamB: 'Norway', status: 'PRE', time: '17:00' },
    { id: 'fra-swe', teamA: 'France', teamB: 'Sweden', status: 'PRE', time: '21:00' },
    { id: 'mex-ecu', teamA: 'Mexico', teamB: 'Ecuador', status: 'PRE', time: '01:00' },
    { id: 'eng-cod', teamA: 'England', teamB: 'DR Congo', status: 'PRE', time: '12:00' },
    { id: 'bel-sen', teamA: 'Belgium', teamB: 'Senegal', status: 'PRE', time: '16:00' },
    { id: 'usa-bih', teamA: 'USA', teamB: 'Bosnia and Herzegovina', status: 'PRE', time: '20:00' },
    { id: 'esp-aut', teamA: 'Spain', teamB: 'Austria', status: 'PRE', time: '15:00' },
    { id: 'por-cro', teamA: 'Portugal', teamB: 'Croatia', status: 'PRE', time: '19:00' },
    { id: 'sui-alg', teamA: 'Switzerland', teamB: 'Algeria', status: 'PRE', time: '23:00' },
    { id: 'aus-egy', teamA: 'Australia', teamB: 'Egypt', status: 'PRE', time: '14:00' },
    { id: 'arg-cpv', teamA: 'Argentina', teamB: 'Cape Verde', status: 'PRE', time: '18:00' },
    { id: 'col-gha', teamA: 'Colombia', teamB: 'Ghana', status: 'PRE', time: '21:30' }
  ]

  const matchingMatches = searchQuery.trim() === '' ? [] : allMatchesList.filter(m =>
    m.teamA.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.teamB.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (authChecking) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh', 
          background: 'var(--bg)', 
          color: 'var(--text-3)', 
          fontSize: 13, 
          fontWeight: 600,
          letterSpacing: '0.08em'
        }}
      >
        CHECKING SESSION...
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh', 
          background: 'var(--bg)', 
          padding: 20 
        }}
      >
        <div style={{ width: '100%', maxWidth: 720 }}>
          <Account onAuthSuccess={(user) => setCurrentUser(user)} />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">26</div>
        
        {/* Global Search Button */}
        <button 
          className="sidebar-tab"
          onClick={() => setIsSearchOpen(true)}
          data-label="SEARCH"
          style={{ marginBottom: 12 }}
        >
          {SVG_ICONS.search}
        </button>

        {/* Navigation list */}
        <nav className="sidebar-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id)
                setSelectedTeamName(null)
                setSelectedPlayerName(null)
                setSelectedMatchId(null)
              }}
              data-label={tab.label}
            >
              {SVG_ICONS[tab.id]}
            </button>
          ))}

          {/* Profile link pushed to bottom */}
          <button
            className={`sidebar-tab${activeTab === 'profile' ? ' active' : ''}`}
            onClick={() => {
              setActiveTab('profile')
              setSelectedTeamName(null)
              setSelectedPlayerName(null)
              setSelectedMatchId(null)
            }}
            data-label="PROFILE"
            style={{ marginTop: 'auto' }}
          >
            {SVG_ICONS.profile}
          </button>
        </nav>
      </aside>

      {/* MAIN VIEW */}
      <main className="main-content">
        {renderTab()}
      </main>

      {/* FEATURE 9: GLOBAL SEARCH OVERLAY */}
      {isSearchOpen && (
        <div 
          onClick={() => setIsSearchOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Top Bar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              height: 56,
              background: 'var(--surface)',
              borderBottom: '2px solid var(--accent)',
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <input 
              ref={searchInputRef}
              type="text"
              placeholder="SEARCH TEAMS, PLAYERS, MATCHES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: 56,
                padding: '0 20px',
                fontSize: 18,
                color: 'var(--text-1)',
                background: 'transparent',
                outline: 'none',
                border: 'none'
              }}
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              style={{
                position: 'absolute',
                right: 20,
                fontSize: 24,
                color: 'var(--text-2)',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          {/* Results Area */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              padding: 20,
              overflowY: 'auto'
            }}
          >
            {searchQuery.trim() === '' ? (
              <div>
                <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>QUICK LINKS</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button 
                    onClick={() => { setActiveTab('today'); setIsSearchOpen(false) }}
                    style={{ border: '1px solid var(--border)', fontSize: 10, fontWeight: 600, padding: '6px 12px', cursor: 'pointer' }}
                  >
                    TODAY'S MATCHES
                  </button>
                  <button 
                    onClick={() => { setActiveTab('bracket'); setIsSearchOpen(false) }}
                    style={{ border: '1px solid var(--border)', fontSize: 10, fontWeight: 600, padding: '6px 12px', cursor: 'pointer' }}
                  >
                    BRACKET
                  </button>
                  <button 
                    onClick={() => { setActiveTab('golden-boot'); setIsSearchOpen(false) }}
                    style={{ border: '1px solid var(--border)', fontSize: 10, fontWeight: 600, padding: '6px 12px', cursor: 'pointer' }}
                  >
                    GOLDEN BOOT
                  </button>
                  <button 
                    onClick={() => { setActiveTab('predict'); setIsSearchOpen(false) }}
                    style={{ border: '1px solid var(--border)', fontSize: 10, fontWeight: 600, padding: '6px 12px', cursor: 'pointer' }}
                  >
                    PREDICT
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Teams Section */}
                {matchingTeams.length > 0 && (
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>TEAMS</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {matchingTeams.map(name => (
                        <button 
                          key={name}
                          onClick={() => viewTeamProfile(name)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            padding: '6px 12px',
                            cursor: 'pointer'
                          }}
                        >
                          <FlagComponent teamName={name} size="small" />
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{name.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Players Section */}
                {matchingPlayers.length > 0 && (
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>PLAYERS</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)' }}>
                      {matchingPlayers.map(p => (
                        <div 
                          key={p.name}
                          onClick={() => viewPlayerGoldenBoot(p.name)}
                          style={{
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 16px',
                            background: 'var(--surface)',
                            cursor: 'pointer'
                          }}
                        >
                          <FlagComponent teamName={p.team} size="small" style={{ marginRight: 12 }} />
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', width: 180 }}>{p.name}</span>
                          <span style={{ fontSize: 11, color: 'var(--text-3)', width: 120 }}>{p.team.toUpperCase()}</span>
                          <span style={{ fontSize: 11, color: 'var(--accent)', marginLeft: 'auto', fontWeight: 700 }}>{p.goals} GOALS</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matches Section */}
                {matchingMatches.length > 0 && (
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>MATCHES</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)' }}>
                      {matchingMatches.map(m => (
                        <div 
                          key={m.id}
                          onClick={() => viewMatchToday(m.id)}
                          style={{
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 16px',
                            background: 'var(--surface)',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{ fontSize: 13, fontWeight: 600, width: 120, textAlign: 'right' }}>{m.teamA}</span>
                          <span 
                            style={{ 
                              fontSize: 10, 
                              fontWeight: 700, 
                              color: m.status === 'LIVE' ? 'var(--accent)' : 'var(--text-2)', 
                              background: m.status === 'LIVE' ? '#1A1F00' : 'var(--surface-2)', 
                              padding: '2px 8px',
                              margin: '0 16px',
                              textAlign: 'center',
                              width: 80
                            }}
                          >
                            {m.status === 'LIVE' ? 'LIVE' : m.time}
                          </span>
                          <span style={{ fontSize: 13, fontWeight: 600, width: 120, textAlign: 'left' }}>{m.teamB}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {matchingTeams.length === 0 && matchingPlayers.length === 0 && matchingMatches.length === 0 && (
                  <div style={{ color: 'var(--text-3)', fontSize: 13, textAlign: 'center', marginTop: 40 }}>
                    NO RESULTS FOUND FOR "{searchQuery.toUpperCase()}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* NEOBRUTALIST TOAST NOTIFICATION CONTAINER */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 20, 
          right: 20, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 10, 
          zIndex: 1000 
        }}
      >
        {toasts.map(toast => (
          <div 
            key={toast.id}
            style={{
              width: 320,
              background: 'var(--surface)',
              border: '2px solid var(--accent)',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '4px 4px 0px #000',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: 'var(--accent)', letterSpacing: '0.1em' }}>
                {toast.title}
              </span>
              <button 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--text-2)', 
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: 0
                }}
              >
                ×
              </button>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>
              {toast.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
