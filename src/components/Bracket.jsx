import { useState } from 'react'
import { FlagComponent } from './shared'
import { TEAMS } from '../data/teams'

const ODDS = {
  'France': 18, 'Brazil': 15, 'Argentina': 15, 'Germany': 10, 'Portugal': 8,
  'England': 8, 'Spain': 8, 'Netherlands': 6, 'Belgium': 5, 'Croatia': 4, 'USA': 3
}

const INITIAL_R32 = [
  { teamA: 'Canada', teamB: 'Bosnia and Herzegovina', winner: 'Canada', completed: true },
  { teamA: 'Brazil', teamB: 'Japan', winner: null, completed: false },
  { teamA: 'Germany', teamB: 'Paraguay', winner: null, completed: false },
  { teamA: 'Netherlands', teamB: 'Morocco', winner: null, completed: false },
  { teamA: 'Ivory Coast', teamB: 'Norway', winner: null, completed: false },
  { teamA: 'France', teamB: 'Sweden', winner: null, completed: false },
  { teamA: 'Mexico', teamB: 'Ecuador', winner: null, completed: false },
  { teamA: 'England', teamB: 'DR Congo', winner: null, completed: false },
  { teamA: 'Belgium', teamB: 'Senegal', winner: null, completed: false },
  { teamA: 'USA', teamB: 'South Korea', winner: null, completed: false },
  { teamA: 'Spain', teamB: 'Austria', winner: null, completed: false },
  { teamA: 'Portugal', teamB: 'Croatia', winner: null, completed: false },
  { teamA: 'Switzerland', teamB: 'Algeria', winner: null, completed: false },
  { teamA: 'Australia', teamB: 'Egypt', winner: null, completed: false },
  { teamA: 'Argentina', teamB: 'Cape Verde', winner: null, completed: false },
  { teamA: 'Colombia', teamB: 'Ghana', winner: null, completed: false }
]

function getWinner(teamA, teamB) {
  const oddA = ODDS[teamA] || 1
  const oddB = ODDS[teamB] || 1
  const total = oddA + oddB
  const rand = Math.random() * total
  return rand < oddA ? teamA : teamB
}

