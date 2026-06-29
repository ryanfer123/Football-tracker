import { useState } from 'react'
import { FlagComponent, predictMatch } from './shared'
import { TEAMS } from '../data/teams'

const TOURNAMENT_ODDS_DATA = [
  { rank: '01', team: 'France', odds: 18 },
  { rank: '02', team: 'Brazil', odds: 15 },
  { rank: '03', team: 'Argentina', odds: 15 },
  { rank: '04', team: 'Germany', odds: 10 },
  { rank: '05', team: 'Portugal', odds: 8 },
  { rank: '06', team: 'England', odds: 8 },
  { rank: '07', team: 'Spain', odds: 8 },
  { rank: '08', team: 'Netherlands', odds: 6 },
  { rank: '09', team: 'Belgium', odds: 5 },
  { rank: '10', team: 'Croatia', odds: 4 },
  { rank: '11', team: 'USA', odds: 3 },
  { rank: '12', team: 'Uruguay', odds: 2 },
  { rank: '13', team: 'Morocco', odds: 2 },
  { rank: '14', team: 'Senegal', odds: 1 },
  { rank: '15', team: 'Japan', odds: 1 }
]

const getH2HHistory = (teamA, teamB) => {
  const isBraJap = (teamA === 'Brazil' && teamB === 'Japan') || (teamA === 'Japan' && teamB === 'Brazil')
  const isGerPar = (teamA === 'Germany' && teamB === 'Paraguay') || (teamA === 'Paraguay' && teamB === 'Germany')
  const isNedMar = (teamA === 'Netherlands' && teamB === 'Morocco') || (teamA === 'Morocco' && teamB === 'Netherlands')

  if (isBraJap) {
    return [
      { year: '2022', comp: 'Friendly', tA: 'Brazil', score: '3 - 0', tB: 'Japan', winner: 'Brazil' },
      { year: '2017', comp: 'Friendly', tA: 'Brazil', score: '3 - 1', tB: 'Japan', winner: 'Brazil' },
      { year: '2014', comp: 'Friendly', tA: 'Brazil', score: '4 - 0', tB: 'Japan', winner: 'Brazil' },
      { year: '2013', comp: 'Confed Cup', tA: 'Brazil', score: '3 - 0', tB: 'Japan', winner: 'Brazil' },
      { year: '2006', comp: 'World Cup', tA: 'Brazil', score: '4 - 1', tB: 'Japan', winner: 'Brazil' }
    ]
  }

  if (isGerPar) {
    return [
      { year: '2013', comp: 'Friendly', tA: 'Germany', score: '3 - 3', tB: 'Paraguay', winner: 'Draw' },
      { year: '2002', comp: 'World Cup', tA: 'Germany', score: '1 - 0', tB: 'Paraguay', winner: 'Germany' },
      { year: '1993', comp: 'Friendly', tA: 'Germany', score: '2 - 1', tB: 'Paraguay', winner: 'Germany' },
      { year: '1986', comp: 'World Cup', tA: 'Germany', score: '2 - 0', tB: 'Paraguay', winner: 'Germany' },
      { year: '1978', comp: 'World Cup', tA: 'Germany', score: '1 - 1', tB: 'Paraguay', winner: 'Draw' }
    ]
  }

  if (isNedMar) {
    return [
      { year: '2017', comp: 'Friendly', tA: 'Netherlands', score: '2 - 1', tB: 'Morocco', winner: 'Netherlands' },
      { year: '1999', comp: 'Friendly', tA: 'Netherlands', score: '1 - 2', tB: 'Morocco', winner: 'Morocco' },
      { year: '1994', comp: 'World Cup', tA: 'Netherlands', score: '2 - 1', tB: 'Morocco', winner: 'Netherlands' },
      { year: '1982', comp: 'Friendly', tA: 'Netherlands', score: '0 - 0', tB: 'Morocco', winner: 'Draw' },
      { year: '1977', comp: 'Friendly', tA: 'Netherlands', score: '1 - 0', tB: 'Morocco', winner: 'Netherlands' }
    ]
  }

  // Fallback
  return [
    { year: '2024', comp: 'Friendly', tA: teamA, score: '2 - 1', tB: teamB, winner: teamA },
    { year: '2022', comp: 'Friendly', tA: teamA, score: '1 - 1', tB: teamB, winner: 'Draw' },
    { year: '2018', comp: 'Friendly', tA: teamA, score: '0 - 2', tB: teamB, winner: teamB },
    { year: '2014', comp: 'Friendly', tA: teamA, score: '3 - 1', tB: teamB, winner: teamA },
    { year: '2010', comp: 'Friendly', tA: teamA, score: '1 - 0', tB: teamB, winner: teamA }
  ]
}

