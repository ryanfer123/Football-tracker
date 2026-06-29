/** Compute group standings and team stats from match results. */

export function computeStandings(matches, teamNames) {
  const records = {}
  for (const name of teamNames) {
    records[name] = { name, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
  }

  for (const m of matches) {
    const a = records[m.team1]
    const b = records[m.team2]
    if (!a || !b) continue

    a.p += 1
    b.p += 1
    a.gf += m.score1
    a.ga += m.score2
    b.gf += m.score2
    b.ga += m.score1

    if (m.score1 > m.score2) {
      a.w += 1
      a.pts += 3
      b.l += 1
    } else if (m.score2 > m.score1) {
      b.w += 1
      b.pts += 3
      a.l += 1
    } else {
      a.d += 1
      b.d += 1
      a.pts += 1
      b.pts += 1
    }
  }

  for (const r of Object.values(records)) {
    r.gd = r.gf - r.ga
  }

  const sorted = Object.values(records).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    if (b.gd !== a.gd) return b.gd - a.gd
    if (b.gf !== a.gf) return b.gf - a.gf
    return a.name.localeCompare(b.name)
  })

  return sorted.map((team, idx) => ({
    ...team,
    status: idx === 0 ? 'winner' : idx === 1 ? 'runnerup' : idx === 2 ? 'third' : 'eliminated'
  }))
}

export function buildGroupsFromMatches(groupMatches) {
  const groups = {}
  for (const [letter, matches] of Object.entries(groupMatches)) {
    const teamNames = [...new Set(matches.flatMap(m => [m.team1, m.team2]))]
    groups[letter] = { teams: computeStandings(matches, teamNames) }
  }
  return groups
}

export function getTeamGroupStats(groups, teamName) {
  for (const group of Object.values(groups)) {
    const team = group.teams.find(t => t.name === teamName)
    if (team) return team
  }
  return null
}

export function getTeamGroupResults(groupMatches, teamName) {
  const results = []
  for (const matches of Object.values(groupMatches)) {
    for (const m of matches) {
      if (m.team1 === teamName) {
        const res = m.score1 > m.score2 ? 'W' : m.score1 < m.score2 ? 'L' : 'D'
        results.push({ vs: m.team2, score: `${m.score1}–${m.score2}`, res })
      } else if (m.team2 === teamName) {
        const res = m.score2 > m.score1 ? 'W' : m.score2 < m.score1 ? 'L' : 'D'
        results.push({ vs: m.team1, score: `${m.score2}–${m.score1}`, res })
      }
    }
  }
  return results
}

export function parseScore(score) {
  const normalized = score.replace('–', '-')
  const [gf, ga] = normalized.split('-').map(s => parseInt(s.trim(), 10))
  return { gf: gf || 0, ga: ga || 0 }
}

export function statsFromGroupResults(groupResults) {
  let w = 0, d = 0, l = 0, gf = 0, ga = 0
  const form = []
  for (const r of groupResults) {
    const { gf: g, ga: a } = parseScore(r.score)
    gf += g
    ga += a
    form.push(r.res)
    if (r.res === 'W') w++
    else if (r.res === 'D') d++
    else l++
  }
  return { w, d, l, gf, ga, gd: gf - ga, pts: w * 3 + d, form }
}
