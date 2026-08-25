import { getItem } from '../data/catalog.js'
import { useApp } from '../context/AppContext.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { Link } from 'react-router-dom'

export default function MyList() {
  const { myList } = useApp()
  const items = myList.map(getItem).filter(Boolean)

  if (!items.length) {
    return (
      <section className="grid-page">
        <h1 className="page-heading">My List</h1>
        <div className="empty-state">
          <h2>Your list is empty</h2>
          <p>Hit the + on any title to stash it here for later.</p>
          <Link to="/browse" className="btn btn-red">Browse the Vault</Link>
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
      <div className="grid">
        {items.map((item) => (
          <MovieCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  )
}
