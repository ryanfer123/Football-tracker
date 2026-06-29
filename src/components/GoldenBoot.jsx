import { useState, useEffect } from 'react'
import { FlagComponent } from './shared'

const SCORERS = [
  { rank: 1, name: 'Lionel Messi', code: 'ARG', country: 'Argentina', goals: 5, assists: 3, mins: 72, eliminated: false },
  { rank: 2, name: 'Erling Haaland', code: 'NOR', country: 'Norway', goals: 4, assists: 1, mins: 90, eliminated: false },
  { rank: 3, name: 'Kylian Mbappé', code: 'FRA', country: 'France', goals: 4, assists: 2, mins: 82, eliminated: false },
  { rank: 4, name: 'Vinicius Jr', code: 'BRA', country: 'Brazil', goals: 3, assists: 2, mins: 88, eliminated: false },
  { rank: 5, name: 'Harry Kane', code: 'ENG', country: 'England', goals: 3, assists: 1, mins: 90, eliminated: false },
  { rank: 6, name: 'Robert Lewandowski', code: 'default', country: 'Poland', goals: 3, assists: 0, mins: 90, eliminated: true },
  { rank: 7, name: 'Jude Bellingham', code: 'ENG', country: 'England', goals: 2, assists: 3, mins: 90, eliminated: false },
  { rank: 8, name: 'Rodrygo', code: 'BRA', country: 'Brazil', goals: 2, assists: 2, mins: 78, eliminated: false },
  { rank: 9, name: 'Jamal Musiala', code: 'GER', country: 'Germany', goals: 2, assists: 2, mins: 84, eliminated: false },
  { rank: 10, name: 'Lautaro Martínez', code: 'ARG', country: 'Argentina', goals: 2, assists: 1, mins: 65, eliminated: false },
  { rank: 11, name: 'Antoine Griezmann', code: 'FRA', country: 'France', goals: 2, assists: 1, mins: 76, eliminated: false },
  { rank: 12, name: 'Álvaro Morata', code: 'ESP', country: 'Spain', goals: 2, assists: 0, mins: 70, eliminated: false },
  { rank: 13, name: 'Cristiano Ronaldo', code: 'POR', country: 'Portugal', goals: 2, assists: 0, mins: 80, eliminated: false },
  { rank: 14, name: 'Gonçalo Ramos', code: 'POR', country: 'Portugal', goals: 1, assists: 2, mins: 60, eliminated: false },
  { rank: 15, name: 'Julián Álvarez', code: 'ARG', country: 'Argentina', goals: 1, assists: 1, mins: 70, eliminated: false }
]

const getPlayerDetails = (playerName) => {
  if (playerName === 'Lionel Messi') {
    return {
      goals: [
        { match: 'ARG vs Saudi Arabia', min: "22'", type: 'PKN' },
        { match: 'ARG vs Cape Verde', min: "12'", type: 'FK' },
        { match: 'ARG vs Cape Verde', min: "45'", type: 'Open play' },
        { match: 'ARG vs Cape Verde', min: "67'", type: 'Penalty' },
        { match: 'ARG vs Ghana', min: "78'", type: 'Open play' }
      ],
      dots: [
        { t: '20%', l: '45%' },
        { t: '40%', l: '55%' },
        { t: '30%', l: '50%' },
        { t: '15%', l: '38%' },
        { t: '22%', l: '48%' }
      ],
      ratings: [8.8, 7.9, 8.4, 9.2, 8.1]
    }
  }
  if (playerName === 'Erling Haaland') {
    return {
      goals: [
        { match: 'NOR vs Senegal', min: "14'", type: 'HDR' },
        { match: 'NOR vs Spain', min: "38'", type: 'VOL' },
        { match: 'NOR vs Spain', min: "72'", type: 'VOL' },
        { match: 'NOR vs Spain', min: "89'", type: 'PKN' }
      ],
      dots: [
        { t: '12%', l: '50%' },
        { t: '28%', l: '40%' },
        { t: '32%', l: '48%' },
        { t: '18%', l: '52%' }
      ],
      ratings: [9.0, 8.5, 6.2, 8.7, 7.8]
    }
  }
  if (playerName === 'Kylian Mbappé') {
    return {
      goals: [
        { match: 'FRA vs Australia', min: "9'", type: 'VOL' },
        { match: 'FRA vs Denmark', min: "61'", type: 'HDR' },
        { match: 'FRA vs Denmark', min: "86'", type: 'PKN' },
        { match: 'FRA vs England', min: "44'", type: 'FK' }
      ],
      dots: [
        { t: '30%', l: '30%' },
        { t: '22%', l: '35%' },
        { t: '40%', l: '48%' },
        { t: '15%', l: '32%' }
      ],
      ratings: [8.4, 8.9, 7.2, 8.6, 6.4]
    }
  }
  // Generic Fallback
  return {
    goals: [
      { match: 'Match 1', min: "18'", type: 'VOL' },
      { match: 'Match 2', min: "55'", type: 'PKN' }
    ],
    dots: [
      { t: '25%', l: '50%' },
      { t: '35%', l: '42%' }
    ],
    ratings: [7.2, 6.8, 8.0, 7.4, 6.1]
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
          <td colSpan="6" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 24 }}>
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
    let active = true

    async function fetchScorers() {
      try {
        const res = await fetch('/api/stats/goldenboot')
        const data = await res.json()
        if (!active) return

        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((s, idx) => ({
            rank: s.rank || idx + 1,
            name: s.name || 'Unknown',
            code: s.code || '',
            country: s.country || '',
            logo: s.logo || null,
            goals: s.goals || 0,
            assists: s.assists || 0,
            mins: s.mins || s.minutes || 0,
            eliminated: !!s.eliminated
          }))
          setScorers(mapped)
        } else {
          setScorers(SCORERS)
        }
      } catch (err) {
        setScorers(SCORERS)
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchScorers()
    const id = setInterval(fetchScorers, 60000)
    return () => { active = false; clearInterval(id) }
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
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', background: 'var(--surface)' }}>
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
