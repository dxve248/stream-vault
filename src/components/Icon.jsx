const PATHS = {
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="m8 3 4 4 4-4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4-4" />
    </>
  ),
  bookmark: <path d="M6 4h12v17l-6-4.2L6 21z" />,
  play: <path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </>
  ),
  star: (
    <path
      d="m12 3 2.7 5.8 6.3.9-4.6 4.3 1.2 6.2L12 17.2 6.4 20.2l1.2-6.2L3 9.7l6.3-.9z"
      fill="currentColor"
      stroke="none"
    />
  ),
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="M19 5 10 14" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </>
  ),
}

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
