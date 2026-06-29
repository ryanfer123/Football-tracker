import { useState } from 'react'
import './index.css'
import Today from './components/Today'
import Bracket from './components/Bracket'
import Predict from './components/Predict'
import Teams from './components/Teams'
import Groups from './components/Groups'
import GoldenBoot from './components/GoldenBoot'
import News from './components/News'
import Account from './components/Account'

const SVG_ICONS = {
  today: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><rect x="2" y="7" width="20" height="15" /><polyline points="17 2 12 7 7 2" /></svg>,
  bracket: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>,
  predict: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>,
  teams: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  groups: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  'golden-boot': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
  news: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>,
  account: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><circle cx="12" cy="8" r="4" /><path d="M4 22c1.5-4 4.2-6 8-6s6.5 2 8 6" /></svg>,
}

const TABS = [
  { id: 'today', label: 'TODAY' },
  { id: 'bracket', label: 'BRACKET' },
  { id: 'predict', label: 'PREDICT' },
  { id: 'teams', label: 'TEAMS' },
  { id: 'groups', label: 'GROUPS' },
  { id: 'golden-boot', label: 'GOLDEN BOOT' },
  { id: 'news', label: 'NEWS' },
  { id: 'account', label: 'ACCOUNT' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('today')

  const renderTab = () => {
    switch (activeTab) {
      case 'today': return <Today />
      case 'bracket': return <Bracket />
      case 'predict': return <Predict />
      case 'teams': return <Teams />
      case 'groups': return <Groups />
      case 'golden-boot': return <GoldenBoot />
      case 'news': return <News />
      case 'account': return <Account />
      default: return <Today />
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-mark">26</div>
          <div className="brand-copy">
            <span>World Cup</span>
            <strong>Tracker</strong>
          </div>
        </div>
        <nav className="sidebar-nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              data-label={tab.label}
            >
              <span className="tab-icon">{SVG_ICONS[tab.id]}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span>Live knockout hub</span>
        </div>
      </aside>
      <main className="main-content">
        {renderTab()}
      </main>
    </div>
  )
}
