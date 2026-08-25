import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import SearchBar from './components/SearchBar.jsx'
import TicketModal from './components/TicketModal.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import SearchPage from './pages/SearchPage.jsx'
import MyList from './pages/MyList.jsx'
import Watch from './pages/Watch.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const { modalItem, closeDetails } = useApp()
  const location = useLocation()
  const isWatch = location.pathname.startsWith('/watch')

  useEffect(() => {
    document.body.style.overflow = modalItem ? 'hidden' : ''
  }, [modalItem])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeDetails()
      if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault()
        document.querySelector('.top-search input')?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeDetails])

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Sidebar />
      <div className="main-area">
        <SearchBar />
        <div className={`page-anim ${isWatch ? 'soft' : 'rise'}`} key={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Browse key="movies" filterType="movie" heading="The Movies" sub="Feature presentations from every era." />} />
            <Route path="/series" element={<Browse key="series" filterType="series" heading="Serials & Series" sub="Chapter plays and late-night anthologies." />} />
            <Route path="/browse" element={<Browse key="all" />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/watch/:slug" element={<Watch />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
      {modalItem && <TicketModal />}
    </div>
  )
}
