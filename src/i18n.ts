export type Lang = 'en' | 'zh'
const en = {
  brand: 'WenChing\'s Homes', home: 'Home', exploreArea: 'Explore by area', nbh1: 'Know the', nbh2: 'neighbourhood.', nbhP: 'From established enclaves to quieter pockets, explore the areas we know well.', viewProp: 'View property', land: 'Land', resi: 'Residential', loc: 'Location', dpc: 'Desa ParkCity', mk: 'Mont Kiara', listings: 'Listings', sold: 'Sold / Rented', contact: 'Get in touch',
  heroH: 'Experience the exceptional, tailored just for you!', heroP: 'I understand that the search for a home can be challenging, so I’m here to guide you every step of the way and make the process as seamless and stress-free as possible.',
  sale: 'For sale', rent: 'For rent', all: 'All', soldT: 'Sold', rentedT: 'Rented', search: 'Search', locAll: 'All locations', searchPh: 'Search by area, price or keyword',
  size: 'Land size', built: 'Built-up', tenure: 'Tenure', slope: 'Slope', tour: 'Schedule a tour', similarReq: 'Ask about similar', similar: 'Similar properties', back: 'Back', none: 'No properties match. Try another location.',
  announce: 'Maintenance and cleaning crew on standby', mo: '/mo', about: 'About this property',
  whyH: 'Why Hillside Homes makes the difference', totalValue: 'Total value of properties sold / rented', numProps: 'Number of properties sold / rented',
  featured: 'Featured properties', featuredP: 'Browse our selected properties in Desa ParkCity and Mont Kiara.', videosH: 'Our videos', videosP: 'Discover our property tours, tips and stories.',
  exploreH: 'Explore our properties', exploreP: 'Click to explore properties across Desa ParkCity and Mont Kiara and find your perfect home, whether for your own stay or investment.',
  articlesH: 'Articles', articlesP: 'Get the latest news from us', reviewsH: 'Words from our customers', reviewsP: 'We’re honoured to have these amazing customers',
  aboutArea: 'About', location: 'Location and connectivity', mainRoutes: 'Main access routes', area: 'Area', distance: 'Distance', time: 'Travel time', via: 'Get there',
  health: 'Health and education', hospitals: 'Hospitals nearby', schools: 'Schools nearby', lifestyle: 'Shopping and dining', propsIn: 'Properties in', discover: 'Discover more with Hillside Homes',
  videosNav: 'Videos', photos: 'Photos', photosP: 'A look around the neighbourhood.', areaVideosP: 'Tours, tips and market updates.', closedH: 'Sold & rented', closedP: 'A selection of recent results. Tell us what you’re looking for and we’ll find the next one.', viewAll: 'View all', links: 'Important links', trending: 'Trending searches', follow: 'Follow us',
}
const zh: Partial<typeof en> = {
  home: '首页', exploreArea: '按地区探索', nbh1: '了解', nbh2: '社区', viewProp: '查看房产', land: '土地', resi: '住宅', loc: '地点', dpc: 'Desa ParkCity', mk: 'Mont Kiara', listings: '房源', sold: '已售 / 已租', contact: '联系我们', heroH: '为您量身打造的非凡体验！', heroP: '我明白寻找理想家园并不容易，因此我会陪伴您走过每一步，让过程轻松无压力。',
  sale: '出售', rent: '出租', all: '全部', soldT: '已售', rentedT: '已租', search: '搜索', locAll: '所有地点', searchPh: '按地区、价格或关键词搜索', size: '土地面积', tenure: '地契', slope: '斜坡', tour: '预约看房', similar: '相似房产', back: '返回', none: '没有符合条件的房产。',
  whyH: '为什么选择我们', featured: '精选房产', videosH: '精选视频', exploreH: '探索我们的房产', articlesH: '文章', reviewsH: '客户评价', aboutArea: '关于', location: '位置与交通', health: '医疗与教育', videosNav: '视频', photos: '照片', closedH: '已售 & 已租', viewAll: '查看全部', mo: '/月',
}
export const t = { en, zh: { ...en, ...zh } }
