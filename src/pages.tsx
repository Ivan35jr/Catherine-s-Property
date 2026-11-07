import { useEffect, useState } from 'react'
import { areas, areaPages, articles, reviews, videos, areaMedia, STATS, AGENT, type Area } from './data'
import { useData } from './api'
import { Card, Browser, wa } from './components'
import { t, type Lang } from './i18n'

const typeOpts = (lang: Lang) => [
  { k: 'all', label: t[lang].all, test: () => true },
  { k: 'sale', label: t[lang].sale, test: (l: { type: string }) => l.type === 'sale' },
  { k: 'rent', label: t[lang].rent, test: (l: { type: string }) => l.type === 'rent' },
]

export function Listings({ lang, qs }: { lang: Lang; qs: URLSearchParams }) {
  const { listings } = useData() 
  return <div className="wrap page"><h1 className="ph">{t[lang].listings}</h1>
    <Browser lang={lang} items={listings} opts={typeOpts(lang)} initArea={qs.get('area') ?? undefined} initOpt={qs.get('type') ?? undefined} /></div>
}

export function Closed({ lang }: { lang: Lang }) {
  const { closed } = useData()
  const s = t[lang]
  const opts = [
    { k: 'all', label: s.all, test: () => true },
    { k: 'sold', label: s.soldT, test: (l: { status?: string }) => l.status === 'sold' },
    { k: 'rented', label: s.rentedT, test: (l: { status?: string }) => l.status === 'rented' },
  ]
  return <>
    <section className="closedhead"><div className="wrap"><h1>{s.closedH}</h1><p>{s.closedP}</p>
      <div className="mini"><div><b>{STATS.count}</b><span>{s.numProps}</span></div><div><b>{STATS.value}</b><span>{s.totalValue}</span></div></div></div></section>
    <div className="wrap page"><Browser lang={lang} items={closed} opts={opts} /></div></>
}

