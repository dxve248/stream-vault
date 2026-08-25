export const thumbFor = (item) => ({
  primary: `https://i.ytimg.com/vi/${item.ytId}/maxresdefault.jpg`,
  secondary: `https://i.ytimg.com/vi/${item.ytId}/mqdefault.jpg`,
})

export const thumbForVideo = (ytId) => ({
  primary: `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`,
  secondary: `https://i.ytimg.com/vi/${ytId}/mqdefault.jpg`,
})

const CATALOG_RAW = [
  {
    slug: 'kung-fury',
    title: 'Kung Fury',
    year: 2015,
    type: 'movie',
    maturity: 'PG-13',
    runtime: 31,
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    director: 'David Sandberg',
    cast: ['David Sandberg', 'Jorma Taccone', 'David Hasselhoff'],
    desc: 'A Miami detective travels back in time to kick Adolf Hitler\u2019s butt \u2014 with laser raptors, Viking babes and a machine-gun arm. The internet\u2019s biggest crowd-funded action smash.',
    ytId: 'bS5P_LAqiVg',
  },
  {
    slug: 'life-in-a-day-2020',
    title: 'Life in a Day 2020',
    year: 2020,
    type: 'movie',
    maturity: 'PG-13',
    runtime: 64,
    genres: ['Documentary', 'Drama'],
    director: 'Kevin Macdonald',
    cast: ['Thousands of filmmakers'],
    desc: 'Ridley Scott and Kevin Macdonald\u2019s crowd-sourced documentary: one single day on Earth, filmed by thousands of people across the planet, stitched into one emotional feature.',
    ytId: 'vcsSc2iksC0',
  },
  {
    slug: 'the-butterfly-circus',
    title: 'The Butterfly Circus',
    year: 2009,
    type: 'movie',
    maturity: 'PG',
    runtime: 20,
    genres: ['Drama', 'Fantasy'],
    director: 'Joshua Weigel',
    cast: ['Nick Vujicic', 'Doug Jones', 'Matt Allmen'],
    desc: 'During the Great Depression a limbless man, star attraction of a freak show, discovers he can truly fly. Multi-award-winning short that launched a thousand speeches.',
    ytId: 'KbkTZ7Ii8Vs',
  },
  {
    slug: 'in-a-heartbeat',
    title: 'In a Heartbeat',
    year: 2017,
    type: 'movie',
    maturity: 'G',
    runtime: 4,
    genres: ['Animation', 'Romance', 'Family'],
    director: 'Beth David, Esteban Bravo',
    cast: ['Nick Ainsworth', 'Kelly Donohue'],
    desc: 'A shy boy\u2019s heart literally leaps out of his chest for the popular boy at school. The viral animated short that melted half the internet in 2017.',
    ytId: '2REkk9SCRn0',
  },
  {
    slug: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    year: 2008,
    type: 'movie',
    maturity: 'G',
    runtime: 10,
    genres: ['Animation', 'Comedy', 'Family'],
    director: 'Sacha Goedegebure',
    cast: ['Big Buck Bunny', 'The Frank Rats'],
    desc: 'A gentle giant rabbit has his day ruined by three rodent bullies \u2014 and delivers gorgeously rendered CG revenge. The legendary Blender open movie.',
    ytId: 'YE7VzlLtp-4',
  },
  {
    slug: 'sintel',
    title: 'Sintel',
    year: 2010,
    type: 'movie',
    maturity: 'PG',
    runtime: 15,
    genres: ['Animation', 'Fantasy', 'Drama'],
    director: 'Colin Levy',
    cast: ['Halina Reijn', 'Thom Hoffman'],
    desc: 'A lone warrior crosses deserts and mountains searching for the baby dragon she once nursed back to health. Heartbreaking fantasy from Blender Studios.',
    ytId: 'eRsGyueVLvQ',
  },
  {
    slug: 'tears-of-steel',
    title: 'Tears of Steel',
    year: 2012,
    type: 'movie',
    maturity: 'PG-13',
    runtime: 12,
    genres: ['Sci-Fi', 'Action'],
    director: 'Ian Hubert',
    cast: ['Derek de Lint', 'Sergio Hasselbaink', 'Rogier Schippers'],
    desc: 'In future Amsterdam, scientists must recreate a broken relationship to save the world from robot overlords. Slick VFX blockbuster energy on an open-source budget.',
    ytId: 'R6MlUcmOul8',
  },
  {
    slug: 'elephants-dream',
    title: 'Elephants Dream',
    year: 2006,
    type: 'movie',
    maturity: 'PG',
    runtime: 11,
    genres: ['Animation', 'Fantasy', 'Sci-Fi'],
    director: 'Bassam Kurdali',
    cast: ['Tygo Gernandt', 'Cas Jansen'],
    desc: 'Two men wander through a vast surreal machine-world that may be rewriting itself around them. The world\u2019s first fully open-source animated film \u2014 and still its strangest.',
    ytId: 'WWKdLY03ZF0',
  },
  {
    slug: 'cosmos-laundromat',
    title: 'Cosmos Laundromat',
    year: 2015,
    type: 'movie',
    maturity: 'PG-13',
    runtime: 12,
    genres: ['Animation', 'Fantasy', 'Comedy'],
    director: 'Mathieu Auvray',
    cast: [ 'Pierre Bokma', 'Reinout Scholten van Aschat'],
    desc: 'A suicidal sheep, a salesman with infinite lives and an island where every wish comes true. Oscar-nominated team, first chapter of Blender\u2019s most ambitious saga.',
    ytId: 'Y-rmzh0PI3c',
  },
  {
    slug: 'spring',
    title: 'Spring',
    year: 2019,
    type: 'movie',
    maturity: 'G',
    runtime: 8,
    genres: ['Animation', 'Fantasy'],
    director: 'Andy Goralczyk',
    cast: ['The Shepherd Girl', 'Spring Spirit'],
    desc: 'On a mountain farm, ancient winter refuses to let go of the land \u2014 until the spirit of spring rises to fight it. Painterly, mythic, gorgeous.',
    ytId: 'WhWc3b3KhnY',
  },
  {
    slug: 'sprite-fright',
    title: 'Sprite Fright',
    year: 2021,
    type: 'movie',
    maturity: 'PG-13',
    runtime: 10,
    genres: ['Animation', 'Horror', 'Comedy'],
    director: 'Matthew Luhn',
    cast: ['The Teen Campers', 'The Sprites'],
    desc: 'Rowdy teenagers party in the woods, annoy a colony of adorable forest sprites, and learn that cute things bite back. A pixie-dust slasher comedy.',
    ytId: '_cMxraX_5RE',
  },
  {
    slug: 'coffee-run',
    title: 'Coffee Run',
    year: 2020,
    type: 'movie',
    maturity: 'PG',
    runtime: 4,
    genres: ['Animation', 'Drama'],
    director: 'Hjalti Hj\u00e1lmarsson',
    cast: ['The Runner', 'The Voice'],
    desc: 'A breathless animated sprint through one woman\u2019s morning routine \u2014 and the inner voice driving her onward. Winner of festival praise worldwide.',
    ytId: 'PVGeM40dABA',
  },
  {
    slug: 'wing-it',
    title: 'Wing It!',
    year: 2023,
    type: 'movie',
    maturity: 'G',
    runtime: 6,
    genres: ['Animation', 'Comedy', 'Family'],
    director: 'Blender Studio',
    cast: ['The Fledgling', 'The Instructor'],
    desc: 'A young bird with zero flying skills faces the ultimate exam in this feathered flight-school comedy from Blender Studio.',
    ytId: 'u9lj-c29dxI',
  },
  {
    slug: 'glass-half',
    title: 'Glass Half',
    year: 2015,
    type: 'movie',
    maturity: 'G',
    runtime: 3,
    genres: ['Animation', 'Comedy'],
    director: 'Blender Studio',
    cast: ['The Waiter', 'The Diner'],
    desc: 'A tiny waiter battles an impossible lunch rush in a diner where everything that can go wrong, does \u2014 in perfect slapstick rhythm.',
    ytId: 'lqiN98z6Dak',
  },
  {
    slug: 'caminandes-llamigos',
    title: 'Caminandes 3: Llamigos',
    year: 2016,
    type: 'movie',
    maturity: 'G',
    runtime: 3,
    genres: ['Animation', 'Comedy', 'Family'],
    director: 'Pablo Vazquez',
    cast: ['Koro the Llama', 'Cachorro the Dog'],
    desc: 'Koro the Patagonian llama duels a very territorial dog over the last berry in the frozen tundra. Pure wordless joy, meme-approved.',
    ytId: 'SkVqJ1SGeL0',
  },
  {
    slug: 'agent-327',
    title: 'Agent 327: Operation Barbershop',
    year: 2017,
    type: 'movie',
    maturity: 'PG',
    runtime: 4,
    genres: ['Animation', 'Action', 'Comedy'],
    director: 'Colin Levy',
    cast: ['Agent 327', 'The Barber'],
    desc: 'A Dutch secret agent walks into the most dangerous barbershop in Amsterdam. Pixar-grade spy spoof from Blender\u2019s Amsterdam studio.',
    ytId: 'mN0zPOpADL4',
  },
  {
    slug: 'oats-studios-volume-1',
    title: 'Oats Studios: Volume 1',
    year: 2017,
    type: 'series',
    maturity: 'R',
    runtime: 20,
    genres: ['Sci-Fi', 'Horror', 'Action'],
    director: 'Neill Blomkamp',
    cast: ['Sigourney Weaver', 'Sharlto Copley', 'Daniel Cudmore'],
    desc: 'District 9 director Neill Blomkamp unleashes his experimental film lab: alien-occupied America, a river god, a deep-space monster and more \u2014 starring Sigourney Weaver. Brutal, beautiful, free.',
    ytId: 'VjQ2t_yNHQs',
    episodes: [
      { n: 1, title: 'Rakka', ytId: 'VjQ2t_yNHQs', runtime: 22 },
      { n: 2, title: 'Firebase', ytId: 'Tm0V24IEHao', runtime: 27 },
      { n: 3, title: 'Zygote', ytId: 'pKWB-MVJ4sQ', runtime: 23 },
      { n: 4, title: 'God: City', ytId: 'w4AGocVq7-w', runtime: 5 },
      { n: 5, title: 'Kapture', ytId: 'h_4Qqnlpi-s', runtime: 7 },
    ],
  },
]

