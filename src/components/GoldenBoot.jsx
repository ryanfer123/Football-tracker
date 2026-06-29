import { useState, useEffect } from 'react'
import { FlagComponent } from './shared'
import { GOLDEN_BOOT } from '../data/matchData'
import { TEAMS } from '../data/teams'

const getTeamCode = (country) => {
  const team = Object.entries(TEAMS).find(([name]) => name === country)
  return team ? team[1].code : country.substring(0, 3).toUpperCase()
}

const SCORERS = GOLDEN_BOOT.map(p => ({
  rank: p.rank,
  name: p.name,
  code: getTeamCode(p.country),
  country: p.country,
  goals: p.goals,
  assists: p.assists,
  mins: p.mins,
  eliminated: p.status !== 'IN'
}))

const getPlayerDetails = (playerName) => {
  const player = GOLDEN_BOOT.find(p => p.name === playerName)
  if (player?.goalDetails) {
    return {
      goals: player.goalDetails.map(g => ({
        match: g.match,
        min: `${g.minute}'`,
        type: g.type
      })),
      dots: [
        { t: '20%', l: '45%' },
        { t: '40%', l: '55%' },
        { t: '30%', l: '50%' },
        { t: '15%', l: '38%' },
        { t: '22%', l: '48%' }
      ].slice(0, player.goals),
      ratings: player.matchRatings || []
    }
  }
  return {
    goals: [{ match: 'Match 1', min: "18'", type: 'Open play' }],
    dots: [{ t: '25%', l: '50%' }],
    ratings: [7.0, 7.5, 8.0]
  }
}

function ScorerRow({ row, selectedPlayerName, setSelectedPlayerName }) {
  const [expanded, setExpanded] = useState(false)
  const isFirst = row.rank === 1
  const rowBorderLeft = isFirst ? '2px solid var(--accent)' : 'none'
  const details = getPlayerDetails(row.name)

  const getRatingBorderColor = (val) => {
    if (val >= 8.0) return 'var(--accent)'
    if (val >= 6.5) return 'var(--border-2)'
    return 'var(--red)'
  }

  useEffect(() => {
    if (selectedPlayerName && row.name === selectedPlayerName) {
      setExpanded(true)
      if (setSelectedPlayerName) {
        setSelectedPlayerName(null)
      }
    }
  }, [selectedPlayerName])

  return (
    <>
      <tr
        className="scorer-row"
        onClick={() => setExpanded(!expanded)}
        style={{
          height: 48,
          borderBottom: '1px solid var(--border)',
          borderLeft: rowBorderLeft,
          transition: 'background 80ms ease',
          cursor: 'pointer',
          opacity: row.eliminated ? 0.5 : 1
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        {/* Rank */}
        <td style={{ padding: '0 16px', fontSize: 13, fontWeight: 700, color: isFirst ? 'var(--accent)' : 'var(--text-3)' }}>
          {row.rank}
        </td>
        
        {/* Player Name */}
        <td style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FlagComponent teamCode={row.code} logoUrl={row.logo} size="tiny" style={{ width: 20, height: 13 }} />
            <span 
              style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                color: 'var(--text-1)',
                textDecoration: row.eliminated ? 'line-through' : 'none'
              }}
            >
              {row.name}
            </span>
          </div>
        </td>

        {/* Country Name */}
        <td style={{ padding: '0 16px', fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase' }}>
          {row.country}
        </td>

        {/* Goals */}
        <td style={{ padding: '0 16px', fontSize: 18, fontWeight: 800, color: isFirst ? 'var(--accent)' : 'var(--text-1)', textAlign: 'right' }}>
          {row.goals}
        </td>

        {/* Assists */}
        <td style={{ padding: '0 16px', fontSize: 13, color: 'var(--text-2)', textAlign: 'right' }}>
          {row.assists}
        </td>

        {/* Mins/G */}
        <td style={{ padding: '0 16px', fontSize: 12, color: 'var(--text-3)', textAlign: 'right' }}>
          {row.mins}m
        </td>
      </tr>

      {/* Expanded Details Panel */}
      {expanded && (
        <tr onClick={(e) => e.stopPropagation()} style={{ background: 'var(--surface)' }}>
          <td className="scorer-card" colSpan="6" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div className="player-detail" style={{ display: 'flex', gap: 24 }}>
              {/* Goal Log */}
              <div style={{ flex: 1 }}>
                <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>GOAL LOG</div>
                <div style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                  {details.goals.map((g, idx) => (
                    <div 
                      key={idx}
                      style={{
                        height: 28,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px',
                        borderBottom: idx < details.goals.length - 1 ? '1px solid var(--border)' : 'none',
                        fontSize: 12
                      }}
                    >
                      <span style={{ color: 'var(--text-3)', flex: 1 }}>{g.match}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-2)', marginRight: 12 }}>{g.min}</span>
                      <span 
                        style={{
                          fontSize: 9,
                          fontWeight: 600,
                          padding: '1px 4px',
                          border: '1px solid var(--border)',
                          background: 'var(--surface)',
                          color: 'var(--text-3)'
                        }}
                      >
                        {g.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heat Map Coordinate Dots */}
              <div>
                <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>GOAL ZONES</div>
                <div
                  className="goal-heatmap"
                  style={{
                    width: 200,
                    height: 120,
                    background: '#0A1A0A',
                    border: '1px solid var(--border)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Pitch outlines */}
                  <div style={{ position: 'absolute', left: '10%', right: '10%', top: 0, height: 18, borderBottom: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }} />
                  <div style={{ position: 'absolute', left: '25%', right: '25%', top: 0, height: 8, borderBottom: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }} />
                  <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 22, width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                  
                  {details.dots.map((dot, idx) => (
                    <div 
                      key={idx}
                      style={{
                        position: 'absolute',
                        top: dot.t,
                        left: dot.l,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        boxShadow: '0 0 4px var(--accent)'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Match Ratings */}
              <div>
                <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>MATCH RATINGS</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {details.ratings.map((rating, idx) => (
                    <div 
                      key={idx}
                      style={{
                        width: 32,
                        height: 32,
                        border: `1px solid ${getRatingBorderColor(rating)}`,
                        background: 'var(--surface-2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        color: rating >= 8.0 ? 'var(--accent)' : rating >= 6.5 ? 'var(--text-1)' : 'var(--red)'
                      }}
                    >
                      {rating.toFixed(1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default function GoldenBoot({ selectedPlayerName, setSelectedPlayerName }) {
  const [scorers, setScorers] = useState(SCORERS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setScorers(SCORERS)
    setLoading(false)
  }, [])

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          GOLDEN BOOT
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          TOP SCORERS — WC2026
        </div>
      </div>

      {/* TABLE */}
      <div className="scorers-table" style={{ overflowX: 'auto', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-2)', background: 'var(--bg)' }}>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 60 }}>#</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px' }}>PLAYER</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 120 }}>COUNTRY</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 80, textAlign: 'right' }}>GOALS</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 100, textAlign: 'right' }}>ASSISTS</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 100, textAlign: 'right' }}>MINS/G</th>
            </tr>
          </thead>
          <tbody>
            {scorers.map((row) => (
              <ScorerRow 
                key={row.rank + '::' + row.name} 
                row={row} 
                selectedPlayerName={selectedPlayerName}
                setSelectedPlayerName={setSelectedPlayerName}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
