import { NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useApp } from '../context/AppContext.jsx'

const LINKS = [
  { to: '/', icon: 'home', label: 'Home', end: true },
  { to: '/movies', icon: 'film', label: 'Movies' },
  { to: '/series', icon: 'tv', label: 'Series' },
  { to: '/my-list', icon: 'bookmark', label: 'My List' },
]

export default function Sidebar() {
  const { myList } = useApp()

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
      <div className="rail-bottom">
        <div className="rail-dot" title={`${myList.length} saved`}>
          <span style={{ fontFamily: 'Bebas Neue', fontSize: 15 }}>{myList.length}</span>
        </div>
      </div>
    </aside>
  )
}