export const CATALOG = CATALOG_RAW

const BY_SLUG = Object.fromEntries(CATALOG.map((item) => [item.slug, item]))

export const getItem = (slug) => BY_SLUG[slug]

export const getEpisode = (item, epNum) =>
  item?.episodes ? item.episodes.find((e) => e.n === Number(epNum)) || item.episodes[0] : null

export const ALL_GENRES = [...new Set(CATALOG.flatMap((i) => i.genres))].sort()

export const getByGenre = (genre) =>
  genre ? CATALOG.filter((i) => i.genres.includes(genre)) : CATALOG

export const matchScore = (slug) => {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return 65 + (h % 35)
}

export const formatRuntime = (min) => {
  if (!min) return ''
  if (min < 60) return `${min}m`
  return `${Math.floor(min / 60)}h ${min % 60 ? `${min % 60}m` : ''}`.trim()
}

export const makeWatchKey = (slug, epNum = 0) => (epNum ? `${slug}|${epNum}` : slug)

export const parseWatchKey = (key) => {
  const [slug, n] = key.split('|')
  return { slug, n: Number(n || 0) }
}

let apiPromise = null
function loadYouTubeApi() {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT)
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev()
      resolve(window.YT)
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  })
  return apiPromise
}

export { loadYouTubeApi }
