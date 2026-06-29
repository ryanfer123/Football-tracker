import { TEAMS } from '../data/teams'

const NAME_TO_CODE = {
  'Brazil': 'BRA',
  'Germany': 'GER',
  'Netherlands': 'NED',
  'Japan': 'JPN',
  'Paraguay': 'PAR',
  'Morocco': 'MAR',
  'Norway': 'NOR',
  'France': 'FRA',
  'Argentina': 'ARG',
  'Spain': 'ESP',
  'England': 'ENG',
  'USA': 'USA',
  'United States': 'USA',
  'Portugal': 'POR',
  'Belgium': 'BEL',
  'Mexico': 'MEX',
  'Croatia': 'CRO',
  'Uruguay': 'URU',
  'Colombia': 'COL',
  'Senegal': 'SEN',
  'South Korea': 'KOR',
  'Korea Republic': 'KOR',
  'Switzerland': 'SUI',
  'Denmark': 'DEN',
  'Sweden': 'SWE',
  'Australia': 'AUS',
  'Ghana': 'GHA',
  'Ivory Coast': 'CIV',
  'Algeria': 'ALG',
  'Canada': 'CAN',
  'Bosnia': 'BIH',
  'Bosnia & Herzegovina': 'BIH',
  'Bosnia and Herzegovina': 'BIH',
  'Cape Verde': 'CPV',
  'Ecuador': 'ECU',
  'Austria': 'AUT',
}

const ALL_CODES = [
  'BRA', 'GER', 'NED', 'JPN', 'PAR', 'MAR', 'NOR', 'FRA', 'ARG', 'ESP', 
  'ENG', 'POR', 'USA', 'MEX', 'CRO', 'URU', 'COL', 'SEN', 'KOR', 'SUI', 
  'DEN', 'SWE', 'AUS', 'GHA', 'CIV', 'ALG', 'CAN', 'BIH', 'CPV', 'ECU', 'AUT', 'BEL'
]

export function FlagComponent({ teamCode, teamName, logoUrl, size = 'medium', className = '' }) {
  // Prefer rendering an official logo image when provided (from API)
  if (logoUrl) {
    // Validate logoUrl to avoid rendering potentially unsafe data URLs or malformed values
    try {
      const parsed = new URL(logoUrl)
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        throw new Error('Invalid protocol')
      }
    } catch (err) {
      // Fall back to flag rendering if logoUrl isn't a valid http/https URL
    }

    const width = size === 'small' ? 24 : size === 'large' ? 120 : 48
    const height = size === 'small' ? 24 : size === 'large' ? 120 : 48
    return (
      <img
        src={logoUrl}
        alt={teamName || teamCode || 'team'}
        className={`team-logo ${className}`}
        style={{
          width: width,
          height: height,
          objectFit: 'contain',
          borderRadius: size === 'small' ? 4 : size === 'large' ? 6 : 6,
          border: '1px solid var(--border)',
          background: 'transparent'
        }}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
    )
  }

  let code = teamCode;
  if (!code && teamName) {
    code = NAME_TO_CODE[teamName];
    if (!code) {
      const teamObj = TEAMS[teamName];
      if (teamObj) code = teamObj.code;
    }
  }

  if (!code) {
    code = 'DEFAULT';
  } else {
    code = code.toUpperCase();
  }

  const sizeClass = size === 'small' ? 'small' : size === 'large' ? 'large' : '';
  const isDefault = code === 'DEFAULT' || !ALL_CODES.includes(code);

  if (isDefault) {
    const width = size === 'small' ? '24px' : size === 'large' ? '120px' : '48px';
    const height = size === 'small' ? '16px' : size === 'large' ? '80px' : '32px';
    const fontSize = size === 'small' ? '8px' : '10px';

    return (
      <div 
        className={`flag-default ${sizeClass} ${className}`} 
        style={{ 
          background: '#333', 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#fff',
          fontSize: fontSize,
          fontWeight: 700,
          border: '1px solid var(--border)',
          width: width,
          height: height,
        }}
      >
        {teamCode ? teamCode.substring(0, 3).toUpperCase() : teamName ? teamName.substring(0, 3).toUpperCase() : 'TBD'}
      </div>
    )
  }

  return (
    <div className={`flag flag-${code} ${sizeClass} ${className}`}>
      {code === 'NOR' && (
        <>
          <div className="inner-cross-v" />
          <div className="inner-cross-h" />
        </>
      )}
      {code === 'KOR' && (
        <>
          <div className="trigram tg1" />
          <div className="trigram tg2" />
          <div className="trigram tg3" />
          <div className="trigram tg4" />
        </>
      )}
      {code === 'AUS' && <div className="stars" />}
    </div>
  )
}

export function TeamFlag({ teamName, size = 'medium', className = '' }) {
  return <FlagComponent teamName={teamName} size={size} className={className} />
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
  if (teamA.titles > teamB.titles) factors.push('FORM ↑')
  else if (teamB.titles > teamA.titles) factors.push('FORM ↑')
  if (teamA.ranking < teamB.ranking) factors.push('WC PEDIGREE')
  if ((statsA.cohesion || 0) > 80) factors.push('H2H DOMINANCE')
  if (factors.length < 3) {
    factors.push('FORM ↑', 'WC PEDIGREE', 'H2H DOMINANCE')
  }
  factors.length = 3

  // Confidence
  const confidence = Math.abs(probA - probB) > 30 ? 'HIGH' : Math.abs(probA - probB) > 15 ? 'MED' : 'LOW'

  // Reasoning
  const favored = probA > probB ? teamAName : teamBName
  const underdog = probA > probB ? teamBName : teamAName
  const reasoning = `${favored} enter this match as favorites based on their FIFA ranking (#${probA > probB ? teamA.ranking : teamB.ranking}) and ${(probA > probB ? teamA : teamB).titles > 0 ? `${(probA > probB ? teamA : teamB).titles} World Cup title(s)` : 'recent form'}. ${underdog} will look to cause an upset, but the quality gap in key positions may prove decisive. Expect a ${confidence === 'LOW' ? 'tight, tactical battle' : confidence === 'MED' ? 'competitive match with moments of brilliance' : 'dominant display from the favorites'}.`

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
