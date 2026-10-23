// Classification and brand detection for Hindustan Unilever (HUL) Portfolio

export const BRAND_TO_CATEGORY = {
  // Personal Care
  'rexona': 'Personal Care',
  'lifebuoy': 'Personal Care',
  'lux': 'Personal Care',
  'close up': 'Personal Care',
  'closeup': 'Personal Care',
  'pepsodent': 'Personal Care',
  'axe': 'Personal Care',
  'hamam': 'Personal Care',
  'liril': 'Personal Care',
  'pears': 'Personal Care',

  // Beauty & Wellbeing
  'dove': 'Beauty & Wellbeing',
  'sunsilk': 'Beauty & Wellbeing',
  'ponds': 'Beauty & Wellbeing',
  "pond's": 'Beauty & Wellbeing',
  'glow & lovely': 'Beauty & Wellbeing',
  'glow and lovely': 'Beauty & Wellbeing',
  'lakme': 'Beauty & Wellbeing',
  'lakmé': 'Beauty & Wellbeing',
  'tresemme': 'Beauty & Wellbeing',
  'simple': 'Beauty & Wellbeing',
  'vaseline': 'Beauty & Wellbeing',

  // Home Care
  'surf excel': 'Home Care',
  'surf': 'Home Care',
  'rin': 'Home Care',
  'wheel': 'Home Care',
  'vim': 'Home Care',
  'comfort': 'Home Care',
  'domex': 'Home Care',
  'sunlight': 'Home Care',

  // Foods & Refreshment
  'brooke bond': 'Foods & Refreshment',
  'red label': 'Foods & Refreshment',
  'taj mahal': 'Foods & Refreshment',
  'taaza': 'Foods & Refreshment',
  'bru': 'Foods & Refreshment',
  'knorr': 'Foods & Refreshment',
  'kissan': 'Foods & Refreshment',
  'horlicks': 'Foods & Refreshment',
  'boost': 'Foods & Refreshment',
  'kwality walls': 'Foods & Refreshment',
  'cornetto': 'Foods & Refreshment',

  // Supply Chain & Quick Commerce
  'blinkit': 'Supply Chain & Quick Commerce',
  'zepto': 'Supply Chain & Quick Commerce',
  'instamart': 'Supply Chain & Quick Commerce',
  'swiggy instamart': 'Supply Chain & Quick Commerce',
  'dark store': 'Supply Chain & Quick Commerce',
  'dark stores': 'Supply Chain & Quick Commerce'
};

export const BRAND_DISPLAY_NAMES = {
  'rexona': 'Rexona',
  'lifebuoy': 'Lifebuoy',
  'lux': 'Lux',
  'close up': 'Close Up',
  'closeup': 'Close Up',
  'pepsodent': 'Pepsodent',
  'axe': 'Axe',
  'hamam': 'Hamam',
  'liril': 'Liril',
  'pears': 'Pears',
  'dove': 'Dove',
  'sunsilk': 'Sunsilk',
  'ponds': "Pond's",
  "pond's": "Pond's",
  'glow & lovely': 'Glow & Lovely',
  'glow and lovely': 'Glow & Lovely',
  'lakme': 'Lakmé',
  'lakmé': 'Lakmé',
  'tresemme': 'Tresemme',
  'simple': 'Simple',
  'vaseline': 'Vaseline',
  'surf excel': 'Surf Excel',
  'surf': 'Surf Excel',
  'rin': 'Rin',
  'wheel': 'Wheel',
  'vim': 'Vim',
  'comfort': 'Comfort',
  'domex': 'Domex',
  'sunlight': 'Sunlight',
  'brooke bond': 'Brooke Bond',
  'red label': 'Red Label',
  'taj mahal': 'Taj Mahal',
  'taaza': 'Taaza',
  'bru': 'Bru',
  'knorr': 'Knorr',
  'kissan': 'Kissan',
  'horlicks': 'Horlicks',
  'boost': 'Boost',
  'kwality walls': "Kwality Wall's",
  'blinkit': 'Blinkit',
  'zepto': 'Zepto',
  'instamart': 'Swiggy Instamart'
};

export function detectBrand(headline = '', summary = '', fallback = 'HUL') {
  const combined = `${headline} ${summary}`.toLowerCase();
  
  // Check longer names first (e.g., 'surf excel' before 'surf', 'red label' before 'label')
  const sortedBrands = Object.keys(BRAND_DISPLAY_NAMES).sort((a, b) => b.length - a.length);
  for (const b of sortedBrands) {
    const regex = new RegExp(`\\b${b.replace(/['.]/g, '')}\\b`, 'i');
    if (combined.includes(b) || regex.test(combined)) {
      return BRAND_DISPLAY_NAMES[b];
    }
  }

  return fallback || 'HUL';
}

export function classifyCategory(headline = '', summary = '', detectedBrand = '', fallback = 'Personal Care') {
  if (detectedBrand) {
    const brandLower = detectedBrand.toLowerCase();
    if (BRAND_TO_CATEGORY[brandLower]) {
      return BRAND_TO_CATEGORY[brandLower];
    }
  }

  const text = `${headline} ${summary}`.toLowerCase();

  if (text.includes('skincare') || text.includes('haircare') || text.includes('serum') || text.includes('beauty') || text.includes('cosmetics') || text.includes('lipstick')) {
    return 'Beauty & Wellbeing';
  }
  if (text.includes('soap') || text.includes('hygiene') || text.includes('deodorant') || text.includes('toothpaste') || text.includes('body wash') || text.includes('sweat')) {
    return 'Personal Care';
  }
  if (text.includes('detergent') || text.includes('washing powder') || text.includes('dishwash') || text.includes('fabric') || text.includes('laundry') || text.includes('cleaner') || text.includes('stain')) {
    return 'Home Care';
  }
  if (text.includes('tea') || text.includes('coffee') || text.includes('soup') || text.includes('snack') || text.includes('chai') || text.includes('ketchup') || text.includes('beverage') || text.includes('food')) {
    return 'Foods & Refreshment';
  }
  if (text.includes('dark store') || text.includes('10-minute') || text.includes('quick commerce') || text.includes('delivery') || text.includes('logistics') || text.includes('supply chain') || text.includes('distributor')) {
    return 'Supply Chain & Quick Commerce';
  }

  return fallback || 'Personal Care';
}
