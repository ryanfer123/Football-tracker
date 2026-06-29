import { useState } from 'react'
import { GROUPS } from '../data/matchData'

const GROUP_LETTERS = Object.keys(GROUPS).sort()

export default function Groups() {
  const [filter, setFilter] = useState('ALL')

  const shouldShowGroup = (group) => {
    if (filter === 'ALL') return true
    const teams = GROUPS[group].teams
    if (filter === 'ADVANCED') return teams.some(t => t.status === 'winner' || t.status === 'runnerup' || t.status === 'third')
    if (filter === 'ELIMINATED') return teams.some(t => t.status === 'eliminated')
    return true
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">📊 Group Stage Standings</h1>
        <p className="page-subtitle">12 groups • final standings</p>
      </div>

      <div className="filter-bar">
        {['ALL', 'ADVANCED', 'ELIMINATED'].map(f => (
          <button key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}>
            {f === 'ALL' ? 'ALL GROUPS' : f}
          </button>
        ))}
      </div>

      <div className="groups-grid">
        {GROUP_LETTERS.filter(shouldShowGroup).map(letter => {
          const group = GROUPS[letter]
          return (
            <div key={letter} className="group-card">
              <div className="group-header">GROUP {letter}</div>
              <table className="group-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {group.teams.map((team, i) => {
                    if (filter === 'ADVANCED' && team.status === 'eliminated') return null
                    if (filter === 'ELIMINATED' && team.status !== 'eliminated') return null

                    return (
                      <tr key={team.name} className={`group-row ${team.status}`}>
                        <td>{i + 1}</td>
                        <td>{team.name}</td>
                        <td>{team.p}</td>
                        <td>{team.w}</td>
                        <td>{team.d}</td>
                        <td>{team.l}</td>
                        <td>{team.gf}</td>
                        <td>{team.ga}</td>
                        <td>{team.gd > 0 ? `+${team.gd}` : team.gd}</td>
                        <td style={{ fontWeight: 700, fontSize: 13 }}>{team.pts}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}
