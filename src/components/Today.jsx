import { useState, useEffect, useRef } from 'react'
import { FlagComponent } from './shared'

const FALLBACK_TODAY = [
  {
    id: 'bra-jpn',
    teamA: 'Brazil',
    teamB: 'Japan',
    scoreA: 1,
    scoreB: 0,
    status: 'LIVE',
    minute: "63'",
    time: '21:30',
    venue: 'NRG Stadium',
    city: 'Houston',
    date: 'JUNE 29, 2026'
  },
  {
    id: 'ger-par',
    teamA: 'Germany',
    teamB: 'Paraguay',
    scoreA: 0,
    scoreB: 0,
    status: 'PRE',
    time: '02:00',
    venue: 'Gillette Stadium',
    city: 'Boston',
    date: 'JUNE 29, 2026'
  },
  {
    id: 'ned-mar',
    teamA: 'Netherlands',
    teamB: 'Morocco',
    scoreA: 0,
    scoreB: 0,
    status: 'PRE',
    time: '06:30',
    venue: 'Estadio BBVA',
    city: 'Monterrey',
    date: 'JUNE 29, 2026'
  }
]

const UPCOMING_FIXTURES = [
  {
    date: 'JUN 30',
    matches: [
      { id: 'civ-nor', teamA: 'Ivory Coast', teamB: 'Norway', time: '02:30', venue: 'Dallas', city: 'Dallas', date: 'JUNE 30, 2026' },
      { id: 'fra-swe', teamA: 'France', teamB: 'Sweden', time: '06:30', venue: 'MetLife NJ', city: 'East Rutherford', date: 'JUNE 30, 2026' },
      { id: 'mex-ecu', teamA: 'Mexico', teamB: 'Ecuador', time: '10:30', venue: 'Azteca', city: 'Mexico City', date: 'JUNE 30, 2026' }
    ]
  },
  {
    date: 'JUL 1',
    matches: [
      { id: 'eng-cod', teamA: 'England', teamB: 'DR Congo', time: '21:30', venue: 'Atlanta', city: 'Atlanta', date: 'JULY 01, 2026' },
      { id: 'bel-sen', teamA: 'Belgium', teamB: 'Senegal', time: '02:00', venue: 'Seattle', city: 'Seattle', date: 'JULY 01, 2026' },
      { id: 'usa-bih', teamA: 'USA', teamB: 'Bosnia and Herzegovina', time: '05:30', venue: 'SF Bay', city: 'Santa Clara', date: 'JULY 01, 2026' }
    ]
  },
  {
    date: 'JUL 2',
    matches: [
      { id: 'esp-aut', teamA: 'Spain', teamB: 'Austria', time: '00:30', venue: 'LA', city: 'Los Angeles', date: 'JULY 02, 2026' },
      { id: 'por-cro', teamA: 'Portugal', teamB: 'Croatia', time: '04:30', venue: 'Toronto', city: 'Toronto', date: 'JULY 02, 2026' },
      { id: 'sui-alg', teamA: 'Switzerland', teamB: 'Algeria', time: '08:30', venue: 'Vancouver', city: 'Vancouver', date: 'JULY 02, 2026' }
    ]
  },
  {
    date: 'JUL 3',
    matches: [
      { id: 'aus-egy', teamA: 'Australia', teamB: 'Egypt', time: '23:30', venue: 'Dallas', city: 'Dallas', date: 'JULY 03, 2026' },
      { id: 'arg-cpv', teamA: 'Argentina', teamB: 'Cape Verde', time: '03:30', venue: 'Miami', city: 'Miami', date: 'JULY 03, 2026' },
      { id: 'col-gha', teamA: 'Colombia', teamB: 'Ghana', time: '07:00', venue: 'Kansas City', city: 'Kansas City', date: 'JULY 03, 2026' }
    ]
  }
]

