export type Listing = {
  id: string; title: string; area: string; type: 'sale' | 'rent'; status?: 'sold' | 'rented'; date?: string
  price: number; size: number; tenure: string; slope: string; beds?: number; baths?: number
  photos: string[]; desc: { en: string; zh: string }
}
export type Area = { slug: string; tagline: string; name: string; hero: string; intro: string[]; routes: string[]; table: string[][]; hospitals: string[]; schools: string[]; shops: string[]; closing: string }
const img = (s: string) => `https://picsum.photos/seed/${s}/1200/800`
const ph = (s: string) => [img(s + '1'), img(s + '2'), img(s + '3')]
const d = (en: string, zh = en) => ({ en, zh })
// ---- Replace everything below with your own data / API ----
export const WHATSAPP = '60126499580'
export const AGENT = { name: 'Tan Wen Ching', ren: 'Jennifer Tan', phone: '012-649 9580', email: 'hello@example.com', address: 'Desa ParkCity, 52200 Kuala Lumpur' }
export const STATS = { value: 'RM 32,815,000', count: '88', period: 'January – December 2026' }
export const areas = ['All locations', 'Desa ParkCity', 'Mont Kiara', 'Country Heights']

export const listings: Listing[] = [
  { id: 'pc-1', title: 'Plaza Arkadia', area: 'Desa ParkCity', type: 'rent', price: 5000, size: 947, tenure: 'Freehold', slope: 'None', beds: 2, baths: 1, photos: ph('p1'), desc: d('Bright, well-kept home steps from the park and lake.', '明亮整洁的住宅，步行即可到达公园和湖畔。') },
  { id: 'pc-2', title: 'Park Place', area: 'Desa ParkCity', type: 'rent', price: 20000, size: 2217, tenure: 'Freehold', slope: 'None', beds: 3, baths: 4, photos: ph('p2'), desc: d('Spacious, fully furnished unit with skyline views.') },
  { id: 'pc-3', title: 'Park Regent', area: 'Desa ParkCity', type: 'sale', price: 5700000, size: 2562, tenure: 'Freehold', slope: 'None', beds: 3, baths: 4, photos: ph('p3'), desc: d('Large family residence in a gated, green township.') },
  { id: 'pc-4', title: 'The Westside II', area: 'Desa ParkCity', type: 'sale', price: 1550000, size: 1372, tenure: 'Freehold', slope: 'None', beds: 3, baths: 3, photos: ph('p4'), desc: d('Move-in-ready condominium close to schools and amenities.') },
  { id: 'mk-1', title: 'Mont Kiara Condominium', area: 'Mont Kiara', type: 'sale', price: 2100000, size: 1650, tenure: 'Freehold', slope: 'None', beds: 3, baths: 3, photos: ph('m1'), desc: d('Corner unit near the international schools and Sri Hartamas dining.') },
  { id: 'mk-2', title: 'Mont Kiara Residence', area: 'Mont Kiara', type: 'rent', price: 6800, size: 1400, tenure: 'Freehold', slope: 'None', beds: 3, baths: 2, photos: ph('m2'), desc: d('Fully furnished, walking distance to shops and cafés.') },
  { id: 'mk-3', title: 'Mont Kiara Duplex', area: 'Mont Kiara', type: 'sale', price: 3200000, size: 2400, tenure: 'Freehold', slope: 'None', beds: 4, baths: 4, photos: ph('m3'), desc: d('Dual-level home with a large balcony.') },
  { id: 'ch-1', title: 'Country Heights Damansara', area: 'Country Heights', type: 'sale', price: 6300000, size: 10000, tenure: 'Freehold', slope: 'None', photos: ph('c1'), desc: d('A quiet, leafy enclave with easy highway access to the city centre, shopping and international schools.', '宁静绿意盎然的社区，高速公路便利。') },
  { id: 'ch-2', title: 'Country Heights Damansara', area: 'Country Heights', type: 'sale', price: 9400000, size: 18000, tenure: 'Freehold', slope: 'Slope down', photos: ph('c2'), desc: d('Large sloping lot with open valley views, suited to a custom-built family home.', '宽敞的斜坡地，拥有开阔山谷景观。') },
  { id: 'ch-3', title: 'Country Heights Damansara', area: 'Country Heights', type: 'sale', price: 5300000, size: 11000, tenure: 'Freehold', slope: 'Slope down', photos: ph('c3'), desc: d('Green, private corner lot surrounded by mature trees.') },
]
export const closed: Listing[] = [
  { id: 'x-1', title: 'Park Regent', area: 'Desa ParkCity', type: 'sale', status: 'sold', date: 'Sep 2026', price: 5400000, size: 2562, tenure: 'Freehold', slope: 'None', beds: 3, baths: 4, photos: ph('x1'), desc: d('Sold within weeks of listing.') },
  { id: 'x-2', title: 'The Breezeway Garden', area: 'Desa ParkCity', type: 'rent', status: 'rented', date: 'Aug 2026', price: 3800, size: 1141, tenure: 'Freehold', slope: 'None', beds: 2, baths: 2, photos: ph('x2'), desc: d('Rented to a corporate tenant.') },
  { id: 'x-3', title: 'Mont Kiara Condominium', area: 'Mont Kiara', type: 'sale', status: 'sold', date: 'Aug 2026', price: 1850000, size: 1450, tenure: 'Freehold', slope: 'None', beds: 3, baths: 2, photos: ph('x3'), desc: d('Sold to an owner-occupier.') },
  { id: 'x-4', title: 'Mont Kiara Residence', area: 'Mont Kiara', type: 'rent', status: 'rented', date: 'Jul 2026', price: 5500, size: 1200, tenure: 'Freehold', slope: 'None', beds: 3, baths: 2, photos: ph('x4'), desc: d('Rented within two weeks.') },
  { id: 'x-5', title: 'Country Heights Damansara', area: 'Country Heights', type: 'sale', status: 'sold', date: 'Jun 2026', price: 11000000, size: 9706, tenure: 'Freehold', slope: 'None', photos: ph('x5'), desc: d('Land sold to a private developer.') },
  { id: 'x-6', title: 'Nadia Parkfront', area: 'Desa ParkCity', type: 'rent', status: 'rented', date: 'May 2026', price: 3800, size: 1141, tenure: 'Freehold', slope: 'None', beds: 2, baths: 2, photos: ph('x6'), desc: d('Rented to a young family.') },
]
export const all = [...listings, ...closed]

