import { useEffect, useState } from 'react'
import { thumbFor } from '../data/catalog.js'

export default function Thumb({ item, className = '' }) {
  const { primary, secondary } = thumbFor(item)
  const [src, setSrc] = useState(primary)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setSrc(primary)
    setLoaded(false)
  }, [primary])

  return (
    <img
      className={`${className} ${loaded ? 'loaded' : ''}`}
      src={src}
      alt=""
      loading="lazy"
      onError={() => {
        if (src !== secondary) setSrc(secondary)
      }}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth > 0) setLoaded(true)
      }}
    />
  )
}
