import { useApp } from '../context/AppContext.jsx'
import { CATALOG, getItem, parseWatchKey } from '../data/catalog.js'
import Hero from '../components/Hero.jsx'
import Row from '../components/Row.jsx'

const TRENDING = [
  'charade',
  'metropolis',
  'night-of-the-living-dead',
  'his-girl-friday',
  'the-39-steps',
  'mclintock',
  'plan-9-from-outer-space',
  'nosferatu',
  'suddenly',
  'beat-the-devil',
  'the-general',
  'carnival-of-souls',
]

const ROWS = [
  {
    title: "Chills That Never Age",
    genres: ['Horror'],
  },
  {
    title: 'Sci-Fi & Beyond',
    genres: ['Sci-Fi', 'Adventure'],
    slugs: ['flash-gordon', 'radar-men-from-the-moon'],
  },
  {
    title: 'Laugh Out Loud Classics',
    slugs: [
      'the-general',
      'sherlock-jr',
      'steamboat-bill-jr',
      'my-man-godfrey',
      'nothing-sacred',
      'beat-the-devil',
      'meet-john-doe',
      'his-girl-friday',
      'fathers-little-dividend',
      'the-little-shop-of-horrors',
      'popeye-meets-sinbad',
      'betty-boop-snow-white',
    ],
  },
  {
    title: 'The Film Noir Vault',
    slugs: [
      'doa',
      'detour',
      'scarlet-street',
      'the-stranger',
      'he-walked-by-night',
      'kansas-city-confidential',
      'the-hitch-hiker',
      'the-amazing-mr-x',
      'martha-ivers',
      'impact',
    ],
  },
  {
    title: 'Western Roundup',
    genres: ['Western'],
  },
  {
    title: 'Mystery & Suspense',
    slugs: [
      'charade',
      'the-39-steps',
      'and-then-there-were-none',
      'one-step-beyond',
      'house-on-haunted-hill',
      'the-amazing-mr-x',
      'suddenly',
    ],
  },
  {
    title: 'Drama & Romance',
    slugs: [
      'of-human-bondage',
      'a-farewell-to-arms',
      'royal-wedding',
      'made-for-each-other',
      'meet-john-doe',
      'martha-ivers',
    ],
  },
  {
    title: 'Cartoons & Shorts',
    slugs: ['betty-boop-snow-white', 'superman-mechanical-monsters', 'popeye-meets-sinbad', 'gullivers-travels'],
  },
]

export default function Home() {
  const { progress } = useApp()

  const continueWatching = Object.entries(progress)
    .map(([key, p]) => {
      const { slug, n } = parseWatchKey(key)
      const item = getItem(slug)
      if (!item || !p.d) return null
      const ratio = p.t / p.d
      return { item, n, ratio, updated: p.updated }
    })
    .filter((cw) => cw && cw.ratio > 0.005 && cw.ratio < 0.96)
    .sort((a, b) => b.updated - a.updated)

  const trending = TRENDING.map((slug) => ({ item: getItem(slug) })).filter((e) => e.item)

  const rows = []

  if (continueWatching.length) {
    rows.push(
      <Row
        key="continue"
        title="Continue Watching"
        items={continueWatching.map((cw) => ({
          item: cw.item,
          pct: Math.round(cw.ratio * 100),
        }))}
      />
    )
  }

  rows.push(<Row key="trending" title="Trending Now" items={trending} />)

  for (const cfg of ROWS) {
    let items
    if (cfg.slugs) {
      items = cfg.slugs.map((slug) => ({ item: getItem(slug) })).filter((e) => e.item)
    } else {
      items = CATALOG.filter((i) => i.genres.some((g) => cfg.genres.includes(g))).map((item) => ({
        item,
      }))
    }
    const seen = new Set()
    items = items.filter((e) => (seen.has(e.item.slug) ? false : (seen.add(e.item.slug), true)))
    if (items.length >= 4) rows.push(<Row key={cfg.title} title={cfg.title} items={items} />)
  }

  return (
    <>
      <Hero items={TRENDING.slice(0, 4).map(getItem).filter(Boolean)} />
      <div className="rows">{rows}</div>
    </>
  )
}
