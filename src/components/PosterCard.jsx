import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { formatRuntime, matchScore } from '../data/catalog.js'
import Icon from './Icon.jsx'
import Thumb from './Thumb.jsx'

export default function PosterCard({ item }) {
  const { openDetails, inList, toggleList } = useApp()
  const navigate = useNavigate()
  const listed = inList(item.slug)

  return (
    <article
      className="pcard"
      role="button"
      tabIndex={0}
      aria-label={item.title}
      onClick={() => openDetails(item)}
      onKeyDown={(e) => e.key === 'Enter' && openDetails(item)}
    >
      <Thumb item={item} className="pcard-img" />
      <div className="pcard-shade" />
      {item.type === 'series' && <span className="pcard-badge">SERIES</span>}
      <button
        className="pcard-save"
        title={listed ? 'Remove from My List' : 'Save to My List'}
        onClick={(e) => {
          e.stopPropagation()
          toggleList(item.slug)
        }}
      >
        <Icon name={listed ? 'check' : 'plus'} size={16} />
      </button>
      <div
        className="pcard-play"
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/watch/${item.slug}`)
        }}
      >
        <span>
          <Icon name="play" size={24} />
        </span>
      </div>
      <div className="pcard-info">
        <div className="pcard-top-row">
          <span className="match">{matchScore(item.slug)}%</span>
          <span>{item.year}</span>
          <span>&middot;</span>
          <span>{item.maturity}</span>
          <span>&middot;</span>
          <span>{item.type === 'series' ? `${item.episodes.length} eps` : formatRuntime(item.runtime)}</span>
        </div>
        <div className="pcard-name">{item.title}</div>
      </div>
    </article>
  )
}

export function ContinueCard({ item, pct, label }) {
  const navigate = useNavigate()
  return (
    <article
      className="strip-card"
      role="button"
      tabIndex={0}
      aria-label={`Resume ${label}`}
      onClick={() => navigate(`/watch/${item.slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/watch/${item.slug}`)}
    >
      <Thumb item={item} className="" />
      <div className="strip-label">{label}</div>
      <div className="pcard-progress" style={{ left: 10, right: 10 }}>
        <div style={{ width: `${Math.min(98, Math.max(4, pct))}%` }} />
      </div>
    </article>
  )
}
