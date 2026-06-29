import { FlagComponent } from './shared'

const SCORERS = [
  { rank: 1, name: 'Lionel Messi', code: 'ARG', country: 'Argentina', goals: 5, assists: 3, mins: 72, eliminated: false },
  { rank: 2, name: 'Erling Haaland', code: 'NOR', country: 'Norway', goals: 4, assists: 1, mins: 90, eliminated: false },
  { rank: 3, name: 'Kylian Mbappé', code: 'FRA', country: 'France', goals: 4, assists: 2, mins: 82, eliminated: false },
  { rank: 4, name: 'Vinicius Jr', code: 'BRA', country: 'Brazil', goals: 3, assists: 2, mins: 88, eliminated: false },
  { rank: 5, name: 'Harry Kane', code: 'ENG', country: 'England', goals: 3, assists: 1, mins: 90, eliminated: false },
  { rank: 6, name: 'Robert Lewandowski', code: 'default', country: 'Poland', goals: 3, assists: 0, mins: 90, eliminated: true },
  { rank: 7, name: 'Jude Bellingham', code: 'ENG', country: 'England', goals: 2, assists: 3, mins: 90, eliminated: false },
  { rank: 8, name: 'Rodrygo', code: 'BRA', country: 'Brazil', goals: 2, assists: 2, mins: 78, eliminated: false },
  { rank: 9, name: 'Jamal Musiala', code: 'GER', country: 'Germany', goals: 2, assists: 2, mins: 84, eliminated: false },
  { rank: 10, name: 'Lautaro Martínez', code: 'ARG', country: 'Argentina', goals: 2, assists: 1, mins: 65, eliminated: false },
  { rank: 11, name: 'Antoine Griezmann', code: 'FRA', country: 'France', goals: 2, assists: 1, mins: 76, eliminated: false },
  { rank: 12, name: 'Álvaro Morata', code: 'ESP', country: 'Spain', goals: 2, assists: 0, mins: 70, eliminated: false },
  { rank: 13, name: 'Cristiano Ronaldo', code: 'POR', country: 'Portugal', goals: 2, assists: 0, mins: 80, eliminated: false },
  { rank: 14, name: 'Gonçalo Ramos', code: 'POR', country: 'Portugal', goals: 1, assists: 2, mins: 60, eliminated: false },
  { rank: 15, name: 'Julián Álvarez', code: 'ARG', country: 'Argentina', goals: 1, assists: 1, mins: 70, eliminated: false }
]

export default function GoldenBoot() {
  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          GOLDEN BOOT
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          TOP SCORERS — WC2026
        </div>
      </div>

      {/* TABLE */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-2)', background: 'var(--bg)' }}>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 60 }}>#</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px' }}>PLAYER</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 120 }}>COUNTRY</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 80, textAlign: 'right' }}>GOALS</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 100, textAlign: 'right' }}>ASSISTS</th>
              <th className="text-xs" style={{ color: 'var(--text-3)', padding: '8px 16px', width: 100, textAlign: 'right' }}>MINS/G</th>
            </tr>
          </thead>
          <tbody>
            {SCORERS.map((row) => {
              const isFirst = row.rank === 1
              const rowBorderLeft = isFirst ? '2px solid var(--accent)' : 'none'

              return (
                <tr 
                  key={row.rank}
                  style={{
                    height: 48,
                    borderBottom: '1px solid var(--border)',
                    borderLeft: rowBorderLeft,
                    transition: 'background 80ms ease',
                    cursor: 'pointer',
                    opacity: row.eliminated ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Rank */}
                  <td style={{ padding: '0 16px', fontSize: 13, fontWeight: 700, color: isFirst ? 'var(--accent)' : 'var(--text-3)' }}>
                    {row.rank}
                  </td>
                  
                  {/* Player Name */}
                  <td style={{ padding: '0 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FlagComponent teamCode={row.code} size="tiny" style={{ width: 20, height: 13 }} />
                      <span 
                        style={{ 
                          fontSize: 14, 
                          fontWeight: 700, 
                          color: 'var(--text-1)',
                          textDecoration: row.eliminated ? 'line-through' : 'none'
                        }}
                      >
                        {row.name}
                      </span>
                    </div>
                  </td>

                  {/* Country Name */}
                  <td style={{ padding: '0 16px', fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase' }}>
                    {row.country}
                  </td>

                  {/* Goals */}
                  <td style={{ padding: '0 16px', fontSize: 18, fontWeight: 800, color: isFirst ? 'var(--accent)' : 'var(--text-1)', textAlign: 'right' }}>
                    {row.goals}
                  </td>

                  {/* Assists */}
                  <td style={{ padding: '0 16px', fontSize: 13, color: 'var(--text-2)', textAlign: 'right' }}>
                    {row.assists}
                  </td>

                  {/* Mins/G */}
                  <td style={{ padding: '0 16px', fontSize: 12, color: 'var(--text-3)', textAlign: 'right' }}>
                    {row.mins}m
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