export function AreaPage({ a, lang }: { a: Area; lang: Lang }) {
  const { listings } = useData()
  const s = t[lang]
  const here = listings.filter(l => l.area === a.name).slice(0, 3)
  return <>
    <section className="ahero" style={{ backgroundImage: `url(${a.hero})` }}><div className="glass"><h1>{s.aboutArea} {a.name}</h1>{a.intro.map(p => <p key={p}>{p}</p>)}</div></section>
    <section className="sec wrap"><h2>{s.location}</h2>
      <p className="lead">{s.mainRoutes}:</p><ul className="ul">{a.routes.map(r => <li key={r}>{r}</li>)}</ul>
      <div className="scroll"><table><thead><tr><th>{s.area}</th><th>{s.distance}</th><th>{s.time}</th><th>{s.via}</th></tr></thead>
        <tbody>{a.table.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody></table></div>
      <p className="note">Distances and times are approximate.</p></section>
    <section className="band"><div className="wrap"><h2>{s.health}</h2>
      <div className="two"><div><h4>{s.hospitals}</h4><ul className="ul">{a.hospitals.map(h => <li key={h}>{h}</li>)}</ul></div>
        <div><h4>{s.schools}</h4><ul className="ul">{a.schools.map(h => <li key={h}>{h}</li>)}</ul></div></div></div></section>
    <section className="sec wrap"><h2>{s.lifestyle}</h2><ul className="ul center">{a.shops.map(h => <li key={h}>{h}</li>)}</ul></section>
    {here.length > 0 && <section className="band rust"><div className="wrap"><h2>{s.propsIn} {a.name}</h2><div className="grid">{here.map(l => <Card key={l.id} l={l} lang={lang} />)}</div>
      <p className="center"><a className="btn" href={`#/listings?area=${encodeURIComponent(a.name)}`}>{s.viewAll}</a></p></div></section>}
    <section className="sec wrap center"><h2>{s.discover}</h2><p className="lead narrow">{a.closing}</p><a className="btn" href={wa(`Hi, I'm interested in ${a.name}`)} target="_blank" rel="noreferrer">{s.contact}</a></section>
    <AreaMedia a={a} lang={lang} />
  </>
}

export function Home({ lang }: { lang: Lang }) {
  const { listings } = useData()
  const s = t[lang]
  const [tab, setTab] = useState(areas[1])
  const [area, setArea] = useState(areas[0])
  const [type, setType] = useState('')
  const go = () => { location.hash = `#/listings?area=${encodeURIComponent(area)}&type=${type}` }
  const feats = [['Proven track record', 'Clients appreciate our reliable service and smooth handling of deals.'], ['Get your property notice', 'We showcase your property on top real estate sites, social media and local networks.'], ['Find your perfect home', 'Whether it’s a home to live in or an investment, we listen to your needs and help you find a property that fits.'], ['Stress-free management', 'We handle the cleaning, inspections, paperwork and legal stuff, so you can relax.']]
  const tiles = [['#/desa-parkcity', s.aboutArea + ' ' + s.dpc], ['#/mont-kiara', s.aboutArea + ' ' + s.mk], ['#/listings?type=sale', s.sale], ['#/listings?type=rent', s.rent], ['#/sold-rented', s.sold]]
  return <>
    <section className="herobg">
      <div className="wrap herogrid">
        <div className="herotext">
          <h1>{s.heroH}</h1>
          <p>{AGENT.name} · {AGENT.ren}<br />{s.heroP}</p>
        </div>
        <img className="heroimg" src="/images/lalisa.png" alt={AGENT.name} />
      </div>
    </section>
    <div className="wrap"><div className="searchbar">
      <select value={area} onChange={e => setArea(e.target.value)} aria-label="Location">{areas.map(a => <option key={a} value={a}>{a === areas[0] ? s.locAll : a}</option>)}</select>
      <select value={type} onChange={e => setType(e.target.value)} aria-label="Sale or rent"><option value="">{s.sale} / {s.rent}</option><option value="sale">{s.sale}</option><option value="rent">{s.rent}</option></select>
      <button className="btn" onClick={go}>{s.search}</button></div></div>

    <section className="sec wrap"><h2>{s.whyH}</h2>
      <div className="why"><div className="stats">
        <div><span>{s.totalValue}</span><b>{STATS.value}</b><small>{STATS.period}</small></div>
        <div><span>{s.numProps}</span><b>{STATS.count}</b><small>{STATS.period}</small></div></div>
        <ul className="feats">{feats.map(([h, p]) => <li key={h}><i /><div><h4>{h}</h4><p>{p}</p></div></li>)}</ul></div></section>

    <section className="band"><div className="wrap"><h2>{s.featured}</h2><p className="sub">{s.featuredP}</p>
      <div className="tabs">{areas.slice(1, 3).map(a => <button key={a} className={tab === a ? 'on' : ''} onClick={() => setTab(a)}>{a}</button>)}</div>
      <div className="grid">{listings.filter(l => l.area === tab).slice(0, 4).map(l => <Card key={l.id} l={l} lang={lang} />)}</div>
      <p className="center"><a className="btn" href={`#/listings?area=${encodeURIComponent(tab)}`}>{s.viewAll}</a></p></div></section>

    <section className="sec wrap nbh">
      <div className="nbhead"><div><p className="eyebrow">{s.exploreArea}</p><h2>{s.nbh1}<br /><em>{s.nbh2}</em></h2></div><p className="nbhp">{s.nbhP}</p></div>
      <div className="nbgrid">{areaPages.map(a => <a key={a.slug} className="nbcard" href={`#/${a.slug}`} style={{ backgroundImage: `url(${a.hero})` }}>
        <span className="nbtxt"><b>{a.name}</b><small>{a.tagline}</small></span><span className="nbarrow" aria-hidden="true">→</span></a>)}</div>
    </section>

    <section className="sec wrap"><h2>{s.videosH}</h2><p className="sub">{s.videosP}</p>
      <div className="grid">{videos.map(v => <a key={v.t} className="vid" href={v.u} target="_blank" rel="noreferrer"><span className="play" /><b>{v.t}</b></a>)}</div></section>

    <section className="band rust"><div className="wrap"><h2>{s.exploreH}</h2><p className="sub">{s.exploreP}</p>
      <div className="chips">{tiles.map(([h, l], i) => <a key={l} href={h} className={'chip c' + i}>{l}</a>)}</div></div></section>

    <section className="sec wrap"><h2>{s.articlesH}</h2><p className="sub">{s.articlesP}</p>
      <div className="grid arts">{articles.map((a, i) => <article key={a.t} className="art"><div className="artimg" style={{ backgroundImage: `url(https://picsum.photos/seed/art${i}/600/380)` }} /><h3>{a.t}</h3><p>{a.s}</p></article>)}</div></section>

    <section className="band"><div className="wrap"><h2>{s.reviewsH}</h2><p className="sub">{s.reviewsP}</p>
      <div className="two">{reviews.map(r => <blockquote key={r.q} className="rev"><p>“{r.q}”</p><footer>{r.n} · ★★★★★</footer></blockquote>)}</div></div></section>
  </>
}

function AreaMedia({ a, lang }: { a: Area; lang: Lang }) {
  const s = t[lang]
  const { videos: vids, photos: ph } = areaMedia[a.slug]
  const [i, setI] = useState<number | null>(null)
  useEffect(() => {
    if (i === null) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setI(null); if (e.key === 'ArrowRight') setI(x => (x! + 1) % ph.length); if (e.key === 'ArrowLeft') setI(x => (x! + ph.length - 1) % ph.length) }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [i, ph.length])
  return <section className="band" id="media"><div className="wrap">
    <h2>{s.videosNav}</h2><p className="sub">{s.areaVideosP}</p>
    <div className="grid">{vids.map(v => <a key={v.t} className="vid" href={v.u} target="_blank" rel="noreferrer"><span className="play" /><b>{v.t}</b></a>)}</div>
    <h2 className="gap">{s.photos}</h2><p className="sub">{s.photosP}</p>
    <div className="masonry">{ph.map((p, k) => <button key={p.src} onClick={() => setI(k)} aria-label={p.cap}><img src={p.src} alt={p.cap} loading="lazy" /></button>)}</div>
    {i !== null && <div className="lb" role="dialog" aria-modal="true" onClick={() => setI(null)}>
      <img src={ph[i].src} alt={ph[i].cap} onClick={e => e.stopPropagation()} />
      <p>{ph[i].cap}</p>
      <button className="lbx" aria-label="Close" onClick={() => setI(null)}>×</button>
      <button className="lbn l" aria-label="Previous" onClick={e => { e.stopPropagation(); setI((i + ph.length - 1) % ph.length) }}>‹</button>
      <button className="lbn r" aria-label="Next" onClick={e => { e.stopPropagation(); setI((i + 1) % ph.length) }}>›</button></div>}
  </div></section>
}