const getRecentMatches = (team) => {
  if (team === 'Brazil') {
    return [
      { res: 'W', score: '3-0', opp: 'Cameroon' },
      { res: 'W', score: '4-1', opp: 'Nigeria' },
      { res: 'W', score: '2-0', opp: 'Netherlands' }
    ]
  }
  if (team === 'Japan') {
    return [
      { res: 'W', score: '2-0', opp: 'Tunisia' },
      { res: 'D', score: '1-1', opp: 'Sweden' },
      { res: 'W', score: '2-1', opp: 'Paraguay' }
    ]
  }
  if (team === 'Germany') {
    return [
      { res: 'W', score: '2-1', opp: 'Algeria' },
      { res: 'W', score: '1-0', opp: 'Poland' },
      { res: 'D', score: '1-1', opp: 'Ecuador' }
    ]
  }
  if (team === 'Paraguay') {
    return [
      { res: 'L', score: '1-2', opp: 'Japan' },
      { res: 'W', score: '1-0', opp: 'Chile' },
      { res: 'D', score: '1-1', opp: 'Peru' }
    ]
  }
  if (team === 'Netherlands') {
    return [
      { res: 'W', score: '2-0', opp: 'Peru' },
      { res: 'W', score: '3-1', opp: 'Morocco' },
      { res: 'D', score: '2-2', opp: 'Scotland' }
    ]
  }
  if (team === 'Morocco') {
    return [
      { res: 'W', score: '2-1', opp: 'South Africa' },
      { res: 'D', score: '1-1', opp: 'USA' },
      { res: 'L', score: '1-3', opp: 'Netherlands' }
    ]
  }
  // Fallback
  return [
    { res: 'W', score: '1-0', opp: 'Opponent A' },
    { res: 'D', score: '1-1', opp: 'Opponent B' },
    { res: 'L', score: '0-1', opp: 'Opponent C' }
  ]
}