const DETAIL_DATA = {
  Brazil: {
    wins: 14, draws: 6, vsWins: 3,
    form: ['W', 'W', 'W', 'D', 'W'],
    players: [
      { name: 'Vinicius Jr', pos: 'FWD', stats: '2G 2A' },
      { name: 'Rodri', pos: 'MID', stats: '0G 3A' }
    ],
    pred: 'BRAZIL WIN · 2-0 · CONFIDENCE: ',
    confidence: 'HIGH',
    prob: [64, 18, 18]
  },
  Japan: {
    wins: 3, draws: 6, vsWins: 14,
    form: ['W', 'L', 'W', 'W', 'D'],
    players: [
      { name: 'Kubo', pos: 'FWD', stats: '1G 1A' },
      { name: 'Endo', pos: 'MID', stats: '0G 2A' }
    ]
  },
  Germany: {
    wins: 4, draws: 2, vsWins: 1,
    form: ['W', 'W', 'D', 'W', 'W'],
    players: [
      { name: 'Musiala', pos: 'MID', stats: '2G 1A' },
      { name: 'Wirtz', pos: 'MID', stats: '1G 2A' }
    ],
    pred: 'GERMANY WIN · 3-1 · CONFIDENCE: ',
    confidence: 'MED',
    prob: [52, 28, 20]
  },
  Paraguay: {
    wins: 1, draws: 2, vsWins: 4,
    form: ['L', 'W', 'D', 'L', 'W'],
    players: [
      { name: 'Sanchez', pos: 'FWD', stats: '2G 0A' },
      { name: 'Alonso', pos: 'MID', stats: '0G 1A' }
    ]
  },
  Netherlands: {
    wins: 2, draws: 1, vsWins: 1,
    form: ['W', 'W', 'W', 'D', 'W'],
    players: [
      { name: 'Gakpo', pos: 'FWD', stats: '2G 1A' },
      { name: 'De Jong', pos: 'MID', stats: '0G 2A' }
    ],
    pred: 'NETHERLANDS WIN · 2-1 · CONFIDENCE: ',
    confidence: 'LOW',
    prob: [38, 34, 28]
  },
  Morocco: {
    wins: 1, draws: 1, vsWins: 2,
    form: ['W', 'D', 'W', 'W', 'L'],
    players: [
      { name: 'Ziyech', pos: 'FWD', stats: '1G 2A' },
      { name: 'Amrabat', pos: 'MID', stats: '0G 1A' }
    ]
  }
}

const getMatchDetails = (teamA, teamB) => {
  const dataA = DETAIL_DATA[teamA]
  const dataB = DETAIL_DATA[teamB]

  const winsA = dataA?.wins ?? 5
  const draws = dataA?.draws ?? 3
  const winsB = dataA?.vsWins ?? 4

  const formA = dataA?.form ?? ['W', 'D', 'W', 'L', 'D']
  const formB = dataB?.form ?? ['D', 'W', 'D', 'L', 'W']

  const playersA = dataA?.players ?? [
    { name: `${teamA} Fwd`, pos: 'FWD', stats: '1G 0A' },
    { name: `${teamA} Mid`, pos: 'MID', stats: '0G 1A' }
  ]
  const playersB = dataB?.players ?? [
    { name: `${teamB} Fwd`, pos: 'FWD', stats: '1G 0A' },
    { name: `${teamB} Mid`, pos: 'MID', stats: '0G 1A' }
  ]

  const pred = dataA?.pred ?? `${teamA.toUpperCase()} vs ${teamB.toUpperCase()} · DRAW · 1-1 · CONFIDENCE: `
  const confidence = dataA?.confidence ?? 'LOW'
  const prob = dataA?.prob ?? [33, 34, 33]

  return { winsA, draws, winsB, formA, formB, playersA, playersB, pred, confidence, prob }
}

