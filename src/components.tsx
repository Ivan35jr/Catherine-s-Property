import { useMemo, useState } from 'react'
import { areas, WHATSAPP, AGENT, type Listing } from './data'
import { useData } from './api'
import { t, type Lang } from './i18n'

export const rm = (n: number) => 'RM ' + n.toLocaleString('en-MY')
export const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`

const short = (n: number) => (n >= 1e6 ? `RM ${(n / 1e6).toFixed(2)}M` : rm(n))

export function Card({ l, lang }: { l: Listing; lang: Lang }) {
  const s = t[lang]
  const [saved, setSaved] = useState(false)
  const label = l.status ? (l.status === 'sold' ? s.soldT : s.rentedT) : l.type === 'sale' ? s.sale : s.rent
  return (
    <article className={'card' + (l.status ? ' closed' : '')}>
      <div className="thumb">
        <img src={l.photos[0]} alt="" loading="lazy" />
        {l.status && <span className="tag">{label}</span>}
        <button className={'heart' + (saved ? ' on' : '')} aria-pressed={saved} aria-label="Save" onClick={() => setSaved(!saved)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.600-7 10-7 10Z" /></svg>
        </button>
      </div>
      <div className="cbody">
        <div className="crow"><span className="ckind">{l.beds ? s.resi : s.land} · {label}</span><span className="cprice">{short(l.price)}{l.type === 'rent' && <small>{s.mo}</small>}</span></div>
        <h3>{l.title}</h3>
        <p className="cloc"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 21s-6-5.200-6-10a6 6 0 0 1 12 0c0 4.800-6 10-6 10Z" /><circle cx="12" cy="11" r="2" /></svg>{l.area}, Kuala Lumpur</p>
        <p className="cmeta">{l.beds ? `${l.beds} bed · ${l.baths} bath · ` : ''}{l.size.toLocaleString()} sq ft{l.date ? ` · ${l.date}` : ''}</p>
        <a className="clink" href={`#/p/${l.id}`}>{s.viewProp} <span aria-hidden="true">→</span></a>
      </div>
    </article>
  )
}

type Opt = { k: string; label: string; test: (l: Listing) => boolean }
export function Browser({ lang, items, opts, initArea = areas[0], initOpt = 'all' }: { lang: Lang; items: Listing[]; opts: Opt[]; initArea?: string; initOpt?: string }) {
  const s = t[lang]
  const [area, setArea] = useState(areas.includes(initArea) ? initArea : areas[0])
  const [opt, setOpt] = useState(opts.some(o => o.k === initOpt) ? initOpt : 'all')
  const [q, setQ] = useState('')
  const shown = useMemo(() => {
    const words = q.toLowerCase().replace(/,/g, '').split(/\s+/).filter(Boolean)
    const test = opts.find(o => o.k === opt)!.test
    return items.filter(l => {
      const hay = [l.title, l.area, l.tenure, l.slope, l.type, l.price, l.size, l.desc.en, l.desc.zh].join(' ').toLowerCase()
      return (area === areas[0] || l.area === area) && test(l) && words.every(w => hay.includes(w))
    })
  }, [area, opt, q, items, opts])
  return (
    <>
      <div className="filters">
        <div className="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={s.searchPh} aria-label={s.search} />
          {q && <button className="clear" onClick={() => setQ('')} aria-label="Clear">×</button>}</div>
        <select value={area} onChange={e => setArea(e.target.value)} aria-label="Location">{areas.map(a => <option key={a} value={a}>{a === areas[0] ? s.locAll : a}</option>)}</select>
        <div className="seg" role="group">{opts.map(o => <button key={o.k} className={opt === o.k ? 'on' : ''} onClick={() => setOpt(o.k)}>{o.label}</button>)}</div>
      </div>
      {shown.length ? <div className="grid">{shown.map(l => <Card key={l.id} l={l} lang={lang} />)}</div> : <p className="empty">{s.none}</p>}
    </>
  )
}

export function Detail({ l, lang }: { l: Listing; lang: Lang }) {
  const { all } = useData()
  const s = t[lang]
  const [i, setI] = useState(0)
  const n = l.photos.length
  const similar = all.filter(x => x.id !== l.id && !x.status && (x.area === l.area || x.type === l.type)).slice(0, 3)
  return (
    <div className="wrap detail">
      <a className="back" href="javascript:history.back()">{s.back}</a>
      <div className="gallery">
        <img className="main" src={l.photos[i]} alt={l.title} />
        <div className="thumbs">{l.photos.map((p, k) => <button key={p} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`}><img src={p} alt="" /></button>)}</div>
        <div className="nav"><button onClick={() => setI((i + n - 1) % n)} aria-label="Previous">‹</button><button onClick={() => setI((i + 1) % n)} aria-label="Next">›</button></div>
      </div>
      <div className="cols">
        <div>
          <h2>{l.title}</h2>
          <p className="price big">{rm(l.price)}{l.type === 'rent' && <small>{s.mo}</small>}{l.status && <em>{l.status === 'sold' ? s.soldT : s.rentedT} · {l.date}</em>}</p>
          <h4>{s.about}</h4>
          <p className="desc">{l.desc[lang]}</p>
        </div>
        <aside className="panel">
          <dl>
            <div><dt>{l.beds ? s.built : s.size}</dt><dd>{l.size.toLocaleString()} sq. ft.</dd></div>
            {l.beds && <div><dt>Bedrooms / bathrooms</dt><dd>{l.beds} / {l.baths}</dd></div>}
            <div><dt>{s.tenure}</dt><dd>{l.tenure}</dd></div>
            {!l.beds && <div><dt>{s.slope}</dt><dd>{l.slope}</dd></div>}
          </dl>
          <p className="agent"><strong>{AGENT.name}</strong><br />{AGENT.ren} · {AGENT.phone}</p>
          <a className="btn wa" href={wa(l.status ? `Hi, I saw ${l.title} was ${l.status}. Do you have similar properties?` : `Hi, I'd like to schedule a tour: ${l.title} (${rm(l.price)})`)} target="_blank" rel="noreferrer">{l.status ? s.similarReq : s.tour}</a>
        </aside>
      </div>
      {similar.length > 0 && <><h3 className="sim">{s.similar}</h3><div className="grid">{similar.map(x => <Card key={x.id} l={x} lang={lang} />)}</div></>}
    </div>
  )
}
