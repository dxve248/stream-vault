import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { CATALOG, formatRuntime, matchScore, thumbForVideo } from '../data/catalog.js'
import Icon from './Icon.jsx'
import Thumb from './Thumb.jsx'

export default function TicketModal() {
  const { modalItem: item, modalClosing, closeDetails, openDetails, inList, toggleList, ratings, rateTitle } = useApp()
  const navigate = useNavigate()
  const listed = inList(item.slug)
  const rating = ratings[item.slug]
  const closingClass = modalClosing ? 'is-closing' : ''

  const play = (epNum) =>
    navigate(`/watch/${item.slug}${item.episodes && epNum ? `?ep=${epNum}` : ''}`)

  const similar = CATALOG.filter(
    (i) => i.slug !== item.slug && i.genres.some((g) => item.genres.includes(g))
  ).slice(0, 8)

  return (
    <div className={`modal-backdrop ${closingClass}`} onClick={closeDetails}>
      <div className={`ticket ${closingClass}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-label={item.title}>
        <div className="ticket-hero">
          <Thumb item={item} className="" />
          <div className="ticket-hero-fade" />
          <button className="ticket-close" aria-label="Close" onClick={closeDetails}>
            &#10005;
          </button>
          <div className="ticket-actions">
            <button className="btn btn-primary" onClick={() => play(item.episodes?.[0]?.n)}>
              <Icon name="play" size={17} /> Play
            </button>
            <button
              className="round-btn"
              title={listed ? 'Remove from My List' : 'Save to My List'}
              onClick={() => toggleList(item.slug)}
            >
              <Icon name={listed ? 'check' : 'plus'} size={19} />
            </button>
            <button
              className={`round-btn ${rating === 'up' ? 'rated-up' : ''}`}
              title={rating === 'up' ? 'Remove like' : 'I like this'}
              onClick={() => rateTitle(item.slug, 'up')}
            >
              <Icon name="thumbUp" size={17} />
            </button>
            <button
              className={`round-btn ${rating === 'down' ? 'rated-down' : ''}`}
              title={rating === 'down' ? 'Remove dislike' : 'Not for me'}
              onClick={() => rateTitle(item.slug, 'down')}
            >
              <Icon name="thumbDown" size={17} />
            </button>
          </div>
        </div>

        <div className="ticket-body">
          <div className="ticket-title-row">
            <span className="ticket-name">{item.title}</span>
          </div>

          <div>
            <div className="modal-meta" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 13, fontSize: 14 }}>
              <span className="match">{matchScore(item.slug)}% match</span>
              <span>{item.year}</span>
              <span className="chip-mat">{item.maturity}</span>
              <span>{item.type === 'series' ? `${item.episodes.length} episodes` : formatRuntime(item.runtime)}</span>
              <span className="chip-src">FREE OFFICIAL STREAM</span>
            </div>
            <p className="ticket-desc">{item.desc}</p>
          </div>

          <div className="ticket-facts">
            <p><b>Starring</b> <span>{item.cast.join(', ')}</span></p>
            <p><b>Director</b> <span>{item.director}</span></p>
            <p><b>Genres</b> <span>{item.genres.join(', ')}</span></p>
            <p><b>Vibe</b> <span>Timeless &middot; Free &middot; After dark</span></p>
          </div>

          <div className="perf-line" />

          {item.episodes && (
            <section className="episodes">
              <h3>Episodes</h3>
              {item.episodes.map((ep) => (
                <div key={ep.n} className="episode" onClick={() => play(ep.n)}>
                  <span className="ep-num">{ep.n}</span>
                  <img
                    className="ep-thumb"
                    src={thumbForVideo(ep.ytId).primary}
                    alt=""
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = thumbForVideo(ep.ytId).secondary }}
                  />
                  <div className="ep-info">
                    {ep.title}
                    <span className="ep-dur">{formatRuntime(ep.runtime || item.runtime)}</span>
                  </div>
                  <span className="round-btn" style={{ width: 38, height: 38 }}>
                    <Icon name="play" size={16} />
                  </span>
                </div>
              ))}
            </section>
          )}

          {similar.length > 0 && (
            <section className="similar">
              <h3 className="similar-h">If You Liked That</h3>
              <div className="similar-grid">
                {similar.map((s) => (
                  <article key={s.slug} className="mini" onClick={() => openDetails(s)}>
                    <Thumb item={s} className="" />
                    <div className="mini-info">
                      <span className="match">{matchScore(s.slug)}% match</span>
                      <div className="mini-title">{s.title}</div>
                      <div className="mini-sub">
                        {s.year} &middot; {s.type === 'series' ? 'Series' : formatRuntime(s.runtime)}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
