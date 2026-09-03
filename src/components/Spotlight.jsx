import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { formatRuntime, matchScore, kidFilter, getItem } from '../data/catalog.js'
import Icon from './Icon.jsx'
import Thumb from './Thumb.jsx'

const FEATURED = ['kung-fury', 'the-amazing-digital-circus', 'oats-studios-volume-1', 'hazbin-hotel-pilot', 'sprite-fright']

export default function Spotlight() {
  const [index, setIndex] = useState(0)
  const { openDetails, kidsMode } = useApp()
  const items = kidFilter(
    FEATURED.map(getItem).filter(Boolean),
    kidsMode
  )

  useEffect(() => {
    setIndex(0)
  }, [items.length])

  useEffect(() => {
    if (items.length < 2) return undefined
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 9000)
    return () => clearInterval(id)
  }, [items.length])

  if (!items.length) return null
  const item = items[index]

  return (
    <section className="spotlight">
      {items.map((it, i) => (
        <div key={it.slug} className={`spot-bg ${i === index ? 'active' : ''}`}>
          <Thumb item={it} eager />
        </div>
      ))}
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
