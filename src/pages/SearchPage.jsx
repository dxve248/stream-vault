import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATALOG } from '../data/catalog.js'
import MovieCard from '../components/MovieCard.jsx'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()

  const results = useMemo(() => {
    if (!q) return []
    const needle = q.toLowerCase()
    return CATALOG.filter((item) => {
      const haystack = [
        item.title,
        item.director,
        item.year.toString(),
        ...item.genres,
        ...item.cast,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [q])

  return (
    <section className="grid-page">
      <h1 className="page-heading">Search</h1>
      <p className="page-sub">
        {q
          ? results.length
            ? `Results for "${q}" \u2014 ${results.length} title${results.length === 1 ? '' : 's'}`
            : null
          : 'Type in the search box above to explore the vault.'}
      </p>
      {results.length > 0 && (
        <div className="grid">
          {results.map((item) => (
            <MovieCard key={item.slug} item={item} />
          ))}
        </div>
      )}
      {q && !results.length && (
        <div className="empty-state">
          <h2>No matches for &ldquo;{q}&rdquo;</h2>
          <p>Try a different title, actor, director or genre.</p>
        </div>
      )}
    </section>
  )
}
