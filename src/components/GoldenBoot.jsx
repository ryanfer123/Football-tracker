import { useState, useMemo } from 'react'
import { GOLDEN_BOOT } from '../data/matchData'

export default function GoldenBoot() {
  const [sortBy, setSortBy] = useState('GOALS')
  const [expandedPlayer, setExpandedPlayer] = useState(null)

  const sortedPlayers = useMemo(() => {
    const players = [...GOLDEN_BOOT]
    if (sortBy === 'GOALS') players.sort((a, b) => b.goals - a.goals)
    else if (sortBy === 'ASSISTS') players.sort((a, b) => b.assists - a.assists)
    else if (sortBy === 'RATING') players.sort((a, b) => b.rating - a.rating)
    return players
  }, [sortBy])

  const getRatingColor = (r) => {
    if (r >= 8) return 'high'
    if (r >= 7) return 'mid'
    return 'low'
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">⚽ Golden Boot</h1>
        <p className="page-subtitle">Top scorers • World Cup 2026</p>
      </div>

      <div className="sort-bar">
        {['GOALS', 'ASSISTS', 'RATING'].map(s => (
          <button key={s}
            className={`filter-btn ${sortBy === s ? 'active' : ''}`}
            onClick={() => setSortBy(s)}>
            {s}
          </button>
        ))}
      </div>

      <table className="scorer-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Country</th>
            <th>Club</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Mins/Goal</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, i) => (
            <>
              <tr key={player.name}
                className={`scorer-row ${i === 0 && sortBy === 'GOALS' ? 'leader' : ''}`}
                onClick={() => setExpandedPlayer(expandedPlayer === player.name ? null : player.name)}>
                <td>{i + 1}</td>
                <td>
                  <span style={{ fontWeight: 700 }}>{player.name}</span>
                  {i === 0 && sortBy === 'GOALS' && (
                    <span className="golden-boot-tag">👟 GOLDEN BOOT LEADER</span>
                  )}
                </td>
                <td>{player.flag} {player.country}</td>
                <td>{player.club}</td>
                <td style={{ fontWeight: 700, fontSize: 16 }}>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.minsPerGoal}</td>
                <td style={{ fontWeight: 700, color: player.rating >= 8.5 ? '#FF2D00' : '#000' }}>
                  {player.rating}
                </td>
              </tr>
              {expandedPlayer === player.name && (
                <tr key={`${player.name}-detail`}>
                  <td colSpan={8} style={{ padding: 0 }}>
                    <div className="scorer-expanded">
                      <div className="detail-title">Goal Breakdown</div>
                      <ul className="goal-list">
                        {player.goalDetails.map((g, j) => (
                          <li key={j}>
                            <span className="goal-minute">{g.minute}'</span>
                            <span>{g.match}</span>
                            <span className="goal-type">{g.type}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="detail-title" style={{ marginTop: 16 }}>Match Ratings</div>
                      <div className="match-rating-chips">
                        {player.matchRatings.filter(r => r > 0).map((r, j) => (
                          <div key={j} className={`rating-chip ${getRatingColor(r)}`}>
                            {r.toFixed(1)}
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: 12, fontSize: 12, color: '#888' }}>
                        Club: {player.club} • Status: <span className={`status-chip ${player.status === 'IN' ? 'in' : 'out'}`}>{player.status}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
