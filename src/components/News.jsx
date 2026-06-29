import { useState } from 'react'
import { NEWS } from '../data/matchData'

const CATEGORY_CLASS = {
  'MATCH REPORT': 'MATCH_REPORT',
  'INJURY': 'INJURY',
  'STATS': 'STATS',
  'HISTORY': 'HISTORY',
  'TRANSFER RUMOUR': 'TRANSFER_RUMOUR'
}

export default function News() {
  const [expandedArticle, setExpandedArticle] = useState(null)

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">📰 Tournament News</h1>
        <p className="page-subtitle">Latest updates from World Cup 2026</p>
      </div>

      <div className="news-grid">
        {NEWS.map(article => (
          <div key={article.id} className="news-card">
            <span className={`news-category ${CATEGORY_CLASS[article.category] || ''}`}>
              {article.category}
            </span>
            <h3 className="news-headline">{article.headline}</h3>
            <p className="news-summary">{article.summary}</p>
            <div className="news-timestamp">{article.timestamp}</div>

            <button
              className="read-more-btn"
              onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}>
              {expandedArticle === article.id ? 'CLOSE' : 'READ MORE'}
            </button>

            {expandedArticle === article.id && (
              <div className="news-fulltext">{article.fullText}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
