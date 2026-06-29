import { useState, useEffect } from 'react'
import { FlagComponent } from './shared'
import { TEAMS } from '../data/teams'

export default function Profile({ onNavigateToPredict, currentUser, onLogout, onUpdateUser }) {
  // Stored preferences state
  const [followed, setFollowed] = useState(() => {
    const saved = localStorage.getItem('followedTeams')
    return saved ? JSON.parse(saved) : ['Brazil', 'France', 'England']
  })

  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('profileAlerts')
    return saved ? JSON.parse(saved) : {
      goals: true,
      reminders: false,
      bracket: true,
      goldenBoot: false
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempUsername, setTempUsername] = useState(currentUser?.name || '')

  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('followedTeams', JSON.stringify(followed))
  }, [followed])

  useEffect(() => {
    localStorage.setItem('profileAlerts', JSON.stringify(alerts))
  }, [alerts])

  const toggleAlert = (key) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleRemoveTeam = (teamName) => {
    const next = followed.filter(t => t !== teamName)
    setFollowed(next)
    localStorage.setItem('followedTeams', JSON.stringify(next))
  }

  const handleAddTeam = (teamName) => {
    if (!followed.includes(teamName)) {
      const next = [...followed, teamName]
      setFollowed(next)
      localStorage.setItem('followedTeams', JSON.stringify(next))
    }
    setShowDropdown(false)
    setSearchQuery('')
  }

  const handleSaveUsername = async () => {
    if (tempUsername.trim()) {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: tempUsername }),
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json()
          if (onUpdateUser) {
            onUpdateUser(data.user)
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
    setIsEditing(false)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      if (onLogout) {
        onLogout()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Fallback Predictions if none exist in localStorage
  const predictions = [
    { match: 'Brazil vs Japan', pred: '2-0', result: 'PENDING' },
    { match: 'Canada vs Bosnia', pred: '1-0', result: 'CORRECT' },
    { match: 'Germany vs Paraguay', pred: '3-1', result: 'PENDING' },
    { match: 'Netherlands vs Morocco', pred: '1-2', result: 'WRONG' },
    { match: 'France vs Sweden', pred: '2-0', result: 'PENDING' }
  ]

  const stats = {
    predictionsMade: 8,
    correct: 5,
    teamsFollowed: followed.length,
    matchesViewed: 14,
    bracketRuns: 3,
    daysActive: 2
  }

  const allTeamsList = Object.keys(TEAMS).sort()
  const filteredTeams = allTeamsList.filter(tName =>
    tName.toLowerCase().includes(searchQuery.toLowerCase()) && !followed.includes(tName)
  )

  const activities = [
    { text: 'You predicted Brazil 2-0 Japan', time: '2h ago', active: true },
    { text: 'You started following France', time: '3h ago', active: true },
    { text: 'You ran a bracket simulation', time: '5h ago', active: false },
    { text: 'App opened', time: 'Today', active: false }
  ]

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header" style={{ paddingBottom: 10 }}>
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          PROFILE & SETTINGS
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          PERSONAL FAN DASHBOARD
        </div>
      </div>

      <div style={{ display: 'flex', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        {/* LEFT PROFILE PANEL */}
        <div 
          style={{ 
            width: 280, 
            borderRight: '1px solid var(--border)', 
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* AVATAR ZONE */}
          <div style={{ padding: 20, borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
            <div 
              style={{ 
                width: 64, 
                height: 64, 
                background: 'var(--surface-2)', 
                border: '1px solid var(--border-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}
            >
              <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>WC</span>
            </div>

            {isEditing ? (
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 8 }}>
                <input 
                  type="text" 
                  value={tempUsername} 
                  onChange={(e) => setTempUsername(e.target.value)}
                  style={{
                    width: 120,
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-1)',
                    fontSize: 12,
                    padding: '2px 6px',
                    outline: 'none'
                  }}
                />
                <button 
                  onClick={handleSaveUsername}
                  style={{
                    background: 'var(--accent)',
                    color: '#000',
                    fontSize: 10,
                    fontWeight: 700,
                    border: 'none',
                    padding: '2px 6px',
                    cursor: 'pointer'
                  }}
                >
                  SAVE
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 2 }}>
                  {currentUser?.name || 'WC26 FAN'}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-2)', marginBottom: 4 }}>
                  {currentUser?.email}
                </div>
              </div>
            )}
            
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 12 }}>Joined June 2026</div>
            
            {!isEditing && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button 
                  onClick={() => { setTempUsername(currentUser?.name || ''); setIsEditing(true) }}
                  style={{ 
                    background: 'transparent',
                    border: '1px solid var(--border)', 
                    padding: '3px 8px', 
                    fontSize: 9, 
                    fontWeight: 600, 
                    color: 'var(--text-3)',
                    cursor: 'pointer'
                  }}
                >
                  EDIT PROFILE
                </button>
                <button 
                  onClick={handleLogout}
                  style={{ 
                    background: 'transparent',
                    border: '1px solid var(--border)', 
                    padding: '3px 8px', 
                    fontSize: 9, 
                    fontWeight: 600, 
                    color: 'var(--red)',
                    cursor: 'pointer',
                    marginLeft: 8
                  }}
                >
                  SIGN OUT
                </button>
              </div>
            )}
          </div>

          {/* MY TEAMS SECTION */}
          <div style={{ padding: 16, borderBottom: '1px solid var(--border)' }}>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>FOLLOWING</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {followed.map(tName => (
                <div 
                  key={tName}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    border: '1px solid var(--border)',
                    background: 'var(--surface-2)',
                    padding: '4px 8px'
                  }}
                >
                  <FlagComponent teamName={tName} size="small" />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-1)' }}>{tName}</span>
                  <button 
                    onClick={() => handleRemoveTeam(tName)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-3)', cursor: 'pointer', fontSize: 12, padding: 0 }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Add Team Dropdown Button */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  width: '100%',
                  border: '1px dashed var(--border)',
                  background: 'transparent',
                  color: 'var(--text-3)',
                  fontSize: 10,
                  fontWeight: 600,
                  height: 28,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                + FOLLOW TEAM
              </button>

              {showDropdown && (
                <div 
                  style={{
                    position: 'absolute',
                    top: 32,
                    left: 0,
                    right: 0,
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-2)',
                    zIndex: 10,
                    maxHeight: 180,
                    overflowY: 'auto'
                  }}
                >
                  <input 
                    type="text" 
                    placeholder="Search team..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 6,
                      fontSize: 11,
                      background: 'var(--bg)',
                      border: 'none',
                      borderBottom: '1px solid var(--border)',
                      color: 'var(--text-1)',
                      outline: 'none'
                    }}
                  />
                  <div>
                    {filteredTeams.map(tName => (
                      <div 
                        key={tName}
                        onClick={() => handleAddTeam(tName)}
                        style={{
                          padding: '6px 12px',
                          fontSize: 12,
                          color: 'var(--text-1)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <FlagComponent teamName={tName} size="small" />
                        <span>{tName}</span>
                      </div>
                    ))}
                    {filteredTeams.length === 0 && (
                      <div style={{ padding: 8, fontSize: 10, color: 'var(--text-3)', textAlign: 'center' }}>
                        No teams left to follow
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MY PREDICTIONS SECTION */}
          <div style={{ padding: 16, borderBottom: '1px solid var(--border)' }}>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>MY PREDICTIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {predictions.map((p, idx) => {
                let badgeBg = 'var(--surface-2)'
                let badgeColor = 'var(--text-3)'
                if (p.result === 'CORRECT') {
                  badgeBg = '#1A1F00'
                  badgeColor = 'var(--accent)'
                } else if (p.result === 'WRONG') {
                  badgeBg = '#1F0A0A'
                  badgeColor = 'var(--red)'
                }

                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{p.match}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-1)' }}>PREDICTED {p.pred}</span>
                    </div>
                    <span 
                      style={{ 
                        fontSize: 9, 
                        fontWeight: 700, 
                        padding: '2px 6px', 
                        background: badgeBg, 
                        color: badgeColor,
                        border: `1px solid ${p.result === 'CORRECT' ? 'var(--accent)' : p.result === 'WRONG' ? 'var(--red)' : 'var(--border)'}`
                      }}
                    >
                      {p.result}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* NOTIFICATIONS / ALERTS SECTION */}
          <div style={{ padding: 16 }}>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>ALERTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { key: 'goals', label: 'Goals (followed teams)' },
                { key: 'reminders', label: 'Match start reminders' },
                { key: 'bracket', label: 'Bracket updates' },
                { key: 'goldenBoot', label: 'Golden Boot changes' }
              ].map(toggle => {
                const isON = alerts[toggle.key]
                return (
                  <div 
                    key={toggle.key} 
                    style={{ 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between' 
                    }}
                  >
                    <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{toggle.label}</span>
                    
                    {/* CUSTOM TOGGLE SWITCH */}
                    <div 
                      onClick={() => toggleAlert(toggle.key)}
                      style={{
                        width: 28,
                        height: 16,
                        background: isON ? 'var(--accent)' : 'var(--surface-2)',
                        border: '1px solid var(--border-2)',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background 100ms ease'
                      }}
                    >
                      <div 
                        style={{
                          width: 10,
                          height: 10,
                          background: isON ? '#000' : 'var(--text-2)',
                          position: 'absolute',
                          top: 2,
                          left: isON ? 14 : 2,
                          transition: 'left 100ms ease'
                        }}
                      />
                    </div>
                  </div>
                )
              })}
              <button 
                onClick={() => {
                  if (window.simulateGoal) {
                    window.simulateGoal()
                  }
                }}
                style={{
                  marginTop: 12,
                  width: '100%',
                  border: '1px solid var(--accent)',
                  background: '#1A1F00',
                  color: 'var(--accent)',
                  fontSize: 10,
                  fontWeight: 700,
                  height: 28,
                  cursor: 'pointer'
                }}
              >
                TEST GOAL NOTIFICATION
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - ACTIVITY FEED & STATS */}
        <div style={{ flex: 1, padding: 20 }}>
          {/* ACTIVITY FEED */}
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 16 }}>ACTIVITY</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: 16 }}>
            {/* Vertical timeline line */}
            <div 
              style={{ 
                position: 'absolute', 
                left: 2, 
                top: 8, 
                bottom: 8, 
                width: 1, 
                background: 'var(--border)' 
              }} 
            />

            {activities.map((act, idx) => (
              <div 
                key={idx} 
                style={{ 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  position: 'relative' 
                }}
              >
                {/* dot indicator */}
                <div 
                  style={{
                    position: 'absolute',
                    left: -17,
                    width: 5,
                    height: 5,
                    background: act.active ? 'var(--accent)' : 'var(--border-2)',
                    borderRadius: '50%'
                  }}
                />

                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{act.text}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-3)' }}>{act.time}</span>
              </div>
            ))}
          </div>

          {/* WORLD CUP STATS CARD */}
          <div 
            style={{ 
              marginTop: 24, 
              background: 'var(--surface)', 
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--accent)',
              padding: 16
            }}
          >
            <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 12 }}>YOUR WC26 STATS</div>
            
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: 16 
              }}
            >
              {[
                { count: stats.predictionsMade, label: 'PREDICTIONS MADE' },
                { count: stats.correct, label: 'CORRECT' },
                { count: stats.teamsFollowed, label: 'TEAMS FOLLOWED' },
                { count: stats.matchesViewed, label: 'MATCHES VIEWED' },
                { count: stats.bracketRuns, label: 'BRACKET RUNS' },
                { count: stats.daysActive, label: 'DAYS ACTIVE' }
              ].map((b, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--accent)', lineHeight: 1.1 }}>
                    {b.count}
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--text-3)', marginTop: 4, letterSpacing: '0.04em' }}>
                    {b.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
