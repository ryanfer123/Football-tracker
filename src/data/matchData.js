// FIFA World Cup 2026 — Match, Group, Bracket, News, and Scorer Data

// ═══════════════════════════════════════════
// TODAY'S MATCHES — June 29 (Round of 32)
// ═══════════════════════════════════════════
export const TODAY_MATCHES = [
  {
    id: 'r32-2',
    teamA: 'Brazil', teamB: 'Japan',
    scoreA: 1, scoreB: 0,
    status: 'LIVE', minute: 63,
    time: '1:00 PM ET',
    stadium: 'NRG Stadium', city: 'Houston', date: 'June 29, 2026',
    round: 'Round of 32',
    h2h: { summary: 'Brazil lead H2H: 3W 1D 0L', detail: 'Brazil have won 3 of 4 meetings, including a 1-0 in 2022 friendly.' },
    formA: ['W','W','W','D','W'], formB: ['W','W','D','L','W'],
    keyPlayersA: [
      { name: 'Vinícius Jr.', pos: 'LW', stat: '2 goals in group stage' },
      { name: 'Rodrygo', pos: 'AM', stat: '2 assists, 1 goal' }
    ],
    keyPlayersB: [
      { name: 'Takefusa Kubo', pos: 'RW', stat: '2 goals in group stage' },
      { name: 'Kaoru Mitoma', pos: 'LW', stat: '1 goal, 2 assists' }
    ],
    lineupA: { formation: '4-2-3-1', players: ['Ederson','Danilo','Marquinhos','G. Magalhães','Wendell','Bruno G.','Casemiro','Rodrygo','Raphinha','Vinícius Jr.','Endrick'] },
    lineupB: { formation: '4-2-3-1', players: ['Z. Suzuki','Tomiyasu','Itakura','Taniguchi','Nagatomo','Endo','Morita','Kubo','Kamada','Mitoma','Ueda'] }
  },
  {
    id: 'r32-3',
    teamA: 'Germany', teamB: 'Paraguay',
    scoreA: null, scoreB: null,
    status: 'UPCOMING', minute: null,
    time: '4:30 PM ET',
    stadium: 'Gillette Stadium', city: 'Boston', date: 'June 29, 2026',
    round: 'Round of 32',
    h2h: { summary: 'Germany lead H2H: 2W 0D 1L', detail: 'Last met in 2002 WC — Germany won 1-0.' },
    formA: ['W','W','D','W','W'], formB: ['L','L','W','D','L'],
    keyPlayersA: [
      { name: 'Jamal Musiala', pos: 'AM', stat: '3 goals — tournament top 5' },
      { name: 'Florian Wirtz', pos: 'AM', stat: '3 assists — joint most' }
    ],
    keyPlayersB: [
      { name: 'Miguel Almirón', pos: 'AM', stat: '1 goal, 1 assist' },
      { name: 'Julio Enciso', pos: 'FW', stat: '1 goal from distance' }
    ],
    lineupA: { formation: '4-2-3-1', players: ['Neuer','Kimmich','Rüdiger','Tah','Raum','Andrich','Gündoğan','Musiala','Wirtz','Sané','Havertz'] },
    lineupB: { formation: '4-4-2', players: ['Silva','Rojas','Gómez','Balbuena','Alonso','Almirón','Romero','Villasanti','Velázquez','Enciso','Arce'] }
  },
  {
    id: 'r32-4',
    teamA: 'Netherlands', teamB: 'Morocco',
    scoreA: null, scoreB: null,
    status: 'UPCOMING', minute: null,
    time: '9:00 PM ET',
    stadium: 'Estadio BBVA', city: 'Monterrey', date: 'June 29, 2026',
    round: 'Round of 32',
    h2h: { summary: 'Netherlands lead H2H: 2W 1D 0L', detail: 'Drew 1-1 in group stage of WC2026.' },
    formA: ['D','W','L','W','W'], formB: ['D','L','W','W','D'],
    keyPlayersA: [
      { name: 'Xavi Simons', pos: 'AM', stat: '2 goals, 2 assists' },
      { name: 'Cody Gakpo', pos: 'LW', stat: '3 goals — in great form' }
    ],
    keyPlayersB: [
      { name: 'Achraf Hakimi', pos: 'RB', stat: '2 assists, MOTM vs Nigeria' },
      { name: 'Youssef En-Nesyri', pos: 'ST', stat: '2 goals — aerial threat' }
    ],
    lineupA: { formation: '4-3-3', players: ['Verbruggen','Dumfries','van Dijk','de Vrij','Aké','de Jong','Gravenberch','Simons','Gakpo','Depay','Malen'] },
    lineupB: { formation: '4-3-3', players: ['Bounou','Hakimi','Aguerd','Saïss','Mazraoui','Amrabat','Ounahi','Ziyech','En-Nesyri','Díaz','Ezzalzouli'] }
  }
];

