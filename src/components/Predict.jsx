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
        <div 
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-2)',
            borderTop: '2px solid var(--accent)',
            padding: 20,
            boxShadow: 'var(--shadow-accent)',
            marginBottom: 32
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
