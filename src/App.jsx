import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'
import Navbar from './components/Navbar.jsx'
import DetailModal from './components/DetailModal.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import SearchPage from './pages/SearchPage.jsx'
import MyList from './pages/MyList.jsx'
import Watch from './pages/Watch.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { modalItem, closeDetails } = useApp()

  useEffect(() => {
    document.body.style.overflow = modalItem ? 'hidden' : ''
  }, [modalItem])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeDetails()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeDetails])

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <main className="page-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Browse key="movies" filterType="movie" heading="Movies" />} />
          <Route path="/series" element={<Browse key="series" filterType="series" heading="Series & Serials" />} />
          <Route path="/browse" element={<Browse key="all" heading="Browse All" />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/watch/:slug" element={<Watch />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      {modalItem && <DetailModal />}
    </div>
  )
}
