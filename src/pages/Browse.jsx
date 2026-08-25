import { useMemo, useState } from 'react'
import { CATALOG, kidFilter } from '../data/catalog.js'
import { useApp } from '../context/AppContext.jsx'
import Wall, { PillBar } from '../components/Wall.jsx'

export default function Browse({ heading = 'Browse the Vault', sub = 'Every title in the collection, one marquee.', filterType }) {
  const [genre, setGenre] = useState(null)
  const { kidsMode } = useApp()

  const genres = useMemo(() => {
    const pool = kidFilter(
      filterType ? CATALOG.filter((i) => i.type === filterType) : CATALOG,
      kidsMode
    )
    return [...new Set(pool.flatMap((i) => i.genres))].sort()
  }, [filterType, kidsMode])

  const results = useMemo(() => {
    let pool = kidFilter(
      filterType ? CATALOG.filter((i) => i.type === filterType) : CATALOG,
      kidsMode
    )
    if (genre) pool = pool.filter((i) => i.genres.includes(genre))
    return pool
  }, [filterType, genre, kidsMode])

  return (
    <section className="grid-page">
      <h1 className="page-heading">{heading}</h1>
      <p className="page-sub">{sub}</p>
      <PillBar genres={genres} active={genre} onSelect={setGenre} />
      {results.length ? (
        <Wall items={results} />
      ) : (
        <div className="empty-state" style={{ padding: '40px 20px 90px' }}>
          <h2>Nothing in this aisle</h2>
          <p>Try another genre.</p>
        </div>
      )}
    </section>
  )
}
