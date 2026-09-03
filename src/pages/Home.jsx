import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import {
  ALL_GENRES,
  CATALOG,
  getItem,
  kidFilter,
  parseWatchKey,
} from '../data/catalog.js'
import Spotlight from '../components/Spotlight.jsx'
import Wall, { PillBar } from '../components/Wall.jsx'
import PosterCard, { ContinueCard } from '../components/PosterCard.jsx'

const TOP_SHORTS = [
  'hair-love', 'curfew-short', 'stutterer', 'fresh-guacamole', 'the-present',
  'lights-out-short', 'lovefield', 'le-gouffre', 'cuerdas', 'ian-short',
  'validation', 'head-over-heels', 'windshield-wiper', 'western-spaghetti',
  'submarine-sandwich', 'game-over-pes', 'rollin-safari', 'hybrids-short',
  'the-maker', 'sweet-cocoon',
]

const ANIMATION_HITS = [
  'the-amazing-digital-circus', 'helluva-boss', 'murder-drones',
  'hazbin-hotel-pilot', 'lackadaisy-pilot', 'kick-heart',
]

const DOCS_SETS_STAGES = [
  'bo-burnham-what', 'life-in-a-day-2020', 'human-the-movie',
  'zoltan-kaszas', 'leanne-morgan', 'jeff-allen-double-feature',
  'michael-jr-live', 'coldplay-tiny-desk', 'billie-tiny-desk',
  'taylor-swift-tiny-desk', 'mac-miller-tiny-desk',
]

const SPORTS_LEGENDS = [
  'fifa-mineirazo', 'maradona-86', 'wimbledon-2008-final', 'super-bowl-li',
  'bolt-958', 'aguero-9320', 'mj-last-bulls-game', 'lebron-45-game-6',
  'kobe-81-points', 'curry-3pt-record', 'taker-hbk-wrestlemania-25',
  'conor-aldo-13-seconds', 'cricket-world-cup-2011-final',
  'formula-e-sao-paulo', 'cruz-vs-romero', 'fifa-1970-final',
  'super-bowl-iii', 'rampage-2024',
]

const AFTER_MIDNIGHT = [
  'the-smiling-man', 'the-birch', 'daddy-is-a-hunter',
  'look-see-wedding-hand', 'mimic-crypt', 'the-rickety-man',
]

const NEXT_LEVEL = [
  'falcon-heavy-starman', 'webb-first-images', 'perseverance-launch',
  'starship-first-flight', 'crew-demo-2-launch', 'artemis-1-launch',
  'ti-2026-finals-day', 'evo-france-2025',
]

function StripRow({ title, sub, slugs, kidsMode }) {
  const items = kidFilter(slugs.map(getItem).filter(Boolean), kidsMode)
  if (!items.length) return null
  return (
    <section className="strip-section">
      <div className="strip-head">
        <h2>{title}</h2>
        {sub && <span style={{ color: 'var(--muted)', fontSize: 13 }}>{sub}</span>}
      </div>
      <div className="strip-scroller">
        {items.map((item) => (
          <div key={item.slug} style={{ flex: '0 0 300px' }}>
            <PosterCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const { progress, kidsMode } = useApp()
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
            n,
            label: n ? `${item.title} \u2014 Ep. ${n}` : item.title,
            pct: Math.round((p.t / p.d) * 100),
            updated: p.updated,
          }
        })
        .filter((cw) => cw && cw.pct > 1 && cw.pct < 96)
        .filter((cw) => !kidsMode || ['G', 'PG', 'TV-PG'].includes(cw.item.maturity))
        .sort((a, b) => b.updated - a.updated),
    [progress, kidsMode]
  )

  const wallItems = useMemo(() => {
    const pool = genre ? CATALOG.filter((i) => i.genres.includes(genre)) : CATALOG
    return kidFilter(pool, kidsMode)
  }, [genre, kidsMode])

  return (
    <>
      <Spotlight />
      <div className="page-pad">
        {continueWatching.length > 0 && (
          <section className="strip-section">
            <div className="strip-head">
              <h2>Pick Up Where You Left Off</h2>
            </div>
            <div className="strip-scroller">
              {continueWatching.map((cw) => (
                <ContinueCard key={cw.item.slug + cw.label} item={cw.item} pct={cw.pct} label={cw.label} epNum={cw.n} />
              ))}
            </div>
          </section>
        )}

        {!genre && (
          <>
            <StripRow title="Legends in Action" sub="Full matches, record runs & moments that stopped the world" slugs={SPORTS_LEGENDS} kidsMode={kidsMode} />
            <StripRow title="Next Level: Space & Esports" sub="Rockets, rovers & championship broadcasts" slugs={NEXT_LEVEL} kidsMode={kidsMode} />
            <StripRow title="Animation Universe" sub="Viral phenomena & full series — complete seasons inside" slugs={ANIMATION_HITS} kidsMode={kidsMode} />
            <StripRow title="Short & Mighty" sub="Oscar winners & viral legends, all under 20 minutes" slugs={TOP_SHORTS} kidsMode={kidsMode} />
            <StripRow title="Docs, Sets & Stages" sub="Real stories, full comedy specials & intimate concerts" slugs={DOCS_SETS_STAGES} kidsMode={kidsMode} />
            <StripRow title="After Midnight" sub="Horror & sci-fi shorts from DUST, ALTER & Crypt TV" slugs={AFTER_MIDNIGHT} kidsMode={kidsMode} />
          </>
        )}

        <PillBar genres={ALL_GENRES} active={genre} onSelect={setGenre} />
        <h2 className="wall-title">{genre ?? 'The Whole Marquee'}{kidsMode ? ' (Kids Mode)' : ''}</h2>
        <p className="wall-sub">
          {wallItems.length} title{wallItems.length === 1 ? '' : 's'} on the bill tonight
        </p>
        <Wall key={(genre ?? 'all') + (kidsMode ? '-k' : '')} items={wallItems} />
      </div>
    </>
  )
}
