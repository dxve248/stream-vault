import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { CATALOG, formatRuntime, matchScore, posterUrl } from '../data/catalog.js'

export default function DetailModal() {
  const { modalItem, closeDetails, openDetails, inList, toggleList } = useApp()
  const navigate = useNavigate()
  const item = modalItem
  const listed = inList(item.slug)

  const play = (epNum) => {
    const ep = item.episodes ? `?ep=${epNum}` : ''
    navigate(`/watch/${item.slug}${ep}`)
  }

  const similar = CATALOG.filter(
    (i) => i.slug !== item.slug && i.genres.some((g) => item.genres.includes(g))
  ).slice(0, 9)

  return (
    <div className="modal-backdrop" onClick={closeDetails}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={item.title}>
        <div className="modal-hero">
          <img src={posterUrl(item.archiveId)} alt="" />
          <div className="modal-hero-shade" />
          <button className="modal-close" aria-label="Close" onClick={closeDetails}>
            &#10005;
          </button>
          <div className="modal-hero-actions">
            <button className="btn btn-white" onClick={() => play(item.episodes?.[0]?.n)}>
              &#9654; Play
            </button>
            <button
              className="icon-btn"
              title={listed ? 'Remove from My List' : 'Add to My List'}
              onClick={() => toggleList(item.slug)}
              style={{ width: 42, height: 42, fontSize: 20 }}
            >
              {listed ? '\u2713' : '+'}
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div>
            <div className="modal-meta-row">
              <span className="match">{matchScore(item.slug)}% Match</span>
              <span>{item.year}</span>
              <span className="maturity">{item.maturity}</span>
              <span>
                {item.type === 'series'
                  ? `${item.episodes.length} Episodes`
                  : formatRuntime(item.runtime)}
              </span>
            </div>
            <p className="modal-desc">{item.desc}</p>
          </div>
          <div className="modal-facts">
            <p><b>Cast:</b> <span>{item.cast.join(', ')}</span></p>
            <p><b>Director:</b> <span>{item.director}</span></p>
            <p><b>Genres:</b> <span>{item.genres.join(', ')}</span></p>
            <p><b>This title is:</b> <span>Nostalgic &middot; Timeless &middot; Free</span></p>
          </div>

          {item.episodes && (
            <section className="episodes">
              <h3>Episodes</h3>
              {item.episodes.map((ep) => (
                <div key={ep.n} className="episode" onClick={() => play(ep.n)}>
                  <span className="ep-num">{ep.n}</span>
                  <img className="ep-thumb" src={posterUrl(ep.archiveId)} alt="" loading="lazy" />
                  <div className="ep-info">
                    <div className="ep-title-row">
                      <span>{ep.title}</span>
                      <span className="ep-dur">{formatRuntime(item.runtime)}</span>
                    </div>
                  </div>
                  <button className="icon-btn solid" title="Play episode">&#9654;</button>
                </div>
              ))}
            </section>
          )}

          {similar.length > 0 && (
            <section className="similar-section">
              <h3 className="section-label">More Like This</h3>
              <div className="similar-grid">
                {similar.map((s) => (
                  <MiniCard key={s.slug} item={s} onOpen={() => openDetails(s)} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

function MiniCard({ item, onOpen }) {
  return (
    <article className="mini-card" onClick={onOpen}>
      <img src={posterUrl(item.archiveId)} alt="" loading="lazy" />
      <div className="mini-card-info">
        <span className="match">{matchScore(item.slug)}% Match</span>
        <div className="mini-card-title">{item.title}</div>
        <div style={{ color: '#999', fontSize: 11.5 }}>
          {item.year} &middot; {item.type === 'series' ? 'Series' : formatRuntime(item.runtime)}
        </div>
      </div>
    </article>
  )
}
