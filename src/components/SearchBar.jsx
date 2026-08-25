import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const timer = useRef(null)
  const navigate = useNavigate()

  useEffect(() => () => clearTimeout(timer.current), [])

  const onChange = (e) => {
    const value = e.target.value
    setQ(value)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      navigate(value.trim() ? `/search?q=${encodeURIComponent(value)}` : '/browse')
    }, 280)
  }

  return (
    <div className="top-search">
      <Icon name="search" size={17} />
      <input
        value={q}
        onChange={onChange}
        placeholder="Search the marquee..."
        aria-label="Search movies"
      />
    </div>
  )
}
