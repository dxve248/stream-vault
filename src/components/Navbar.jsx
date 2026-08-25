import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus()
  }, [searchOpen])

  const onChange = (e) => {
    const q = e.target.value
    setQuery(q)
    navigate(q.trim() ? `/search?q=${encodeURIComponent(q)}` : '/browse')
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">STREAMVAULT</Link>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/series">Series</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/my-list">My List</NavLink>
      </nav>
      <div className="nav-right">
        <div className={`search-box ${searchOpen ? 'open' : ''}`}>
          <button
            className="search-btn"
            aria-label="Search"
            onClick={() => {
              setSearchOpen((o) => !o)
              if (searchOpen && query) {
                setQuery('')
                navigate('/browse')
              }
            }}
          >
            &#128269;
          </button>
          <input
            ref={inputRef}
            value={query}
            placeholder="Titles, people, genres"
            onChange={onChange}
            onBlur={() => !query && setSearchOpen(false)}
          />
        </div>
        <div className="avatar">D</div>
      </div>
    </header>
  )
}
