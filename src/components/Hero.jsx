import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { formatRuntime } from '../data/catalog.js'

export default function Hero({ items }) {
  const [index, setIndex] = useState(0)
  const { openDetails } = useApp()

  useEffect(() => {
    if (items.length < 2) return undefined
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 9000)
    return () => clearInterval(id)
  }, [items.length])

  if (!items.length) return null
  const item = items[index]

  return (
    <section className="hero">
      <div className="hero-media" key={item.slug}>
        <img src={`https://archive.org/services/img/${item.archiveId}`} alt="" />
      </div>
      <div className="hero-fade" />
      <div className="hero-content" key={item.slug + '-content'}>
        <span className="hero-brand-tag">
          {item.type === 'series' ? 'Serial' : 'Featured Film'} &middot; Free Forever
        </span>
        <h1 className="hero-title">{item.title}</h1>
        <div className="hero-meta">
          <span>{item.year}</span>
          <span className="maturity">{item.maturity}</span>
          <span>{item.type === 'series' ? `${item.episodes?.length ?? 1} Episodes` : formatRuntime(item.runtime)}</span>
          <span>{item.genres.slice(0, 2).join(' \u00b7 ')}</span>
        </div>
        <p className="hero-desc">{item.desc}</p>
        <div className="hero-actions">
          <Link to={`/watch/${item.slug}`} className="btn btn-white">&#9654; Play</Link>
          <button type="button" className="btn btn-grey" onClick={() => openDetails(item)}>
            &#9432; More Info
          </button>
        </div>
      </div>
    </section>
  )
}
