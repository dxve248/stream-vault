import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import {
  getEpisode,
  getItem,
  makeWatchKey,
  resolveStream,
  streamUrl,
} from '../data/catalog.js'

export default function Watch() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { progress, saveProgress, clearProgress } = useApp()

  const item = getItem(slug)
  const epNum = item?.episodes ? Number(params.get('ep')) || item.episodes[0].n : 0
  const ep = item?.episodes ? getEpisode(item, epNum) : null

  const archiveId = item ? (ep ? ep.archiveId : item.archiveId) : null
  const guessSrc = item ? streamUrl(archiveId, ep ? ep.file : item.file) : null

  const [resolvedSrc, setResolvedSrc] = useState(null)
  const [useEmbed, setUseEmbed] = useState(false)
  const [barHidden, setBarHidden] = useState(false)
  const [ended, setEnded] = useState(false)

  const videoRef = useRef(null)
  const srcRef = useRef(guessSrc)
  const triedResolveRef = useRef(false)
  const lastSaveRef = useRef(0)

  srcRef.current = resolvedSrc || guessSrc

  const watchKey = makeWatchKey(slug, epNum)
  const watchKeyRef = useRef(watchKey)
  watchKeyRef.current = watchKey
  const saved = item ? progress[watchKey] : null

  useEffect(() => {
    setResolvedSrc(null)
    setUseEmbed(false)
    setEnded(false)
    setBarHidden(false)
    triedResolveRef.current = false
    if (!guessSrc && archiveId) {
      resolveStream(archiveId).then(setResolvedSrc).catch(() => setUseEmbed(true))
    }
    window.scrollTo(0, 0)
  }, [archiveId])

  useEffect(() => {
    let timer
    const wake = () => {
      setBarHidden(false)
      clearTimeout(timer)
      timer = setTimeout(() => setBarHidden(true), 3400)
    }
    wake()
    window.addEventListener('mousemove', wake)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', wake)
    }
  }, [])

  const flushSave = () => {
    const v = videoRef.current
    if (!v || !v.duration || Number.isNaN(v.duration)) return
    if (v.currentTime > 5)
      saveProgress(watchKeyRef.current, Math.floor(v.currentTime), Math.floor(v.duration))
  }

  useEffect(() => {
    return () => flushSave()
  }, [])

  useEffect(() => {
    const onLeave = () => flushSave()
    window.addEventListener('beforeunload', onLeave)
    return () => window.removeEventListener('beforeunload', onLeave)
  })

  if (!item || (item.episodes && !ep)) {
    return (
      <div className="not-found">
        <div>
          <h1 style={{ fontSize: 42 }}>Title not found</h1>
          <p style={{ color: '#b3b3b3', margin: '12px 0 24px' }}>
            That one seems to have slipped out of the vault.
          </p>
          <Link to="/" className="btn btn-red">Back to Home</Link>
        </div>
      </div>
    )
  }

  const nextEp =
    item.episodes ? item.episodes.find((e) => e.n === epNum + 1) || null : null

  const handleVideoError = () => {
    if (!triedResolveRef.current) {
      triedResolveRef.current = true
      resolveStream(archiveId)
        .then((url) => {
          if (url === srcRef.current) setUseEmbed(true)
          else setResolvedSrc(url)
        })
        .catch(() => setUseEmbed(true))
    } else {
      setUseEmbed(true)
    }
  }

  const activeSrc = resolvedSrc || guessSrc

  return (
    <div className="watch-page">
      <div className="watch-video-wrap" onMouseLeave={() => setBarHidden(false)}>
        {!useEmbed && (
          <video
            ref={videoRef}
            key={activeSrc}
            src={activeSrc}
            controls
            autoPlay
            playsInline
            onError={handleVideoError}
            onLoadedMetadata={(e) => {
              const v = e.currentTarget
              if (saved && saved.t > 30 && saved.t < v.duration - 45) v.currentTime = saved.t
            }}
            onTimeUpdate={(e) => {
              const now = Date.now()
              if (now - lastSaveRef.current > 5000) {
                lastSaveRef.current = now
                const v = e.currentTarget
                if (v.duration) saveProgress(watchKey, Math.floor(v.currentTime), Math.floor(v.duration))
              }
            }}
            onEnded={() => {
              clearProgress(watchKey)
              setEnded(true)
            }}
          />
        )}
        {useEmbed && (
          <iframe
            key={archiveId}
            title={item.title}
            src={`https://archive.org/embed/${archiveId}`}
            allowFullScreen
            allow="autoplay; fullscreen"
          />
        )}

        <div className={`watch-bar ${barHidden ? 'hidden' : ''}`}>
          <button className="watch-back" onClick={() => navigate(-1)}>
            &#8592; Back
          </button>
          <div className="watch-titles">
            <h1>{item.title}</h1>
            <p>
              {ep ? `${ep.title}` : `${item.year} \u00b7 ${item.genres.join(', ')}`}
              {saved && saved.t > 30 ? ' \u00b7 Resuming' : ''}
            </p>
          </div>
        </div>

        {ended && nextEp && (
          <div className="next-episode">
            <small>Up Next</small>
            <h4>{nextEp.title}</h4>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-white"
                style={{ fontSize: 14, padding: '8px 16px' }}
                onClick={() => navigate(`/watch/${slug}?ep=${nextEp.n}`)}
              >
                &#9654; Play
              </button>
              <button
                className="btn btn-grey"
                style={{ fontSize: 14, padding: '8px 16px' }}
                onClick={() => navigate('/')}
              >
                Home
              </button>
            </div>
          </div>
        )}

        {useEmbed && (
          <p
            style={{
              position: 'absolute',
              bottom: 10,
              right: 14,
              zIndex: 6,
              color: '#888',
              fontSize: 12,
            }}
          >
            Playing via the Archive.org player
          </p>
        )}
      </div>
    </div>
  )
}
