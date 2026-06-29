import { useState, useEffect } from 'react'
import { FlagComponent } from './shared'
import { TEAMS } from '../data/teams'

const DEFAULT_TRACKER_DATA = {
  Brazil: {
    status: 'ROUND OF 32',
    nextMatchLabel: 'vs JAPAN · TODAY 22:30',
    form: ['W', 'W', 'W', 'D', 'W'],
    goalsScored: 9,
    goalsConceded: 1,
    keyPlayer: 'Vinicius Jr',
    keyPlayerGoals: 3,
    nextOpponent: 'Japan',
    nextMatchTime: 'JUNE 29, 22:30 IST',
    results: [
      { vs: 'Nigeria', score: '2–0', res: 'W' },
      { vs: 'Netherlands', score: '1–0', res: 'W' },
      { vs: 'Morocco', score: '3–1', res: 'W' }
    ]
  },
  France: {
    status: 'ROUND OF 32',
    nextMatchLabel: 'vs SWEDEN · JUL 01 06:30',
    form: ['W', 'D', 'W', 'W', 'L'],
    goalsScored: 8,
    goalsConceded: 2,
    keyPlayer: 'Kylian Mbappé',
    keyPlayerGoals: 4,
    nextOpponent: 'Sweden',
    nextMatchTime: 'JULY 01, 06:30 IST',
    results: [
      { vs: 'Denmark', score: '2–0', res: 'W' },
      { vs: 'Sweden', score: '1–1', res: 'D' },
      { vs: 'Senegal', score: '2–1', res: 'W' }
    ]
  },
  England: {
    status: 'ROUND OF 32',
    nextMatchLabel: 'vs DR CONGO · JUL 01 21:30',
    form: ['W', 'W', 'D', 'W', 'W'],
    goalsScored: 7,
    goalsConceded: 0,
    keyPlayer: 'Jude Bellingham',
    keyPlayerGoals: 2,
    nextOpponent: 'DR Congo',
    nextMatchTime: 'JULY 01, 21:30 IST',
    results: [
      { vs: 'Serbia', score: '1–0', res: 'W' },
      { vs: 'IR Iran', score: '3–0', res: 'W' },
      { vs: 'USA', score: '1–0', res: 'W' }
    ]
  }
}

const getTeamTrackerData = (teamName) => {
  if (DEFAULT_TRACKER_DATA[teamName]) {
    return DEFAULT_TRACKER_DATA[teamName]
  }

  // Generate realistic details dynamically if they follow another team
  const teamInfo = TEAMS[teamName]
  const keyPlayerName = teamInfo?.keyPlayers?.[0] || `${teamName} Star`

  return {
    status: 'ROUND OF 32',
    nextMatchLabel: 'vs GERMANY · JUL 03 00:30',
    form: ['W', 'D', 'L', 'W', 'D'],
    goalsScored: 5,
    goalsConceded: 3,
    keyPlayer: keyPlayerName,
    keyPlayerGoals: 2,
    nextOpponent: 'Germany',
    nextMatchTime: 'JULY 03, 00:30 IST',
    results: [
      { vs: 'Italy', score: '1–1', res: 'D' },
      { vs: 'Spain', score: '0–1', res: 'L' },
      { vs: 'Australia', score: '2–1', res: 'W' }
    ]
  }
}