export default function Predict() {
  const teamList = Object.keys(TEAMS).sort()
  const [teamA, setTeamA] = useState(teamList[0] || 'Argentina')
  const [teamB, setTeamB] = useState(teamList[1] || 'Brazil')
  const [prediction, setPrediction] = useState(null)

  const handlePredict = () => {
    if (teamA === teamB) return
    const result = predictMatch(teamA, teamB)
    setPrediction(result)
  }

  const h2hHistory = prediction ? getH2HHistory(prediction.teamA, prediction.teamB) : []
  const recentA = prediction ? getRecentMatches(prediction.teamA) : []
  const recentB = prediction ? getRecentMatches(prediction.teamB) : []

  // Scorelines
  const scorelineBreakdown = [
    { score: '2-0', prob: '28%' },
    { score: '1-0', prob: '22%' },
    { score: '2-1', prob: '18%' },
    { score: '3-0', prob: '10%' },
    { score: '0-0', prob: '8%' },
    { score: '1-1', prob: '6%' },
    { score: '0-1', prob: '5%' },
    { score: 'Other', prob: '3%' }
  ]

  const renderRecentRow = (match) => {
    let bg = 'var(--surface-2)'
    let color = 'var(--text-2)'
    let border = '1px solid var(--border)'

    if (match.res === 'W') {
      bg = '#1A1F00'
      color = 'var(--accent)'
      border = '1px solid var(--accent)'
    } else if (match.res === 'L') {
      bg = '#1F0A0A'
      color = 'var(--red)'
      border = '1px solid var(--red)'
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24 }}>
        <span 
          style={{ 
            width: 18, 
            height: 18, 
            background: bg, 
            color: color, 
            border: border, 
            fontSize: 9, 
            fontWeight: 700, 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          {match.res}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{match.score}</span>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>vs {match.opp}</span>
      </div>
    )
  }

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          PREDICT
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          MATCH PREDICTOR
        </div>
      </div>

      {/* SELECTORS ROW */}
      <div className="predict-selector" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ position: 'relative' }}>
          <select 
            value={teamA} 
            onChange={(e) => setTeamA(e.target.value)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-2)',
              color: 'var(--text-1)',
              fontSize: 14,
              fontWeight: 500,
              padding: '10px 14px',
              paddingRight: 24,
              width: 240,
              appearance: 'none',
              cursor: 'pointer'
            }}
          >
            {teamList.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
          </select>
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }}>▾</span>
        </div>

        <div className="text-xs" style={{ color: 'var(--text-3)', fontSize: 11 }}>VS</div>

        <div style={{ position: 'relative' }}>
          <select 
            value={teamB} 
            onChange={(e) => setTeamB(e.target.value)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-2)',
              color: 'var(--text-1)',
              fontSize: 14,
              fontWeight: 500,
              padding: '10px 14px',
              paddingRight: 24,
              width: 240,
              appearance: 'none',
              cursor: 'pointer'
            }}
          >
            {teamList.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
          </select>
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }}>▾</span>
        </div>

        <button 
          onClick={handlePredict}
          style={{
            background: 'var(--accent)',
            color: '#000',
            fontSize: 14,
            fontWeight: 700,
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'background 80ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-dim)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
        >
          PREDICT →
        </button>
      </div>

      {/* PREDICTION RESULT CARD */}
      {prediction && (
        <div>
          <div 
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-2)',
              borderTop: '2px solid var(--accent)',
              padding: 20,
              boxShadow: 'var(--shadow-accent)',
              marginBottom: 24
            }}
          >
            {/* Top Row Header */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FlagComponent teamName={prediction.teamA} />
                <span style={{ fontSize: 18, fontWeight: 800 }}>{prediction.teamA.toUpperCase()}</span>
              </div>
              <span style={{ color: 'var(--text-3)', fontSize: 24 }}>—</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexDirection: 'row-reverse' }}>
                <FlagComponent teamName={prediction.teamB} />
                <span style={{ fontSize: 18, fontWeight: 800 }}>{prediction.teamB.toUpperCase()}</span>
              </div>
            </div>

            {/* Predicted Score */}
            <div style={{ textAlign: 'center', fontSize: 48, fontWeight: 900, letterSpacing: -3, margin: '16px 0', color: 'var(--text-1)' }}>
              {prediction.goalsA} — {prediction.goalsB}
            </div>

            {/* Win Probability Bar */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', height: 6, width: '100%', background: 'var(--border-2)' }}>
                <div style={{ width: `${prediction.probA}%`, background: 'var(--accent)' }} />
                <div style={{ width: `${prediction.probDraw}%`, background: 'var(--border-2)' }} />
                <div style={{ width: `${prediction.probB}%`, background: 'var(--red)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--text-2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <span>{prediction.teamA} {prediction.probA}%</span>
                <span>DRAW {prediction.probDraw}%</span>
                <span>{prediction.teamB} {prediction.probB}%</span>
              </div>
            </div>

            {/* Factors Row */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {prediction.factors.map((f, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid var(--border-2)',
                    padding: '3px 8px',
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'var(--text-2)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  [{f}]
                </div>
              ))}
            </div>

            {/* Analysis Text */}
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 16 }}>
              {prediction.reasoning}
            </div>

            {/* Confidence Badge */}
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)' }}>
              CONFIDENCE:{' '}
              <span style={{ color: prediction.confidence === 'HIGH' ? 'var(--accent)' : prediction.confidence === 'LOW' ? 'var(--red)' : 'var(--text-1)' }}>
                {prediction.confidence}
              </span>
            </div>
          </div>

          {/* FEATURE 6: HISTORICAL MEETINGS */}
          <div style={{ marginBottom: 28 }}>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
              LAST 5 MEETINGS
            </div>
            <div style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
              {h2hHistory.map((h, idx) => {
                const isDraw = h.winner === 'Draw'
                const isTeamAWinner = h.winner === prediction.teamA
                const winnerChipColor = isDraw ? 'var(--text-3)' : isTeamAWinner ? 'var(--accent)' : 'var(--red)'
                const winnerChipBg = isDraw ? 'var(--surface-2)' : isTeamAWinner ? '#1A1F00' : '#1F0A0A'
                const winnerChipBorder = isDraw ? '1px solid var(--border)' : isTeamAWinner ? '1px solid var(--accent)' : '1px solid var(--red)'

                return (
                  <div 
                    key={idx}
                    style={{
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 16px',
                      borderBottom: idx < 4 ? '1px solid var(--border)' : 'none',
                      fontSize: 13
                    }}
                  >
                    <span style={{ fontSize: 11, color: 'var(--text-3)', width: 40 }}>{h.year}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-3)', flex: 1 }}>{h.comp.toUpperCase()}</span>
                    <span style={{ fontWeight: 600, width: 90, textAlign: 'right' }}>{h.tA}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-1)', margin: '0 12px' }}>{h.score}</span>
                    <span style={{ fontWeight: 600, width: 90, textAlign: 'left' }}>{h.tB}</span>
                    <div style={{ marginLeft: 'auto', width: 80, display: 'flex', justifyContent: 'flex-end' }}>
                      <span 
                        style={{
                          fontSize: 9,
                          fontWeight: 600,
                          padding: '2px 6px',
                          color: winnerChipColor,
                          background: winnerChipBg,
                          border: winnerChipBorder,
                          textTransform: 'uppercase'
                        }}
                      >
                        {h.winner.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* FEATURE 6: SCORELINE DISTRIBUTION */}
          <div style={{ marginBottom: 28 }}>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
              PREDICTED SCORELINE BREAKDOWN
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8 }}>
              {scorelineBreakdown.map((s, idx) => {
                const isMostLikely = s.score === '2-0' // hardcode 2-0 as most likely
                return (
                  <div 
                    key={idx}
                    style={{
                      height: 40,
                      border: isMostLikely ? '1px solid var(--accent)' : '1px solid var(--border)',
                      background: isMostLikely ? '#1A1F00' : 'var(--surface)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 700, color: isMostLikely ? 'var(--accent)' : 'var(--text-1)', lineHeight: 1.1 }}>{s.score}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{s.prob}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* FEATURE 6: BOTH TEAMS' LAST 3 MATCHES */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {/* Team A */}
              <div style={{ flex: 1 }}>
                <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
                  {prediction.teamA.toUpperCase()} RECENT
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--surface)', border: '1px solid var(--border)', padding: 12 }}>
                  {recentA.map((m, idx) => (
                    <div key={idx}>{renderRecentRow(m)}</div>
                  ))}
                </div>
              </div>

              {/* Team B */}
              <div style={{ flex: 1 }}>
                <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
                  {prediction.teamB.toUpperCase()} RECENT
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--surface)', border: '1px solid var(--border)', padding: 12 }}>
                  {recentB.map((m, idx) => (
                    <div key={idx}>{renderRecentRow(m)}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOURNAMENT ODDS */}
      <div style={{ marginTop: 24 }}>
        <div 
          className="text-xs" 
          style={{ 
            color: 'var(--text-3)', 
            borderBottom: '1px solid var(--border)', 
            paddingBottom: 8, 
            marginBottom: 12 
          }}
        >
          TOURNAMENT ODDS
        </div>

        <div>
          {TOURNAMENT_ODDS_DATA.map((row) => (
            <div 
              key={row.rank}
              style={{
                height: 32,
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid var(--border)',
                transition: 'background 80ms ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-3)', width: 32, flexShrink: 0 }}>
                {row.rank}
              </span>
              <FlagComponent teamName={row.team} size="small" style={{ marginRight: 12 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', width: 120, flexShrink: 0 }}>
                {row.team.toUpperCase()}
              </span>
              <div style={{ flex: 1, height: 4, background: 'var(--border)', margin: '0 16px', position: 'relative' }}>
                <div style={{ width: `${(row.odds / 18) * 100}%`, height: '100%', background: 'var(--accent)' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', width: 40, textAlign: 'right', flexShrink: 0 }}>
                {row.odds}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