function MatchExpansionContent({ match, onNavigateToTeam }) {
  const details = getMatchDetails(match.teamA, match.teamB)
  const isBrazilJapan = match.teamA === 'Brazil' && match.teamB === 'Japan'
  const [activeTab, setActiveTab] = useState('EVENTS')

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

  const confidenceColors = {
    HIGH: 'var(--accent)',
    MED: 'var(--amber)',
    LOW: 'var(--text-3)'
  }

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* ROW 1: HEAD TO HEAD & OFFICIAL LOGOS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
        <div className="text-xs" style={{ color: 'var(--text-3)', width: 32, flexShrink: 0 }}>H2H</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {match.logoA && <img src={match.logoA} alt={match.teamA} style={{ width: 24, height: 24, objectFit: 'contain' }} />}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1 }}>{details.winsA}</div>
              <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 2 }}>{match.teamA.substring(0, 3).toUpperCase()} WINS</div>
            </div>
          </div>
          <div style={{ height: 24, width: 1, background: 'var(--border)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1 }}>{details.draws}</div>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 2 }}>DRAWS</div>
          </div>
          <div style={{ height: 24, width: 1, background: 'var(--border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1 }}>{details.winsB}</div>
              <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 2 }}>{match.teamB.substring(0, 3).toUpperCase()} WINS</div>
            </div>
            {match.logoB && <img src={match.logoB} alt={match.teamB} style={{ width: 24, height: 24, objectFit: 'contain' }} />}
          </div>
        </div>
      </div>

      {/* ROW 2: FORM GUIDE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 20px 12px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => onNavigateToTeam(match.teamA)}>
            <FlagComponent teamName={match.teamA} logoUrl={match.logoA} size="small" />
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>{match.teamA.toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {details.formA.map((r, idx) => renderFormSquare(r, idx))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexDirection: 'row-reverse' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexDirection: 'row-reverse', cursor: 'pointer' }} onClick={() => onNavigateToTeam(match.teamB)}>
            <FlagComponent teamName={match.teamB} logoUrl={match.logoB} size="small" />
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>{match.teamB.toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {details.formB.map((r, idx) => renderFormSquare(r, idx))}
          </div>
        </div>
      </div>

      {/* ROW 3: KEY PLAYERS */}
      <div className="responsive-flex" style={{ display: 'flex', padding: '12px 20px', gap: 20, borderBottom: '1px solid var(--border)' }}>
        <div style={{ flex: 1 }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 6 }}>{match.teamA.toUpperCase()} KEY PLAYERS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {details.playersA.map((p, idx) => (
              <div key={idx}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{p.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 6 }}>{p.pos}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 1 }}>GOALS: {p.stats.split(' ')[0]}  ASSISTS: {p.stats.split(' ')[1]} in WC2026</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 6 }}>{match.teamB.toUpperCase()} KEY PLAYERS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {details.playersB.map((p, idx) => (
              <div key={idx}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{p.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 6 }}>{p.pos}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 1 }}>GOALS: {p.stats.split(' ')[0]}  ASSISTS: {p.stats.split(' ')[1]} in WC2026</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 4: MATCH INSIGHTS (Replacing AI PREDICTION) */}
      <div style={{ padding: '12px 20px', borderBottom: isBrazilJapan ? '1px solid var(--border)' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <span className="text-xs" style={{ color: 'var(--accent)' }}>WIN PROBABILITIES</span>
            <div style={{ display: 'flex', marginTop: 8, height: 6, width: '100%', background: 'var(--border)' }}>
              <div style={{ width: `${match.prob?.home || 33}%`, background: 'var(--accent)' }} />
              <div style={{ width: `${match.prob?.draw || 34}%`, background: 'var(--border-2)' }} />
              <div style={{ width: `${match.prob?.away || 33}%`, background: 'var(--red)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: 'var(--text-3)' }}>
              <span>{match.teamA.substring(0, 3).toUpperCase()}: {match.prob?.home || 33}%</span>
              <span>DRAW: {match.prob?.draw || 34}%</span>
              <span>{match.teamB.substring(0, 3).toUpperCase()}: {match.prob?.away || 33}%</span>
            </div>
          </div>
        </div>

        <div className="responsive-flex" style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, background: 'var(--bg)', padding: '10px 12px', border: '1px solid var(--border)' }}>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 4 }}>EXPECTED GOALS (xG)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{match.xgA || '0.0'}</span>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{match.xgB || '0.0'}</span>
            </div>
          </div>
          <div style={{ flex: 1, background: 'var(--bg)', padding: '10px 12px', border: '1px solid var(--border)' }}>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 4 }}>BETTING ODDS</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600 }}>
              <span>{match.odds?.home || '0.0'}</span>
              <span style={{ color: 'var(--text-3)' }}>{match.odds?.draw || '0.0'}</span>
              <span>{match.odds?.away || '0.0'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ADVANCED TAB OVERLAYS FOR BRAZIL VS JAPAN */}
      {isBrazilJapan && (
        <div>
          {/* FEATURE 4: TAB SWITCH PILLS */}
          <div style={{ display: 'flex', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
            {['EVENTS', 'STATS', 'SHOT MAP', 'COMMENTARY'].map(tab => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    height: 32,
                    fontSize: 10,
                    fontWeight: 600,
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--accent)' : 'none',
                    color: isActive ? 'var(--accent)' : 'var(--text-3)',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* TAB CONTENT: EVENTS */}
          {activeTab === 'EVENTS' && (
            <div>
              <div className="text-xs" style={{ color: 'var(--text-3)', padding: '12px 20px 8px' }}>MATCH EVENTS</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { min: "12'", type: 'G', pName: 'Vinicius Jr', team: 'BRAZIL', iconBg: 'var(--accent)', iconColor: '#000', iconText: 'G' },
                  { min: "34'", type: 'Y', pName: 'Endo', team: 'JAPAN', iconBg: 'var(--amber)', iconColor: '#000', iconText: 'Y' },
                  { min: "45+2'", type: 'Y', pName: 'Casemiro', team: 'BRAZIL', iconBg: 'var(--amber)', iconColor: '#000', iconText: 'Y' },
                  { min: "58'", type: 'S', pName: 'Rodrygo → Savinho', team: 'BRAZIL', iconBg: 'var(--surface-2)', iconColor: 'var(--text-2)', iconText: '↕' }
                ].map((ev, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '0 20px', 
                      borderBottom: '1px solid var(--border)' 
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', width: 32 }}>{ev.min}</span>
                    <div 
                      style={{ 
                        width: 16, 
                        height: 16, 
                        background: ev.iconBg, 
                        color: ev.iconColor, 
                        fontSize: 10, 
                        fontWeight: 700, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginRight: 12 
                      }}
                    >
                      {ev.iconText}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{ev.pName}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>{ev.team}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: STATS */}
          {activeTab === 'STATS' && (
            <div style={{ padding: '12px 20px' }}>
              <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>MATCH STATS</div>
              {[
                { label: 'POSSESSION', valA: '62%', valB: '38%', pctA: 62, pctB: 38 },
                { label: 'SHOTS', valA: '9', valB: '4', pctA: 69, pctB: 31 },
                { label: 'ON TARGET', valA: '4', valB: '2', pctA: 67, pctB: 33 },
                { label: 'CORNERS', valA: '5', valB: '3', pctA: 62, pctB: 38 },
                { label: 'FOULS', valA: '8', valB: '11', pctA: 42, pctB: 58 },
                // FEATURE 6: ADVANCED STATS ROWS
                { label: 'xG', valA: '1.82', valB: '0.61', pctA: 75, pctB: 25, highlight: true },
                { label: 'PASS ACCURACY', valA: '89%', valB: '82%', pctA: 89, pctB: 82 },
                { label: 'DUELS WON', valA: '54%', valB: '46%', pctA: 54, pctB: 46 },
                { label: 'AERIAL DUELS', valA: '62%', valB: '38%', pctA: 62, pctB: 38 },
                { label: 'OFFSIDES', valA: '2', valB: '1', pctA: 67, pctB: 33 },
                { label: 'SAVES', valA: '2', valB: '4', pctA: 33, pctB: 67 }
              ].map((st, idx) => (
                <div key={idx} style={{ height: 28, display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: st.highlight ? 'var(--accent)' : 'var(--text-1)', width: 36, textAlign: 'right' }}>
                    {st.valA}
                  </span>

                  <div style={{ flex: 1, height: 4, background: 'var(--border)', margin: '0 12px', display: 'flex' }}>
                    <div style={{ width: `${st.pctA}%`, height: '100%', background: st.highlight ? 'var(--accent)' : 'var(--accent)' }} />
                    <div style={{ flex: 1 }} />
                    <div style={{ width: `${st.pctB}%`, height: '100%', background: 'var(--text-3)' }} />
                  </div>

                  <span style={{ fontSize: 13, fontWeight: 700, color: st.highlight ? 'var(--accent)' : 'var(--text-2)', width: 36, textAlign: 'left' }}>
                    {st.valB}
                  </span>

                  <span className="text-xs" style={{ width: 120, textAlign: 'center', color: 'var(--text-3)', marginLeft: 8 }}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* FEATURE 3: TAB CONTENT: SHOT MAP */}
          {activeTab === 'SHOT MAP' && (
            <div style={{ padding: '12px 20px' }}>
              <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>SHOT MAP</div>
              
              <div 
                style={{
                  width: 400,
                  height: 280,
                  background: '#0A1A0A',
                  border: '1px solid var(--border)',
                  position: 'relative',
                  margin: '0 auto',
                  overflow: 'hidden'
                }}
              >
                {/* CSS Markings */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
                  {/* Halfway line */}
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                  {/* Centre circle */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
                  {/* Penalty boxes */}
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 180, height: 60, border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 180, height: 60, border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }} />
                  {/* Goal lines */}
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 60, height: 5, background: 'rgba(255,255,255,0.15)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 60, height: 5, background: 'rgba(255,255,255,0.15)' }} />
                </div>

                {/* Brazil Shot Dots (left side, left < 50%) */}
                {/* Goal (10px accent) */}
                <div style={{ position: 'absolute', left: '35%', top: '75%', width: 10, height: 10, background: 'var(--accent)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                {/* On Target (8px hollow) */}
                <div style={{ position: 'absolute', left: '30%', top: '80%', width: 8, height: 8, border: '2px solid var(--accent)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                <div style={{ position: 'absolute', left: '20%', top: '65%', width: 8, height: 8, border: '2px solid var(--accent)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                {/* Off Target (cross symbol) */}
                <div style={{ position: 'absolute', left: '40%', top: '70%', color: 'var(--text-3)', fontSize: 10, fontWeight: 800, transform: 'translate(-50%, -50%)' }}>×</div>
                <div style={{ position: 'absolute', left: '15%', top: '60%', color: 'var(--text-3)', fontSize: 10, fontWeight: 800, transform: 'translate(-50%, -50%)' }}>×</div>
                <div style={{ position: 'absolute', left: '25%', top: '85%', color: 'var(--text-3)', fontSize: 10, fontWeight: 800, transform: 'translate(-50%, -50%)' }}>×</div>

                {/* Japan Shot Dots (right side, left > 50%) */}
                {/* On Target (8px hollow, grey border) */}
                <div style={{ position: 'absolute', left: '70%', top: '25%', width: 8, height: 8, border: '2px solid var(--text-2)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                <div style={{ position: 'absolute', left: '65%', top: '30%', width: 8, height: 8, border: '2px solid var(--text-2)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                {/* Off Target (cross symbol) */}
                <div style={{ position: 'absolute', left: '80%', top: '20%', color: 'var(--text-3)', fontSize: 10, fontWeight: 800, transform: 'translate(-50%, -50%)' }}>×</div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>
                <span><span style={{ color: 'var(--accent)' }}>●</span> GOAL</span>
                <span><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', border: '2.5px solid var(--accent)', background: 'transparent' }} /> ON TARGET</span>
                <span><span style={{ color: 'var(--text-3)', fontWeight: 800 }}>×</span> OFF TARGET</span>
              </div>
            </div>
          )}

          {/* FEATURE 4: TAB CONTENT: COMMENTARY */}
          {activeTab === 'COMMENTARY' && (
            <div style={{ padding: '12px 20px' }}>
              <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>LIVE COMMENTARY</div>
              <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                {[
                  { min: "63'", text: "Vinicius Jr dribbles past two defenders on the left flank, Brazil pressing high." },
                  { min: "61'", text: "Japan win a corner but the delivery is poor. Brazil clear." },
                  { min: "58'", text: "SUBSTITUTION — Rodrygo comes off, Savinho enters for Brazil.", isSub: true },
                  { min: "52'", text: "Shot from Kubo! Goes wide of the right post. Japan threatening." },
                  { min: "45+2'", text: "YELLOW CARD — Casemiro catches Endo late. Referee shows yellow.", isYellow: true },
                  { min: "45'", text: "Two minutes of added time signalled." },
                  { min: "39'", text: "Possession: Brazil 63% Japan 37% through the first half." },
                  { min: "34'", text: "YELLOW CARD — Endo cautioned for a foul on Vinicius Jr.", isYellow: true },
                  { min: "27'", text: "Brazil dominating. Japan struggling to get out of their half." },
                  { min: "20'", text: "Japan's first real chance. Kubo fires over from outside the box." },
                  { min: "12'", text: "GOAL! VINICIUS JR! Brazil take the lead! Beautiful solo run, slots home low into the bottom corner. 1-0.", isGoal: true },
                  { min: "1'", text: "KICK OFF — Brazil get us underway at NRG Stadium, Houston." }
                ].map((com, idx) => {
                  let bg = 'transparent'
                  let borderLeft = 'none'
                  let textColor = 'var(--text-2)'

                  if (com.isGoal) {
                    bg = '#1A1F00'
                    textColor = 'var(--text-1)'
                    borderLeft = '2px solid var(--accent)'
                  } else if (com.isYellow) {
                    bg = '#1A1500'
                    borderLeft = '2px solid var(--amber)'
                  } else if (com.isSub) {
                    bg = 'var(--surface-2)'
                  }

                  return (
                    <div 
                      key={idx}
                      style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid var(--border)',
                        background: bg,
                        borderLeft: borderLeft,
                        display: 'flex',
                        gap: 12
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', width: 32, flexShrink: 0 }}>{com.min}</span>
                      <span style={{ fontSize: 12, color: textColor }}>{com.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function MatchCard({ match, onNavigateToTeam, selectedMatchId, setSelectedMatchId }) {
  const [expanded, setExpanded] = useState(false)
  const isLive = match.status === 'LIVE'

  useEffect(() => {
    if (selectedMatchId && match.id === selectedMatchId) {
      setExpanded(true)
      if (setSelectedMatchId) {
        setSelectedMatchId(null)
      }
    }
  }, [selectedMatchId])

  return (
    <div 
      className={`match-card ${isLive ? 'is-live' : ''}`} 
      onClick={() => setExpanded(!expanded)}
      style={{
        overflow: 'hidden'
      }}
    >
      {isLive ? (
        <div className="responsive-flex-row" style={{ display: 'flex', height: 'auto', minHeight: 88, alignItems: 'center', padding: '12px 0' }}>
          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <FlagComponent teamName={match.teamA} logoUrl={match.logoA} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamA}
            </span>
          </div>

          <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div className="score-text" style={{ fontSize: 56 }}>
              {match.scoreA} — {match.scoreB}
            </div>
            <div className="live-badge">
              <span className="live-dot" style={{ display: 'inline-block', width: 6, height: 6, background: '#000', borderRadius: '50%' }}>●</span>
              LIVE {match.minute}
            </div>
          </div>

          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, flexDirection: 'row-reverse', textAlign: 'right' }}>
            <FlagComponent teamName={match.teamB} logoUrl={match.logoB} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamB}
            </span>
          </div>
        </div>
      ) : (
        <div className="responsive-flex-row" style={{ display: 'flex', height: 'auto', minHeight: 72, alignItems: 'center', padding: '12px 0' }}>
          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <FlagComponent teamName={match.teamA} logoUrl={match.logoA} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamA}
            </span>
          </div>

          <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-2)', lineHeight: 1 }}>
              {match.time}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, marginTop: 2 }}>
              IST
            </div>
          </div>

          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, flexDirection: 'row-reverse', textAlign: 'right' }}>
            <FlagComponent teamName={match.teamB} logoUrl={match.logoB} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamB}
            </span>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div 
        style={{ 
          borderTop: '1px solid var(--border)', 
          height: 30, 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 20px',
          background: '#141414',
          fontSize: 10,
          color: 'var(--text-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}
      >
        {match.venue}  ·  {match.city}  ·  {match.date}
      </div>

      {/* Expanded view */}
      {expanded && (
        <MatchExpansionContent match={match} onNavigateToTeam={onNavigateToTeam} />
      )}
    </div>
  )
}

function FixtureRow({ match, onNavigateToTeam, selectedMatchId, setSelectedMatchId }) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (selectedMatchId && match.id === selectedMatchId) {
      setExpanded(true)
      if (setSelectedMatchId) {
        setSelectedMatchId(null)
      }
    }
  }, [selectedMatchId])

  return (
    <div 
      style={{ borderBottom: '1px solid var(--border)', background: expanded ? 'var(--surface-2)' : 'transparent', overflow: 'hidden' }}
      onClick={() => setExpanded(!expanded)}
    >
      <div 
        className="upcoming-row"
        style={{ 
          height: 48, 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 12px',
          cursor: 'pointer',
          transition: 'background 80ms ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FlagComponent teamName={match.teamA} logoUrl={match.logoA} size="small" />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{match.teamA}</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>VS</div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, flexDirection: 'row-reverse', textAlign: 'right' }}>
          <FlagComponent teamName={match.teamB} logoUrl={match.logoB} size="small" />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{match.teamB}</span>
        </div>
        <div style={{ width: 70, textAlign: 'right', fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>
          {match.time}
        </div>
      </div>

      {expanded && (
        <MatchExpansionContent match={match} onNavigateToTeam={onNavigateToTeam} />
      )}
    </div>
  )
}

export default function Today({ onNavigateToTeam, selectedMatchId, setSelectedMatchId, onGoalScored }) {
  const [loading, setLoading] = useState(true)
  const [todayMatches, setTodayMatches] = useState(FALLBACK_TODAY)
  const [filter, setFilter] = useState('ALL')

  const prevScoresRef = useRef({})

  useEffect(() => {
    todayMatches.forEach(match => {
      const prev = prevScoresRef.current[match.id]
      if (prev) {
        if (match.scoreA > prev.scoreA) {
          if (onGoalScored) onGoalScored(match.teamA, match)
        }
        if (match.scoreB > prev.scoreB) {
          if (onGoalScored) onGoalScored(match.teamB, match)
        }
      }
      // Update cache
      prevScoresRef.current[match.id] = { scoreA: match.scoreA, scoreB: match.scoreB }
    })
  }, [todayMatches, onGoalScored])

  useEffect(() => {
    let active = true

    async function fetchData() {
      try {
        const res = await fetch('/api/matches/today')
        const data = await res.json()
        if (!active) return

        if (Array.isArray(data) && data.length > 0) {
          setTodayMatches(data)
        } else {
          setTodayMatches(FALLBACK_TODAY)
        }
      } catch (err) {
        if (active) {
          setTodayMatches(FALLBACK_TODAY)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchData()

    const intervalId = setInterval(() => {
      fetchData()
    }, 60000)

    return () => {
      active = false
      clearInterval(intervalId)
    }
  }, [todayMatches])

  // Filtering Logic
  const filteredToday = todayMatches.filter(m => {
    if (filter === 'LIVE') return m.status === 'LIVE'
    return true
  })

  const showUpcoming = filter === 'ALL' || filter === 'THIS WEEK'

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header" style={{ paddingBottom: 10 }}>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 4 }}>
          JUNE 29, 2026
        </div>
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          TODAY
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          ROUND OF 32 · {todayMatches.length} MATCHES
        </div>
      </div>

      {/* FEATURE 9: SEARCH & FILTER BAR */}
      <div 
        style={{ 
          height: 36, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8, 
          marginBottom: 12 
        }}
      >
        {['ALL', 'LIVE', 'TODAY', 'THIS WEEK'].map(f => {
          const isActive = filter === f
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: isActive ? '#1A1F00' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-3)',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '4px 10px',
                cursor: 'pointer',
                transition: 'border-color 80ms ease, color 80ms ease'
              }}
            >
              {f}
            </button>
          )
        })}

        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          32 TEAMS REMAINING
        </span>
      </div>

      {/* FEATURE 2: STICKY TICKER BAR */}
      <div 
        className="ticker-container"
        style={{
          marginBottom: 16,
          maskImage: 'linear-gradient(to right, transparent, var(--bg) 5%, var(--bg) 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, var(--bg) 5%, var(--bg) 95%, transparent)'
        }}
      >
        <div className="ticker-wrap">
          <div className="ticker-move">
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)' }}>
              <span style={{ color: 'var(--accent)', marginRight: 4 }}>●</span>
              BRAZIL 1-0 JAPAN · 63' · NRG Stadium &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              GERMANY vs PARAGUAY · Kicks off 02:00 IST &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              NETHERLANDS vs MOROCCO · Kicks off 06:30 IST &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              Messi leads Golden Boot with 5 goals &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              Canada advance to Round of 16 after 1-0 win &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)' }}>
              <span style={{ color: 'var(--accent)', marginRight: 4 }}>●</span>
              BRAZIL 1-0 JAPAN · 63' · NRG Stadium &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              GERMANY vs PARAGUAY · Kicks off 02:00 IST &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              NETHERLANDS vs MOROCCO · Kicks off 06:30 IST &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              Messi leads Golden Boot with 5 goals &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              Canada advance to Round of 16 after 1-0 win &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>

      {/* TODAY'S MATCH CARDS */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="skeleton" style={{ height: 118, width: '100%' }} />
          <div className="skeleton" style={{ height: 102, width: '100%' }} />
          <div className="skeleton" style={{ height: 102, width: '100%' }} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredToday.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-3)', fontSize: 13 }}>
              NO MATCHES MATCHING THIS FILTER
            </div>
          ) : (
            filteredToday.map(match => (
              <MatchCard 
                key={match.id} 
                match={match} 
                onNavigateToTeam={onNavigateToTeam} 
                selectedMatchId={selectedMatchId}
                setSelectedMatchId={setSelectedMatchId}
              />
            ))
          )}
        </div>
      )}

      {/* UPCOMING SECTION */}
      {showUpcoming && (
        <div className="upcoming-section">
          <h3 className="text-xs" style={{ color: 'var(--text-3)', margin: '24px 0 8px' }}>
            UP NEXT
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {UPCOMING_FIXTURES.map((day, idx) => (
              <div key={idx} className="upcoming-day">
                <div 
                  className="text-xs"
                  style={{ 
                    height: 28, 
                    background: 'var(--surface)', 
                    border: '1px solid var(--border)',
                    color: 'var(--text-3)',
                    paddingLeft: 12,
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 8
                  }}
                >
                  {day.date}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {day.matches.map(m => (
                    <FixtureRow 
                      key={m.id} 
                      match={m} 
                      onNavigateToTeam={onNavigateToTeam} 
                      selectedMatchId={selectedMatchId}
                      setSelectedMatchId={setSelectedMatchId}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
