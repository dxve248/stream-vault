import { createContext, useContext, useEffect, useMemo, useState } from 'react'

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

  useEffect(() => {
    localStorage.setItem('sv_mylist', JSON.stringify(myList))
  }, [myList])

  useEffect(() => {
    localStorage.setItem('sv_progress', JSON.stringify(progress))
  }, [progress])

  const value = useMemo(
    () => ({
      myList,
      progress,
      modalItem,
      openDetails: (item) => setModalItem(item),
      closeDetails: () => setModalItem(null),
      inList: (slug) => myList.includes(slug),
      toggleList: (slug) =>
        setMyList((list) =>
          list.includes(slug) ? list.filter((s) => s !== slug) : [slug, ...list]
        ),
      saveProgress: (slug, t, d) =>
        setProgress((p) => ({ ...p, [slug]: { t, d, updated: Date.now() } })),
      clearProgress: (slug) =>
        setProgress((p) => {
          const next = { ...p }
          delete next[slug]
          return next
        }),
    }),
    [myList, progress, modalItem]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
