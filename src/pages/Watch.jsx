import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { getEpisode, getItem, makeWatchKey, loadYouTubeApi } from '../data/catalog.js'
import Icon from '../components/Icon.jsx'

export default function Watch() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { progress, saveProgress, clearProgress } = useApp()

  const item = getItem(slug)
  const epNum = item?.episodes ? Number(params.get('ep')) || item.episodes[0].n : 0
  const ep = item?.episodes ? getEpisode(item, epNum) : null
  const currentYtId = item ? (item.episodes ? ep.ytId : item.ytId) : null

  const [barHidden, setBarHidden] = useState(false)
  const [ended, setEnded] = useState(false)
  const [ready, setReady] = useState(false)

  const stageRef = useRef(null)
  const playerRef = useRef(null)
  const watchKeyRef = useRef(makeWatchKey(slug, epNum))
  const savedRef = useRef(null)
  const endedRef = useRef(false)
  const cbsRef = useRef({})

  watchKeyRef.current = makeWatchKey(slug, epNum)
  savedRef.current = item ? progress[watchKeyRef.current] : null
  cbsRef.current.save = saveProgress
  cbsRef.current.clear = clearProgress

  useEffect(() => {
    setEnded(false)
    setReady(false)
    endedRef.current = false
  }, [currentYtId])

  useEffect(() => {
    if (!currentYtId || !stageRef.current) return undefined
    let cancelled = false
    let interval = null
    let player = null

    loadYouTubeApi().then((YT) => {
      if (cancelled || !stageRef.current) return
      player = new YT.Player(stageRef.current, {
        videoId: currentYtId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            setReady(true)
            try {
              const d = e.target.getDuration()
              const s = savedRef.current
              if (s && d && s.t > 30 && s.t < d - 45) e.target.seekTo(s.t, true)
              e.target.playVideo()
            } catch {}
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.ENDED) {
              endedRef.current = true
              cbsRef.current.clear(watchKeyRef.current)
              setEnded(true)
            }
          },
        },
      })
      playerRef.current = player
      interval = setInterval(() => {
        try {
          const t = player.getCurrentTime()
          const d = player.getDuration()
          if (!endedRef.current && t > 5 && d) {
            cbsRef.current.save(watchKeyRef.current, Math.floor(t), Math.floor(d))
          }
        } catch {}
      }, 5000)
    })

    return () => {
      cancelled = true
      clearInterval(interval)
      try {
        const p = playerRef.current
        if (p && p.getCurrentTime) {
          const t = p.getCurrentTime()
          const d = p.getDuration()
          if (!endedRef.current && t > 5 && d) {
            cbsRef.current.save(watchKeyRef.current, Math.floor(t), Math.floor(d))
          }
        }
        p?.destroy?.()
      } catch {}
      playerRef.current = null
    }
  }, [currentYtId])

  useEffect(() => {
    let timer
    const wake = () => {
      setBarHidden(false)
      clearTimeout(timer)
      timer = setTimeout(() => setBarHidden(true), 3600)
    }
    wake()
    window.addEventListener('mousemove', wake)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', wake)
    }
  }, [])

  if (!item || (item.episodes && !ep)) {
    return (
      <div className="not-found">
        <div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 52, letterSpacing: 2 }}>
            Title not found
          </h1>
          <p style={{ color: '#9a9ab2', margin: '10px 0 26px' }}>
            That reel seems to have gone missing from the vault.
          </p>
          <Link to="/" className="btn btn-primary">Back to the Lobby</Link>
        </div>
      </div>
    )
  }

  const nextEp = item.episodes ? item.episodes.find((e) => e.n === epNum + 1) || null : null

  return (
    <div className="watch-page">
      <div className="watch-stage">
        <div ref={stageRef} />
      </div>

      <div className={`watch-bar ${barHidden && ready ? 'hidden' : ''}`}>
        <button className="watch-back" onClick={() => navigate(-1)}>
          <Icon name="arrowLeft" size={17} /> Lobby
        </button>
        <div className="watch-titles">
          <h1>{item.title}</h1>
          <p>
            {ep ? ep.title : `${item.year} \u00b7 ${item.genres.join(', ')}`}
            {saved && saved.t > 30 ? ' \u00b7 resuming' : ''}
          </p>
        </div>
        <div className="watch-links">
          <a
            className="watch-link"
            href={`https://www.youtube.com/watch?v=${currentYtId}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="external" size={15} /> YouTube
          </a>
        </div>
      </div>

      {ended && nextEp && (
        <div className="next-episode">
          <small>Up Next</small>
          <h4>{nextEp.title}</h4>
          <div className="row-btns">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/watch/${slug}?ep=${nextEp.n}`)}
            >
              <Icon name="play" size={15} /> Play
            </button>
            <button className="btn btn-glass" onClick={() => navigate('/')}>
              Lobby
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
