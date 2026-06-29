import { useState } from 'react'
import { FlagComponent } from './shared'
import { TEAMS } from '../data/teams'
import { ODDS, INITIAL_R32 } from '../data/odds'

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
  const [predWinners, setPredWinners] = useState(null)
  const [simulationStep, setSimulationStep] = useState(0)
  const [isChampFlashing, setIsChampFlashing] = useState(false)
  const [highlightTeam, setHighlightTeam] = useState('NONE')

  const [flashingMatch, setFlashingMatch] = useState(null)
  const [hoveredTeam, setHoveredTeam] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const teamList = Object.keys(TEAMS).sort()

  const getR32Index = (tName) => {
    return INITIAL_R32.findIndex(m => m.teamA === tName || m.teamB === tName)
  }

  const isMatchInPath = (roundKey, matchIdx, tName) => {
    if (!tName || tName === 'NONE') return false
    const r32Idx = getR32Index(tName)
    if (r32Idx === -1) return false

    if (roundKey === 'r32') return matchIdx === r32Idx
    if (roundKey === 'r16') return matchIdx === Math.floor(r32Idx / 2)
    if (roundKey === 'qf') return matchIdx === Math.floor(r32Idx / 4)
    if (roundKey === 'sf') return matchIdx === Math.floor(r32Idx / 8)
    if (roundKey === 'final') return true
    if (roundKey === 'champion') return true
    return false
  }

  const prepareWinners = () => {
    const r32W = []
    r32.forEach((m) => {
      r32W.push(m.completed ? m.winner : getWinner(m.teamA, m.teamB))
    })

    const r16W = []
    for (let i = 0; i < 8; i++) {
      r16W.push(getWinner(r32W[i * 2], r32W[i * 2 + 1]))
    }

    const qfW = []
    for (let i = 0; i < 4; i++) {
      qfW.push(getWinner(r16W[i * 2], r16W[i * 2 + 1]))
    }

    const sfW = []
    for (let i = 0; i < 2; i++) {
      sfW.push(getWinner(qfW[i * 2], qfW[i * 2 + 1]))
    }

    const finalWinner = getWinner(sfW[0], sfW[1])

    return { r32W, r16W, qfW, sfW, finalWinner }
  }

  const simulateAll = () => {
    setIsSimulating(true)
    const pw = prepareWinners()
    setPredWinners(pw)

    let delay = 0

    // 1. Simulate R32
    pw.r32W.forEach((winner, idx) => {
      setTimeout(() => {
        setR32(prev => {
          const next = [...prev]
          next[idx] = { ...next[idx], winner }
          return next
        })
        setFlashingMatch({ round: 'r32', idx })
      }, delay)
      delay += 50
    })

    delay += 400

    // 2. Simulate R16
    pw.r16W.forEach((winner, idx) => {
      const teamA = pw.r32W[idx * 2]
      const teamB = pw.r32W[idx * 2 + 1]
      setTimeout(() => {
        setR16(prev => {
          const next = [...prev]
          next[idx] = { teamA, teamB, winner }
          return next
        })
        setFlashingMatch({ round: 'r16', idx })
      }, delay)
      delay += 50
    })

    delay += 400

    // 3. Simulate QF
    pw.qfW.forEach((winner, idx) => {
      const teamA = pw.r16W[idx * 2]
      const teamB = pw.r16W[idx * 2 + 1]
      setTimeout(() => {
        setQf(prev => {
          const next = [...prev]
          next[idx] = { teamA, teamB, winner }
          return next
        })
        setFlashingMatch({ round: 'qf', idx })
      }, delay)
      delay += 50
    })

    delay += 400

    // 4. Simulate SF
    pw.sfW.forEach((winner, idx) => {
      const teamA = pw.qfW[idx * 2]
      const teamB = pw.qfW[idx * 2 + 1]
      setTimeout(() => {
        setSf(prev => {
          const next = [...prev]
          next[idx] = { teamA, teamB, winner }
          return next
        })
        setFlashingMatch({ round: 'sf', idx })
      }, delay)
      delay += 50
    })

    delay += 400

    // 5. Simulate Final
    const finalA = pw.sfW[0]
    const finalB = pw.sfW[1]
    const finalWinner = pw.finalWinner
    setTimeout(() => {
      setFinal({ teamA: finalA, teamB: finalB, winner: finalWinner })
      setFlashingMatch({ round: 'final', idx: 0 })
    }, delay)

    delay += 600

    // 6. Champion
    setTimeout(() => {
      setChampion(finalWinner)
      setIsChampFlashing(true)
      setTimeout(() => setIsChampFlashing(false), 450)
      setIsSimulating(false)
      setHasSimulated(true)
      setSimulationStep(5)
    }, delay)
  }

  const stepThrough = () => {
    setIsSimulating(true)
    let pw = predWinners
    if (!pw) {
      pw = prepareWinners()
      setPredWinners(pw)
    }

    const currentStep = simulationStep

    if (currentStep === 0) {
      let delay = 0
      pw.r32W.forEach((winner, idx) => {
        setTimeout(() => {
          setR32(prev => {
            const next = [...prev]
            next[idx] = { ...next[idx], winner }
            return next
          })
          setFlashingMatch({ round: 'r32', idx })
        }, delay)
        delay += 50
      })
      setTimeout(() => {
        setIsSimulating(false)
        setSimulationStep(1)
      }, delay + 50)
    } 
    
    else if (currentStep === 1) {
      let delay = 0
      pw.r16W.forEach((winner, idx) => {
        const teamA = pw.r32W[idx * 2]
        const teamB = pw.r32W[idx * 2 + 1]
        setTimeout(() => {
          setR16(prev => {
            const next = [...prev]
            next[idx] = { teamA, teamB, winner }
            return next
          })
          setFlashingMatch({ round: 'r16', idx })
        }, delay)
        delay += 50
      })
      setTimeout(() => {
        setIsSimulating(false)
        setSimulationStep(2)
      }, delay + 50)
    } 
    
    else if (currentStep === 2) {
      let delay = 0
      pw.qfW.forEach((winner, idx) => {
        const teamA = pw.r16W[idx * 2]
        const teamB = pw.r16W[idx * 2 + 1]
        setTimeout(() => {
          setQf(prev => {
            const next = [...prev]
            next[idx] = { teamA, teamB, winner }
            return next
          })
          setFlashingMatch({ round: 'qf', idx })
        }, delay)
        delay += 50
      })
      setTimeout(() => {
        setIsSimulating(false)
        setSimulationStep(3)
      }, delay + 50)
    } 
    
    else if (currentStep === 3) {
      let delay = 0
      pw.sfW.forEach((winner, idx) => {
        const teamA = pw.qfW[idx * 2]
        const teamB = pw.qfW[idx * 2 + 1]
        setTimeout(() => {
          setSf(prev => {
            const next = [...prev]
            next[idx] = { teamA, teamB, winner }
            return next
          })
          setFlashingMatch({ round: 'sf', idx })
        }, delay)
        delay += 50
      })
      setTimeout(() => {
        setIsSimulating(false)
        setSimulationStep(4)
      }, delay + 50)
    } 
    
    else if (currentStep === 4) {
      let delay = 0
      const finalA = pw.sfW[0]
      const finalB = pw.sfW[1]
      const finalWinner = pw.finalWinner
      setTimeout(() => {
        setFinal({ teamA: finalA, teamB: finalB, winner: finalWinner })
        setFlashingMatch({ round: 'final', idx: 0 })
      }, delay)
      
      delay += 600
      
      setTimeout(() => {
        setChampion(finalWinner)
        setIsChampFlashing(true)
        setTimeout(() => setIsChampFlashing(false), 450)
        setIsSimulating(false)
        setHasSimulated(true)
        setSimulationStep(5)
      }, delay)
    }
  }

  const resetAll = () => {
    setR32(INITIAL_R32)
    setR16(Array(8).fill({ teamA: null, teamB: null, winner: null }))
    setQf(Array(4).fill({ teamA: null, teamB: null, winner: null }))
    setSf(Array(2).fill({ teamA: null, teamB: null, winner: null }))
    setFinal({ teamA: null, teamB: null, winner: null })
    setChampion(null)
    setPredWinners(null)
    setSimulationStep(0)
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
    const colW = 220
    const startY = 20
    const svgW = 2000
    const svgH = 900
    const chipW = 160
    const chipH = 28

    const getMatchPos = (round, index) => {
      if (round === 4) { // Final
        return { x: 20 + 4 * colW, y: svgH / 2, isRight: false }
      }
      const totalMatches = Math.pow(2, 4 - round)
      const halfMatches = totalMatches / 2
      const isRight = index >= halfMatches
      const colIdx = isRight ? 8 - round : round
      const x = 20 + colIdx * colW
      const step = svgH / halfMatches
      const yIdx = isRight ? index - halfMatches : index
      const y = startY + yIdx * step + step / 2
      return { x, y, isRight, colIdx }
    }

    const drawLine = (x1, y1, x2, y2) => {
      const midX = (x1 + x2) / 2
      return `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`
    }

    const renderChip = (team, x, y, isWinner, isLoser, roundKey, matchIdx, isRight) => {
      const isFlashing = flashingMatch && flashingMatch.round === roundKey && flashingMatch.idx === matchIdx
      const isHighlightMode = highlightTeam !== 'NONE'
      const inPath = isHighlightMode && isMatchInPath(roundKey, matchIdx, highlightTeam)

      let strokeColor = 'var(--border)'
      if (isFlashing) strokeColor = 'var(--accent)'
      else if (isWinner) strokeColor = 'var(--accent)'
      else if (inPath) strokeColor = 'var(--accent)'

      const bgColor = isWinner ? '#1A1F00' : 'var(--surface)'
      const textColor = isWinner ? 'var(--accent)' : 'var(--text-1)'
      const isChamp = champion !== null && champion === team
      const flashClass = isChamp && isChampFlashing ? 'champion-flash' : ''
      const op = isHighlightMode && !inPath ? 0.25 : isLoser ? 0.35 : 1

      if (!team) {
        return (
          <g key={`${x}-${y}`} onMouseMove={handleMouseMove} style={{ opacity: isHighlightMode && !inPath ? 0.25 : 1 }}>
            <rect x={x} y={y - chipH/2} width={chipW} height={chipH} fill="var(--bg)" stroke={strokeColor} strokeDasharray="3,3" strokeWidth="1" />
            <text x={x + 10} y={y + 4} fill="var(--text-3)" fontSize="10" fontWeight="600">TBD</text>
          </g>
        )
      }

      return (
        <g 
          key={`${x}-${y}-${team}`}
          className={flashClass}
          onMouseEnter={(e) => handleMouseEnter(team, e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ opacity: op, transition: 'opacity 80ms ease' }}
        >
          <rect 
            x={x} 
            y={y - chipH/2} 
            width={chipW} 
            height={chipH} 
            fill={bgColor} 
            stroke={strokeColor} 
            strokeWidth={inPath ? 2 : 1}
            style={isFlashing ? { animation: 'flash-accent 0.1s ease 2' } : {}}
          />
          <foreignObject x={x + 8} y={y - 7} width="20" height="13">
            <FlagComponent teamName={team} size="small" style={{ width: 20, height: 13, border: 'none' }} />
          </foreignObject>
          {isChamp && (
            <text x={x + 32} y={y + 4} fill="var(--accent)" fontSize="10" fontWeight="600">🏆</text>
          )}
          <text 
            x={x + (isChamp ? 48 : 34)} 
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
    const leftLabels = ['R32', 'R16', 'QF', 'SF']
    const rightLabels = ['SF', 'QF', 'R16', 'R32']
    
    leftLabels.forEach((label, i) => {
      chips.push(<text key={`llabel-${i}`} x={20 + i * colW} y={15} fill="var(--text-3)" fontSize="10" fontWeight="600" letterSpacing="0.1em">{label}</text>)
    })
    chips.push(<text key="clabel" x={20 + 4 * colW} y={15} fill="var(--text-3)" fontSize="10" fontWeight="600" letterSpacing="0.1em">FINAL</text>)
    rightLabels.forEach((label, i) => {
      chips.push(<text key={`rlabel-${i}`} x={20 + (5 + i) * colW} y={15} fill="var(--text-3)" fontSize="10" fontWeight="600" letterSpacing="0.1em">{label}</text>)
    })

    const drawRound = (matches, roundIdx, roundKey) => {
      matches.forEach((m, idx) => {
        const pos = getMatchPos(roundIdx, idx)
        const isWinnerA = m.winner === m.teamA && m.winner !== null
        const isWinnerB = m.winner === m.teamB && m.winner !== null
        const isLoserA = m.winner && m.winner !== m.teamA
        const isLoserB = m.winner && m.winner !== m.teamB

        chips.push(renderChip(m.teamA, pos.x, pos.y - 18, isWinnerA, isLoserA, roundKey, idx, pos.isRight))
        chips.push(renderChip(m.teamB, pos.x, pos.y + 18, isWinnerB, isLoserB, roundKey, idx, pos.isRight))

        if (roundIdx < 4) {
          const nextIdx = Math.floor(idx / 2)
          const nextPos = getMatchPos(roundIdx + 1, nextIdx)
          const isHighlightMode = highlightTeam !== 'NONE'
          const inPath = isHighlightMode && isMatchInPath(roundKey, idx, highlightTeam)

          const x1 = pos.isRight ? pos.x : pos.x + chipW
          const y1 = pos.y
          const x2 = pos.isRight ? nextPos.x + chipW : nextPos.x
          const y2 = nextPos.y + (idx % 2 === 0 ? -18 : 18)

          paths.push(
            <path 
              key={`p${roundKey}-${idx}`} 
              d={drawLine(x1, y1, x2, y2)} 
              fill="none" 
              stroke={inPath ? 'var(--accent)' : 'var(--border-2)'} 
              strokeWidth={inPath ? 2 : 1} 
              style={{ opacity: isHighlightMode && !inPath ? 0.25 : 1 }}
            />
          )
        }
      })
    }

    drawRound(r32, 0, 'r32')
    drawRound(r16, 1, 'r16')
    drawRound(qf, 2, 'qf')
    drawRound(sf, 3, 'sf')

    // Final
    const finalPos = getMatchPos(4, 0)
    const isWinnerA = final.winner === final.teamA && final.winner !== null
    const isWinnerB = final.winner === final.teamB && final.winner !== null
    const isLoserA = final.winner && final.winner !== final.teamA
    const isLoserB = final.winner && final.winner !== final.teamB

    chips.push(renderChip(final.teamA, finalPos.x, finalPos.y - 18, isWinnerA, isLoserA, 'final', 0, false))
    chips.push(renderChip(final.teamB, finalPos.x, finalPos.y + 18, isWinnerB, isLoserB, 'final', 0, true))

    // Champion
    const champX = finalPos.x
    const champY = finalPos.y - 80
    chips.push(renderChip(champion, champX, champY, champion !== null, false, 'champion', 0, false))

    if (champion !== null) {
        const isHighlightMode = highlightTeam !== 'NONE'
        paths.push(
            <path 
                key="pchamp" 
                d={`M ${champX + chipW/2} ${finalPos.y - 36} V ${champY + chipH/2}`} 
                fill="none" 
                stroke={isHighlightMode ? 'var(--accent)' : 'var(--border-2)'} 
                strokeWidth={isHighlightMode ? 2 : 1} 
            />
        )
    }

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
      <div className="page-header bracket-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 10 }}>
        <div>
          <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
            BRACKET
          </h1>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
            ROUND OF 32 → FINAL <span style={{ color: 'var(--accent)', marginLeft: 8, fontWeight: 700 }}>↔ SCROLL HORIZONTALLY</span>
          </div>
        </div>

        {/* FEATURE 7: HIGHLIGHT PATH DROPDOWN */}
        <div className="bracket-controls" style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 16 }}>
          <span className="text-xs" style={{ color: 'var(--text-3)', fontSize: 10 }}>HIGHLIGHT PATH FOR:</span>
          <div className="bracket-select" style={{ position: 'relative' }}>
            <select
              value={highlightTeam}
              onChange={(e) => setHighlightTeam(e.target.value)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-2)',
                color: 'var(--text-1)',
                fontSize: 12,
                fontWeight: 600,
                padding: '6px 24px 6px 12px',
                appearance: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="NONE">NONE</option>
              {teamList.map(t => (
                <option key={t} value={t}>{t.toUpperCase()}</option>
              ))}
            </select>
            <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none', fontSize: 10 }}>▾</span>
          </div>
        </div>

        <div className="bracket-buttons" style={{ display: 'flex', gap: 8 }}>
          {hasSimulated ? (
            <button
              className="bracket-btn"
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
            <>
              <button
                className="bracket-btn"
                onClick={stepThrough}
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
                {simulationStep === 0 ? 'STEP THROUGH →' : `STEP ROUND ${simulationStep + 1} →`}
              </button>

              <button
                className="bracket-btn"
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
                {isSimulating ? 'SIMULATING...' : 'SIMULATE ALL →'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* FEATURE 7: HIGHUGHT PATH LABEL ABOVE BRACKET */}
      {highlightTeam !== 'NONE' && (
        <div className="text-xs" style={{ color: 'var(--accent)', marginBottom: 8, fontSize: 10 }}>
          {highlightTeam.toUpperCase()}'S PATH TO FINAL
        </div>
      )}

      {/* SVG CONTAINER */}
      <div className="bracket-container" style={{ overflowX: 'auto', overflowY: 'hidden', border: '1px solid var(--border)', padding: 16, background: '#0a0a0a' }}>
        {renderBracketSVG()}
      </div>

      {/* SIMULATED WINNER TEXT */}
      {champion && (
        <div 
          style={{ 
            textAlign: 'center', 
            marginTop: 16, 
            fontSize: 13, 
            fontWeight: 600, 
            color: 'var(--accent)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em' 
          }}
        >
          SIMULATED WINNER: {champion}
        </div>
      )}

      {/* REACT STATE HOVER TOOLTIP */}
      {hoveredTeam && (
        <div
          className="bracket-tooltip"
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
