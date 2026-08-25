import { NavLink, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useApp } from '../context/AppContext.jsx'
import { CATALOG, kidFilter } from '../data/catalog.js'

const LINKS = [
  { to: '/', icon: 'home', label: 'Home', end: true },
  { to: '/movies', icon: 'film', label: 'Movies' },
  { to: '/series', icon: 'tv', label: 'Series' },
  { to: '/my-list', icon: 'bookmark', label: 'My List' },
]

export default function Sidebar() {
  const { myList, kidsMode, toggleKids } = useApp()
  const navigate = useNavigate()

  const surprise = () => {
    const pool = kidFilter(CATALOG, kidsMode)
    if (!pool.length) return
    const pick = pool[Math.floor(Math.random() * pool.length)]
    navigate(`/watch/${pick.slug}`)
  }

  return (
    <aside className="rail">
      <NavLink to="/" className="rail-logo" aria-label="Midnight Marquee home">
        MM
      </NavLink>
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => `rail-item ${isActive ? 'active' : ''}`}
        >
          <Icon name={link.icon} />
          <span className="rail-tip">{link.label}</span>
        </NavLink>
      ))}
      <button
        type="button"
        className="rail-item"
        title="Surprise Me — random feature"
        onClick={surprise}
      >
        <Icon name="dice" />
        <span className="rail-tip">Surprise Me</span>
      </button>
      <div className="rail-bottom">
        <button
          type="button"
          className={`rail-item ${kidsMode ? 'kids-on' : ''}`}
          title={kidsMode ? 'Kids Mode ON — only family-safe titles' : 'Kids Mode'}
          onClick={toggleKids}
          style={{ border: 'none' }}
        >
          <Icon name="shield" size={kidsMode ? 22 : 20} />
          <span className="rail-tip">{kidsMode ? 'Kids Mode: ON' : 'Kids Mode'}</span>
        </button>
        <div className="rail-dot" title={`${myList.length} saved`}>
          <span style={{ fontFamily: 'Bebas Neue', fontSize: 15 }}>{myList.length}</span>
        </div>
      </div>
    </aside>
  )
}