export default function Tracker({ onNavigateToTeam, onGoToTeams }) {
  const [followed, setFollowed] = useState([])

  // Load followed list
  useEffect(() => {
    const saved = localStorage.getItem('followedTeams')
    if (saved) {
      setFollowed(JSON.parse(saved))
    } else {
      setFollowed(['Brazil', 'France', 'England'])
    }
  }, [])

  const handleUnfollow = (teamName) => {
    const nextList = followed.filter(t => t !== teamName)
    setFollowed(nextList)
    localStorage.setItem('followedTeams', JSON.stringify(nextList))
  }

  const renderFormSquare = (result, idx) => {
    let bg = 'var(--surface-2)'
    let color = 'var(--text-2)'
    let border = '1px solid var(--border)'

    if (result === 'W') {
      bg = '#1A1F00'
      color = 'var(--accent)'
      border = '1px solid var(--accent)'
    } else if (result === 'L') {
      bg = '#1F0A0A'
      color = 'var(--red)'
      border = '1px solid var(--red)'
    }

    return (
      <div 
        key={idx}
        style={{
          width: 22,
          height: 22,
          background: bg,
          color: color,
          border: border,
          fontSize: 10,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {result}
      </div>
    )
  }

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header" style={{ paddingBottom: 10 }}>
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          TEAM TRACKER
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          PERSONALIZED TOURNAMENT FEED FOR YOUR TEAMS
        </div>
      </div>

      {followed.length === 0 ? (
        /* FEATURE 2: EMPTY STATE */
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: 300, 
            border: '1px solid var(--border)', 
            background: 'var(--surface)',
            textAlign: 'center',
            padding: 24
          }}
        >
          <div className="text-xs" style={{ color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 8 }}>
            FOLLOW TEAMS TO TRACK THEM
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 20 }}>
            Go to Teams tab and click any team to follow
          </div>
          <button
            onClick={onGoToTeams}
            style={{
              border: '1px solid var(--border-2)',
              background: 'var(--surface-2)',
              color: 'var(--text-1)',
              fontSize: 10,
              fontWeight: 600,
              padding: '8px 16px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-2)'}
          >
            GO TO TEAMS →
          </button>
        </div>
      ) : (
        /* FOLLOWED TEAMS LIST */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {followed.map(tName => {
            const data = getTeamTrackerData(tName)
            return (
              <div 
                key={tName}
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* TEAM HEADER ROW */}
                <div 
                  style={{
                    height: 48,
                    padding: '0 16px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <FlagComponent teamName={tName} style={{ width: 40, height: 26, border: 'none' }} />
                  <span 
                    onClick={() => onNavigateToTeam(tName)}
                    style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    {tName}
                  </span>
                  
                  {/* Status chip */}
                  <span 
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: 'var(--accent)',
                      border: '1px solid var(--accent)',
                      padding: '2px 6px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {data.status}
                  </span>

                  {/* Next match right-aligned */}
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-2)', textTransform: 'uppercase' }}>
                    {data.nextMatchLabel}
                  </span>

                  {/* Unfollow Button */}
                  <button 
                    onClick={() => handleUnfollow(tName)}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'var(--text-3)', 
                      fontSize: 10, 
                      cursor: 'pointer',
                      marginLeft: 8 
                    }}
                  >
                    × UNFOLLOW
                  </button>
                </div>

                {/* CONTENT ROW */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                  {/* FORM BLOCK */}
                  <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid var(--border)' }}>
                    <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 6 }}>FORM</div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {data.form.map((r, idx) => renderFormSquare(r, idx))}
                    </div>
                  </div>

                  {/* GOALS BLOCK */}
                  <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid var(--border)' }}>
                    <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 6 }}>GOALS</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                      <div>
                        <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-1)', lineHeight: 1 }}>{data.goalsScored}</span>
                        <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 4 }}>scored</span>
                      </div>
                      <div>
                        <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-3)', lineHeight: 1 }}>{data.goalsConceded}</span>
                        <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 4 }}>conceded</span>
                      </div>
                    </div>
                  </div>

                  {/* KEY PLAYER BLOCK */}
                  <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid var(--border)' }}>
                    <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 6 }}>KEY PLAYER</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{data.keyPlayer}</span>
                      <span style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>⚽ {data.keyPlayerGoals} GOALS</span>
                    </div>
                  </div>

                  {/* NEXT MATCH BLOCK */}
                  <div style={{ flex: 1, padding: '12px 16px' }}>
                    <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 6 }}>NEXT MATCH</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FlagComponent teamName={data.nextOpponent} size="small" />
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', textTransform: 'uppercase' }}>
                        vs {data.nextOpponent}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{data.nextMatchTime}</div>
                  </div>
                </div>

                {/* RECENT RESULTS STRIP */}
                <div 
                  style={{
                    height: 32,
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--bg)',
                    gap: 16
                  }}
                >
                  <span style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.04em' }}>RESULTS</span>
                  {data.results.map((r, idx) => {
                    let chipColor = 'var(--text-2)'
                    let chipBg = 'var(--surface)'
                    if (r.res === 'W') {
                      chipColor = 'var(--accent)'
                      chipBg = '#1A1F00'
                    } else if (r.res === 'L') {
                      chipColor = 'var(--red)'
                      chipBg = '#1F0A0A'
                    }

                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <FlagComponent teamName={r.vs} size="small" />
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)' }}>{r.score}</span>
                        <span 
                          style={{ 
                            fontSize: 9, 
                            fontWeight: 700, 
                            color: chipColor, 
                            background: chipBg,
                            padding: '1px 4px', 
                            border: `1px solid ${r.res === 'W' ? 'var(--accent)' : r.res === 'L' ? 'var(--red)' : 'var(--border)'}` 
                          }}
                        >
                          {r.res}
                        </span>
                        {idx < data.results.length - 1 && (
                          <div style={{ width: 1, height: 16, background: 'var(--border)', marginLeft: 12 }} />
                        )}
                      </div>
                    )}
                  )}
                </div>
              </div>
            )
          })}

          <button 
            onClick={() => onGoToTeams && onGoToTeams()}
            style={{
              width: '100%',
              padding: 24,
              border: '2px dashed var(--border-2)',
              background: 'transparent',
              color: 'var(--text-2)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              marginTop: 16,
              transition: 'border-color 80ms ease, color 80ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-2)'
              e.currentTarget.style.color = 'var(--text-2)'
            }}
          >
            + ADD ANOTHER TEAM
          </button>
        </div>
      )}
    </div>
  )
}
