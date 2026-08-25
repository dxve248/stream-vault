import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATALOG } from '../data/catalog.js'
import Wall from '../components/Wall.jsx'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()

  const results = useMemo(() => {
    if (!q) return []
    const needle = q.toLowerCase()
    return CATALOG.filter((item) =>
      [item.title, item.director, item.year.toString(), ...item.genres, ...item.cast]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    )
  }, [q])

  return (
    <section className="grid-page">
      <h1 className="page-heading">Search</h1>
      {q ? (
        results.length ? (
          <>
            <p className="page-sub">
              {results.length} title{results.length === 1 ? '' : 's'} matching &ldquo;{q}&rdquo;
            </p>
            <Wall items={results} />
          </>
        ) : (
          <div className="empty-state" style={{ padding: '30px 20px 90px' }}>
            <h2>Nothing matches &ldquo;{q}&rdquo;</h2>
            <p>Try a title, actor, director or genre.</p>
          </div>
        )
      ) : (
        <p className="page-sub">Use the search bubble up top to explore the collection.</p>
      )}
    </section>
  )
}
