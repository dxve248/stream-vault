import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { ALL_GENRES, CATALOG, getItem, parseWatchKey } from '../data/catalog.js'
import Spotlight from '../components/Spotlight.jsx'
import Wall, { PillBar } from '../components/Wall.jsx'
import { ContinueCard } from '../components/PosterCard.jsx'

export default function Home() {
  const { progress } = useApp()
  const [genre, setGenre] = useState(null)

  const continueWatching = useMemo(
    () =>
      Object.entries(progress)
        .map(([key, p]) => {
          const { slug, n } = parseWatchKey(key)
          const item = getItem(slug)
          if (!item || !p.d) return null
          return {
            item,
            label: n ? `${item.title} — Ep. ${n}` : item.title,
            pct: Math.round((p.t / p.d) * 100),
            updated: p.updated,
          }
        })
        .filter((cw) => cw && cw.pct > 1 && cw.pct < 96)
        .sort((a, b) => b.updated - a.updated),
    [progress]
  )

  const wallItems = useMemo(
    () => (genre ? CATALOG.filter((i) => i.genres.includes(genre)) : CATALOG),
    [genre]
  )

  return (
    <>
      <Spotlight getItem={getItem} />
      <div className="page-pad">
        {continueWatching.length > 0 && (
          <section className="strip-section">
            <div className="strip-head">
              <h2>Pick Up Where You Left Off</h2>
            </div>
            <div className="strip-scroller">
              {continueWatching.map((cw) => (
                <ContinueCard key={cw.item.slug + cw.label} item={cw.item} pct={cw.pct} label={cw.label} />
              ))}
            </div>
          </section>
        )}

        <PillBar genres={ALL_GENRES} active={genre} onSelect={setGenre} />
        <h2 className="wall-title">{genre ?? 'The Whole Marquee'}</h2>
        <p className="wall-sub">
          {wallItems.length} title{wallItems.length === 1 ? '' : 's'} on the bill tonight
        </p>
        <Wall items={wallItems} />
      </div>
    </>
  )
}
