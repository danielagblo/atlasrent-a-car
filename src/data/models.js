const MODELS = [
  {
    id: 'lux',
    name: 'EKG Lux',
    category: 'Sedan',
      rate: '¢1,100/day',
    desc: 'Flagship electric sedan — hand-crafted luxury with long range.',
    price: '$89,900',
    range: '370 mi',
    topSpeed: '155 mph',
    zeroToSixty: '3.8s',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    localImage: '/assets/lux.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542367597-1d6a1c1c2a5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      battery: '98 kWh',
      drive: 'Dual Motor AWD',
      seats: 5,
      charging: '250 kW DC fast charge'
    }
  },
  {
    id: 'sport',
    name: 'EKG Sport',
    category: 'Performance',
      rate: '¢1,700/day',
    desc: 'Performance first — aggressive dynamics and track-capability.',
    price: '$109,900',
    range: '320 mi',
    topSpeed: '190 mph',
    zeroToSixty: '2.9s',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80',
    localImage: '/assets/sport.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      battery: '110 kWh',
      drive: 'Tri Motor AWD',
      seats: 4,
      charging: '300 kW DC fast charge'
    }
  },
  {
    id: 'tour',
    name: 'EKG Tour',
    category: 'SUV',
      rate: '¢1,500/day',
    desc: 'Long range SUV — family comfort with a commanding presence.',
    price: '$99,900',
    range: '410 mi',
    topSpeed: '145 mph',
    zeroToSixty: '4.6s',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
    localImage: '/assets/tour.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542367597-1d6a1c1c2a5f?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      battery: '120 kWh',
      drive: 'Dual Motor AWD',
      seats: 7,
      charging: '270 kW DC fast charge'
    }
  }
  ,
  {
    id: 'gt',
    name: 'EKG GT',
    category: 'GT',
      rate: '¢1,250/day',
    desc: 'Gran Turismo — long-distance comfort with spirited handling.',
    price: '$94,500',
    range: '360 mi',
    topSpeed: '165 mph',
    zeroToSixty: '3.4s',
    image: 'https://images.unsplash.com/photo-1549921296-3a60b3d6f9a1?auto=format&fit=crop&w=1400&q=80',
    localImage: '/assets/lux.jpg',
    gallery: [],
    specs: { battery: '100 kWh', drive: 'Dual Motor AWD', seats: 5, charging: '260 kW DC fast charge' }
  },
  {
    id: 'city',
    name: 'EKG City',
    category: 'City',
      rate: '¢650/day',
    desc: 'Urban electric — compact footprint, premium interior.',
    price: '$49,900',
    range: '220 mi',
    topSpeed: '120 mph',
    zeroToSixty: '6.2s',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    localImage: '/assets/tour.jpg',
    gallery: [],
    specs: { battery: '55 kWh', drive: 'RWD', seats: 5, charging: '120 kW DC fast charge' }
  }
]

export default MODELS

