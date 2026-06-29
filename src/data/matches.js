export const FALLBACK_TODAY = [
  {
    id: 'bra-jpn',
    teamA: 'Brazil',
    teamB: 'Japan',
    scoreA: 0,
    scoreB: 0,
    status: 'PRE',
    minute: "0'",
    time: '22:30',
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

export const UPCOMING_FIXTURES = [
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

export const ALL_MATCHES_LIST = [
  { id: 'bra-jpn', teamA: 'Brazil', teamB: 'Japan', status: 'LIVE', time: '12:00' },
  { id: 'ger-par', teamA: 'Germany', teamB: 'Paraguay', status: 'PRE', time: '16:30' },
  { id: 'ned-mar', teamA: 'Netherlands', teamB: 'Morocco', status: 'PRE', time: '21:00' },
  { id: 'civ-nor', teamA: 'Ivory Coast', teamB: 'Norway', status: 'PRE', time: '17:00' },
  { id: 'fra-swe', teamA: 'France', teamB: 'Sweden', status: 'PRE', time: '21:00' },
  { id: 'mex-ecu', teamA: 'Mexico', teamB: 'Ecuador', status: 'PRE', time: '01:00' },
  { id: 'eng-cod', teamA: 'England', teamB: 'DR Congo', status: 'PRE', time: '12:00' },
  { id: 'bel-sen', teamA: 'Belgium', teamB: 'Senegal', status: 'PRE', time: '16:00' },
  { id: 'usa-bih', teamA: 'USA', teamB: 'Bosnia and Herzegovina', status: 'PRE', time: '20:00' },
  { id: 'esp-aut', teamA: 'Spain', teamB: 'Austria', status: 'PRE', time: '15:00' },
  { id: 'por-cro', teamA: 'Portugal', teamB: 'Croatia', status: 'PRE', time: '19:00' },
  { id: 'sui-alg', teamA: 'Switzerland', teamB: 'Algeria', status: 'PRE', time: '23:00' },
  { id: 'aus-egy', teamA: 'Australia', teamB: 'Egypt', status: 'PRE', time: '14:00' },
  { id: 'arg-cpv', teamA: 'Argentina', teamB: 'Cape Verde', status: 'PRE', time: '18:00' },
  { id: 'col-gha', teamA: 'Colombia', teamB: 'Ghana', status: 'PRE', time: '21:30' }
]

export const DETAIL_DATA = {
  Brazil: {
    wins: 10, draws: 2, vsWins: 0,
    form: ['W', 'W', 'W', 'D', 'W'],
    players: [
      { name: 'Vinicius Jr', pos: 'FWD', stats: '2G 2A' },
      { name: 'Rodrygo', pos: 'FWD', stats: '2G 1A' }
    ],
    pred: 'BRAZIL WIN · 2-0 · CONFIDENCE: ',
    confidence: 'HIGH',
    prob: [64, 18, 18]
  },
  Japan: {
    wins: 0, draws: 2, vsWins: 10,
    form: ['W', 'L', 'W', 'W', 'D'],
    players: [
      { name: 'Kubo', pos: 'FWD', stats: '1G 1A' },
      { name: 'Endo', pos: 'MID', stats: '0G 2A' }
    ]
  },
  Germany: {
    wins: 2, draws: 1, vsWins: 0,
    form: ['W', 'W', 'D', 'W', 'W'],
    players: [
      { name: 'Musiala', pos: 'MID', stats: '1G 2A' },
      { name: 'Wirtz', pos: 'FWD', stats: '2G 0A' }
    ],
    pred: 'GERMANY WIN · 2-1 · CONFIDENCE: ',
    confidence: 'MEDIUM',
    prob: [55, 25, 20]
  },
  Paraguay: {
    wins: 0, draws: 1, vsWins: 2,
    form: ['L', 'D', 'L', 'W', 'L'],
    players: [
      { name: 'Sanabria', pos: 'FWD', stats: '1G 0A' },
      { name: 'Almiron', pos: 'MID', stats: '0G 1A' }
    ]
  },
  Netherlands: {
    wins: 2, draws: 1, vsWins: 0,
    form: ['W', 'W', 'D', 'W', 'W'],
    players: [
      { name: 'Depay', pos: 'FWD', stats: '2G 1A' },
      { name: 'De Jong', pos: 'MID', stats: '0G 2A' }
    ],
    pred: 'NETHERLANDS WIN · 1-0 · CONFIDENCE: ',
    confidence: 'MEDIUM',
    prob: [48, 30, 22]
  },
  Morocco: {
    wins: 1, draws: 0, vsWins: 1,
    form: ['W', 'L', 'W', 'L', 'W'],
    players: [
      { name: 'Ziyech', pos: 'FWD', stats: '1G 1A' },
      { name: 'Hakimi', pos: 'DEF', stats: '0G 2A' }
    ]
  }
}
