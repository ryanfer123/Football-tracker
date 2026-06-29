import { useState } from 'react'
import './index.css'
import Today from './components/Today'
import Bracket from './components/Bracket'
import Predict from './components/Predict'
import Teams from './components/Teams'
import Groups from './components/Groups'
import GoldenBoot from './components/GoldenBoot'

const SVG_ICONS = {
  today: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <rect x="2" y="7" width="20" height="15" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  ),
  bracket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  predict: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  teams: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  groups: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  'golden-boot': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
}

const TABS = [
  { id: 'today', label: 'TODAY' },
  { id: 'bracket', label: 'BRACKET' },
  { id: 'predict', label: 'PREDICT' },
  { id: 'teams', label: 'TEAMS' },
  { id: 'groups', label: 'GROUPS' },
  { id: 'golden-boot', label: 'GOLDEN BOOT' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('today')
  const [selectedTeamName, setSelectedTeamName] = useState(null)

  const viewTeamProfile = (name) => {
    setSelectedTeamName(name)
    setActiveTab('teams')
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'today': return <Today onNavigateToTeam={viewTeamProfile} />
      case 'bracket': return <Bracket />
      case 'predict': return <Predict />
      case 'teams': return <Teams selectedTeamName={selectedTeamName} setSelectedTeamName={setSelectedTeamName} />
      case 'groups': return <Groups onNavigateToTeam={viewTeamProfile} />
      case 'golden-boot': return <GoldenBoot />
      default: return <Today onNavigateToTeam={viewTeamProfile} />
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">26</div>
        <nav className="sidebar-nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id)
                if (tab.id !== 'teams') {
                  setSelectedTeamName(null)
                }
              }}
              data-label={tab.label}
            >
              {SVG_ICONS[tab.id]}
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        {renderTab()}
      </main>
    </div>
  )
}