export const areaPages: Area[] = [
  { slug: 'desa-parkcity', tagline: 'Connected, green & vibrant', name: 'Desa ParkCity', hero: img('dpchero'),
    intro: ['Desa ParkCity is an award-winning township redefining Kuala Lumpur’s urban living. Located just south of Bandar Menjalara in Kepong and north of Kampung Penchala, it blends luxury amidst vibrant community life.', 'Covering 473 acres of prime freehold land, it offers luxurious amenities, scenic parks, an exclusive clubhouse, top-notch schools, excellent healthcare and superb connectivity in a secure, gated environment.'],
    routes: ['Lebuhraya Damansara-Puchong (LDP)', 'Duta-Ulu Klang Expressway (DUKE)', 'New Klang Valley Expressway (NKVE)', 'Penchala Link', 'SPRINT Highway'],
    table: [['Damansara Heights', '13 km', '20 min', 'LDP / Penchala Link'], ['Hartamas', '10 km', '25 min', 'LDP / Penchala Link'], ['Kuala Lumpur City Centre', '18 km', '30 min', 'DUKE / Duta expressway'], ['Bangsar', '16 km', '25 min', 'LDP / SPRINT'], ['Mont Kiara', '11 km', '20 min', 'LDP / SPRINT / Penchala Link']],
    hospitals: ['ParkCity Medical Centre', 'KPJ Damansara 2 (5.4 km)', 'Thomson Hospital Kota Damansara (10.3 km)'],
    schools: ['Desa ParkCity International School (ISP)', 'Garden International School (GIS)', 'Mont’Kiara International School (M’KIS)', 'The British International School of KL (BSKL)', 'Sri Bestari International School (SBIS)', 'Sri KDU International School'],
    shops: ['Plaza Arkadia', 'Waterfront at ParkCity', 'Lakeside cafés and community events'],
    closing: 'Whether you want a condominium by the park or a landed home, we can help you find the right neighbourhood within Desa ParkCity.' },
  { slug: 'mont-kiara', tagline: 'Urban, international & lively', name: 'Mont Kiara', hero: img('mkhero'),
    intro: ['Mont Kiara is one of Kuala Lumpur’s most established international neighbourhoods, known for its high-rise condominiums, international schools and a lively café and dining scene.', 'Neighbouring Sri Hartamas and Solaris Dutamas, it offers quick access to the city centre while keeping a relaxed, walkable community feel.'],
    routes: ['Duta-Ulu Klang Expressway (DUKE)', 'SPRINT Highway', 'Penchala Link', 'Jalan Kiara / Jalan Duta'],
    table: [['Sri Hartamas', '3 km', '8 min', 'Jalan Kiara'], ['Desa ParkCity', '11 km', '20 min', 'Penchala Link / LDP'], ['Damansara Heights', '8 km', '20 min', 'SPRINT'], ['Bangsar', '9 km', '20 min', 'SPRINT'], ['Kuala Lumpur City Centre', '10 km', '25 min', 'DUKE']],
    hospitals: ['ParkCity Medical Centre', 'Pantai Hospital Kuala Lumpur (Bangsar)'],
    schools: ['Mont’Kiara International School (M’KIS)', 'Garden International School (GIS)', 'Fairview International School'],
    shops: ['1 Mont Kiara', 'Plaza Mont Kiara', 'Solaris Dutamas', 'Publika'],
    closing: 'From compact apartments to large family units, explore what is available in Mont Kiara today.' },
]
export const articles = [
  { t: 'Don’t miss out: Desa ParkCity condo for sale', s: 'The latest condominium listings and what to expect on price.' },
  { t: 'Latest picks: Desa ParkCity properties for rent', s: 'Homes and condos with rental insights and tips.' },
  { t: 'Mont Kiara: a buyer’s guide', s: 'Schools, access and what to check before you buy.' },
  { t: 'Why choose a local agent', s: 'How the right guidance makes the process smooth and stress-free.' },
]
export const reviews = [
  { q: 'An exceptional agent who helped me find a wonderful condo. Efficient, professional and always willing to go the extra mile.', n: 'Customer Name' },
  { q: 'Her expertise in the area is outstanding. She understood my preferences and made the whole transaction smooth.', n: 'Customer Name' },
]
export const videos = [{ t: 'Desa ParkCity tour', u: '#' }, { t: 'Mont Kiara tour', u: '#' }, { t: 'Market update', u: '#' }]

const media = (slug: string, name: string) => ({
  videos: [{ t: `${name} township tour`, u: '#' }, { t: `Living in ${name}`, u: '#' }, { t: `${name} market update`, u: '#' }, { t: 'Neighbourhood walkthrough', u: '#' }],
  photos: Array.from({ length: 9 }, (_, i) => ({ src: `https://picsum.photos/seed/${slug}${i}/900/650`, cap: `${name} · ${i + 1}` })),
})
// Replace the '#' links with your YouTube / video URLs, and the photo srcs with your own images
export const areaMedia: Record<string, ReturnType<typeof media>> = Object.fromEntries(areaPages.map(a => [a.slug, media(a.slug, a.name)]))
