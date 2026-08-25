import { useRef } from 'react'
import MovieCard from './MovieCard.jsx'

export default function Row({ title, items, exploreLabel = 'Explore All' }) {
  const scrollerRef = useRef(null)

  if (!items.length) return null

  const scroll = (dir) => {
    const el = scrollerRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <section className="row">
      <div className="row-head">
        <h2 className="row-title">{title}</h2>
        <span className="row-explore">{exploreLabel} &rsaquo;</span>
      </div>
      <button className="row-arrow left" aria-label="Scroll left" onClick={() => scroll(-1)}>
        &#8249;
      </button>
      <button className="row-arrow right" aria-label="Scroll right" onClick={() => scroll(1)}>
        &#8250;
      </button>
      <div className="row-scroller" ref={scrollerRef}>
        {items.map((entry) =>
          entry.render ? (
            entry.render
          ) : (
            <MovieCard key={`${title}-${entry.item.slug}-${entry.key ?? ''}`} item={entry.item} progressPct={entry.pct} />
          )
        )}
      </div>
    </section>
  )
}
