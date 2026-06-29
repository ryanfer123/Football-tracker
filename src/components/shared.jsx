import { TEAMS } from '../data/teams'

export function TeamFlag({ teamName, size = 'medium', className = '' }) {
  const team = TEAMS[teamName]
  const flagCode = team ? team.code : 'default'
  const sizeClass = size === 'small' ? 'small' : size === 'large' ? 'large' : ''

  return (
    <div className={`flag flag-${flagCode} ${sizeClass} ${className}`}>
      {/* Complex flags handled in flags.css via ::before/::after */}
      {flagCode === 'NOR' && (
        <>
          <div className="inner-cross-v" />
          <div className="inner-cross-h" />
        </>
      )}
      {flagCode === 'KOR' && (
        <>
          <div className="trigram tg1" />
          <div className="trigram tg2" />
          <div className="trigram tg3" />
          <div className="trigram tg4" />
        </>
      )}
      {flagCode === 'AUS' && <div className="stars" />}
    </div>
  )
}

// Prediction engine — deterministic heuristics
export function predictMatch(teamAName, teamBName) {
  const teamA = TEAMS[teamAName]
  const teamB = TEAMS[teamBName]
  if (!teamA || !teamB) return null

  const titleWeight = { 5: 20, 4: 16, 3: 14, 2: 10, 1: 6, 0: 2 }
  const rankWeight = (r) => Math.max(0, 60 - r)

  let scoreA = (titleWeight[teamA.titles] || 2) + rankWeight(teamA.ranking)
  let scoreB = (titleWeight[teamB.titles] || 2) + rankWeight(teamB.ranking)

  // Stats bonus
  const statsA = teamA.stats || {}
  const statsB = teamB.stats || {}
  scoreA += ((statsA.attack || 50) + (statsA.midfield || 50) + (statsA.experience || 50)) / 30
  scoreB += ((statsB.attack || 50) + (statsB.midfield || 50) + (statsB.experience || 50)) / 30

  const total = scoreA + scoreB
  let probA = Math.round((scoreA / total) * 100)
  let probB = Math.round((scoreB / total) * 100)
  let probDraw = Math.max(8, 25 - Math.abs(probA - probB))

  // Normalize
  const rawTotal = probA + probB + probDraw
  probA = Math.round((probA / rawTotal) * 100)
  probDraw = Math.round((probDraw / rawTotal) * 100)
  probB = 100 - probA - probDraw

  // Predicted score
  const diff = (probA - probB) / 20
  let goalsA, goalsB
  if (Math.abs(diff) < 1) {
    goalsA = 1; goalsB = 1
  } else if (diff > 2) {
    goalsA = 3; goalsB = 0
  } else if (diff > 1) {
    goalsA = 2; goalsB = 0
  } else if (diff > 0) {
    goalsA = 2; goalsB = 1
  } else if (diff > -1) {
    goalsA = 1; goalsB = 2
  } else if (diff > -2) {
    goalsA = 0; goalsB = 2
  } else {
    goalsA = 0; goalsB = 3
  }

  // Factors
  const factors = []
  if (teamA.titles > teamB.titles) factors.push('WC PEDIGREE ↑')
  else if (teamB.titles > teamA.titles) factors.push('WC PEDIGREE ↓')
  if (teamA.ranking < teamB.ranking) factors.push('HIGHER RANKED')
  if ((statsA.cohesion || 0) > 80) factors.push('TEAM COHESION')
  if ((statsA.pace || 0) > 85) factors.push('PACE ADVANTAGE')
  if ((statsA.experience || 0) > 85) factors.push('EXPERIENCE')
  if (factors.length > 3) factors.length = 3
  if (factors.length === 0) factors.push('FORM ↑', 'TACTICAL EDGE', 'SQUAD DEPTH')

  // Confidence
  const confidence = Math.abs(probA - probB) > 30 ? 'HIGH' : Math.abs(probA - probB) > 15 ? 'MEDIUM' : 'LOW'

  // Reasoning
  const favored = probA > probB ? teamAName : teamBName
  const underdog = probA > probB ? teamBName : teamAName
  const reasoning = `${favored} enter this match as favorites based on their FIFA ranking (#${probA > probB ? teamA.ranking : teamB.ranking}) and ${(probA > probB ? teamA : teamB).titles > 0 ? `${(probA > probB ? teamA : teamB).titles} World Cup title(s)` : 'recent form'}. ${underdog} will look to cause an upset, but the quality gap in key positions may prove decisive. Expect a ${confidence === 'LOW' ? 'tight, tactical battle' : confidence === 'MEDIUM' ? 'competitive match with moments of brilliance' : 'dominant display from the favorites'}.`

  return {
    teamA: teamAName, teamB: teamBName,
    probA, probDraw, probB,
    goalsA, goalsB,
    factors, confidence, reasoning
  }
}

// Seeded random for bracket simulation
export function seededRandom(seed) {
  let s = seed
  return function() {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

// Formation parser
export function getFormationRows(formation, players) {
  if (!formation || !players || players.length === 0) return []
  const parts = formation.split('-').map(Number)
  const rows = [[players[0]]] // GK
  let idx = 1
  for (const count of parts) {
    rows.push(players.slice(idx, idx + count))
    idx += count
  }
  return rows.reverse() // FW at top
}
