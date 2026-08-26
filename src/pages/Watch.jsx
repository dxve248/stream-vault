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
  const gated = item ? (item.episodes ? !!ep.ageGate : !!item.ageGate) : false

  const [barHidden, setBarHidden] = useState(false)
  const [ended, setEnded] = useState(false)
  const [ready, setReady] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [mode, setMode] = useState('api')

  const mountRef = useRef(null)
  const readyRef = useRef(false)
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
    readyRef.current = false
    setBlocked(false)
    setMode('api')
    endedRef.current = false
  }, [currentYtId])

  useEffect(() => {
    if (!currentYtId || gated || mode !== 'api' || !mountRef.current) return undefined
    let cancelled = false
    let interval = null
    let player = null

    const watchdog = setTimeout(() => {
      if (!cancelled && !readyRef.current) {
        cancelled = true
        setMode('plain')
      }
    }, 7000)

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !mountRef.current) return
        const host = mountRef.current
        host.innerHTML = ''
        const el = document.createElement('div')
        el.style.width = '100%'
        el.style.height = '100%'
        host.appendChild(el)

        player = new YT.Player(el, {
          videoId: currentYtId,
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              if (cancelled) return
              clearTimeout(watchdog)
              readyRef.current = true
              setReady(true)
              try {
                const d = e.target.getDuration()
                const s = savedRef.current
                if (s && d && s.t > 30 && s.t < d - 45) e.target.seekTo(s.t, true)
                e.target.playVideo()
              } catch {}
            },
            onStateChange: (e) => {
              if (e.data === YT.PlayerState.ENDED && !endedRef.current) {
                endedRef.current = true
                cbsRef.current.clear(watchKeyRef.current)
                setEnded(true)
              }
            },
            onError: () => {
              if (!cancelled) setBlocked(true)
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
      .catch(() => {
        if (!cancelled) setMode('plain')
      })

    return () => {
      cancelled = true
      clearTimeout(watchdog)
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
      if (mountRef.current) mountRef.current.innerHTML = ''
    }
  }, [currentYtId, gated, mode])

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
  const saved = savedRef.current

  return (
    <div className="watch-page">
      <div className="watch-stage">
        {!gated && mode === 'api' && <div ref={mountRef} className="yt-mount" />}
        {!gated && mode === 'plain' && (
          <iframe
            key={currentYtId}
            title={item.title}
            className="plain-embed"
            src={`https://www.youtube-nocookie.com/embed/${currentYtId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
          />
        )}
        {(gated || blocked) && (
          <div className="blocked-card">
            <h2>{gated ? 'Age-restricted by YouTube' : 'Playback blocked by the uploader'}</h2>
            <p>
              {gated ? (
                <>
                  YouTube requires a signed-in age check before playing <b>{item.title}</b>,
                  which isn&rsquo;t allowed inside other apps. One click below and it plays
                  there in full HD &mdash; same video, same channel, zero cost.
                </>
              ) : (
                <>
                  This channel doesn&rsquo;t allow <b>{item.title}</b> to play inside other apps
                  &mdash; it streams perfectly on YouTube itself, though.
                </>
              )}
            </p>
            <div className="row-btns">
              <a
                className="btn btn-primary"
                href={`https://www.youtube.com/watch?v=${currentYtId}`}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="external" size={16} /> Watch on YouTube
              </a>
              <button className="btn btn-glass" onClick={() => navigate(-1)}>
                Back to Lobby
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`watch-bar ${barHidden && ready && !blocked && !gated ? 'hidden' : ''}`}>
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
          {!blocked && (
            <a
              className="watch-link"
              href={`https://www.youtube.com/watch?v=${currentYtId}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="external" size={15} /> YouTube
            </a>
          )}
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
