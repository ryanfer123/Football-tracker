import { useState, useCallback } from 'react'
import { BRACKET } from '../data/matchData'
import { TEAMS } from '../data/teams'
import { seededRandom, predictMatch } from './shared'

const ROUNDS = ['ROUND OF 32', 'ROUND OF 16', 'QUARTERFINALS', 'SEMIFINALS', 'FINAL', '🏆']

function BracketChip({ team, isWinner, isLoser, isUpcoming, x, y, onClick, onMouseEnter, onMouseLeave }) {
  const w = 140, h = 28
  const teamData = TEAMS[team]

  return (
    <g
      className={`bracket-chip ${isWinner ? 'winner' : ''} ${isLoser ? 'loser' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <rect x={x} y={y} width={w} height={h} fill={isWinner ? '#000' : '#fff'} stroke="#000" strokeWidth="2"
        strokeDasharray={isUpcoming && !team ? '4,4' : 'none'} />
      <text x={x + 8} y={y + 18} fontSize="11" fontWeight="700" fontFamily="Space Grotesk"
        fill={isWinner ? '#fff' : team ? '#000' : '#FF2D00'} textAnchor="start"
        style={{ textTransform: 'uppercase', textDecoration: isLoser ? 'line-through' : 'none' }}>
        {team ? `${teamData?.flag || ''} ${team}` : 'TBD'}
      </text>
      {isWinner && (
        <text x={x + w - 8} y={y + 18} fontSize="12" fill="#AAFF00" textAnchor="end">✓</text>
      )}
    </g>
  )
}

export default function Bracket() {
  const [simulated, setSimulated] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const [drawer, setDrawer] = useState(null)

  const simulateAll = useCallback(() => {
    const rng = seededRandom(2026)
    const results = { left: [], right: [] }

    // Simulate remaining R32 matches
    const allR32 = [...BRACKET.roundOf32.left, ...BRACKET.roundOf32.right]
    const r32Winners = allR32.map(m => {
      if (m.completed) return m.winner
      const pred = predictMatch(m.teamA, m.teamB)
      if (!pred) return m.teamA
      return rng() < (pred.probA / 100) ? m.teamA : m.teamB
    })

    const leftWinners = r32Winners.slice(0, 8)
    const rightWinners = r32Winners.slice(8, 16)

    // R16
    const r16Left = [], r16Right = []
    for (let i = 0; i < 8; i += 2) {
      const a = leftWinners[i], b = leftWinners[i + 1]
      const winner = rng() < 0.55 ? a : b
      r16Left.push({ teamA: a, teamB: b, winner })
    }
    for (let i = 0; i < 8; i += 2) {
      const a = rightWinners[i], b = rightWinners[i + 1]
      const winner = rng() < 0.55 ? a : b
      r16Right.push({ teamA: a, teamB: b, winner })
    }

    // QF
    const qfLeft = [], qfRight = []
    for (let i = 0; i < 4; i += 2) {
      const a = r16Left[i].winner, b = r16Left[i + 1].winner
      qfLeft.push({ teamA: a, teamB: b, winner: rng() < 0.5 ? a : b })
    }
    for (let i = 0; i < 4; i += 2) {
      const a = r16Right[i].winner, b = r16Right[i + 1].winner
      qfRight.push({ teamA: a, teamB: b, winner: rng() < 0.5 ? a : b })
    }

    // SF
    const sfLeft = { teamA: qfLeft[0].winner, teamB: qfLeft[1].winner, winner: rng() < 0.5 ? qfLeft[0].winner : qfLeft[1].winner }
    const sfRight = { teamA: qfRight[0].winner, teamB: qfRight[1].winner, winner: rng() < 0.5 ? qfRight[0].winner : qfRight[1].winner }

    // Final
    const final = { teamA: sfLeft.winner, teamB: sfRight.winner, winner: rng() < 0.5 ? sfLeft.winner : sfRight.winner }

    setSimulated({
      r32Winners, leftWinners, rightWinners,
      r16Left, r16Right, qfLeft, qfRight,
      sfLeft, sfRight, final
    })
  }, [])

  const reset = () => setSimulated(null)

  // Layout constants
  const colW = 160
  const matchH = 64
  const matchGap = 8
  const startY = 20
  const svgW = colW * 11 + 40
  const svgH = Math.max(matchH * 16 + matchGap * 16 + startY + 40, 960)

  const getMatchY = (round, index, totalInRound) => {
    const baseSpacing = matchH + matchGap
    const offset = Math.pow(2, round) * baseSpacing / 2
    return startY + index * offset * 2 + offset / 2 - matchH / 2
  }

  const handleChipHover = (team, x, y) => {
    const t = TEAMS[team]
    if (!t) return
    setTooltip({
      x, y: y - 10,
      text: `${t.titles > 0 ? `${t.titles} WC title(s)` : 'No WC titles'} | Rank #${t.ranking}`
    })
  }

  // Render the bracket SVG
  const renderBracketSVG = () => {
    const elements = []
    const leftMatches = BRACKET.roundOf32.left
    const rightMatches = BRACKET.roundOf32.right

    // R32 Left
    leftMatches.forEach((m, i) => {
      const x = 10
      const y = startY + i * (matchH + matchGap)
      const isComplete = m.completed || (simulated && simulated.leftWinners[i])
      const winner = m.completed ? m.winner : simulated?.leftWinners[i]

      elements.push(
        <g key={`L32-${i}`}>
          <BracketChip team={m.teamA} x={x} y={y}
            isWinner={isComplete && winner === m.teamA}
            isLoser={isComplete && winner !== m.teamA}
            onClick={() => setDrawer(m)}
            onMouseEnter={() => handleChipHover(m.teamA, x + 70, y)}
            onMouseLeave={() => setTooltip(null)} />
          <BracketChip team={m.teamB} x={x} y={y + 30}
            isWinner={isComplete && winner === m.teamB}
            isLoser={isComplete && winner !== m.teamB}
            onClick={() => setDrawer(m)}
            onMouseEnter={() => handleChipHover(m.teamB, x + 70, y + 30)}
            onMouseLeave={() => setTooltip(null)} />
          {/* Bracket line */}
          <line x1={x + 140} y1={y + 14} x2={x + 155} y2={y + 14} stroke="#000" strokeWidth="2" />
          <line x1={x + 140} y1={y + 44} x2={x + 155} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x + 155} y1={y + 14} x2={x + 155} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x + 155} y1={y + 29} x2={x + 170} y2={y + 29} stroke="#000" strokeWidth="2" />
        </g>
      )
    })

    // R32 Right
    rightMatches.forEach((m, i) => {
      const x = svgW - 150
      const y = startY + i * (matchH + matchGap)
      const isComplete = simulated && simulated.rightWinners[i]
      const winner = simulated?.rightWinners[i]

      elements.push(
        <g key={`R32-${i}`}>
          <BracketChip team={m.teamA} x={x} y={y}
            isWinner={isComplete && winner === m.teamA}
            isLoser={isComplete && winner !== m.teamA}
            onClick={() => setDrawer(m)}
            onMouseEnter={() => handleChipHover(m.teamA, x + 70, y)}
            onMouseLeave={() => setTooltip(null)} />
          <BracketChip team={m.teamB} x={x} y={y + 30}
            isWinner={isComplete && winner === m.teamB}
            isLoser={isComplete && winner !== m.teamB}
            onClick={() => setDrawer(m)}
            onMouseEnter={() => handleChipHover(m.teamB, x + 70, y + 30)}
            onMouseLeave={() => setTooltip(null)} />
          <line x1={x} y1={y + 14} x2={x - 15} y2={y + 14} stroke="#000" strokeWidth="2" />
          <line x1={x} y1={y + 44} x2={x - 15} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x - 15} y1={y + 14} x2={x - 15} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x - 15} y1={y + 29} x2={x - 30} y2={y + 29} stroke="#000" strokeWidth="2" />
        </g>
      )
    })

    // R16 Left
    for (let i = 0; i < 4; i++) {
      const x = 180
      const y = startY + i * (matchH + matchGap) * 2 + (matchH + matchGap) / 2 - 14
      const match = simulated?.r16Left[i]

      elements.push(
        <g key={`L16-${i}`}>
          <BracketChip team={match?.teamA || null} x={x} y={y}
            isWinner={match && match.winner === match.teamA}
            isLoser={match && match.winner !== match.teamA} isUpcoming={!match}
            onMouseEnter={() => match?.teamA && handleChipHover(match.teamA, x + 70, y)}
            onMouseLeave={() => setTooltip(null)} />
          <BracketChip team={match?.teamB || null} x={x} y={y + 30}
            isWinner={match && match.winner === match.teamB}
            isLoser={match && match.winner !== match.teamB} isUpcoming={!match}
            onMouseEnter={() => match?.teamB && handleChipHover(match.teamB, x + 70, y + 30)}
            onMouseLeave={() => setTooltip(null)} />
          <line x1={x + 140} y1={y + 14} x2={x + 155} y2={y + 14} stroke="#000" strokeWidth="2" />
          <line x1={x + 140} y1={y + 44} x2={x + 155} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x + 155} y1={y + 14} x2={x + 155} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x + 155} y1={y + 29} x2={x + 170} y2={y + 29} stroke="#000" strokeWidth="2" />
        </g>
      )
    }

    // R16 Right
    for (let i = 0; i < 4; i++) {
      const x = svgW - 320
      const y = startY + i * (matchH + matchGap) * 2 + (matchH + matchGap) / 2 - 14
      const match = simulated?.r16Right[i]

      elements.push(
        <g key={`R16-${i}`}>
          <BracketChip team={match?.teamA || null} x={x} y={y}
            isWinner={match && match.winner === match.teamA}
            isLoser={match && match.winner !== match.teamA} isUpcoming={!match}
            onMouseEnter={() => match?.teamA && handleChipHover(match.teamA, x + 70, y)}
            onMouseLeave={() => setTooltip(null)} />
          <BracketChip team={match?.teamB || null} x={x} y={y + 30}
            isWinner={match && match.winner === match.teamB}
            isLoser={match && match.winner !== match.teamB} isUpcoming={!match}
            onMouseEnter={() => match?.teamB && handleChipHover(match.teamB, x + 70, y + 30)}
            onMouseLeave={() => setTooltip(null)} />
          <line x1={x} y1={y + 14} x2={x - 15} y2={y + 14} stroke="#000" strokeWidth="2" />
          <line x1={x} y1={y + 44} x2={x - 15} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x - 15} y1={y + 14} x2={x - 15} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x - 15} y1={y + 29} x2={x - 30} y2={y + 29} stroke="#000" strokeWidth="2" />
        </g>
      )
    }

    // QF Left
    for (let i = 0; i < 2; i++) {
      const x = 350
      const y = startY + i * (matchH + matchGap) * 4 + (matchH + matchGap) * 1.5 - 14
      const match = simulated?.qfLeft[i]

      elements.push(
        <g key={`LQF-${i}`}>
          <BracketChip team={match?.teamA || null} x={x} y={y}
            isWinner={match && match.winner === match.teamA}
            isLoser={match && match.winner !== match.teamA} isUpcoming={!match}
            onMouseEnter={() => match?.teamA && handleChipHover(match.teamA, x + 70, y)}
            onMouseLeave={() => setTooltip(null)} />
          <BracketChip team={match?.teamB || null} x={x} y={y + 30}
            isWinner={match && match.winner === match.teamB}
            isLoser={match && match.winner !== match.teamB} isUpcoming={!match}
            onMouseEnter={() => match?.teamB && handleChipHover(match.teamB, x + 70, y + 30)}
            onMouseLeave={() => setTooltip(null)} />
          <line x1={x + 140} y1={y + 14} x2={x + 155} y2={y + 14} stroke="#000" strokeWidth="2" />
          <line x1={x + 140} y1={y + 44} x2={x + 155} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x + 155} y1={y + 14} x2={x + 155} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x + 155} y1={y + 29} x2={x + 170} y2={y + 29} stroke="#000" strokeWidth="2" />
        </g>
      )
    }

    // QF Right
    for (let i = 0; i < 2; i++) {
      const x = svgW - 490
      const y = startY + i * (matchH + matchGap) * 4 + (matchH + matchGap) * 1.5 - 14
      const match = simulated?.qfRight[i]

      elements.push(
        <g key={`RQF-${i}`}>
          <BracketChip team={match?.teamA || null} x={x} y={y}
            isWinner={match && match.winner === match.teamA}
            isLoser={match && match.winner !== match.teamA} isUpcoming={!match}
            onMouseEnter={() => match?.teamA && handleChipHover(match.teamA, x + 70, y)}
            onMouseLeave={() => setTooltip(null)} />
          <BracketChip team={match?.teamB || null} x={x} y={y + 30}
            isWinner={match && match.winner === match.teamB}
            isLoser={match && match.winner !== match.teamB} isUpcoming={!match}
            onMouseEnter={() => match?.teamB && handleChipHover(match.teamB, x + 70, y + 30)}
            onMouseLeave={() => setTooltip(null)} />
          <line x1={x} y1={y + 14} x2={x - 15} y2={y + 14} stroke="#000" strokeWidth="2" />
          <line x1={x} y1={y + 44} x2={x - 15} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x - 15} y1={y + 14} x2={x - 15} y2={y + 44} stroke="#000" strokeWidth="2" />
          <line x1={x - 15} y1={y + 29} x2={x - 30} y2={y + 29} stroke="#000" strokeWidth="2" />
        </g>
      )
    }

    // SF Left
    {
      const x = 520
      const y = startY + (matchH + matchGap) * 3
      const match = simulated?.sfLeft

      elements.push(
        <g key="LSF">
          <BracketChip team={match?.teamA || null} x={x} y={y}
            isWinner={match && match.winner === match.teamA}
            isLoser={match && match.winner !== match.teamA} isUpcoming={!match}
            onMouseEnter={() => match?.teamA && handleChipHover(match.teamA, x + 70, y)}
            onMouseLeave={() => setTooltip(null)} />
          <BracketChip team={match?.teamB || null} x={x} y={y + 30}
            isWinner={match && match.winner === match.teamB}
            isLoser={match && match.winner !== match.teamB} isUpcoming={!match}
            onMouseEnter={() => match?.teamB && handleChipHover(match.teamB, x + 70, y + 30)}
            onMouseLeave={() => setTooltip(null)} />
          <line x1={x + 140} y1={y + 29} x2={x + 170} y2={y + 29} stroke="#000" strokeWidth="2" />
        </g>
      )
    }

    // SF Right
    {
      const x = svgW - 660
      const y = startY + (matchH + matchGap) * 3
      const match = simulated?.sfRight

      elements.push(
        <g key="RSF">
          <BracketChip team={match?.teamA || null} x={x} y={y}
            isWinner={match && match.winner === match.teamA}
            isLoser={match && match.winner !== match.teamA} isUpcoming={!match}
            onMouseEnter={() => match?.teamA && handleChipHover(match.teamA, x + 70, y)}
            onMouseLeave={() => setTooltip(null)} />
          <BracketChip team={match?.teamB || null} x={x} y={y + 30}
            isWinner={match && match.winner === match.teamB}
            isLoser={match && match.winner !== match.teamB} isUpcoming={!match}
            onMouseEnter={() => match?.teamB && handleChipHover(match.teamB, x + 70, y + 30)}
            onMouseLeave={() => setTooltip(null)} />
          <line x1={x} y1={y + 29} x2={x - 30} y2={y + 29} stroke="#000" strokeWidth="2" />
        </g>
      )
    }

    // FINAL
    {
      const x = svgW / 2 - 70
      const y = startY + (matchH + matchGap) * 3 - 20
      const match = simulated?.final

      elements.push(
        <g key="FINAL">
          <rect x={x - 4} y={y - 30} width={148} height={24} fill="#000" />
          <text x={x + 70} y={y - 12} fontSize="13" fontWeight="700" fill="#fff" fontFamily="Space Grotesk" textAnchor="middle">
            FINAL
          </text>
          <BracketChip team={match?.teamA || null} x={x} y={y}
            isWinner={match && match.winner === match.teamA}
            isLoser={match && match.winner !== match.teamA} isUpcoming={!match}
            onMouseEnter={() => match?.teamA && handleChipHover(match.teamA, x + 70, y)}
            onMouseLeave={() => setTooltip(null)} />
          <BracketChip team={match?.teamB || null} x={x} y={y + 30}
            isWinner={match && match.winner === match.teamB}
            isLoser={match && match.winner !== match.teamB} isUpcoming={!match}
            onMouseEnter={() => match?.teamB && handleChipHover(match.teamB, x + 70, y + 30)}
            onMouseLeave={() => setTooltip(null)} />
          {match?.winner && (
            <>
              <text x={x + 70} y={y + 80} fontSize="20" fontWeight="700" fill="#000" fontFamily="Space Grotesk" textAnchor="middle">
                🏆 {match.winner.toUpperCase()}
              </text>
              <text x={x + 70} y={y + 96} fontSize="11" fontWeight="600" fill="#FF2D00" fontFamily="Space Grotesk" textAnchor="middle">
                WORLD CHAMPIONS 2026
              </text>
            </>
          )}
        </g>
      )
    }

    // Round labels
    const roundLabels = ['R32', 'R16', 'QF', 'SF', 'FINAL', 'SF', 'QF', 'R16', 'R32']
    const labelXs = [10 + 70, 180 + 70, 350 + 70, 520 + 70, svgW / 2, svgW - 660 + 70, svgW - 490 + 70, svgW - 320 + 70, svgW - 150 + 70]
    roundLabels.forEach((label, i) => {
      elements.push(
        <text key={`label-${i}`} x={labelXs[i]} y={svgH - 10} fontSize="9" fontWeight="700" fill="#888"
          fontFamily="Space Grotesk" textAnchor="middle" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
          {label}
        </text>
      )
    })

    return elements
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">🏆 Knockout Bracket</h1>
          <p className="page-subtitle">Round of 32 → Final • Interactive visualization</p>
        </div>
        <div className="bracket-controls">
          {!simulated ? (
            <button className="btn btn-primary" onClick={simulateAll}>SIMULATE REST →</button>
          ) : (
            <button className="btn btn-outline" onClick={reset}>RESET</button>
          )}
        </div>
      </div>

      <div className="bracket-container">
        <svg width={svgW} height={svgH} className="bracket-svg">
          {renderBracketSVG()}
          {tooltip && (
            <g>
              <rect x={tooltip.x - 80} y={tooltip.y - 22} width={160} height={20} fill="#000" />
              <text x={tooltip.x} y={tooltip.y - 8} fontSize="9" fill="#fff" fontFamily="Space Grotesk"
                textAnchor="middle" fontWeight="600">
                {tooltip.text}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Drawer */}
      {drawer && (
        <>
          <div className="drawer-overlay" onClick={() => setDrawer(null)} />
          <div className="drawer open">
            <button className="drawer-close" onClick={() => setDrawer(null)}>✕</button>
            <h2 style={{ fontSize: 20, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>
              {drawer.teamA} vs {drawer.teamB}
            </h2>
            {drawer.completed && (
              <div style={{ marginBottom: 16 }}>
                <span className="match-status status-ft">FT</span>
                <span style={{ marginLeft: 12, fontSize: 28, fontWeight: 700 }}>{drawer.scoreA} — {drawer.scoreB}</span>
              </div>
            )}
            <div className="detail-title" style={{ marginTop: 16 }}>AI Prediction</div>
            {(() => {
              const pred = predictMatch(drawer.teamA, drawer.teamB)
              if (!pred) return <p>No prediction available</p>
              return (
                <div>
                  <div className="prob-bar-container">
                    <div className="prob-bar">
                      <div className="segment" style={{ width: `${pred.probA}%`, background: '#000' }}>{pred.probA}%</div>
                      <div className="segment" style={{ width: `${pred.probDraw}%`, background: '#888' }}>{pred.probDraw}%</div>
                      <div className="segment" style={{ width: `${pred.probB}%`, background: '#FF2D00' }}>{pred.probB}%</div>
                    </div>
                    <div className="prob-labels">
                      <span>{drawer.teamA}</span>
                      <span>Draw</span>
                      <span>{drawer.teamB}</span>
                    </div>
                  </div>
                  <div className="predicted-score">{pred.goalsA} — {pred.goalsB}</div>
                  <div className="factor-tags">
                    {pred.factors.map((f, i) => <span key={i} className="factor-tag">{f}</span>)}
                  </div>
                  <div className="ai-reasoning">{pred.reasoning}</div>
                  <span className={`confidence-badge confidence-${pred.confidence}`}>
                    CONFIDENCE: {pred.confidence}
                  </span>
                </div>
              )
            })()}
          </div>
        </>
      )}
    </div>
  )
}