export default function Bracket() {
  const [r32, setR32] = useState(INITIAL_R32)
  const [r16, setR16] = useState(Array(8).fill({ teamA: null, teamB: null, winner: null }))
  const [qf, setQf] = useState(Array(4).fill({ teamA: null, teamB: null, winner: null }))
  const [sf, setSf] = useState(Array(2).fill({ teamA: null, teamB: null, winner: null }))
  const [final, setFinal] = useState({ teamA: null, teamB: null, winner: null })
  const [champion, setChampion] = useState(null)

  const [isSimulating, setIsSimulating] = useState(false)
  const [hasSimulated, setHasSimulated] = useState(false)
  const [flashingMatch, setFlashingMatch] = useState(null) // { round: string, idx: number }
  const [hoveredTeam, setHoveredTeam] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const simulateAll = () => {
    setIsSimulating(true)
    let queue = []

    // R32
    const r32Winners = []
    r32.forEach((m, idx) => {
      if (m.completed) {
        r32Winners.push(m.winner)
      } else {
        const winner = getWinner(m.teamA, m.teamB)
        r32Winners.push(winner)
        queue.push({ round: 'r32', matchIdx: idx, winner, teamA: m.teamA, teamB: m.teamB })
      }
    })

    // R16
    const r16Winners = []
    for (let i = 0; i < 8; i++) {
      const teamA = r32Winners[i * 2]
      const teamB = r32Winners[i * 2 + 1]
      const winner = getWinner(teamA, teamB)
      r16Winners.push(winner)
      queue.push({ round: 'r16', matchIdx: i, teamA, teamB, winner })
    }

    // QF
    const qfWinners = []
    for (let i = 0; i < 4; i++) {
      const teamA = r16Winners[i * 2]
      const teamB = r16Winners[i * 2 + 1]
      const winner = getWinner(teamA, teamB)
      qfWinners.push(winner)
      queue.push({ round: 'qf', matchIdx: i, teamA, teamB, winner })
    }

    // SF
    const sfWinners = []
    for (let i = 0; i < 2; i++) {
      const teamA = qfWinners[i * 2]
      const teamB = qfWinners[i * 2 + 1]
      const winner = getWinner(teamA, teamB)
      sfWinners.push(winner)
      queue.push({ round: 'sf', matchIdx: i, teamA, teamB, winner })
    }

    // Final
    const finalA = sfWinners[0]
    const finalB = sfWinners[1]
    const finalWinner = getWinner(finalA, finalB)
    queue.push({ round: 'final', matchIdx: 0, teamA: finalA, teamB: finalB, winner: finalWinner })

    // Champion
    queue.push({ round: 'champion', winner: finalWinner })

    // Execute stagger
    queue.forEach((step, index) => {
      setTimeout(() => {
        if (step.round === 'r32') {
          setR32(prev => {
            const next = [...prev]
            next[step.matchIdx] = { ...next[step.matchIdx], winner: step.winner }
            return next
          })
          setFlashingMatch({ round: 'r32', idx: step.matchIdx })
        } else if (step.round === 'r16') {
          setR16(prev => {
            const next = [...prev]
            next[step.matchIdx] = { teamA: step.teamA, teamB: step.teamB, winner: step.winner }
            return next
          })
          setFlashingMatch({ round: 'r16', idx: step.matchIdx })
        } else if (step.round === 'qf') {
          setQf(prev => {
            const next = [...prev]
            next[step.matchIdx] = { teamA: step.teamA, teamB: step.teamB, winner: step.winner }
            return next
          })
          setFlashingMatch({ round: 'qf', idx: step.matchIdx })
        } else if (step.round === 'sf') {
          setSf(prev => {
            const next = [...prev]
            next[step.matchIdx] = { teamA: step.teamA, teamB: step.teamB, winner: step.winner }
            return next
          })
          setFlashingMatch({ round: 'sf', idx: step.matchIdx })
        } else if (step.round === 'final') {
          setFinal({ teamA: step.teamA, teamB: step.teamB, winner: step.winner })
          setFlashingMatch({ round: 'final', idx: 0 })
        } else if (step.round === 'champion') {
          setChampion(step.winner)
          setFlashingMatch({ round: 'champion', idx: 0 })
          setIsSimulating(false)
          setHasSimulated(true)
        }
      }, index * 200)
    })
  }

  const resetAll = () => {
    setR32(INITIAL_R32)
    setR16(Array(8).fill({ teamA: null, teamB: null, winner: null }))
    setQf(Array(4).fill({ teamA: null, teamB: null, winner: null }))
    setSf(Array(2).fill({ teamA: null, teamB: null, winner: null }))
    setFinal({ teamA: null, teamB: null, winner: null })
    setChampion(null)
    setHasSimulated(false)
    setFlashingMatch(null)
  }

  // Tooltip triggers
  const handleMouseEnter = (teamName, e) => {
    if (!teamName) return
    const teamInfo = TEAMS[teamName]
    if (teamInfo) {
      setHoveredTeam({
        name: teamName,
        titles: teamInfo.titles || 0,
        record: teamInfo.groupRecord || '3-0-0'
      })
      setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 })
    }
  }

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 })
  }

  const handleMouseLeave = () => {
    setHoveredTeam(null)
  }

  // Draw Match SVG with connections
  const renderBracketSVG = () => {
    const colW = 200
    const startY = 20
    const svgW = 1200
    const svgH = 1200

    const getMatchY = (round, index) => {
      const step = svgH / Math.pow(2, 4 - round)
      return startY + index * step + step / 2
    }

    const drawLine = (x1, y1, x2, y2) => {
      const midX = (x1 + x2) / 2
      return `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`
    }

    const renderChip = (team, x, y, isWinner, isLoser, roundKey, matchIdx) => {
      const isFlashing = flashingMatch && flashingMatch.round === roundKey && flashingMatch.idx === matchIdx
      const strokeColor = isFlashing ? 'var(--accent)' : isWinner ? 'var(--accent)' : 'var(--border)'
      const bgColor = isWinner ? '#1A1F00' : 'var(--surface)'
      const textColor = isWinner ? 'var(--accent)' : 'var(--text-1)'

      if (!team) {
        return (
          <g key={`${x}-${y}`} onMouseMove={handleMouseMove}>
            <rect x={x} y={y - 14} width="140" height="28" fill="var(--bg)" stroke="var(--border)" strokeDasharray="3,3" strokeWidth="1" />
            <text x={x + 10} y={y + 4} fill="var(--text-3)" fontSize="10" fontWeight="600">TBD</text>
          </g>
        )
      }

      return (
        <g 
          key={`${x}-${y}-${team}`}
          onMouseEnter={(e) => handleMouseEnter(team, e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ opacity: isLoser ? 0.35 : 1, transition: 'opacity 80ms ease' }}
        >
          <rect 
            x={x} 
            y={y - 14} 
            width="140" 
            height="28" 
            fill={bgColor} 
            stroke={strokeColor} 
            strokeWidth="1"
            style={isFlashing ? { animation: 'flash-accent 0.1s ease 2' } : {}}
          />
          {/* Flag Component inside foreignObject */}
          <foreignObject x={x + 8} y={y - 7} width="20" height="13">
            <FlagComponent teamName={team} size="small" style={{ width: 20, height: 13, border: 'none' }} />
          </foreignObject>
          <text 
            x={x + 34} 
            y={y + 4} 
            fill={textColor} 
            fontSize="11" 
            fontWeight="600"
            clipPath={`url(#clip-${team})`}
          >
            {team.toUpperCase().substring(0, 10)}
          </text>
        </g>
      )
    }

    const paths = []
    const chips = []

    // Round Labels
    const roundLabels = ['R32', 'R16', 'QF', 'SF', 'FINAL', '🏆']
    roundLabels.forEach((label, i) => {
      chips.push(
        <text key={`label-${i}`} x={20 + i * colW} y={15} fill="var(--text-3)" fontSize="10" fontWeight="600" letterSpacing="0.1em">
          {label}
        </text>
      )
    })

    // R32
    r32.forEach((m, idx) => {
      const x = 20
      const y = getMatchY(0, idx)
      const isWinnerA = m.winner === m.teamA
      const isWinnerB = m.winner === m.teamB
      const isLoserA = m.winner && m.winner !== m.teamA
      const isLoserB = m.winner && m.winner !== m.teamB

      chips.push(renderChip(m.teamA, x, y - 18, isWinnerA, isLoserA, 'r32', idx))
      chips.push(renderChip(m.teamB, x, y + 18, isWinnerB, isLoserB, 'r32', idx))

      // Connectors to R16
      const nextX = x + colW
      const nextY = getMatchY(1, Math.floor(idx / 2)) + (idx % 2 === 0 ? -18 : 18)
      paths.push(
        <path key={`p32-${idx}`} d={drawLine(x + 140, y, nextX, nextY)} fill="none" stroke="var(--border-2)" strokeWidth="1" />
      )
    })

    // R16
    r16.forEach((m, idx) => {
      const x = 20 + colW
      const y = getMatchY(1, idx)
      const isWinnerA = m.winner === m.teamA && m.winner !== null
      const isWinnerB = m.winner === m.teamB && m.winner !== null
      const isLoserA = m.winner && m.winner !== m.teamA
      const isLoserB = m.winner && m.winner !== m.teamB

      chips.push(renderChip(m.teamA, x, y - 18, isWinnerA, isLoserA, 'r16', idx))
      chips.push(renderChip(m.teamB, x, y + 18, isWinnerB, isLoserB, 'r16', idx))

      // Connectors to QF
      const nextX = x + colW
      const nextY = getMatchY(2, Math.floor(idx / 2)) + (idx % 2 === 0 ? -18 : 18)
      paths.push(
        <path key={`p16-${idx}`} d={drawLine(x + 140, y, nextX, nextY)} fill="none" stroke="var(--border-2)" strokeWidth="1" />
      )
    })

    // QF
    qf.forEach((m, idx) => {
      const x = 20 + colW * 2
      const y = getMatchY(2, idx)
      const isWinnerA = m.winner === m.teamA && m.winner !== null
      const isWinnerB = m.winner === m.teamB && m.winner !== null
      const isLoserA = m.winner && m.winner !== m.teamA
      const isLoserB = m.winner && m.winner !== m.teamB

      chips.push(renderChip(m.teamA, x, y - 18, isWinnerA, isLoserA, 'qf', idx))
      chips.push(renderChip(m.teamB, x, y + 18, isWinnerB, isLoserB, 'qf', idx))

      // Connectors to SF
      const nextX = x + colW
      const nextY = getMatchY(3, Math.floor(idx / 2)) + (idx % 2 === 0 ? -18 : 18)
      paths.push(
        <path key={`pqf-${idx}`} d={drawLine(x + 140, y, nextX, nextY)} fill="none" stroke="var(--border-2)" strokeWidth="1" />
      )
    })

    // SF
    sf.forEach((m, idx) => {
      const x = 20 + colW * 3
      const y = getMatchY(3, idx)
      const isWinnerA = m.winner === m.teamA && m.winner !== null
      const isWinnerB = m.winner === m.teamB && m.winner !== null
      const isLoserA = m.winner && m.winner !== m.teamA
      const isLoserB = m.winner && m.winner !== m.teamB

      chips.push(renderChip(m.teamA, x, y - 18, isWinnerA, isLoserA, 'sf', idx))
      chips.push(renderChip(m.teamB, x, y + 18, isWinnerB, isLoserB, 'sf', idx))

      // Connectors to Final
      const nextX = x + colW
      const nextY = getMatchY(4, 0) + (idx === 0 ? -18 : 18)
      paths.push(
        <path key={`psf-${idx}`} d={drawLine(x + 140, y, nextX, nextY)} fill="none" stroke="var(--border-2)" strokeWidth="1" />
      )
    })

    // Final
    const finalX = 20 + colW * 4
    const finalY = getMatchY(4, 0)
    const isWinnerA = final.winner === final.teamA && final.winner !== null
    const isWinnerB = final.winner === final.teamB && final.winner !== null
    const isLoserA = final.winner && final.winner !== final.teamA
    const isLoserB = final.winner && final.winner !== final.teamB

    chips.push(renderChip(final.teamA, finalX, finalY - 18, isWinnerA, isLoserA, 'final', 0))
    chips.push(renderChip(final.teamB, finalX, finalY + 18, isWinnerB, isLoserB, 'final', 0))

    // Connector to Champion
    paths.push(
      <path key="pfinal" d={drawLine(finalX + 140, finalY, finalX + colW, finalY)} fill="none" stroke="var(--border-2)" strokeWidth="1" />
    )

    // Champion
    const champX = 20 + colW * 5
    const champY = finalY
    chips.push(renderChip(champion, champX, champY, champion !== null, false, 'champion', 0))

    return (
      <svg width={svgW} height={svgH} style={{ background: 'var(--bg)' }}>
        <g>{paths}</g>
        <g>{chips}</g>
      </svg>
    )
  }

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
            BRACKET
          </h1>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
            ROUND OF 32 → FINAL
          </div>
        </div>

        {hasSimulated ? (
          <button 
            onClick={resetAll}
            style={{
              border: '1px solid var(--border-2)',
              background: 'var(--surface)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-1)',
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'border-color 80ms ease, color 80ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-2)'
              e.currentTarget.style.color = 'var(--text-1)'
            }}
          >
            RESET
          </button>
        ) : (
          <button 
            onClick={simulateAll}
            disabled={isSimulating}
            style={{
              border: '1px solid var(--border-2)',
              background: 'var(--surface)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-1)',
              padding: '8px 16px',
              cursor: 'pointer',
              opacity: isSimulating ? 0.5 : 1,
              transition: 'border-color 80ms ease, color 80ms ease'
            }}
            onMouseEnter={(e) => {
              if (isSimulating) return
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-2)'
              e.currentTarget.style.color = 'var(--text-1)'
            }}
          >
            {isSimulating ? 'SIMULATING...' : 'SIMULATE →'}
          </button>
        )}
      </div>

      {/* SVG CONTAINER */}
      <div style={{ overflowX: 'auto', overflowY: 'hidden', border: '1px solid var(--border)', padding: 16, background: '#0a0a0a' }}>
        {renderBracketSVG()}
      </div>

      {/* REACT STATE HOVER TOOLTIP */}
      {hoveredTeam && (
        <div 
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            background: 'var(--surface-2)',
            border: '1px solid var(--border-2)',
            color: 'var(--text-1)',
            padding: '6px 10px',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: 'var(--shadow-dim)'
          }}
        >
          <strong>{hoveredTeam.name}</strong>
          <div style={{ color: 'var(--text-2)', marginTop: 2 }}>
            WC Titles: {hoveredTeam.titles}
          </div>
          <div style={{ color: 'var(--text-2)' }}>
            Group Stage: {hoveredTeam.record}
          </div>
        </div>
      )}
    </div>
  )
}