// ═══════════════════════════════════════════
// UPCOMING MATCHES — June 30 – July 3
// ═══════════════════════════════════════════
export const UPCOMING_MATCHES = [
  { date: 'Jun 30', matches: [
    { teamA: 'Ivory Coast', teamB: 'Norway', time: '1:00 PM ET', stadium: 'SoFi Stadium', city: 'Los Angeles' },
    { teamA: 'France', teamB: 'Sweden', time: '4:30 PM ET', stadium: 'MetLife Stadium', city: 'New York/NJ' },
    { teamA: 'Mexico', teamB: 'Ecuador', time: '9:00 PM ET', stadium: 'Estadio Azteca', city: 'Mexico City' }
  ]},
  { date: 'Jul 1', matches: [
    { teamA: 'England', teamB: 'DR Congo', time: '1:00 PM ET', stadium: 'Lincoln Financial Field', city: 'Philadelphia' },
    { teamA: 'Belgium', teamB: 'Senegal', time: '4:30 PM ET', stadium: 'AT&T Stadium', city: 'Dallas' },
    { teamA: 'USA', teamB: 'Bosnia & Herz.', time: '9:00 PM ET', stadium: 'Lumen Field', city: 'Seattle' }
  ]},
  { date: 'Jul 2', matches: [
    { teamA: 'Spain', teamB: 'Austria', time: '1:00 PM ET', stadium: 'Hard Rock Stadium', city: 'Miami' },
    { teamA: 'Portugal', teamB: 'Croatia', time: '4:30 PM ET', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta' },
    { teamA: 'Switzerland', teamB: 'Algeria', time: '9:00 PM ET', stadium: 'BMO Field', city: 'Toronto' }
  ]},
  { date: 'Jul 3', matches: [
    { teamA: 'Australia', teamB: 'Egypt', time: '1:00 PM ET', stadium: 'BC Place', city: 'Vancouver' },
    { teamA: 'Argentina', teamB: 'Cape Verde', time: '4:30 PM ET', stadium: 'MetLife Stadium', city: 'New York/NJ' },
    { teamA: 'Colombia', teamB: 'Ghana', time: '9:00 PM ET', stadium: 'NRG Stadium', city: 'Houston' }
  ]}
];

// ═══════════════════════════════════════════
// BRACKET DATA
// ═══════════════════════════════════════════
export const BRACKET = {
  roundOf32: {
    left: [
      { id: 'L1', teamA: 'Canada', teamB: 'South Africa', scoreA: 1, scoreB: 0, winner: 'Canada', completed: true },
      { id: 'L2', teamA: 'Brazil', teamB: 'Japan', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'L3', teamA: 'Germany', teamB: 'Paraguay', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'L4', teamA: 'Netherlands', teamB: 'Morocco', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'L5', teamA: 'Ivory Coast', teamB: 'Norway', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'L6', teamA: 'France', teamB: 'Sweden', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'L7', teamA: 'Mexico', teamB: 'Ecuador', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'L8', teamA: 'England', teamB: 'DR Congo', scoreA: null, scoreB: null, winner: null, completed: false }
    ],
    right: [
      { id: 'R1', teamA: 'Belgium', teamB: 'Senegal', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'R2', teamA: 'USA', teamB: 'Bosnia & Herz.', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'R3', teamA: 'Spain', teamB: 'Austria', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'R4', teamA: 'Portugal', teamB: 'Croatia', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'R5', teamA: 'Switzerland', teamB: 'Algeria', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'R6', teamA: 'Australia', teamB: 'Egypt', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'R7', teamA: 'Argentina', teamB: 'Cape Verde', scoreA: null, scoreB: null, winner: null, completed: false },
      { id: 'R8', teamA: 'Colombia', teamB: 'Ghana', scoreA: null, scoreB: null, winner: null, completed: false }
    ]
  }
};

// ═══════════════════════════════════════════
// GROUP STAGE FINAL STANDINGS
// ═══════════════════════════════════════════
export const GROUPS = {
  A: {
    teams: [
      { name: 'Mexico', p: 3, w: 3, d: 0, l: 0, gf: 6, ga: 0, gd: 6, pts: 9, status: 'winner' },
      { name: 'South Africa', p: 3, w: 1, d: 1, l: 1, gf: 3, ga: 3, gd: 0, pts: 4, status: 'runnerup' },
      { name: 'Ecuador', p: 3, w: 1, d: 0, l: 2, gf: 3, ga: 4, gd: -1, pts: 3, status: 'third' },
      { name: 'South Korea', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 6, gd: -5, pts: 1, status: 'eliminated' }
    ]
  },
  B: {
    teams: [
      { name: 'Switzerland', p: 3, w: 2, d: 1, l: 0, gf: 4, ga: 0, gd: 4, pts: 7, status: 'winner' },
      { name: 'Canada', p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 2, gd: 2, pts: 4, status: 'runnerup' },
      { name: 'USA', p: 3, w: 1, d: 0, l: 2, gf: 5, ga: 1, gd: 4, pts: 3, status: 'third' },
      { name: 'Qatar', p: 3, w: 0, d: 0, l: 3, gf: 0, ga: 5, gd: -5, pts: 0, status: 'eliminated' }
    ]
  },
  C: {
    teams: [
      { name: 'Brazil', p: 3, w: 3, d: 0, l: 0, gf: 6, ga: 1, gd: 5, pts: 9, status: 'winner' },
      { name: 'Morocco', p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 4, gd: 0, pts: 4, status: 'runnerup' },
      { name: 'Netherlands', p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 4, gd: 0, pts: 4, status: 'third' },
      { name: 'Nigeria', p: 3, w: 0, d: 0, l: 3, gf: 0, ga: 5, gd: -5, pts: 0, status: 'eliminated' }
    ]
  },
  D: {
    teams: [
      { name: 'Japan', p: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, gd: 3, pts: 7, status: 'winner' },
      { name: 'Germany', p: 3, w: 2, d: 1, l: 0, gf: 6, ga: 2, gd: 4, pts: 7, status: 'runnerup' },
      { name: 'Paraguay', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, gd: -2, pts: 3, status: 'third' },
      { name: 'Cameroon', p: 3, w: 0, d: 0, l: 3, gf: 0, ga: 5, gd: -5, pts: 0, status: 'eliminated' }
    ]
  },
  E: {
    teams: [
      { name: 'France', p: 3, w: 2, d: 1, l: 0, gf: 5, ga: 1, gd: 4, pts: 7, status: 'winner' },
      { name: 'Norway', p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, gd: 2, pts: 6, status: 'runnerup' },
      { name: 'Ivory Coast', p: 3, w: 1, d: 1, l: 1, gf: 2, ga: 3, gd: -1, pts: 4, status: 'third' },
      { name: 'Denmark', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 4, gd: -3, pts: 1, status: 'eliminated' }
    ]
  },
  F: {
    teams: [
      { name: 'England', p: 3, w: 2, d: 1, l: 0, gf: 5, ga: 0, gd: 5, pts: 7, status: 'winner' },
      { name: 'DR Congo', p: 3, w: 1, d: 1, l: 1, gf: 2, ga: 3, gd: -1, pts: 4, status: 'runnerup' },
      { name: 'Serbia', p: 3, w: 0, d: 2, l: 1, gf: 1, ga: 2, gd: -1, pts: 2, status: 'third' },
      { name: 'IR Iran', p: 3, w: 0, d: 2, l: 1, gf: 1, ga: 4, gd: -3, pts: 2, status: 'eliminated' }
    ]
  },
  G: {
    teams: [
      { name: 'Belgium', p: 3, w: 2, d: 1, l: 0, gf: 6, ga: 2, gd: 4, pts: 7, status: 'winner' },
      { name: 'Senegal', p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 3, gd: 1, pts: 6, status: 'runnerup' },
      { name: 'Costa Rica', p: 3, w: 0, d: 2, l: 1, gf: 2, ga: 3, gd: -1, pts: 2, status: 'eliminated' },
      { name: 'Israel', p: 3, w: 0, d: 1, l: 2, gf: 0, ga: 4, gd: -4, pts: 1, status: 'eliminated' }
    ]
  },
  H: {
    teams: [
      { name: 'Mexico', p: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, gd: 3, pts: 7, status: 'winner' },
      { name: 'Ecuador', p: 3, w: 2, d: 0, l: 1, gf: 3, ga: 2, gd: 1, pts: 6, status: 'runnerup' },
      { name: 'Czechia', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 3, gd: -1, pts: 3, status: 'eliminated' },
      { name: 'South Korea', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 4, gd: -3, pts: 1, status: 'eliminated' }
    ]
  },
  I: {
    teams: [
      { name: 'Spain', p: 3, w: 2, d: 1, l: 0, gf: 5, ga: 1, gd: 4, pts: 7, status: 'winner' },
      { name: 'Portugal', p: 3, w: 2, d: 0, l: 1, gf: 6, ga: 3, gd: 3, pts: 6, status: 'runnerup' },
      { name: 'Croatia', p: 3, w: 0, d: 2, l: 1, gf: 3, ga: 6, gd: -3, pts: 2, status: 'third' },
      { name: 'Albania', p: 3, w: 0, d: 1, l: 2, gf: 0, ga: 4, gd: -4, pts: 1, status: 'eliminated' }
    ]
  },
  J: {
    teams: [
      { name: 'Australia', p: 3, w: 2, d: 1, l: 0, gf: 3, ga: 0, gd: 3, pts: 7, status: 'winner' },
      { name: 'Algeria', p: 3, w: 1, d: 1, l: 1, gf: 3, ga: 2, gd: 1, pts: 4, status: 'runnerup' },
      { name: 'Uruguay', p: 3, w: 0, d: 2, l: 1, gf: 1, ga: 2, gd: -1, pts: 2, status: 'third' },
      { name: 'Wales', p: 3, w: 0, d: 0, l: 3, gf: 0, ga: 3, gd: -3, pts: 0, status: 'eliminated' }
    ]
  },
  K: {
    teams: [
      { name: 'Switzerland', p: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, gd: 3, pts: 7, status: 'winner' },
      { name: 'Egypt', p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 3, gd: 1, pts: 4, status: 'runnerup' },
      { name: 'Tunisia', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 3, gd: -1, pts: 3, status: 'eliminated' },
      { name: 'Saudi Arabia', p: 3, w: 0, d: 0, l: 3, gf: 0, ga: 3, gd: -3, pts: 0, status: 'eliminated' }
    ]
  },
  L: {
    teams: [
      { name: 'Argentina', p: 3, w: 3, d: 0, l: 0, gf: 8, ga: 1, gd: 7, pts: 9, status: 'winner' },
      { name: 'Colombia', p: 3, w: 2, d: 1, l: 0, gf: 3, ga: 1, gd: 2, pts: 7, status: 'runnerup' },
      { name: 'Cape Verde', p: 3, w: 1, d: 1, l: 1, gf: 1, ga: 4, gd: -3, pts: 4, status: 'third' },
      { name: 'Ghana', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 3, gd: -2, pts: 1, status: 'eliminated' }
    ]
  }
};

// ═══════════════════════════════════════════
// GOLDEN BOOT — TOP SCORERS
// ═══════════════════════════════════════════
export const GOLDEN_BOOT = [
  { rank: 1, name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷', club: 'Inter Miami', goals: 5, assists: 3, mins: 270, minsPerGoal: 54, rating: 9.4, status: 'IN',
    goalDetails: [
      { match: 'vs Chile', minute: 23, type: 'Open play' },
      { match: 'vs Cape Verde', minute: 12, type: 'Free kick' },
      { match: 'vs Cape Verde', minute: 45, type: 'Open play' },
      { match: 'vs Cape Verde', minute: 67, type: 'Penalty' },
      { match: 'vs Ghana', minute: 78, type: 'Open play' }
    ],
    matchRatings: [8.5, 9.8, 9.2, 9.5, 9.7]
  },
  { rank: 2, name: 'Kylian Mbappé', country: 'France', flag: '🇫🇷', club: 'Real Madrid', goals: 4, assists: 2, mins: 270, minsPerGoal: 68, rating: 9.1, status: 'IN',
    goalDetails: [
      { match: 'vs Denmark', minute: 34, type: 'Open play' },
      { match: 'vs Denmark', minute: 78, type: 'Open play' },
      { match: 'vs Sweden', minute: 55, type: 'Open play' },
      { match: 'vs Senegal', minute: 12, type: 'Penalty' }
    ],
    matchRatings: [9.0, 8.8, 9.3, 9.2, 8.5]
  },
  { rank: 3, name: 'Viktor Gyökeres', country: 'Sweden', flag: '🇸🇪', club: 'Sporting CP', goals: 3, assists: 1, mins: 270, minsPerGoal: 90, rating: 8.3, status: 'IN',
    goalDetails: [
      { match: 'vs Peru', minute: 22, type: 'Header' },
      { match: 'vs Peru', minute: 67, type: 'Open play' },
      { match: 'vs Ivory Coast', minute: 83, type: 'Penalty' }
    ],
    matchRatings: [8.5, 8.0, 8.2, 7.8, 8.5]
  },
  { rank: 4, name: 'Jamal Musiala', country: 'Germany', flag: '🇩🇪', club: 'Bayern Munich', goals: 3, assists: 1, mins: 270, minsPerGoal: 90, rating: 8.7, status: 'IN',
    goalDetails: [
      { match: 'vs Cameroon', minute: 15, type: 'Open play' },
      { match: 'vs Cameroon', minute: 40, type: 'Open play' },
      { match: 'vs Paraguay', minute: 62, type: 'Open play' }
    ],
    matchRatings: [9.2, 8.5, 8.3, 8.0, 8.8]
  },
  { rank: 5, name: 'Erling Haaland', country: 'Norway', flag: '🇳🇴', club: 'Man City', goals: 3, assists: 0, mins: 180, minsPerGoal: 60, rating: 8.5, status: 'IN',
    goalDetails: [
      { match: 'vs Denmark', minute: 33, type: 'Open play' },
      { match: 'vs Peru', minute: 11, type: 'Header' },
      { match: 'vs Peru', minute: 56, type: 'Open play' }
    ],
    matchRatings: [8.8, 9.0, 8.2, 0, 0]
  },
  { rank: 6, name: 'Santiago Giménez', country: 'Mexico', flag: '🇲🇽', club: 'Feyenoord', goals: 3, assists: 0, mins: 270, minsPerGoal: 90, rating: 8.1, status: 'IN',
    goalDetails: [
      { match: 'vs South Korea', minute: 28, type: 'Open play' },
      { match: 'vs Czechia', minute: 50, type: 'Header' },
      { match: 'vs South Africa', minute: 71, type: 'Open play' }
    ],
    matchRatings: [8.2, 8.0, 7.8, 8.1, 8.3]
  },
  { rank: 7, name: 'Cody Gakpo', country: 'Netherlands', flag: '🇳🇱', club: 'Liverpool', goals: 3, assists: 1, mins: 270, minsPerGoal: 90, rating: 8.3, status: 'IN',
    goalDetails: [
      { match: 'vs Morocco', minute: 44, type: 'Open play' },
      { match: 'vs Nigeria', minute: 20, type: 'Open play' },
      { match: 'vs Nigeria', minute: 78, type: 'Header' }
    ],
    matchRatings: [8.0, 8.5, 7.6, 8.2, 8.6]
  },
  { rank: 8, name: 'Mohamed Salah', country: 'Egypt', flag: '🇪🇬', club: 'Liverpool', goals: 3, assists: 2, mins: 270, minsPerGoal: 90, rating: 8.6, status: 'IN',
    goalDetails: [
      { match: 'vs Tunisia', minute: 34, type: 'Open play' },
      { match: 'vs Tunisia', minute: 88, type: 'Penalty' },
      { match: 'vs Colombia', minute: 67, type: 'Free kick' }
    ],
    matchRatings: [7.5, 9.0, 8.5, 8.2, 8.8]
  },
  { rank: 9, name: 'Jude Bellingham', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Real Madrid', goals: 3, assists: 2, mins: 270, minsPerGoal: 90, rating: 8.9, status: 'IN',
    goalDetails: [
      { match: 'vs DR Congo', minute: 42, type: 'Open play' },
      { match: 'vs IR Iran', minute: 23, type: 'Header' },
      { match: 'vs IR Iran', minute: 55, type: 'Open play' }
    ],
    matchRatings: [8.8, 9.2, 8.5, 8.7, 9.0]
  },
  { rank: 10, name: 'Vinícius Jr.', country: 'Brazil', flag: '🇧🇷', club: 'Real Madrid', goals: 2, assists: 1, mins: 270, minsPerGoal: 135, rating: 8.4, status: 'IN',
    goalDetails: [
      { match: 'vs Nigeria', minute: 67, type: 'Open play' },
      { match: 'vs Morocco', minute: 23, type: 'Open play' }
    ],
    matchRatings: [8.5, 8.0, 8.8, 8.2, 8.3]
  },
  { rank: 11, name: 'Lamine Yamal', country: 'Spain', flag: '🇪🇸', club: 'Barcelona', goals: 2, assists: 3, mins: 270, minsPerGoal: 135, rating: 8.8, status: 'IN',
    goalDetails: [
      { match: 'vs Austria', minute: 56, type: 'Open play' },
      { match: 'vs Croatia', minute: 72, type: 'Open play' }
    ],
    matchRatings: [8.5, 9.0, 8.8, 8.2, 9.2]
  },
  { rank: 12, name: 'Julián Álvarez', country: 'Argentina', flag: '🇦🇷', club: 'Atlético Madrid', goals: 2, assists: 1, mins: 200, minsPerGoal: 100, rating: 8.1, status: 'IN',
    goalDetails: [
      { match: 'vs Chile', minute: 78, type: 'Open play' },
      { match: 'vs Ghana', minute: 34, type: 'Header' }
    ],
    matchRatings: [7.8, 8.0, 8.2, 8.5, 7.9]
  },
  { rank: 13, name: 'Harry Kane', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Bayern Munich', goals: 2, assists: 0, mins: 270, minsPerGoal: 135, rating: 7.7, status: 'IN',
    goalDetails: [
      { match: 'vs DR Congo', minute: 55, type: 'Penalty' },
      { match: 'vs IR Iran', minute: 80, type: 'Open play' }
    ],
    matchRatings: [7.5, 7.8, 7.2, 7.9, 8.0]
  },
  { rank: 14, name: 'Cristiano Ronaldo', country: 'Portugal', flag: '🇵🇹', club: 'Al Nassr', goals: 2, assists: 0, mins: 270, minsPerGoal: 135, rating: 7.5, status: 'IN',
    goalDetails: [
      { match: 'vs Croatia', minute: 89, type: 'Header' },
      { match: 'vs Albania', minute: 23, type: 'Penalty' }
    ],
    matchRatings: [7.2, 7.8, 7.0, 7.5, 7.8]
  },
  { rank: 15, name: 'Christian Pulisic', country: 'USA', flag: '🇺🇸', club: 'AC Milan', goals: 2, assists: 2, mins: 270, minsPerGoal: 135, rating: 8.3, status: 'IN',
    goalDetails: [
      { match: 'vs Qatar', minute: 12, type: 'Open play' },
      { match: 'vs Bosnia & Herz.', minute: 34, type: 'Open play' }
    ],
    matchRatings: [7.0, 8.5, 8.8, 8.2, 8.5]
  }
];

// ═══════════════════════════════════════════
// NEWS FEED
// ═══════════════════════════════════════════
export const NEWS = [
  {
    id: 1,
    category: 'MATCH REPORT',
    headline: "Canada Stun South Africa With Eustáquio's Stoppage-Time Winner",
    summary: "Stephen Eustáquio's stunning 93rd-minute volley sends Canada through to the Round of 16 and South Africa packing. The Porto midfielder struck from the edge of the box to break South African hearts.",
    fullText: "In one of the most dramatic moments of the World Cup so far, Stephen Eustáquio delivered a stoppage-time masterclass to send Canada into the Round of 16 for the first time in their history. The match had been a tense, tactical affair at Gillette Stadium, Boston, with South Africa defending deep and looking dangerous on the counter through Percy Tau. Canada dominated possession but struggled to break down a well-organized Bafana Bafana defence. As the clock ticked past 90 minutes, Alphonso Davies surged down the left flank and cut the ball back to the edge of the area. Eustáquio met it first time, sending a swerving volley past the despairing dive of Ronwen Williams. The stadium erupted. Scenes of celebration were matched by heartbreak on the South African bench, as Hugo Broos' side were eliminated despite a spirited group stage campaign.",
    timestamp: '3 hours ago'
  },
  {
    id: 2,
    category: 'STATS',
    headline: 'Messi Breaks All-Time World Cup Scoring Record',
    summary: "Lionel Messi has become the all-time leading scorer in World Cup history with his fifth goal of the tournament, surpassing Miroslav Klose's record of 16 career goals.",
    fullText: "At the age of 38, Lionel Messi has added another extraordinary chapter to his storybook career. His fifth goal of the 2026 World Cup — a delicate chip over Ghana goalkeeper Ati-Zigi — was his 17th career World Cup goal, surpassing Miroslav Klose's long-standing record of 16. The Inter Miami forward, widely considered the greatest player of all time, celebrated by pointing to the sky and then embracing his teammates. 'This tournament means everything to me,' Messi said post-match. 'Every game could be my last, so I play with everything I have.' Argentina coach Lionel Scaloni called it 'a moment for the history books.' Messi now leads the Golden Boot race with 5 goals and 3 assists in just 3 group-stage matches.",
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    category: 'MATCH REPORT',
    headline: 'Morocco Shock Netherlands 2-1 in Group Stage Upset',
    summary: "Morocco continued their stunning World Cup run with a 2-1 victory over the Netherlands in the group stage, with Youssef En-Nesyri scoring a towering header.",
    fullText: "Morocco's 2022 World Cup heroics were no fluke. Walid Regragui's side produced another seismic upset, defeating the Netherlands 2-1 in their final group stage match at MetLife Stadium. Youssef En-Nesyri opened the scoring with a towering header in the 34th minute, rising above Virgil van Dijk in a moment that will be replayed for years. Cody Gakpo equalized with a well-taken finish, but Morocco restored their lead through a Hakim Ziyech free kick that curled into the top corner. The Atlas Lions' defensive organization was outstanding, with Achraf Hakimi producing a man-of-the-match performance at right-back. Despite the defeat, the Netherlands still qualified for the Round of 32 as one of the best third-placed teams.",
    timestamp: '1 day ago'
  },
  {
    id: 4,
    category: 'INJURY',
    headline: "Haaland Rested for Norway's Group Finale — Fit for Round of 32",
    summary: "Erling Haaland was rested for Norway's final group match against France but is confirmed fit for the Round of 32 clash against Ivory Coast.",
    fullText: "Norway fans can breathe a collective sigh of relief. Erling Haaland, who was substituted in the 60th minute of Norway's 3-0 win over Peru with a minor hamstring concern, has been confirmed fully fit for the Round of 32. Manager Ståle Solbakken opted to rest his star striker against France, a match Norway lost 2-0. 'It was always the plan to manage Erling's workload,' Solbakken explained. 'He will start against Ivory Coast and he will be at 100%.' The Manchester City forward has scored 3 goals in 2 appearances and is firmly in the Golden Boot race alongside Messi and Mbappé.",
    timestamp: '8 hours ago'
  },
  {
    id: 5,
    category: 'HISTORY',
    headline: "Argentina's Path to Glory: Can Messi Win His Second?",
    summary: "With Messi in supreme form and Argentina's squad deeper than ever, the defending champions are on course for back-to-back titles. We chart their path through the knockout rounds.",
    fullText: "Argentina entered the 2026 World Cup as defending champions and the team to beat. Three matches, three wins, eight goals scored and just one conceded — Lionel Scaloni's side have been the most convincing team in the group stage. At the heart of it all is Lionel Messi, who at 38 is somehow playing the best football of his twilight years. His five goals have broken Miroslav Klose's all-time World Cup scoring record, and his connection with Julián Álvarez and Enzo Fernández has been telepathic. Their Round of 32 opponent, Cape Verde, represents a beatable but dangerous hurdle — the debutants showed incredible spirit in the group stage. Beyond that, potential matchups with Colombia, Spain, and France loom. But this Argentina side fears no one.",
    timestamp: '12 hours ago'
  },
  {
    id: 6,
    category: 'STATS',
    headline: 'World Cup 2026 Sets All-Time Attendance Record',
    summary: "With matches spread across 16 venues in the USA, Mexico, and Canada, the 2026 World Cup has shattered all previous attendance records before the knockout stage even begins.",
    fullText: "FIFA has confirmed that the 2026 World Cup has already broken the all-time tournament attendance record, with over 3.2 million fans attending the 48 group-stage matches. The expanded format, featuring 48 teams for the first time, combined with massive venues across North America, has driven unprecedented demand. MetLife Stadium in New York/NJ has hosted the highest individual attendance — 87,523 for USA vs Switzerland. Estadio Azteca in Mexico City has provided the most atmospheric backdrop, while Canadian venues in Toronto and Vancouver have been praised for their organization. 'This is the people's World Cup,' said FIFA president Gianni Infantino. 'Football is truly global.'",
    timestamp: '6 hours ago'
  },
  {
    id: 7,
    category: 'MATCH REPORT',
    headline: 'VAR Controversy: Three Big Calls That Defined the Group Stage',
    summary: "Video Assistant Referee technology was at the center of several controversial decisions during the group stage, sparking heated debate about its role in football.",
    fullText: "The group stage of the 2026 World Cup will be remembered not just for the football, but for three VAR decisions that changed the course of the tournament. First, a disputed penalty for France against Peru — replays showed minimal contact, but the referee pointed to the spot after a VAR review. Second, an offside call that ruled out what would have been a dramatic equalizer for Croatia against Spain, with the margin measured at just 2 centimeters. Third, a red card overturned for Germany's Andrich against Japan — initially sent off for a reckless challenge, the card was downgraded to yellow after a lengthy review. Each decision sparked debate, but FIFA's chief refereeing officer defended the system: 'VAR is not perfect, but it makes football fairer.'",
    timestamp: '2 days ago'
  },
  {
    id: 8,
    category: 'MATCH REPORT',
    headline: "France's Mbappé Returns to Form with Double Against Denmark",
    summary: "After a quiet start to the tournament, Kylian Mbappé exploded with two goals against Denmark to announce himself as the tournament's most dangerous player.",
    fullText: "Kylian Mbappé silenced his critics with a devastating two-goal performance against Denmark in France's opening group match. The Real Madrid forward, who had been managing a minor ankle issue in the lead-up to the tournament, was electric from the first whistle. His first goal came on 34 minutes — a blistering counter-attack that saw him receive the ball on the halfway line, accelerate past two defenders, and slot coolly past Kasper Schmeichel. His second was even better: a step-over, a drag-back, and a curling finish into the far corner that left the MetLife Stadium crowd in awe. 'That is the best player in the world right now,' said Didier Deschamps. 'When Kylian plays like that, nobody can stop him.'",
    timestamp: '4 days ago'
  }
];

// ═══════════════════════════════════════════
// PREDICTION ENGINE — TOURNAMENT ODDS
// ═══════════════════════════════════════════
export const TOURNAMENT_ODDS = [
  { team: 'France', probability: 18.5 },
  { team: 'Brazil', probability: 15.2 },
  { team: 'Argentina', probability: 14.8 },
  { team: 'Germany', probability: 10.5 },
  { team: 'Spain', probability: 9.8 },
  { team: 'England', probability: 8.2 },
  { team: 'Netherlands', probability: 4.5 },
  { team: 'Portugal', probability: 4.2 },
  { team: 'Belgium', probability: 2.8 },
  { team: 'Norway', probability: 2.1 },
  { team: 'Croatia', probability: 1.5 },
  { team: 'USA', probability: 1.2 },
  { team: 'Mexico', probability: 1.0 },
  { team: 'Japan', probability: 0.9 },
  { team: 'Switzerland', probability: 0.8 },
  { team: 'Morocco', probability: 0.8 },
  { team: 'Colombia', probability: 0.7 },
  { team: 'Egypt', probability: 0.5 },
  { team: 'Sweden', probability: 0.4 },
  { team: 'Senegal', probability: 0.3 },
  { team: 'Australia', probability: 0.2 },
  { team: 'Canada', probability: 0.2 },
  { team: 'Austria', probability: 0.2 },
  { team: 'Ivory Coast', probability: 0.1 },
  { team: 'Ecuador', probability: 0.1 },
  { team: 'Algeria', probability: 0.1 },
  { team: 'Ghana', probability: 0.05 },
  { team: 'Paraguay', probability: 0.05 },
  { team: 'DR Congo', probability: 0.02 },
  { team: 'Cape Verde', probability: 0.01 },
  { team: 'Bosnia & Herz.', probability: 0.01 },
  { team: 'South Africa', probability: 0.0 }
];
