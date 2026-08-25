import PosterCard from './PosterCard.jsx'

export default function Wall({ items }) {
  if (!items.length) return null
  return (
    <div className="wall">
      {items.map((item) => (
        <PosterCard key={item.slug} item={item} />
      ))}
    </div>
  )
}

export function PillBar({ genres, active, onSelect }) {
  return (
    <div className="pillbar">
      <button className={`pill ${!active ? 'active' : ''}`} onClick={() => onSelect(null)}>
        All
      </button>
      {genres.map((g) => (
        <button key={g} className={`pill ${active === g ? 'active' : ''}`} onClick={() => onSelect(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}
