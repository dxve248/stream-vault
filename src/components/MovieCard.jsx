import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { matchScore } from '../data/catalog.js'

export default function MovieCard({ item, progressPct }) {
  const { openDetails, inList, toggleList } = useApp()
  const navigate = useNavigate()
  const listed = inList(item.slug)

  const open = () => openDetails(item)

  return (
    <article
      className={`card ${progressPct != null ? 'has-progress' : ''}`}
      onClick={open}
      tabIndex={0}
      role="button"
      aria-label={item.title}
      onKeyDown={(e) => {
        if (e.key === 'Enter') open()
      }}
    >
      <img src={`https://archive.org/services/img/${item.archiveId}`} alt="" loading="lazy" />
      {item.type === 'series' && <span className="card-badge-top">SERIES</span>}
      <div className="card-overlay">
        <h4 className="card-title">{item.title}</h4>
        <div className="card-sub">
          <span className="match">{matchScore(item.slug)}% Match</span>
          <span>{item.year}</span>
          <span className="maturity">{item.maturity}</span>
        </div>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="icon-btn solid"
            title="Play"
            onClick={() => navigate(`/watch/${item.slug}`)}
          >
            &#9654;
          </button>
          <button
            className="icon-btn"
            title={listed ? 'Remove from My List' : 'Add to My List'}
            onClick={() => toggleList(item.slug)}
          >
            {listed ? '\u2713' : '+'}
          </button>
          <button className="icon-btn" title="More info" onClick={open}>
            &#9662;
          </button>
        </div>
      </div>
      {progressPct != null && (
        <div className="card-progress">
          <div style={{ width: `${Math.min(98, Math.max(4, progressPct))}%` }} />
        </div>
      )}
    </article>
  )
}
