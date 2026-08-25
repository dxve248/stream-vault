import { useMemo, useState } from 'react'
import { CATALOG } from '../data/catalog.js'
import MovieCard from '../components/MovieCard.jsx'

export default function Browse({ heading = 'Browse All', sub = 'The entire vault, ready when you are.', filterType }) {
  const [genre, setGenre] = useState(null)

  const genres = useMemo(() => {
    const pool = filterType ? CATALOG.filter((i) => i.type === filterType) : CATALOG
    return [...new Set(pool.flatMap((i) => i.genres))].sort()
  }, [filterType])

  const results = useMemo(() => {
    let pool = filterType ? CATALOG.filter((i) => i.type === filterType) : CATALOG
    if (genre) pool = pool.filter((i) => i.genres.includes(genre))
    return pool
  }, [filterType, genre])

  return (
    <section className="grid-page">
      <h1 className="page-heading">{heading}</h1>
      <p className="page-sub">{sub}</p>
      <div className="chips">
        <button className={`chip ${!genre ? 'active' : ''}`} onClick={() => setGenre(null)}>
          All
        </button>
        {genres.map((g) => (
          <button key={g} className={`chip ${genre === g ? 'active' : ''}`} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
      </div>
      {results.length ? (
        <div className="grid">
          {results.map((item) => (
            <MovieCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nothing in this aisle yet</h2>
          <p>Try a different genre.</p>
        </div>
      )}
    </section>
  )
}
