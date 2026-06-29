import { useState } from 'react'
import { ALL_TEAM_NAMES } from '../data/teams'
import { TOURNAMENT_ODDS } from '../data/matchData'
import { predictMatch } from './shared'

export default function Predict() {
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = () => {
    if (!teamA || !teamB || teamA === teamB) return
    setLoading(true)
    setPrediction(null)
    setTimeout(() => {
      const result = predictMatch(teamA, teamB)
      setPrediction(result)
      setLoading(false)
    }, 1200)
  }

  const maxOdds = Math.max(...TOURNAMENT_ODDS.map(t => t.probability))

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">🤖 AI Prediction Engine</h1>
        <p className="page-subtitle">Match predictor & tournament odds</p>
      </div>

      {/* Match Selector */}
      <div className="predict-selector">
        <select className="input" value={teamA} onChange={(e) => setTeamA(e.target.value)} style={{ flex: 1 }}>
          <option value="">— SELECT TEAM A —</option>
          {ALL_TEAM_NAMES.sort().map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <span style={{ fontSize: 20, fontWeight: 700 }}>VS</span>
        <select className="input" value={teamB} onChange={(e) => setTeamB(e.target.value)} style={{ flex: 1 }}>
          <option value="">— SELECT TEAM B —</option>
          {ALL_TEAM_NAMES.sort().map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button className="btn btn-primary" onClick={handlePredict}
          disabled={!teamA || !teamB || teamA === teamB}>
          PREDICT →
        </button>
      </div>

      {/* Loading */}
      {loading && <div className="loading-state">ANALYSING...</div>}

      {/* Prediction Card */}
      {prediction && !loading && (
        <div className="prediction-card" style={{ marginBottom: 32 }}>
          <div className="prediction-title">
            {prediction.teamA} vs {prediction.teamB}
          </div>

          <div className="prob-bar-container">
            <div className="prob-bar">
              <div className="segment" style={{ width: `${prediction.probA}%`, background: '#000' }}>
                {prediction.probA > 10 ? `${prediction.probA}%` : ''}
              </div>
              <div className="segment" style={{ width: `${prediction.probDraw}%`, background: '#888' }}>
                {prediction.probDraw > 8 ? `${prediction.probDraw}%` : ''}
              </div>
              <div className="segment" style={{ width: `${prediction.probB}%`, background: '#FF2D00' }}>
                {prediction.probB > 10 ? `${prediction.probB}%` : ''}
              </div>
            </div>
            <div className="prob-labels">
              <span>{prediction.teamA} {prediction.probA}%</span>
              <span>Draw {prediction.probDraw}%</span>
              <span>{prediction.teamB} {prediction.probB}%</span>
            </div>
          </div>

          <div className="predicted-score">{prediction.goalsA} — {prediction.goalsB}</div>

          <div className="factor-tags">
            {prediction.factors.map((f, i) => <span key={i} className="factor-tag">{f}</span>)}
          </div>

          <div className="ai-reasoning">{prediction.reasoning}</div>

          <span className={`confidence-badge confidence-${prediction.confidence}`}>
            CONFIDENCE: {prediction.confidence}
          </span>
        </div>
      )}

      {/* Tournament Predictor */}
      <div style={{ marginTop: 16 }}>
        <div className="section-title" style={{ marginBottom: 20 }}>🏆 Tournament Winner Odds</div>
        <div className="card-static" style={{ padding: 24 }}>
          {TOURNAMENT_ODDS.map((t, i) => (
            <div key={t.team} className="tournament-bar">
              <span className="bar-label" style={{ color: i < 5 ? '#000' : '#888' }}>
                {i + 1}. {t.team}
              </span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(t.probability / maxOdds) * 100}%` }} />
              </div>
              <span className="bar-value">{t.probability}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
