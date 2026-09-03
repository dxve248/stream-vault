import { useEffect, useMemo, useState } from 'react'

const SIZES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault']
const PLACEHOLDER_WIDTH = 121

function candidatesFor(ytId) {
  return ytId ? SIZES.map((s) => `https://i.ytimg.com/vi/${ytId}/${s}.jpg`) : []
}

export default function Thumb({ item, videoId, className = '', eager = false }) {
  const ytId = videoId ?? item?.ytId ?? null
  const list = useMemo(() => candidatesFor(ytId), [ytId])
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setIdx(0)
    setLoaded(false)
  }, [list])

  const advance = () =>
    setIdx((k) => (k < list.length - 1 ? k + 1 : k))

  const cls = `${className}${loaded ? ' loaded' : ''}`

  if (!ytId) {
    const archiveId = item?.archiveId
    return (
      <img
        className={cls}
        src={archiveId ? `https://archive.org/services/img/${archiveId}` : ''}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
      />
    )
  }

  return (
    <img
      className={cls}
      src={list[idx]}
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      onError={advance}
      onLoad={(e) => {
        if ((e.currentTarget.naturalWidth || 0) <= PLACEHOLDER_WIDTH && idx < list.length - 1) {
          advance()
        } else {
          setLoaded(true)
        }
      }}
    />
  )
}
