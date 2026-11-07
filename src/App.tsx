import { useEffect, useState } from 'react'
import { areaPages, AGENT } from './data'
import { useData } from './api'
import { t, type Lang } from './i18n'
import { Detail, wa } from './components'
import { Home, Listings, Closed, AreaPage } from './pages'

function useHash() {
  const [h, setH] = useState(location.hash)
  useEffect(() => { const f = () => { setH(location.hash); scrollTo(0, 0) }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  return h
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const hash = useHash()
  const { all, loading } = useData()
  const s = t[lang]
  const [route, query = ''] = hash.replace(/^#\/?/, '').split('?')
  const qs = new URLSearchParams(query)
  const [open, setOpen] = useState('')
  useEffect(() => { setOpen('') }, [hash])
  useEffect(() => { const f = (e: MouseEvent) => { if (!(e.target as Element).closest('.dd')) setOpen('') }; addEventListener('click', f); return () => removeEventListener('click', f) }, [])
  type Item = { k: string; label: string; href: string; kids?: [string, string][] }
  const nav: Item[] = [
    { k: '', label: s.home, href: '#/' },
    { k: 'location', label: s.loc, href: `#/${areaPages[0].slug}`, kids: areaPages.map(a => [a.name, `#/${a.slug}`] as [string, string]) },
    { k: 'listings', label: s.listings, href: '#/listings' },
    { k: 'sold-rented', label: s.sold, href: '#/sold-rented' },
  ]
  const slug = route
  const ap = areaPages.find(a => a.slug === slug)
  let page
  if (loading) page = <p className="wrap page empty">Loading…</p> 
  else if (route.startsWith('p/')) { const l = all.find(x => x.id === route.slice(2)); page = l ? <Detail key={l.id} l={l} lang={lang} /> : <Home lang={lang} /> }
  else if (ap) page = <AreaPage key={hash} a={ap} lang={lang} />
  else if (route === 'listings') page = <Listings key={hash} lang={lang} qs={qs} />
  else if (route === 'sold-rented') page = <Closed lang={lang} />
  else page = <Home lang={lang} />
  const active = route.startsWith('p/') ? 'listings' : ap ? 'location' : slug
  return (
    <>
      <div className="announce"><span>{s.announce}</span></div>
      <header className="top">
        <a className="brand" href="#/">{s.brand}</a>
        <nav>{nav.map(n => n.kids ? (
          <div key={n.k} className={'dd' + (open === n.k ? ' open' : '')}>
            <button className={'ddbtn' + (active === n.k ? ' on' : '')} aria-haspopup="true" aria-expanded={open === n.k} onClick={() => setOpen(open === n.k ? '' : n.k)}>{n.label}<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m2 3.5 3 3 3-3" /></svg></button>
            <div className="menu"><div className="in">{n.kids.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</div></div>
          </div>) : <a key={n.k} href={n.href} className={active === n.k ? 'on' : ''}>{n.label}</a>)}</nav>
        <div className="right">
          <div className="lang">{(['en', 'zh'] as const).map(k => <button key={k} className={lang === k ? 'on' : ''} onClick={() => setLang(k)}>{k === 'en' ? 'EN' : '中文'}</button>)}</div>
          <a className="btn sm" href={wa('Hi, I have an enquiry')} target="_blank" rel="noreferrer">{s.contact}</a>
        </div>
      </header>
      <main>{page}</main>
      <footer>
        <div className="fgrid">
          <div><a className="brand light" href="#/">{s.brand}</a><p>{AGENT.phone}<br />{AGENT.address}<br />{AGENT.email}</p></div>
          <div><h5>{s.links}</h5>{nav.slice(1).map(n => <a key={n.k} href={n.href}>{n.label}</a>)}</div>
          <div><h5>{s.trending}</h5><a href="#/listings?area=Desa%20ParkCity&type=rent">Condominium for rent in Desa ParkCity</a><a href="#/listings?area=Desa%20ParkCity&type=sale">Condominium for sale in Desa ParkCity</a><a href="#/listings?area=Country%20Heights&type=sale">Land for sale in Country Heights</a><a href="#/listings?area=Mont%20Kiara">Mont Kiara properties</a></div>
        </div>
        <small>© {new Date().getFullYear()} {s.brand}</small>
      </footer>
      <a className="fab" href={wa('Hi, I have an enquiry')} target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
    </>
  )
}
