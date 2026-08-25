import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const AppContext = createContext(null)

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [myList, setMyList] = useState(() => load('sv_mylist', []))
  const [progress, setProgress] = useState(() => load('sv_progress', {}))
  const [modalItem, setModalItem] = useState(null)
  const [modalClosing, setModalClosing] = useState(false)
  const closeTimer = useRef(null)
  const [kidsMode, setKidsMode] = useState(() => load('sv_kids', false))
  const [ratings, setRatings] = useState(() => load('sv_ratings', {}))

  useEffect(() => {
    localStorage.setItem('sv_mylist', JSON.stringify(myList))
  }, [myList])

  useEffect(() => {
    localStorage.setItem('sv_progress', JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    localStorage.setItem('sv_kids', JSON.stringify(kidsMode))
  }, [kidsMode])

  useEffect(() => {
    localStorage.setItem('sv_ratings', JSON.stringify(ratings))
  }, [ratings])

  const value = useMemo(
    () => ({
      myList,
      progress,
      modalItem,
      modalClosing,
      kidsMode,
      ratings,
      openDetails: (item) => {
        clearTimeout(closeTimer.current)
        setModalClosing(false)
        setModalItem(item)
      },
      closeDetails: () => {
        clearTimeout(closeTimer.current)
        setModalClosing(true)
        closeTimer.current = setTimeout(() => {
          setModalItem(null)
          setModalClosing(false)
        }, 270)
      },
      toggleKids: () => setKidsMode((v) => !v),
      rateTitle: (slug, val) =>
        setRatings((r) => {
          const next = { ...r }
          if (next[slug] === val) delete next[slug]
          else next[slug] = val
          return next
        }),
      inList: (slug) => myList.includes(slug),
      toggleList: (slug) =>
        setMyList((list) =>
          list.includes(slug) ? list.filter((s) => s !== slug) : [slug, ...list]
        ),
      saveProgress: (key, t, d) =>
        setProgress((p) => ({ ...p, [key]: { t, d, updated: Date.now() } })),
      clearProgress: (key) =>
        setProgress((p) => {
          const next = { ...p }
          delete next[key]
          return next
        }),
    }),
    [myList, progress, modalItem, modalClosing, kidsMode, ratings]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
