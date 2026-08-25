import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { formatRuntime, matchScore, thumbFor } from '../data/catalog.js'
import Icon from './Icon.jsx'

const FEATURED = ['kung-fury', 'oats-studios-volume-1', 'sprite-fright', 'tears-of-steel', 'cosmos-laundromat']

export default function Spotlight({ getItem }) {
  const [index, setIndex] = useState(0)
  const { openDetails } = useApp()
  const items = FEATURED.map(getItem).filter(Boolean)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 9000)
    return () => clearInterval(id)
  }, [items.length])

  if (!items.length) return null
  const item = items[index]
  const thumb = thumbFor(item)

  return (
    <section className="spotlight">
      <div className="spot-bg" key={item.slug}>
        <img src={thumb.primary} alt="" onError={(e) => { e.currentTarget.src = thumb.secondary }} />
      </div>
      <div className="spot-shade" />
      <div className="spot-content" key={item.slug + '-c'}>
        <span className="spot-kicker">
          {item.type === 'series' ? 'Late Night Serial' : 'Tonight\u2019s Feature'}
        </span>
        <h1 className="spot-title">{item.title}</h1>
        <div className="spot-meta">
          <span>{matchScore(item.slug)}% match</span>
          <span>{item.year}</span>
          <span className="chip-mat">{item.maturity}</span>
          <span>{item.type === 'series' ? `${item.episodes.length} episodes` : formatRuntime(item.runtime)}</span>
          <span className="chip-src">FREE OFFICIAL STREAM</span>
        </div>
        <p className="spot-desc">{item.desc}</p>
        <div className="spot-actions">
          <Link to={`/watch/${item.slug}`} className="btn btn-primary">
            <Icon name="play" size={18} /> Roll the Film
          </Link>
          <button type="button" className="btn btn-glass" onClick={() => openDetails(item)}>
            <Icon name="chevron" size={18} /> Details
          </button>
        </div>
      </div>
    </section>
  )
}
