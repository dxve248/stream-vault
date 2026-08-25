import { Link } from 'react-router-dom'
import { getItem } from '../data/catalog.js'
import { useApp } from '../context/AppContext.jsx'
import Wall from '../components/Wall.jsx'

export default function MyList() {
  const { myList } = useApp()
  const items = myList.map(getItem).filter(Boolean)

  if (!items.length) {
    return (
      <section className="grid-page">
        <h1 className="page-heading">My List</h1>
        <div className="empty-state">
          <h2>Your marquee is dark</h2>
          <p>Tap the + on any poster to save it here for later.</p>
          <Link to="/browse" className="btn btn-primary">Light It Up</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="grid-page">
      <h1 className="page-heading">My List</h1>
      <p className="page-sub">
        {items.length} saved title{items.length === 1 ? '' : 's'}
      </p>
      <Wall items={items} />
    </section>
  )
}
