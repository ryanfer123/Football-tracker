// FIFA World Cup 2026 — Complete Team Database
// Flag colors are CSS-only flat representations

export const TEAMS = {
  Brazil: {
    code: 'BRA', flag: '🇧🇷', group: 'C',
    flagColors: ['#009C3B', '#FFDF00', '#002776'],
    ranking: 3, titles: 5, titleYears: [1958, 1962, 1970, 1994, 2002],
    status: 'IN', coach: 'Dorival Júnior',
    wcHistory: {
      1930: 'GROUP', 1934: 'R1', 1938: 'SF', 1950: 'FINAL', 1954: 'QF',
      1958: 'WON', 1962: 'WON', 1966: 'GROUP', 1970: 'WON', 1974: 'R2',
      1978: 'R2', 1982: 'R2', 1986: 'QF', 1990: 'R16', 1994: 'WON',
      1998: 'FINAL', 2002: 'WON', 2006: 'QF', 2010: 'QF', 2014: 'SF',
      2018: 'QF', 2022: 'QF', 2026: 'R32'
    },
    formation: '4-2-3-1',
    squad: {
      GK: ['Ederson'],
      DEF: ['Danilo', 'Marquinhos', 'Gabriel Magalhães', 'Wendell'],
      MID: ['Bruno Guimarães', 'Casemiro', 'Rodrygo', 'Raphinha', 'Vinícius Jr.'],
      FW: ['Endrick']
    },
    keyPlayers: [
      { name: 'Vinícius Jr.', position: 'LW', club: 'Real Madrid', goals: 2, assists: 1, rating: 8.4, note: 'Explosive pace and dribbling — Brazil\'s main attacking threat on the left flank.' },
      { name: 'Rodrygo', position: 'RW/AM', club: 'Real Madrid', goals: 1, assists: 2, rating: 7.9, note: 'Versatile attacker who links play brilliantly between midfield and attack.' },
      { name: 'Casemiro', position: 'CDM', club: 'Man United', goals: 0, assists: 0, rating: 7.2, note: 'The midfield anchor — wins every aerial duel and shields the back four.' }
    ],
    stats: { attack: 88, defence: 78, midfield: 82, pace: 90, experience: 95, cohesion: 80 },
    groupResults: [
      { vs: 'Nigeria', result: 'W', score: '2-0' },
      { vs: 'Netherlands', result: 'W', score: '1-0' },
      { vs: 'Morocco', result: 'W', score: '3-1' }
    ]
  },
  Germany: {
    code: 'GER', flag: '🇩🇪', group: 'D',
    flagColors: ['#000000', '#DD0000', '#FFCC00'],
    ranking: 8, titles: 4, titleYears: [1954, 1974, 1990, 2014],
    status: 'IN', coach: 'Julian Nagelsmann',
    wcHistory: {
      1930: 'DNQ', 1934: 'SF', 1938: 'R1', 1950: 'DNQ', 1954: 'WON',
      1958: 'SF', 1962: 'QF', 1966: 'FINAL', 1970: 'SF', 1974: 'WON',
      1978: 'R2', 1982: 'FINAL', 1986: 'FINAL', 1990: 'WON', 1994: 'QF',
      1998: 'QF', 2002: 'FINAL', 2006: 'SF', 2010: 'SF', 2014: 'WON',
      2018: 'GROUP', 2022: 'GROUP', 2026: 'R32'
    },
    formation: '4-2-3-1',
    squad: {
      GK: ['Manuel Neuer'],
      DEF: ['Joshua Kimmich', 'Antonio Rüdiger', 'Jonathan Tah', 'David Raum'],
      MID: ['Robert Andrich', 'İlkay Gündoğan', 'Jamal Musiala', 'Florian Wirtz', 'Leroy Sané'],
      FW: ['Kai Havertz']
    },
    keyPlayers: [
      { name: 'Jamal Musiala', position: 'AM', club: 'Bayern Munich', goals: 3, assists: 1, rating: 8.7, note: 'The tournament\'s breakout star — impossible to dispossess, scores from anywhere.' },
      { name: 'Florian Wirtz', position: 'AM', club: 'B. Leverkusen', goals: 1, assists: 3, rating: 8.5, note: 'Vision beyond his years. Controls tempo and creates chances at will.' },
      { name: 'Antonio Rüdiger', position: 'CB', club: 'Real Madrid', goals: 0, assists: 0, rating: 7.6, note: 'Commanding presence at the back — dominates aerial duels and organizes the line.' }
    ],
    stats: { attack: 85, defence: 80, midfield: 88, pace: 82, experience: 92, cohesion: 85 },
    groupResults: [
      { vs: 'Cameroon', result: 'W', score: '3-0' },
      { vs: 'Paraguay', result: 'W', score: '2-1' },
      { vs: 'Japan', result: 'D', score: '1-1' }
    ]
  },
  France: {
    code: 'FRA', flag: '🇫🇷', group: 'E',
    flagColors: ['#002395', '#FFFFFF', '#ED2939'],
    ranking: 2, titles: 2, titleYears: [1998, 2018],
    status: 'IN', coach: 'Didier Deschamps',
    wcHistory: {
      1930: 'GROUP', 1934: 'R1', 1938: 'QF', 1950: 'DNQ', 1954: 'GROUP',
      1958: 'SF', 1962: 'DNQ', 1966: 'GROUP', 1970: 'DNQ', 1974: 'DNQ',
      1978: 'GROUP', 1982: 'SF', 1986: 'SF', 1990: 'GROUP', 1994: 'DNQ',
      1998: 'WON', 2002: 'GROUP', 2006: 'FINAL', 2010: 'GROUP', 2014: 'QF',
      2018: 'WON', 2022: 'FINAL', 2026: 'R32'
    },
    formation: '4-3-3',
    squad: {
      GK: ['Mike Maignan'],
      DEF: ['Jules Koundé', 'Dayot Upamecano', 'William Saliba', 'Theo Hernández'],
      MID: ['Aurélien Tchouaméni', 'Eduardo Camavinga', 'Antoine Griezmann'],
      FW: ['Kylian Mbappé', 'Ousmane Dembélé', 'Marcus Thuram']
    },
    keyPlayers: [
      { name: 'Kylian Mbappé', position: 'ST/LW', club: 'Real Madrid', goals: 4, assists: 2, rating: 9.1, note: 'The fastest player at the tournament. Terrifying on the counter, clinical in front of goal.' },
      { name: 'Antoine Griezmann', position: 'AM', club: 'Atlético Madrid', goals: 1, assists: 3, rating: 8.2, note: 'The brain behind France\'s attack. Drops deep, finds spaces, creates magic.' },
      { name: 'William Saliba', position: 'CB', club: 'Arsenal', goals: 0, assists: 0, rating: 7.8, note: 'Rock solid at the back — barely puts a foot wrong. France\'s defensive wall.' }
    ],
    stats: { attack: 92, defence: 85, midfield: 85, pace: 93, experience: 90, cohesion: 88 },
    groupResults: [
      { vs: 'Denmark', result: 'W', score: '2-0' },
      { vs: 'Sweden', result: 'W', score: '1-0' },
      { vs: 'Peru', result: 'D', score: '1-1' }
    ]
  },
  Argentina: {
    code: 'ARG', flag: '🇦🇷', group: 'L',
    flagColors: ['#74ACDF', '#FFFFFF', '#F6B40E'],
    ranking: 1, titles: 3, titleYears: [1978, 1986, 2022],
    status: 'IN', coach: 'Lionel Scaloni',
    wcHistory: {
      1930: 'FINAL', 1934: 'R1', 1938: 'DNQ', 1950: 'DNQ', 1954: 'DNQ',
      1958: 'GROUP', 1962: 'GROUP', 1966: 'QF', 1970: 'DNQ', 1974: 'R2',
      1978: 'WON', 1982: 'R2', 1986: 'WON', 1990: 'FINAL', 1994: 'R16',
      1998: 'QF', 2002: 'GROUP', 2006: 'QF', 2010: 'QF', 2014: 'FINAL',
      2018: 'R16', 2022: 'WON', 2026: 'R32'
    },
    formation: '4-3-3',
    squad: {
      GK: ['Emiliano Martínez'],
      DEF: ['Nahuel Molina', 'Cristian Romero', 'Lisandro Martínez', 'Nicolás Tagliafico'],
      MID: ['Rodrigo De Paul', 'Enzo Fernández', 'Alexis Mac Allister'],
      FW: ['Lionel Messi', 'Julián Álvarez', 'Lautaro Martínez']
    },
    keyPlayers: [
      { name: 'Lionel Messi', position: 'RW/CF', club: 'Inter Miami', goals: 5, assists: 3, rating: 9.4, note: 'The GOAT on his final World Cup stage. Leading Golden Boot race. Every touch is pure magic.' },
      { name: 'Julián Álvarez', position: 'ST', club: 'Atlético Madrid', goals: 2, assists: 1, rating: 8.1, note: 'Relentless pressing and clinical finishing — the perfect partner for Messi.' },
      { name: 'Enzo Fernández', position: 'CM', club: 'Chelsea', goals: 1, assists: 2, rating: 8.3, note: 'Box-to-box engine who dictates play with passing range and defensive grit.' }
    ],
    stats: { attack: 90, defence: 82, midfield: 86, pace: 85, experience: 93, cohesion: 95 },
    groupResults: [
      { vs: 'Chile', result: 'W', score: '2-0' },
      { vs: 'Cape Verde', result: 'W', score: '4-0' },
      { vs: 'Ghana', result: 'W', score: '2-1' }
    ]
  },
  Spain: {
    code: 'ESP', flag: '🇪🇸', group: 'I',
    flagColors: ['#AA151B', '#F1BF00', '#AA151B'],
    ranking: 5, titles: 1, titleYears: [2010],
    status: 'IN', coach: 'Luis de la Fuente',
    wcHistory: {
      1930: 'DNQ', 1934: 'QF', 1938: 'DNQ', 1950: 'R2', 1954: 'DNQ',
      1958: 'DNQ', 1962: 'GROUP', 1966: 'GROUP', 1970: 'DNQ', 1974: 'DNQ',
      1978: 'GROUP', 1982: 'R2', 1986: 'QF', 1990: 'R16', 1994: 'QF',
      1998: 'GROUP', 2002: 'QF', 2006: 'R16', 2010: 'WON', 2014: 'GROUP',
      2018: 'R16', 2022: 'R16', 2026: 'R32'
    },
    formation: '4-3-3',
    squad: {
      GK: ['Unai Simón'],
      DEF: ['Dani Carvajal', 'Aymeric Laporte', 'Robin Le Normand', 'Marc Cucurella'],
      MID: ['Pedri', 'Rodri', 'Gavi'],
      FW: ['Lamine Yamal', 'Álvaro Morata', 'Nico Williams']
    },
    keyPlayers: [
      { name: 'Lamine Yamal', position: 'RW', club: 'Barcelona', goals: 2, assists: 3, rating: 8.8, note: 'Just 18 years old and already the tournament\'s most exciting talent. Unstoppable on the wing.' },
      { name: 'Rodri', position: 'CDM', club: 'Man City', goals: 0, assists: 1, rating: 8.0, note: 'The metronome. Controls the game\'s tempo with surgical passing and positioning.' },
      { name: 'Pedri', position: 'CM', club: 'Barcelona', goals: 1, assists: 2, rating: 8.3, note: 'Silky smooth on the ball — finds passes nobody else sees. Spain\'s creative heartbeat.' }
    ],
    stats: { attack: 86, defence: 80, midfield: 92, pace: 88, experience: 82, cohesion: 90 },
    groupResults: [
      { vs: 'Austria', result: 'W', score: '2-0' },
      { vs: 'Croatia', result: 'W', score: '3-1' },
      { vs: 'Albania', result: 'D', score: '0-0' }
    ]
  },
  England: {
    code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'F',
    flagColors: ['#FFFFFF', '#CE1124', '#FFFFFF'],
    ranking: 4, titles: 1, titleYears: [1966],
    status: 'IN', coach: 'Thomas Tuchel',
    wcHistory: {
      1930: 'DNQ', 1934: 'DNQ', 1938: 'DNQ', 1950: 'GROUP', 1954: 'QF',
      1958: 'GROUP', 1962: 'QF', 1966: 'WON', 1970: 'QF', 1974: 'DNQ',
      1978: 'DNQ', 1982: 'R2', 1986: 'QF', 1990: 'SF', 1994: 'DNQ',
      1998: 'R16', 2002: 'QF', 2006: 'QF', 2010: 'R16', 2014: 'GROUP',
      2018: 'SF', 2022: 'QF', 2026: 'R32'
    },
    formation: '4-2-3-1',
    squad: {
      GK: ['Jordan Pickford'],
      DEF: ['Trent Alexander-Arnold', 'John Stones', 'Marc Guéhi', 'Luke Shaw'],
      MID: ['Declan Rice', 'Kobbie Mainoo', 'Jude Bellingham', 'Phil Foden', 'Bukayo Saka'],
      FW: ['Harry Kane']
    },
    keyPlayers: [
      { name: 'Jude Bellingham', position: 'AM', club: 'Real Madrid', goals: 3, assists: 2, rating: 8.9, note: 'Scores goals from midfield like nobody else. England\'s talisman in big moments.' },
      { name: 'Bukayo Saka', position: 'RW', club: 'Arsenal', goals: 2, assists: 1, rating: 8.1, note: 'Direct, brave, and lethal from the right. Always steps up in tournament football.' },
      { name: 'Harry Kane', position: 'ST', club: 'Bayern Munich', goals: 2, assists: 0, rating: 7.7, note: 'England\'s all-time top scorer. Clinical from 6 yards or 25 — it doesn\'t matter.' }
    ],
    stats: { attack: 87, defence: 78, midfield: 86, pace: 85, experience: 85, cohesion: 78 },
    groupResults: [
      { vs: 'DR Congo', result: 'W', score: '2-0' },
      { vs: 'IR Iran', result: 'W', score: '3-0' },
      { vs: 'Serbia', result: 'D', score: '0-0' }
    ]
  },
  Netherlands: {
    code: 'NED', flag: '🇳🇱', group: 'C',
    flagColors: ['#AE1C28', '#FFFFFF', '#21468B'],
    ranking: 6, titles: 0, titleYears: [],
    status: 'IN', coach: 'Ronald Koeman',
    wcHistory: {
      1930: 'DNQ', 1934: 'R1', 1938: 'R1', 1950: 'DNQ', 1954: 'DNQ',
      1958: 'DNQ', 1962: 'DNQ', 1966: 'DNQ', 1970: 'DNQ', 1974: 'FINAL',
      1978: 'FINAL', 1982: 'DNQ', 1986: 'DNQ', 1990: 'R16', 1994: 'QF',
      1998: 'SF', 2002: 'DNQ', 2006: 'R16', 2010: 'FINAL', 2014: 'SF',
      2018: 'DNQ', 2022: 'QF', 2026: 'R32'
    },
    formation: '4-3-3',
    squad: {
      GK: ['Bart Verbruggen'],
      DEF: ['Denzel Dumfries', 'Virgil van Dijk', 'Stefan de Vrij', 'Nathan Aké'],
      MID: ['Frenkie de Jong', 'Ryan Gravenberch', 'Xavi Simons'],
      FW: ['Cody Gakpo', 'Memphis Depay', 'Donyell Malen']
    },
    keyPlayers: [
      { name: 'Virgil van Dijk', position: 'CB', club: 'Liverpool', goals: 0, assists: 0, rating: 7.8, note: 'The best defender at the tournament. Reads the game like a chess grandmaster.' },
      { name: 'Xavi Simons', position: 'AM', club: 'RB Leipzig', goals: 2, assists: 2, rating: 8.5, note: 'Electric talent — scores bangers and runs at defences without fear.' },
      { name: 'Cody Gakpo', position: 'LW', club: 'Liverpool', goals: 3, assists: 1, rating: 8.3, note: 'Tournament player — always peaks at World Cups. Lethal cutting inside from the left.' }
    ],
    stats: { attack: 84, defence: 82, midfield: 85, pace: 83, experience: 80, cohesion: 82 },
    groupResults: [
      { vs: 'Morocco', result: 'D', score: '1-1' },
      { vs: 'Nigeria', result: 'W', score: '2-0' },
      { vs: 'Brazil', result: 'L', score: '1-3' }
    ]
  },
  Portugal: {
    code: 'POR', flag: '🇵🇹', group: 'I',
    flagColors: ['#006600', '#FF0000', '#FFCC00'],
    ranking: 7, titles: 0, titleYears: [],
    status: 'IN', coach: 'Roberto Martínez',
    wcHistory: {
      1930: 'DNQ', 1934: 'DNQ', 1938: 'DNQ', 1950: 'DNQ', 1954: 'DNQ',
      1958: 'DNQ', 1962: 'DNQ', 1966: 'SF', 1970: 'DNQ', 1974: 'DNQ',
      1978: 'DNQ', 1982: 'DNQ', 1986: 'R1', 1990: 'DNQ', 1994: 'DNQ',
      1998: 'DNQ', 2002: 'GROUP', 2006: 'SF', 2010: 'R16', 2014: 'GROUP',
      2018: 'R16', 2022: 'QF', 2026: 'R32'
    },
    formation: '4-3-3',
    squad: {
      GK: ['Diogo Costa'],
      DEF: ['João Cancelo', 'Rúben Dias', 'Pepe', 'Nuno Mendes'],
      MID: ['Bernardo Silva', 'Vitinha', 'Bruno Fernandes'],
      FW: ['Rafael Leão', 'Cristiano Ronaldo', 'Pedro Neto']
    },
    keyPlayers: [
      { name: 'Cristiano Ronaldo', position: 'ST', club: 'Al Nassr', goals: 2, assists: 0, rating: 7.5, note: 'Age 41 and still scoring at World Cups. The ultimate competitor on his farewell tour.' },
      { name: 'Bruno Fernandes', position: 'AM', club: 'Man United', goals: 1, assists: 3, rating: 8.2, note: 'The creative engine — delivers deadly set pieces and through balls.' },
      { name: 'Rafael Leão', position: 'LW', club: 'AC Milan', goals: 2, assists: 1, rating: 8.0, note: 'Blistering pace and skill. When he\'s on form, he\'s unplayable.' }
    ],
    stats: { attack: 84, defence: 75, midfield: 84, pace: 86, experience: 85, cohesion: 76 },
    groupResults: [
      { vs: 'Croatia', result: 'W', score: '2-1' },
      { vs: 'Albania', result: 'W', score: '3-0' },
      { vs: 'Spain', result: 'L', score: '1-2' }
    ]
  },
  // === OTHER TEAMS (condensed data) ===
  Canada: {
    code: 'CAN', flag: '🇨🇦', group: 'B',
    flagColors: ['#FF0000', '#FFFFFF', '#FF0000'],
    ranking: 33, titles: 0, titleYears: [],
    status: 'IN', coach: 'Jesse Marsch',
    wcHistory: { 1986: 'GROUP', 2022: 'GROUP', 2026: 'R32' },
    formation: '4-4-2',
    squad: {
      GK: ['Maxime Crépeau'], DEF: ['Alistair Johnston', 'Moise Bombito', 'Kamal Miller', 'Alphonso Davies'],
      MID: ['Stephen Eustáquio', 'Ismael Koné', 'Tajon Buchanan', 'Jonathan David'],
      FW: ['Cyle Larin', 'Jonathan David']
    },
    keyPlayers: [
      { name: 'Alphonso Davies', position: 'LB', club: 'Real Madrid', goals: 0, assists: 2, rating: 7.8, note: 'Blazing speed from left-back. Canada\'s most talented player by a mile.' },
      { name: 'Jonathan David', position: 'ST', club: 'Lille', goals: 2, assists: 0, rating: 7.6, note: 'Clinical finisher — scores goals wherever he goes.' },
      { name: 'Stephen Eustáquio', position: 'CM', club: 'Porto', goals: 1, assists: 1, rating: 7.9, note: 'Midfield general. Scored the dramatic winner against South Africa.' }
    ],
    stats: { attack: 72, defence: 68, midfield: 70, pace: 80, experience: 40, cohesion: 82 },
    groupResults: [
      { vs: 'Qatar', result: 'W', score: '2-0' },
      { vs: 'Bosnia & Herz.', result: 'D', score: '1-1' },
      { vs: 'South Africa', result: 'W', score: '1-0' }
    ]
  },
  Japan: {
    code: 'JPN', flag: '🇯🇵', group: 'D',
    flagColors: ['#FFFFFF', '#BC002D', '#FFFFFF'],
    ranking: 15, titles: 0, titleYears: [],
    status: 'IN', coach: 'Hajime Moriyasu',
    wcHistory: { 1998: 'GROUP', 2002: 'R16', 2006: 'GROUP', 2010: 'R16', 2014: 'GROUP', 2018: 'R16', 2022: 'R16', 2026: 'R32' },
    formation: '4-2-3-1',
    squad: {
      GK: ['Zion Suzuki'], DEF: ['Takehiro Tomiyasu', 'Ko Itakura', 'Shogo Taniguchi', 'Kaoru Mitoma'],
      MID: ['Wataru Endo', 'Hidemasa Morita', 'Takefusa Kubo', 'Daichi Kamada', 'Kaoru Mitoma'],
      FW: ['Ayase Ueda']
    },
    keyPlayers: [
      { name: 'Takefusa Kubo', position: 'RW', club: 'Real Sociedad', goals: 2, assists: 1, rating: 8.0, note: 'Japan\'s star man. Tricky and direct — gives defenders nightmares.' },
      { name: 'Kaoru Mitoma', position: 'LW', club: 'Brighton', goals: 1, assists: 2, rating: 7.8, note: 'The dribbling machine. His close control in tight spaces is mesmerizing.' },
      { name: 'Wataru Endo', position: 'CDM', club: 'Liverpool', goals: 0, assists: 1, rating: 7.5, note: 'The heartbeat of the team. Intelligent positioning and tireless work rate.' }
    ],
    stats: { attack: 76, defence: 72, midfield: 78, pace: 82, experience: 65, cohesion: 88 },
    groupResults: [
      { vs: 'Paraguay', result: 'W', score: '2-0' },
      { vs: 'Cameroon', result: 'W', score: '1-0' },
      { vs: 'Germany', result: 'D', score: '1-1' }
    ]
  },
  Mexico: {
    code: 'MEX', flag: '🇲🇽', group: 'A',
    flagColors: ['#006847', '#FFFFFF', '#CE1126'],
    ranking: 12, titles: 0, titleYears: [],
    status: 'IN', coach: 'Javier Aguirre',
    wcHistory: { 1930: 'GROUP', 1950: 'GROUP', 1954: 'GROUP', 1958: 'GROUP', 1962: 'GROUP', 1966: 'GROUP', 1970: 'QF', 1978: 'GROUP', 1986: 'QF', 1994: 'R16', 1998: 'R16', 2002: 'R16', 2006: 'R16', 2010: 'R16', 2014: 'R16', 2018: 'R16', 2022: 'GROUP', 2026: 'R32' },
    formation: '4-3-3',
    squad: {
      GK: ['Guillermo Ochoa'], DEF: ['Jorge Sánchez', 'César Montes', 'Johan Vásquez', 'Jesús Gallardo'],
      MID: ['Edson Álvarez', 'Luis Chávez', 'Orbelín Pineda'],
      FW: ['Hirving Lozano', 'Santiago Giménez', 'Alexis Vega']
    },
    keyPlayers: [
      { name: 'Santiago Giménez', position: 'ST', club: 'Feyenoord', goals: 3, assists: 0, rating: 8.1, note: 'Mexico\'s lethal striker. Has been on fire in front of the home crowd.' },
      { name: 'Edson Álvarez', position: 'CDM', club: 'West Ham', goals: 0, assists: 1, rating: 7.7, note: 'The midfield enforcer. Breaks up play and drives Mexico forward.' },
      { name: 'Hirving Lozano', position: 'RW', club: 'PSV', goals: 1, assists: 2, rating: 7.5, note: 'El Chucky — a constant threat with pace and directness on the flank.' }
    ],
    stats: { attack: 78, defence: 72, midfield: 76, pace: 80, experience: 78, cohesion: 84 },
    groupResults: [
      { vs: 'South Korea', result: 'W', score: '3-0' },
      { vs: 'Czechia', result: 'W', score: '2-0' },
      { vs: 'South Africa', result: 'W', score: '1-0' }
    ]
  },
  USA: {
    code: 'USA', flag: '🇺🇸', group: 'B',
    flagColors: ['#B31942', '#FFFFFF', '#0A3161'],
    ranking: 11, titles: 0, titleYears: [],
    status: 'IN', coach: 'Mauricio Pochettino',
    wcHistory: { 1930: 'SF', 1934: 'R1', 1950: 'GROUP', 1990: 'GROUP', 1994: 'R16', 1998: 'GROUP', 2002: 'QF', 2006: 'GROUP', 2010: 'R16', 2014: 'R16', 2022: 'R16', 2026: 'R32' },
    formation: '4-3-3',
    squad: {
      GK: ['Matt Turner'], DEF: ['Sergiño Dest', 'Chris Richards', 'Tim Ream', 'Antonee Robinson'],
      MID: ['Tyler Adams', 'Weston McKennie', 'Giovanni Reyna'],
      FW: ['Christian Pulisic', 'Folarin Balogun', 'Timothy Weah']
    },
    keyPlayers: [
      { name: 'Christian Pulisic', position: 'RW/AM', club: 'AC Milan', goals: 2, assists: 2, rating: 8.3, note: 'Captain America. The nation\'s talisman — scores when it matters most.' },
      { name: 'Giovanni Reyna', position: 'AM', club: 'B. Dortmund', goals: 1, assists: 1, rating: 7.8, note: 'Creative spark — unlocks defences with his passing and vision.' },
      { name: 'Tyler Adams', position: 'CDM', club: 'Bournemouth', goals: 0, assists: 0, rating: 7.4, note: 'The engine room. Covers every blade of grass and sets the press.' }
    ],
    stats: { attack: 76, defence: 74, midfield: 76, pace: 84, experience: 55, cohesion: 80 },
    groupResults: [
      { vs: 'Switzerland', result: 'L', score: '0-1' },
      { vs: 'Qatar', result: 'W', score: '3-0' },
      { vs: 'Bosnia & Herz.', result: 'W', score: '2-0' }
    ]
  },
  Morocco: {
    code: 'MAR', flag: '🇲🇦', group: 'C',
    flagColors: ['#C1272D', '#006233', '#C1272D'],
    ranking: 10, titles: 0, titleYears: [],
    status: 'IN', coach: 'Walid Regragui',
    wcHistory: { 1970: 'GROUP', 1986: 'R16', 1994: 'GROUP', 1998: 'GROUP', 2018: 'GROUP', 2022: 'SF', 2026: 'R32' },
    formation: '4-3-3',
    squad: {
      GK: ['Yassine Bounou'], DEF: ['Achraf Hakimi', 'Nayef Aguerd', 'Romain Saïss', 'Noussair Mazraoui'],
      MID: ['Sofyan Amrabat', 'Azzedine Ounahi', 'Hakim Ziyech'],
      FW: ['Youssef En-Nesyri', 'Brahim Díaz', 'Abde Ezzalzouli']
    },
    keyPlayers: [
      { name: 'Achraf Hakimi', position: 'RB', club: 'PSG', goals: 0, assists: 2, rating: 8.0, note: 'Overlapping runs are devastating. The most attack-minded fullback at the tournament.' },
      { name: 'Hakim Ziyech', position: 'RW/AM', club: 'Galatasaray', goals: 1, assists: 1, rating: 7.6, note: 'Left-footed wizard. Delivers crosses and curlers that change games.' },
      { name: 'Youssef En-Nesyri', position: 'ST', club: 'Sevilla', goals: 2, assists: 0, rating: 7.4, note: 'Aerial monster — scores headers for fun. Morocco\'s biggest goal threat.' }
    ],
    stats: { attack: 74, defence: 82, midfield: 76, pace: 80, experience: 60, cohesion: 92 },
    groupResults: [
      { vs: 'Netherlands', result: 'D', score: '1-1' },
      { vs: 'Brazil', result: 'L', score: '1-3' },
      { vs: 'Nigeria', result: 'W', score: '2-0' }
    ]
  },
  Belgium: {
    code: 'BEL', flag: '🇧🇪', group: 'G',
    flagColors: ['#000000', '#FAE042', '#ED2939'],
    ranking: 9, titles: 0, titleYears: [],
    status: 'IN', coach: 'Domenico Tedesco',
    wcHistory: { 1930: 'GROUP', 1934: 'R1', 1938: 'R1', 1954: 'GROUP', 1970: 'GROUP', 1982: 'R2', 1986: 'SF', 1990: 'R16', 1994: 'R16', 1998: 'GROUP', 2002: 'R16', 2014: 'QF', 2018: 'SF', 2022: 'GROUP', 2026: 'R32' },
    formation: '4-3-3',
    squad: {
      GK: ['Koen Casteels'], DEF: ['Timothy Castagne', 'Wout Faes', 'Zeno Debast', 'Arthur Theate'],
      MID: ['Youri Tielemans', 'Amadou Onana', 'Kevin De Bruyne'],
      FW: ['Jérémy Doku', 'Romelu Lukaku', 'Leandro Trossard']
    },
    keyPlayers: [
      { name: 'Kevin De Bruyne', position: 'AM', club: 'Man City', goals: 1, assists: 3, rating: 8.5, note: 'The best passer in world football. Makes Belgium tick with every touch.' },
      { name: 'Jérémy Doku', position: 'LW', club: 'Man City', goals: 2, assists: 1, rating: 8.0, note: 'Raw speed and trickery. Defenders can\'t handle his 1v1 ability.' },
      { name: 'Romelu Lukaku', position: 'ST', club: 'Napoli', goals: 1, assists: 0, rating: 7.2, note: 'Belgium\'s all-time scorer. Physical presence and poacher instinct.' }
    ],
    stats: { attack: 82, defence: 74, midfield: 84, pace: 85, experience: 78, cohesion: 72 },
    groupResults: [
      { vs: 'Senegal', result: 'W', score: '2-1' },
      { vs: 'Israel', result: 'W', score: '3-0' },
      { vs: 'Costa Rica', result: 'D', score: '1-1' }
    ]
  },
  'South Africa': {
    code: 'RSA', flag: '🇿🇦', group: 'A',
    flagColors: ['#007A4D', '#FFB612', '#DE3831'],
    ranking: 58, titles: 0, titleYears: [],
    status: 'OUT', coach: 'Hugo Broos',
    wcHistory: { 1998: 'GROUP', 2002: 'GROUP', 2010: 'GROUP', 2026: 'R32' },
    formation: '4-4-2',
    squad: { GK: ['Ronwen Williams'], DEF: ['S. Xulu', 'G. Mphahlele', 'S. Hlatshwayo', 'R. Zungu'], MID: ['T. Mokoena', 'R. Mokwena', 'P. Tau', 'K. Billiat'], FW: ['L. Mothiba', 'P. Shalulile'] },
    keyPlayers: [
      { name: 'Percy Tau', position: 'RW', club: 'Al Ahly', goals: 1, assists: 0, rating: 7.0, note: 'South Africa\'s creative talisman. Brings experience from African club football.' },
      { name: 'Ronwen Williams', position: 'GK', club: 'Mamelodi Sundowns', goals: 0, assists: 0, rating: 7.5, note: 'Outstanding shot stopper — kept South Africa in several games.' },
      { name: 'Themba Zwane', position: 'AM', club: 'Mamelodi Sundowns', goals: 0, assists: 1, rating: 6.8, note: 'Veteran playmaker. Reads the game well and provides composure.' }
    ],
    stats: { attack: 60, defence: 62, midfield: 58, pace: 72, experience: 40, cohesion: 75 },
    groupResults: [
      { vs: 'Czechia', result: 'W', score: '1-0' },
      { vs: 'South Korea', result: 'W', score: '2-1' },
      { vs: 'Mexico', result: 'L', score: '0-1' }
    ]
  },
  Paraguay: {
    code: 'PAR', flag: '🇵🇾', group: 'D',
    flagColors: ['#D52B1E', '#FFFFFF', '#0038A8'],
    ranking: 42, titles: 0, titleYears: [],
    status: 'IN', coach: 'Alfredo Moreno',
    wcHistory: { 1930: 'GROUP', 1950: 'GROUP', 1958: 'GROUP', 1986: 'R16', 1998: 'R16', 2002: 'R16', 2006: 'R16', 2010: 'QF', 2026: 'R32' },
    formation: '4-4-2',
    squad: { GK: ['Antony Silva'], DEF: ['G. Gómez', 'F. Balbuena', 'J. Alonso', 'R. Rojas'], MID: ['M. Almirón', 'Á. Romero', 'M. Villasanti', 'H. Velázquez'], FW: ['A. Enciso', 'J. Arce'] },
    keyPlayers: [
      { name: 'Miguel Almirón', position: 'AM', club: 'Newcastle', goals: 1, assists: 1, rating: 7.3, note: 'The creative spark. Brings Premier League quality and directness.' },
      { name: 'Julio Enciso', position: 'FW', club: 'Brighton', goals: 1, assists: 0, rating: 7.1, note: 'Young and fearless. Scores spectacular goals.' },
      { name: 'Gustavo Gómez', position: 'CB', club: 'Palmeiras', goals: 0, assists: 0, rating: 7.0, note: 'Experienced centre-back. Leads by example at the back.' }
    ],
    stats: { attack: 66, defence: 72, midfield: 68, pace: 70, experience: 55, cohesion: 78 },
    groupResults: [
      { vs: 'Japan', result: 'L', score: '0-2' },
      { vs: 'Germany', result: 'L', score: '1-2' },
      { vs: 'Cameroon', result: 'W', score: '1-0' }
    ]
  },
  'Ivory Coast': {
    code: 'CIV', flag: '🇨🇮', group: 'E',
    flagColors: ['#FF8200', '#FFFFFF', '#009A44'],
    ranking: 38, titles: 0, titleYears: [],
    status: 'IN', coach: 'Emerse Faé',
    wcHistory: { 2006: 'GROUP', 2010: 'GROUP', 2014: 'GROUP', 2026: 'R32' },
    formation: '4-3-3',
    squad: { GK: ['Y. Fofana'], DEF: ['S. Aurier', 'W. Boly', 'O. Deli', 'G. Konan'], MID: ['F. Kessié', 'S. Fofana', 'I. Sangaré'], FW: ['N. Pépé', 'S. Haller', 'S. Aké'] },
    keyPlayers: [
      { name: 'Sébastien Haller', position: 'ST', club: 'Borussia Dortmund', goals: 2, assists: 0, rating: 7.5, note: 'Remarkable comeback from cancer. A story of resilience and clinical finishing.' },
      { name: 'Franck Kessié', position: 'CM', club: 'Al Ahli', goals: 0, assists: 1, rating: 7.2, note: 'Physical midfield presence. Wins battles and transitions play.' },
      { name: 'Ibrahim Sangaré', position: 'CDM', club: 'Nottingham Forest', goals: 0, assists: 0, rating: 7.0, note: 'Tall, composed defensive midfielder. Shields the back line effectively.' }
    ],
    stats: { attack: 68, defence: 66, midfield: 72, pace: 80, experience: 45, cohesion: 78 },
    groupResults: [
      { vs: 'Peru', result: 'W', score: '2-1' },
      { vs: 'Denmark', result: 'D', score: '0-0' },
      { vs: 'France', result: 'L', score: '0-2' }
    ]
  },
  Norway: {
    code: 'NOR', flag: '🇳🇴', group: 'E',
    flagColors: ['#EF2B2D', '#FFFFFF', '#002868'],
    ranking: 25, titles: 0, titleYears: [],
    status: 'IN', coach: 'Ståle Solbakken',
    wcHistory: { 1938: 'R1', 1994: 'GROUP', 1998: 'R16', 2026: 'R32' },
    formation: '4-3-3',
    squad: { GK: ['Ørjan Nyland'], DEF: ['K. Ajer', 'L. Ostigard', 'A. Hanche-Olsen', 'B. Meling'], MID: ['M. Ødegaard', 'S. Berge', 'F. Aursnes'], FW: ['E. Haaland', 'A. Sørloth', 'O. Bobb'] },
    keyPlayers: [
      { name: 'Erling Haaland', position: 'ST', club: 'Man City', goals: 3, assists: 0, rating: 8.5, note: 'The cyborg. Scores goals for fun — a generational talent in peak form.' },
      { name: 'Martin Ødegaard', position: 'AM', club: 'Arsenal', goals: 1, assists: 3, rating: 8.4, note: 'Norway\'s captain and creative engine. Dictates the tempo of every game.' },
      { name: 'Alexander Sørloth', position: 'ST', club: 'Atlético Madrid', goals: 1, assists: 1, rating: 7.3, note: 'Physical target man who links play and occupies centre-backs.' }
    ],
    stats: { attack: 82, defence: 68, midfield: 78, pace: 80, experience: 35, cohesion: 80 },
    groupResults: [
      { vs: 'Denmark', result: 'W', score: '2-1' },
      { vs: 'Peru', result: 'W', score: '3-0' },
      { vs: 'France', result: 'L', score: '0-2' }
    ]
  },
  Sweden: {
    code: 'SWE', flag: '🇸🇪', group: 'E',
    flagColors: ['#006AA7', '#FECC00', '#006AA7'],
    ranking: 20, titles: 0, titleYears: [],
    status: 'IN', coach: 'Jon Dahl Tomasson',
    wcHistory: { 1934: 'QF', 1938: 'SF', 1950: 'SF', 1958: 'FINAL', 1970: 'GROUP', 1974: 'R2', 1978: 'GROUP', 1990: 'GROUP', 1994: 'SF', 2002: 'R16', 2006: 'R16', 2018: 'QF', 2026: 'R32' },
    formation: '4-4-2',
    squad: { GK: ['Robin Olsen'], DEF: ['E. Krafth', 'V. Lindelöf', 'I. Hien', 'L. Augustinsson'], MID: ['A. Isak', 'J. Forsberg', 'D. Kulusevski', 'H. Larsson'], FW: ['A. Isak', 'V. Gyökeres'] },
    keyPlayers: [
      { name: 'Viktor Gyökeres', position: 'ST', club: 'Sporting CP', goals: 3, assists: 1, rating: 8.3, note: 'Sweden\'s goalscoring sensation. On fire this season and carrying that into the WC.' },
      { name: 'Alexander Isak', position: 'ST', club: 'Newcastle', goals: 2, assists: 0, rating: 7.9, note: 'Classy finisher with ice in his veins. Cool and composed in front of goal.' },
      { name: 'Dejan Kulusevski', position: 'RW', club: 'Tottenham', goals: 0, assists: 2, rating: 7.6, note: 'Versatile and intelligent. Creates chances from wide and from deep.' }
    ],
    stats: { attack: 78, defence: 72, midfield: 74, pace: 78, experience: 60, cohesion: 82 },
    groupResults: [
      { vs: 'Peru', result: 'W', score: '2-0' },
      { vs: 'Ivory Coast', result: 'D', score: '1-1' },
      { vs: 'Denmark', result: 'L', score: '0-1' }
    ]
  },
  Ecuador: {
    code: 'ECU', flag: '🇪🇨', group: 'A',
    flagColors: ['#FFD100', '#003DA5', '#CE1126'],
    ranking: 28, titles: 0, titleYears: [],
    status: 'IN', coach: 'Sebastián Beccacece',
    wcHistory: { 2002: 'GROUP', 2006: 'R16', 2014: 'GROUP', 2022: 'GROUP', 2026: 'R32' },
    formation: '4-3-3',
    squad: { GK: ['H. Galíndez'], DEF: ['A. Preciado', 'P. Hincapié', 'X. Arreaga', 'P. Estupiñán'], MID: ['M. Caicedo', 'C. Gruezo', 'J. Cifuentes'], FW: ['G. Plata', 'E. Valencia', 'K. Rodríguez'] },
    keyPlayers: [
      { name: 'Moisés Caicedo', position: 'CM', club: 'Chelsea', goals: 1, assists: 1, rating: 7.8, note: 'Dynamic box-to-box midfielder. Controls the midfield battle.' },
      { name: 'Piero Hincapié', position: 'CB', club: 'B. Leverkusen', goals: 0, assists: 0, rating: 7.5, note: 'Young, composed centre-back comfortable on the ball.' },
      { name: 'Gonzalo Plata', position: 'RW', club: 'Al-Sadd', goals: 2, assists: 0, rating: 7.4, note: 'Explosive winger with a hammer of a left foot.' }
    ],
    stats: { attack: 70, defence: 70, midfield: 74, pace: 80, experience: 45, cohesion: 76 },
    groupResults: [
      { vs: 'Czechia', result: 'W', score: '2-1' },
      { vs: 'Mexico', result: 'L', score: '0-2' },
      { vs: 'South Korea', result: 'W', score: '1-0' }
    ]
  },
  'DR Congo': {
    code: 'COD', flag: '🇨🇩', group: 'F',
    flagColors: ['#007FFF', '#CE1021', '#F7D618'],
    ranking: 52, titles: 0, titleYears: [],
    status: 'IN', coach: 'Sébastien Desabre',
    wcHistory: { 1974: 'GROUP', 2026: 'R32' },
    formation: '4-4-2',
    squad: { GK: ['L. Matampi'], DEF: ['C. Luyindama', 'A. Mbemba', 'D. Bope', 'A. Mabiala'], MID: ['Y. Kakuta', 'G. Bakambu', 'C. Mulumba', 'S. Bastien'], FW: ['C. Bakambu', 'S. Wissa'] },
    keyPlayers: [
      { name: 'Cédric Bakambu', position: 'ST', club: 'Olympiacos', goals: 1, assists: 0, rating: 7.0, note: 'Experienced striker who leads the line with physicality.' },
      { name: 'Yannick Bolasie', position: 'LW', club: 'Free Agent', goals: 0, assists: 1, rating: 6.8, note: 'Tricky winger with flair and crowd-pleasing skills.' },
      { name: 'Chancel Mbemba', position: 'CB', club: 'Marseille', goals: 0, assists: 0, rating: 7.2, note: 'Solid defender who organizes the back line well.' }
    ],
    stats: { attack: 62, defence: 64, midfield: 60, pace: 78, experience: 30, cohesion: 72 },
    groupResults: [
      { vs: 'England', result: 'L', score: '0-2' },
      { vs: 'Serbia', result: 'W', score: '1-0' },
      { vs: 'IR Iran', result: 'D', score: '1-1' }
    ]
  },
  Senegal: {
    code: 'SEN', flag: '🇸🇳', group: 'G',
    flagColors: ['#00853F', '#FDEF42', '#E31B23'],
    ranking: 18, titles: 0, titleYears: [],
    status: 'IN', coach: 'Aliou Cissé',
    wcHistory: { 2002: 'QF', 2018: 'GROUP', 2022: 'R16', 2026: 'R32' },
    formation: '4-3-3',
    squad: { GK: ['É. Mendy'], DEF: ['K. Koulibaly', 'A. Diallo', 'Y. Sabaly', 'F. Mendy'], MID: ['I. Gueye', 'N. Mendy', 'P. Gueye'], FW: ['S. Mané', 'I. Sarr', 'N. Jackson'] },
    keyPlayers: [
      { name: 'Sadio Mané', position: 'LW/ST', club: 'Al Nassr', goals: 1, assists: 1, rating: 7.4, note: 'Senegal\'s talisman. Still dangerous in the final third.' },
      { name: 'Kalidou Koulibaly', position: 'CB', club: 'Al Hilal', goals: 0, assists: 0, rating: 7.3, note: 'Defensive rock. Wins duels and commands the defence.' },
      { name: 'Ismaïla Sarr', position: 'RW', club: 'Crystal Palace', goals: 1, assists: 0, rating: 7.1, note: 'Blistering speed and direct running down the right.' }
    ],
    stats: { attack: 72, defence: 76, midfield: 70, pace: 82, experience: 60, cohesion: 80 },
    groupResults: [
      { vs: 'Belgium', result: 'L', score: '1-2' },
      { vs: 'Costa Rica', result: 'W', score: '2-0' },
      { vs: 'Israel', result: 'W', score: '1-0' }
    ]
  },
  'Bosnia & Herz.': {
    code: 'BIH', flag: '🇧🇦', group: 'B',
    flagColors: ['#002395', '#FECB00', '#002395'],
    ranking: 45, titles: 0, titleYears: [],
    status: 'IN', coach: 'Sergej Barbarez',
    wcHistory: { 2014: 'GROUP', 2026: 'R32' },
    formation: '4-2-3-1',
    squad: { GK: ['N. Vasilj'], DEF: ['S. Kolašinac', 'E. Ahmedhodžić', 'D. Šaranović', 'A. Mujkić'], MID: ['M. Pjanić', 'A. Bešić', 'E. Višća', 'A. Hajradinović', 'B. Krunić'], FW: ['E. Džeko'] },
    keyPlayers: [
      { name: 'Edin Džeko', position: 'ST', club: 'Fenerbahçe', goals: 1, assists: 0, rating: 7.2, note: 'Veteran striker on his farewell World Cup. Leads with experience and guile.' },
      { name: 'Miralem Pjanić', position: 'CM', club: 'Al Sharjah', goals: 0, assists: 1, rating: 7.0, note: 'Former Barcelona man. Still has the passing range to unlock defences.' },
      { name: 'Sead Kolašinac', position: 'LB', club: 'Atalanta', goals: 0, assists: 0, rating: 6.8, note: 'Physical fullback who loves to overlap and put in crosses.' }
    ],
    stats: { attack: 64, defence: 66, midfield: 68, pace: 72, experience: 45, cohesion: 74 },
    groupResults: [
      { vs: 'Canada', result: 'D', score: '1-1' },
      { vs: 'USA', result: 'L', score: '0-2' },
      { vs: 'Qatar', result: 'W', score: '2-0' }
    ]
  },
  Austria: {
    code: 'AUT', flag: '🇦🇹', group: 'I',
    flagColors: ['#ED2939', '#FFFFFF', '#ED2939'],
    ranking: 22, titles: 0, titleYears: [],
    status: 'IN', coach: 'Ralf Rangnick',
    wcHistory: { 1934: 'SF', 1954: 'SF', 1958: 'GROUP', 1978: 'R2', 1982: 'R2', 1990: 'GROUP', 1998: 'GROUP', 2026: 'R32' },
    formation: '4-2-3-1',
    squad: { GK: ['P. Pentz'], DEF: ['S. Posch', 'K. Danso', 'P. Lienhart', 'D. Alaba'], MID: ['K. Laimer', 'N. Seiwald', 'M. Sabitzer', 'C. Baumgartner', 'P. Wimmer'], FW: ['M. Arnautović'] },
    keyPlayers: [
      { name: 'David Alaba', position: 'CB', club: 'Real Madrid', goals: 0, assists: 0, rating: 7.6, note: 'World class defender with leadership and composure.' },
      { name: 'Marcel Sabitzer', position: 'CM', club: 'B. Dortmund', goals: 1, assists: 1, rating: 7.5, note: 'Drives Austria forward with energy and goalscoring threat.' },
      { name: 'Christoph Baumgartner', position: 'AM', club: 'RB Leipzig', goals: 1, assists: 0, rating: 7.3, note: 'Intelligent runner who times his arrivals in the box perfectly.' }
    ],
    stats: { attack: 70, defence: 74, midfield: 76, pace: 76, experience: 55, cohesion: 86 },
    groupResults: [
      { vs: 'Spain', result: 'L', score: '0-2' },
      { vs: 'Albania', result: 'W', score: '2-0' },
      { vs: 'Croatia', result: 'D', score: '1-1' }
    ]
  },
  Croatia: {
    code: 'CRO', flag: '🇭🇷', group: 'I',
    flagColors: ['#FF0000', '#FFFFFF', '#171796'],
    ranking: 14, titles: 0, titleYears: [],
    status: 'IN', coach: 'Zlatko Dalić',
    wcHistory: { 1998: 'SF', 2002: 'GROUP', 2006: 'GROUP', 2014: 'GROUP', 2018: 'FINAL', 2022: 'SF', 2026: 'R32' },
    formation: '4-3-3',
    squad: { GK: ['D. Livaković'], DEF: ['J. Juranović', 'J. Gvardiol', 'J. Šutalo', 'B. Sosa'], MID: ['L. Modrić', 'M. Brozović', 'M. Kovačić'], FW: ['A. Kramarić', 'B. Petković', 'I. Perišić'] },
    keyPlayers: [
      { name: 'Luka Modrić', position: 'CM', club: 'Real Madrid', goals: 0, assists: 2, rating: 7.8, note: 'At 40, still dictating play. A living legend in his final major tournament.' },
      { name: 'Joško Gvardiol', position: 'CB/LB', club: 'Man City', goals: 1, assists: 0, rating: 7.9, note: 'Modern defender — comfortable carrying the ball and joining attacks.' },
      { name: 'Andrej Kramarić', position: 'ST', club: 'Hoffenheim', goals: 2, assists: 0, rating: 7.4, note: 'Reliable goalscorer. Always finds a way to get on the scoresheet.' }
    ],
    stats: { attack: 74, defence: 76, midfield: 86, pace: 72, experience: 88, cohesion: 90 },
    groupResults: [
      { vs: 'Portugal', result: 'L', score: '1-2' },
      { vs: 'Spain', result: 'L', score: '1-3' },
      { vs: 'Austria', result: 'D', score: '1-1' }
    ]
  },
  Switzerland: {
    code: 'SUI', flag: '🇨🇭', group: 'B',
    flagColors: ['#DA291C', '#FFFFFF', '#DA291C'],
    ranking: 16, titles: 0, titleYears: [],
    status: 'IN', coach: 'Murat Yakın',
    wcHistory: { 1934: 'QF', 1938: 'QF', 1950: 'GROUP', 1954: 'QF', 1962: 'GROUP', 1966: 'GROUP', 1994: 'R16', 2006: 'R16', 2010: 'GROUP', 2014: 'R16', 2018: 'R16', 2022: 'R16', 2026: 'R32' },
    formation: '3-4-3',
    squad: { GK: ['Y. Sommer'], DEF: ['S. Widmer', 'M. Akanji', 'N. Elvedi', 'R. Rodríguez'], MID: ['G. Xhaka', 'D. Freuler', 'R. Vargas', 'D. Ndoye'], FW: ['B. Embolo', 'Z. Amdouni', 'N. Okafor'] },
    keyPlayers: [
      { name: 'Granit Xhaka', position: 'CM', club: 'B. Leverkusen', goals: 0, assists: 2, rating: 7.8, note: 'Captain and leader. Sets the tempo with his left foot and aggression.' },
      { name: 'Manuel Akanji', position: 'CB', club: 'Man City', goals: 0, assists: 0, rating: 7.5, note: 'Premier League quality defender who rarely makes mistakes.' },
      { name: 'Breel Embolo', position: 'ST', club: 'Monaco', goals: 2, assists: 0, rating: 7.4, note: 'Physical striker who leads the press and finishes chances.' }
    ],
    stats: { attack: 72, defence: 78, midfield: 78, pace: 74, experience: 75, cohesion: 85 },
    groupResults: [
      { vs: 'USA', result: 'W', score: '1-0' },
      { vs: 'Qatar', result: 'W', score: '3-0' },
      { vs: 'Canada', result: 'D', score: '0-0' }
    ]
  },
  Algeria: {
    code: 'ALG', flag: '🇩🇿', group: 'J',
    flagColors: ['#006233', '#FFFFFF', '#D21034'],
    ranking: 35, titles: 0, titleYears: [],
    status: 'IN', coach: 'Vladimir Petković',
    wcHistory: { 1982: 'GROUP', 1986: 'GROUP', 2010: 'GROUP', 2014: 'R16', 2026: 'R32' },
    formation: '4-3-3',
    squad: { GK: ['R. M\'Bolhi'], DEF: ['A. Mandi', 'R. Atal', 'D. Benlamri', 'Y. Atal'], MID: ['I. Bennacer', 'H. Aouar', 'S. Feghouli'], FW: ['R. Mahrez', 'I. Slimani', 'S. Brahimi'] },
    keyPlayers: [
      { name: 'Riyad Mahrez', position: 'RW', club: 'Al Ahli', goals: 1, assists: 2, rating: 7.6, note: 'Algeria\'s talisman. Cuts inside on his left foot and creates magic.' },
      { name: 'Ismaël Bennacer', position: 'CM', club: 'AC Milan', goals: 0, assists: 1, rating: 7.3, note: 'Classy midfielder who controls tempo and distributes accurately.' },
      { name: 'Houssem Aouar', position: 'AM', club: 'Al Ittihad', goals: 1, assists: 0, rating: 7.1, note: 'Technically gifted playmaker with an eye for the spectacular.' }
    ],
    stats: { attack: 72, defence: 68, midfield: 74, pace: 78, experience: 50, cohesion: 76 },
    groupResults: [
      { vs: 'Uruguay', result: 'D', score: '1-1' },
      { vs: 'Wales', result: 'W', score: '2-0' },
      { vs: 'Australia', result: 'L', score: '0-1' }
    ]
  },
  Australia: {
    code: 'AUS', flag: '🇦🇺', group: 'J',
    flagColors: ['#00008B', '#FFD700', '#00008B'],
    ranking: 24, titles: 0, titleYears: [],
    status: 'IN', coach: 'Tony Popovic',
    wcHistory: { 1974: 'GROUP', 2006: 'R16', 2010: 'GROUP', 2014: 'GROUP', 2018: 'GROUP', 2022: 'R16', 2026: 'R32' },
    formation: '4-4-2',
    squad: { GK: ['M. Ryan'], DEF: ['N. Atkinson', 'H. Souttar', 'K. Rowles', 'A. Behich'], MID: ['T. Rogić', 'A. Hrustic', 'R. McGree', 'C. Goodwin'], FW: ['M. Duke', 'J. Maclaren'] },
    keyPlayers: [
      { name: 'Tom Rogić', position: 'AM', club: 'West Brom', goals: 1, assists: 1, rating: 7.4, note: 'Graceful playmaker with a wand of a left foot.' },
      { name: 'Harry Souttar', position: 'CB', club: 'Leicester City', goals: 1, assists: 0, rating: 7.3, note: 'Giant centre-back who dominates in the air. Scores from set pieces.' },
      { name: 'Mitchell Duke', position: 'ST', club: 'Machida Zelvia', goals: 1, assists: 0, rating: 7.0, note: 'Workhorse striker. Leads the line with effort and desire.' }
    ],
    stats: { attack: 64, defence: 70, midfield: 66, pace: 72, experience: 55, cohesion: 82 },
    groupResults: [
      { vs: 'Wales', result: 'W', score: '2-0' },
      { vs: 'Uruguay', result: 'D', score: '0-0' },
      { vs: 'Algeria', result: 'W', score: '1-0' }
    ]
  },
  Egypt: {
    code: 'EGY', flag: '🇪🇬', group: 'K',
    flagColors: ['#CE1126', '#FFFFFF', '#000000'],
    ranking: 30, titles: 0, titleYears: [],
    status: 'IN', coach: 'Hossam Hassan',
    wcHistory: { 1934: 'R1', 1990: 'GROUP', 2018: 'GROUP', 2026: 'R32' },
    formation: '4-2-3-1',
    squad: { GK: ['M. El Shenawy'], DEF: ['O. Gaber', 'M. Abdel-Moneim', 'A. Hegazy', 'A. Fatouh'], MID: ['M. Elneny', 'T. Hamed', 'M. Salah', 'O. Marmoush', 'M. Trezeguet'], FW: ['M. Hassan'] },
    keyPlayers: [
      { name: 'Mohamed Salah', position: 'RW', club: 'Liverpool', goals: 3, assists: 2, rating: 8.6, note: 'Egypt\'s king. Deadly from the right — cuts in and curls it every time.' },
      { name: 'Omar Marmoush', position: 'LW', club: 'Eintracht Frankfurt', goals: 2, assists: 1, rating: 7.9, note: 'Emerging star. Quick, direct, and scores spectacular goals.' },
      { name: 'Mohamed Elneny', position: 'CM', club: 'Free Agent', goals: 0, assists: 0, rating: 7.0, note: 'Experienced midfielder. Keeps things ticking in the middle.' }
    ],
    stats: { attack: 78, defence: 68, midfield: 70, pace: 82, experience: 50, cohesion: 78 },
    groupResults: [
      { vs: 'Colombia', result: 'L', score: '0-1' },
      { vs: 'Tunisia', result: 'W', score: '2-0' },
      { vs: 'Argentina', result: 'L', score: '0-3' }
    ]
  },
  'Cape Verde': {
    code: 'CPV', flag: '🇨🇻', group: 'L',
    flagColors: ['#003893', '#FFFFFF', '#CF2027'],
    ranking: 64, titles: 0, titleYears: [],
    status: 'IN', coach: 'Bubista',
    wcHistory: { 2026: 'R32' },
    formation: '4-4-2',
    squad: { GK: ['V. Osório'], DEF: ['S. Lopes', 'R. Fortes', 'J. Borges', 'D. Tavares'], MID: ['N. Borges', 'K. Rodrigues', 'G. Dias', 'J. Graça'], FW: ['G. Rodrigues', 'R. Silva'] },
    keyPlayers: [
      { name: 'Garry Rodrigues', position: 'RW', club: 'Olympiacos', goals: 1, assists: 0, rating: 7.2, note: 'Cape Verde\'s main attacking threat. Direct and skillful.' },
      { name: 'Kenny Rocha Santos', position: 'CM', club: 'Moreirense', goals: 0, assists: 1, rating: 7.0, note: 'Hardworking midfielder who drives the team forward.' },
      { name: 'Vozinha', position: 'GK', club: 'Gil Vicente', goals: 0, assists: 0, rating: 7.3, note: 'Outstanding goalkeeper who kept Cape Verde alive in qualifying.' }
    ],
    stats: { attack: 56, defence: 60, midfield: 58, pace: 74, experience: 20, cohesion: 80 },
    groupResults: [
      { vs: 'Ghana', result: 'W', score: '1-0' },
      { vs: 'Argentina', result: 'L', score: '0-4' },
      { vs: 'Chile', result: 'D', score: '0-0' }
    ]
  },
  Colombia: {
    code: 'COL', flag: '🇨🇴', group: 'L',
    flagColors: ['#FCD116', '#003893', '#CE1126'],
    ranking: 13, titles: 0, titleYears: [],
    status: 'IN', coach: 'Néstor Lorenzo',
    wcHistory: { 1962: 'GROUP', 1990: 'R16', 1994: 'GROUP', 1998: 'GROUP', 2014: 'QF', 2018: 'R16', 2022: 'DNQ', 2026: 'R32' },
    formation: '4-2-3-1',
    squad: { GK: ['D. Ospina'], DEF: ['S. Arias', 'D. Sánchez', 'Y. Mina', 'J. Mojica'], MID: ['W. Barrios', 'J. Lerma', 'J. Cuadrado', 'J. Arias', 'L. Díaz'], FW: ['R. Falcao'] },
    keyPlayers: [
      { name: 'Luis Díaz', position: 'LW', club: 'Liverpool', goals: 2, assists: 1, rating: 8.1, note: 'Electrifying winger. Tears defences apart with pace and skill.' },
      { name: 'Juan Cuadrado', position: 'RW', club: 'Free Agent', goals: 0, assists: 2, rating: 7.2, note: 'Veteran with big tournament experience. Still dangerous on the wing.' },
      { name: 'Jhon Arias', position: 'RW', club: 'Fluminense', goals: 1, assists: 1, rating: 7.5, note: 'In-form winger who has been one of Colombia\'s best at the tournament.' }
    ],
    stats: { attack: 78, defence: 72, midfield: 76, pace: 84, experience: 65, cohesion: 82 },
    groupResults: [
      { vs: 'Egypt', result: 'W', score: '1-0' },
      { vs: 'Chile', result: 'W', score: '2-1' },
      { vs: 'Ghana', result: 'D', score: '0-0' }
    ]
  },
  Ghana: {
    code: 'GHA', flag: '🇬🇭', group: 'L',
    flagColors: ['#CF0921', '#FCD116', '#006B3F'],
    ranking: 40, titles: 0, titleYears: [],
    status: 'IN', coach: 'Otto Addo',
    wcHistory: { 2006: 'R16', 2010: 'QF', 2014: 'GROUP', 2022: 'GROUP', 2026: 'R32' },
    formation: '4-2-3-1',
    squad: { GK: ['J. Ati-Zigi'], DEF: ['T. Lamptey', 'M. Salisu', 'D. Amartey', 'A. Baba'], MID: ['T. Partey', 'M. Kudus', 'A. Semenyo', 'K. Sulemana', 'I. Williams'], FW: ['J. Ayew'] },
    keyPlayers: [
      { name: 'Mohammed Kudus', position: 'AM/RW', club: 'West Ham', goals: 2, assists: 1, rating: 8.0, note: 'Ghana\'s standout. Powerful runner with an eye for the spectacular.' },
      { name: 'Thomas Partey', position: 'CM', club: 'Arsenal', goals: 0, assists: 1, rating: 7.5, note: 'Midfield powerhouse. Controls the game with strength and technique.' },
      { name: 'Antoine Semenyo', position: 'RW', club: 'Bournemouth', goals: 1, assists: 0, rating: 7.2, note: 'Quick and direct. Causes problems with his athleticism.' }
    ],
    stats: { attack: 72, defence: 66, midfield: 74, pace: 84, experience: 50, cohesion: 74 },
    groupResults: [
      { vs: 'Cape Verde', result: 'L', score: '0-1' },
      { vs: 'Argentina', result: 'L', score: '1-2' },
      { vs: 'Colombia', result: 'D', score: '0-0' }
    ]
  }
};

// Create an array of all team names for easy iteration
export const ALL_TEAM_NAMES = Object.keys(TEAMS);

// Helper function to get team
export function getTeam(name) {
  return TEAMS[name] || null;
}
