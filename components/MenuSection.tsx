'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type MenuCategory = 'earth' | 'fire' | 'sea' | 'hearth' | 'sweet' | 'cellar';
type DietaryFilter = 'all' | 'veg' | 'vegan' | 'gf' | 'signature';

type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: string;
  image: string;
  ingredients: string[];
  allergens: string[];
  pairing: string;
  dietary: Array<'veg' | 'vegan' | 'gf' | 'signature'>;
  heat: 'Mild' | 'Warm' | 'Bold';
};

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];
const FALLBACK_MENU_IMAGE =
  'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1400&q=80';

const CATEGORIES: Array<{ id: MenuCategory; label: string; subtitle: string }> = [
  { id: 'earth', label: 'From the Earth', subtitle: 'Seasonal produce and smoke-kissed botanicals' },
  { id: 'fire', label: 'From the Fire', subtitle: 'Prime cuts and ember-forged proteins' },
  { id: 'sea', label: 'From the Sea', subtitle: 'Ocean catches touched by cedar and coal' },
  { id: 'hearth', label: 'Hearth Sides', subtitle: 'Shared plates from the live-fire station' },
  { id: 'sweet', label: 'Sweet Endings', subtitle: 'Desserts with caramelized depth' },
  { id: 'cellar', label: 'Cellar Pairings', subtitle: 'Wines, cocktails, and whiskey service' }
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'earth-01',
    category: 'earth',
    name: 'Coal-Roasted Beet Carpaccio',
    description: 'Black garlic crema, preserved citrus, dill pollen.',
    price: '$21',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Heirloom beet', 'Black garlic', 'Citrus oil', 'Dill pollen'],
    allergens: ['Dairy'],
    pairing: 'Dry Riesling, Finger Lakes',
    dietary: ['veg', 'signature'],
    heat: 'Mild'
  },
  {
    id: 'earth-02',
    category: 'earth',
    name: 'Fire-Leaf Caesar',
    description: 'Charred gem lettuce, anchovy crumb, sourdough ash crisp.',
    price: '$19',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Gem lettuce', 'Aged parmesan', 'Anchovy', 'Sourdough'],
    allergens: ['Fish', 'Dairy', 'Gluten'],
    pairing: 'Vermentino, Sardinia',
    dietary: ['signature'],
    heat: 'Mild'
  },
  {
    id: 'earth-03',
    category: 'earth',
    name: 'Smoked Wild Mushroom Pot',
    description: 'King oyster, chestnut cream, sherry reduction.',
    price: '$23',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['King oyster mushroom', 'Chestnut', 'Sherry', 'Thyme smoke'],
    allergens: ['Dairy'],
    pairing: 'Oaked Chardonnay, Sonoma',
    dietary: ['veg', 'signature'],
    heat: 'Warm'
  },
  {
    id: 'earth-04',
    category: 'earth',
    name: 'Tomato Ember Tartine',
    description: 'Confit tomato, basil coal oil, whipped ricotta.',
    price: '$18',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Tomato confit', 'Ricotta', 'Basil oil', 'Country bread'],
    allergens: ['Dairy', 'Gluten'],
    pairing: 'Rose, Provence',
    dietary: ['veg'],
    heat: 'Mild'
  },
  {
    id: 'earth-05',
    category: 'earth',
    name: 'Ash-Baked Celeriac',
    description: 'Brown butter, hazelnut granola, apple skin powder.',
    price: '$22',
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Celeriac', 'Brown butter', 'Hazelnut', 'Apple'],
    allergens: ['Tree nuts', 'Dairy'],
    pairing: 'Chenin Blanc, Loire',
    dietary: ['veg'],
    heat: 'Warm'
  },
  {
    id: 'earth-06',
    category: 'earth',
    name: 'Garden Ember Board',
    description: 'Seasonal grilled vegetables, smoked tahini, herbs.',
    price: '$25',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Seasonal vegetables', 'Tahini', 'Lemon', 'Mint'],
    allergens: ['Sesame'],
    pairing: 'Assyrtiko, Santorini',
    dietary: ['vegan', 'gf'],
    heat: 'Mild'
  },
  {
    id: 'fire-01',
    category: 'fire',
    name: '48-Hour Oakfire Ribeye',
    description: 'Bone marrow butter, ember onion, pepper jus.',
    price: '$68',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Dry-aged ribeye', 'Bone marrow', 'Pepper jus', 'Charred onion'],
    allergens: ['Dairy'],
    pairing: 'Cabernet Sauvignon, Napa',
    dietary: ['signature', 'gf'],
    heat: 'Bold'
  },
  {
    id: 'fire-02',
    category: 'fire',
    name: 'Coal-Hung Lamb Saddle',
    description: 'Sunchoke puree, blackberry gastrique, rosemary smoke.',
    price: '$55',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Lamb saddle', 'Sunchoke', 'Blackberry', 'Rosemary'],
    allergens: ['None'],
    pairing: 'Syrah, Northern Rhone',
    dietary: ['gf'],
    heat: 'Bold'
  },
  {
    id: 'fire-03',
    category: 'fire',
    name: 'Charred Chicken Supreme',
    description: 'Miso glaze, grilled lemon, roasted garlic jus.',
    price: '$39',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Chicken supreme', 'Miso', 'Lemon', 'Garlic'],
    allergens: ['Soy'],
    pairing: 'Chablis Premier Cru',
    dietary: ['gf'],
    heat: 'Warm'
  },
  {
    id: 'fire-04',
    category: 'fire',
    name: 'Whiskey-Glazed Short Rib',
    description: 'Slow fire braise, smoked carrot, crispy shallot.',
    price: '$47',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Beef short rib', 'Whiskey glaze', 'Carrot', 'Shallot'],
    allergens: ['Gluten'],
    pairing: 'Zinfandel, Lodi',
    dietary: ['signature'],
    heat: 'Bold'
  },
  {
    id: 'fire-05',
    category: 'fire',
    name: 'Cedar-Smoked Duck Breast',
    description: 'Sour cherry lacquer, bitter greens, duck jus.',
    price: '$52',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Duck breast', 'Cherry glaze', 'Greens', 'Cedar smoke'],
    allergens: ['None'],
    pairing: 'Pinot Noir, Burgundy',
    dietary: ['gf'],
    heat: 'Warm'
  },
  {
    id: 'fire-06',
    category: 'fire',
    name: 'Fireline Pork Collar',
    description: 'Apple mustard glaze, charred fennel, crackling.',
    price: '$42',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Pork collar', 'Apple mustard', 'Fennel', 'Cider jus'],
    allergens: ['Mustard'],
    pairing: 'Grenache, Priorat',
    dietary: ['signature'],
    heat: 'Bold'
  },
  {
    id: 'sea-01',
    category: 'sea',
    name: 'Cedar-Plank King Salmon',
    description: 'Brown butter miso, smoked lemon, pickled fennel.',
    price: '$46',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['King salmon', 'Brown butter', 'Miso', 'Fennel'],
    allergens: ['Fish', 'Soy', 'Dairy'],
    pairing: 'Pinot Noir, Willamette',
    dietary: ['signature'],
    heat: 'Warm'
  },
  {
    id: 'sea-02',
    category: 'sea',
    name: 'Coal-Seared Scallops',
    description: 'Corn veloute, nduja oil, grilled baby leek.',
    price: '$44',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Scallops', 'Corn veloute', 'Nduja', 'Leek'],
    allergens: ['Shellfish', 'Dairy'],
    pairing: 'Albarino, Rias Baixas',
    dietary: ['signature', 'gf'],
    heat: 'Bold'
  },
  {
    id: 'sea-03',
    category: 'sea',
    name: 'Fire-Grilled Octopus',
    description: 'Smoked chickpea puree, charred chili, herbs.',
    price: '$37',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Octopus', 'Chickpea', 'Chili', 'Parsley'],
    allergens: ['None'],
    pairing: 'Godello, Valdeorras',
    dietary: ['gf'],
    heat: 'Bold'
  },
  {
    id: 'sea-04',
    category: 'sea',
    name: 'Smoked Prawn Skillet',
    description: 'Garlic butter, charred sourdough, parsley ash.',
    price: '$35',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Prawns', 'Garlic butter', 'Parsley', 'Sourdough'],
    allergens: ['Shellfish', 'Dairy', 'Gluten'],
    pairing: 'Sauvignon Blanc, Marlborough',
    dietary: ['signature'],
    heat: 'Warm'
  },
  {
    id: 'sea-05',
    category: 'sea',
    name: 'Whole Branzino Ember Roast',
    description: 'Caper brown butter, citrus peel, fresh herbs.',
    price: '$49',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Branzino', 'Caper', 'Butter', 'Citrus peel'],
    allergens: ['Fish', 'Dairy'],
    pairing: 'Etna Bianco, Sicily',
    dietary: ['gf'],
    heat: 'Mild'
  },
  {
    id: 'sea-06',
    category: 'sea',
    name: 'Shellfish Coal Broth',
    description: 'Mussels, clams, fennel smoke, saffron oil.',
    price: '$41',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Mussels', 'Clams', 'Fennel', 'Saffron'],
    allergens: ['Shellfish'],
    pairing: 'Picpoul de Pinet',
    dietary: ['gf'],
    heat: 'Warm'
  },
  {
    id: 'hearth-01',
    category: 'hearth',
    name: 'Ash Potato Gratin',
    description: 'Comte cream, smoked shallot, crisp thyme.',
    price: '$16',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Potato', 'Comte', 'Cream', 'Shallot'],
    allergens: ['Dairy'],
    pairing: 'Chardonnay, Burgundy',
    dietary: ['veg'],
    heat: 'Mild'
  },
  {
    id: 'hearth-02',
    category: 'hearth',
    name: 'Firecorn with Lime Ash',
    description: 'Charred sweet corn, cotija, chili-lime dust.',
    price: '$14',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Sweet corn', 'Cotija', 'Lime', 'Chili'],
    allergens: ['Dairy'],
    pairing: 'Paloma Ahumada',
    dietary: ['veg'],
    heat: 'Warm'
  },
  {
    id: 'hearth-03',
    category: 'hearth',
    name: 'Smokehouse Maccheroni',
    description: 'Aged cheddar sauce, pancetta crumb, crispy sage.',
    price: '$18',
    image: 'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?auto=compress&cs=tinysrgb&w=1400&q=80',
    ingredients: ['Maccheroni', 'Cheddar', 'Pancetta', 'Sage'],
    allergens: ['Dairy', 'Gluten'],
    pairing: 'Oak Chardonnay',
    dietary: ['signature'],
    heat: 'Mild'
  },
  {
    id: 'hearth-04',
    category: 'hearth',
    name: 'Grilled Broccolini',
    description: 'Lemon confit, almond crunch, chili thread.',
    price: '$15',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Broccolini', 'Lemon confit', 'Almond', 'Chili'],
    allergens: ['Tree nuts'],
    pairing: 'Verdejo, Rueda',
    dietary: ['vegan', 'gf'],
    heat: 'Warm'
  },
  {
    id: 'hearth-05',
    category: 'hearth',
    name: 'Coal Flatbread',
    description: 'Whipped feta, herbs, smoked olive oil.',
    price: '$13',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Flatbread', 'Feta', 'Herb oil', 'Sea salt'],
    allergens: ['Dairy', 'Gluten'],
    pairing: 'Orange Wine, Slovenia',
    dietary: ['veg'],
    heat: 'Mild'
  },
  {
    id: 'hearth-06',
    category: 'hearth',
    name: 'Burnt Carrot Mash',
    description: 'Maple glaze, fermented chili, toasted seeds.',
    price: '$14',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Carrot', 'Maple', 'Fermented chili', 'Seeds'],
    allergens: ['Sesame'],
    pairing: 'Cotes du Rhone Blanc',
    dietary: ['vegan', 'gf'],
    heat: 'Bold'
  },
  {
    id: 'sweet-01',
    category: 'sweet',
    name: 'Smoked Chocolate Ganache',
    description: 'Sea salt caramel, toasted marshmallow cream.',
    price: '$18',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['70% chocolate', 'Caramel', 'Marshmallow', 'Sea salt'],
    allergens: ['Dairy', 'Gluten'],
    pairing: '20 Year Tawny Port',
    dietary: ['signature'],
    heat: 'Mild'
  },
  {
    id: 'sweet-02',
    category: 'sweet',
    name: 'Burnt Orange Cremeux',
    description: 'Vanilla ash crumble, blood orange syrup.',
    price: '$17',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Orange cremeux', 'Vanilla', 'Crumble', 'Citrus syrup'],
    allergens: ['Dairy', 'Egg', 'Gluten'],
    pairing: 'Late Harvest Chenin',
    dietary: ['veg'],
    heat: 'Mild'
  },
  {
    id: 'sweet-03',
    category: 'sweet',
    name: 'Oak-Aged Milk Ice Cream',
    description: 'Warm brioche crumb, pecan brittle, maple smoke.',
    price: '$16',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Oak milk', 'Brioche', 'Pecan', 'Maple'],
    allergens: ['Dairy', 'Tree nuts', 'Gluten'],
    pairing: 'Speyside Single Malt',
    dietary: ['signature'],
    heat: 'Mild'
  },
  {
    id: 'sweet-04',
    category: 'sweet',
    name: 'Fireline Apple Tarte',
    description: 'Calvados caramel, creme fraiche, ash sugar.',
    price: '$17',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Apple', 'Calvados caramel', 'Creme fraiche', 'Pastry'],
    allergens: ['Dairy', 'Gluten'],
    pairing: 'Sauternes, Bordeaux',
    dietary: ['veg'],
    heat: 'Warm'
  },
  {
    id: 'sweet-05',
    category: 'sweet',
    name: 'Dark Cherry Clafoutis',
    description: 'Vanilla smoke cream, cocoa nib crackle.',
    price: '$16',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Cherry', 'Vanilla', 'Cocoa nib', 'Batter'],
    allergens: ['Dairy', 'Egg', 'Gluten'],
    pairing: 'Ruby Port',
    dietary: ['veg'],
    heat: 'Mild'
  },
  {
    id: 'sweet-06',
    category: 'sweet',
    name: 'Brown Butter Basque Cheesecake',
    description: 'Charred top, whiskey prune compote.',
    price: '$18',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Cream cheese', 'Brown butter', 'Prune compote', 'Whiskey'],
    allergens: ['Dairy', 'Egg', 'Gluten'],
    pairing: 'Pedro Ximenez Sherry',
    dietary: ['signature'],
    heat: 'Warm'
  },
  {
    id: 'cellar-01',
    category: 'cellar',
    name: 'Cabernet Flight (3 oz x 3)',
    description: 'Old world vs new world vertical pour.',
    price: '$29',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Napa', 'Bordeaux', 'Coonawarra'],
    allergens: ['Sulfites'],
    pairing: 'Built for oakfire meats',
    dietary: ['signature', 'gf'],
    heat: 'Bold'
  },
  {
    id: 'cellar-02',
    category: 'cellar',
    name: 'Smoked Old Fashioned',
    description: 'Bourbon, demerara, orange oil, oak smoke.',
    price: '$19',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Bourbon', 'Bitters', 'Demerara', 'Orange'],
    allergens: ['None'],
    pairing: 'Ribeye / short rib',
    dietary: ['vegan', 'gf', 'signature'],
    heat: 'Bold'
  },
  {
    id: 'cellar-03',
    category: 'cellar',
    name: 'Stonefruit Spritz',
    description: 'Apricot, sparkling wine, bitter peel tonic.',
    price: '$16',
    image: 'https://images.unsplash.com/photo-1575023782549-62ca0d244b39?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Apricot', 'Sparkling wine', 'Tonic', 'Peel bitters'],
    allergens: ['Sulfites'],
    pairing: 'Seafood / salads',
    dietary: ['vegan', 'gf'],
    heat: 'Mild'
  },
  {
    id: 'cellar-04',
    category: 'cellar',
    name: 'Zero-Proof Ember Tonic',
    description: 'Charred grapefruit, lapsang tea, smoked honey.',
    price: '$13',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Grapefruit', 'Lapsang tea', 'Honey', 'Soda'],
    allergens: ['None'],
    pairing: 'Pairs across all courses',
    dietary: ['gf'],
    heat: 'Warm'
  },
  {
    id: 'cellar-05',
    category: 'cellar',
    name: 'Amaro Service',
    description: 'Three bitter digestifs with orange peel.',
    price: '$18',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Amaro blend', 'Citrus peel', 'Ice'],
    allergens: ['None'],
    pairing: 'Dessert finish',
    dietary: ['vegan', 'gf'],
    heat: 'Bold'
  },
  {
    id: 'cellar-06',
    category: 'cellar',
    name: 'Chef Pairing Journey (5 pours)',
    description: 'Curated progression synchronized to menu tempo.',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1400&q=80',
    ingredients: ['Sommelier curated', 'Seasonal rotation'],
    allergens: ['Sulfites'],
    pairing: 'Whole tasting sequence',
    dietary: ['signature'],
    heat: 'Mild'
  }
];

const DIETARY_FILTERS: Array<{ id: DietaryFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'signature', label: 'Chef Signature' },
  { id: 'veg', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gf', label: 'Gluten Free' }
];

function dietaryLabel(flag: 'veg' | 'vegan' | 'gf' | 'signature') {
  if (flag === 'veg') return 'Vegetarian';
  if (flag === 'vegan') return 'Vegan';
  if (flag === 'gf') return 'Gluten Free';
  return 'Signature';
}

function DishImage({
  src,
  alt,
  sizes,
  className,
  priority = false
}: {
  src: string;
  alt: string;
  sizes: string;
  className: string;
  priority?: boolean;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => {
        if (currentSrc !== FALLBACK_MENU_IMAGE) {
          setCurrentSrc(FALLBACK_MENU_IMAGE);
        }
      }}
    />
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('fire');
  const [dietary, setDietary] = useState<DietaryFilter>('all');
  const [query, setQuery] = useState('');
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!activeItem) return;

    const previousOverflow = document.body.style.overflow;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveItem(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onEscape);
    };
  }, [activeItem]);

  const categoryCount = useMemo(() => {
    return CATEGORIES.reduce<Record<MenuCategory, number>>((acc, category) => {
      acc[category.id] = MENU_ITEMS.filter((item) => item.category === category.id).length;
      return acc;
    }, { earth: 0, fire: 0, sea: 0, hearth: 0, sweet: 0, cellar: 0 });
  }, []);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const inCategory = item.category === activeCategory;
      const inDiet = dietary === 'all' ? true : item.dietary.includes(dietary);
      const inQuery =
        query.trim().length === 0
          ? true
          : `${item.name} ${item.description} ${item.ingredients.join(' ')}`
              .toLowerCase()
              .includes(query.trim().toLowerCase());
      return inCategory && inDiet && inQuery;
    });
  }, [activeCategory, dietary, query]);

  const activeCategoryMeta = CATEGORIES.find((category) => category.id === activeCategory);

  return (
    <section
      id="menu-atlas"
      className="texture-noise relative mt-10 overflow-hidden rounded-[2rem] border border-orange-300/30 p-4 sm:p-8"
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-orange-500/8 via-transparent to-amber-400/6" />
      <div className="relative z-10 min-w-0">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-[var(--font-accent)] text-sm uppercase tracking-[0.2em] text-orange-200/80 sm:tracking-[0.35em]">Live Menu Atlas</p>
            <h3 className="mt-2 text-2xl text-stone-50 sm:text-4xl">Every dish visible. No PDFs. No hidden pages.</h3>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-stone-300/85">
            Guests can search, filter dietary needs, and open any plate for ingredients, allergens, and pairing.
            This scales to full service menus without losing readability.
          </p>
        </div>

        <div className="grid min-w-0 gap-4 lg:grid-cols-[0.34fr_1fr]">
          <aside className="hidden glass-charcoal rounded-3xl p-4 sm:p-5 lg:block">
            <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.28em] text-orange-100/80">Menu Chapters</p>
            <div className="mt-3 space-y-2">
              {CATEGORIES.map((category) => {
                const active = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full rounded-2xl border px-3 py-3 text-left transition-all duration-700 ease-cinematic ${
                      active
                        ? 'border-orange-300/70 bg-gradient-to-r from-orange-500/30 to-amber-400/25 text-amber-50'
                        : 'border-stone-100/15 bg-stone-900/30 text-stone-300 hover:border-orange-300/40 hover:text-amber-100'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em]">{category.label}</p>
                    <p className="mt-1 text-[11px] text-stone-300/80">{categoryCount[category.id]} dishes</p>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0 space-y-5">
            <div className="glass-charcoal rounded-3xl p-4 lg:hidden">
              <div className="flex items-center justify-between gap-3">
                <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.14em] text-orange-100/80">Menu Chapters</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-stone-400">Pick</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {CATEGORIES.map((category) => {
                  const active = category.id === activeCategory;
                  return (
                    <button
                      key={`mobile-${category.id}`}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={`min-w-0 rounded-xl border px-3 py-2 text-left transition-all duration-700 ease-cinematic ${
                        active
                          ? 'border-orange-300/70 bg-gradient-to-r from-orange-500/30 to-amber-400/25 text-amber-50'
                          : 'border-stone-100/15 bg-stone-900/35 text-stone-300'
                      }`}
                    >
                      <p className="truncate text-[11px] uppercase tracking-[0.08em]">{category.label}</p>
                      <p className="mt-1 text-[10px] text-stone-300/80">{categoryCount[category.id]} dishes</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass-charcoal rounded-3xl p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.14em] text-orange-200/75 sm:tracking-[0.3em]">Now Serving</p>
                  <h4 className="mt-1 text-2xl text-stone-50">{activeCategoryMeta?.label}</h4>
                  <p className="mt-1 text-sm text-stone-300/80 break-words">{activeCategoryMeta?.subtitle}</p>
                </div>

                <div className="w-full md:max-w-xs">
                  <label className="sr-only" htmlFor="menu-search">
                    Search menu
                  </label>
                  <input
                    id="menu-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search dishes, ingredient, style"
                    className="w-full rounded-xl border border-stone-100/20 bg-stone-950/55 px-4 py-2 text-sm text-stone-100 outline-none transition-all duration-700 ease-cinematic focus:border-orange-300/70"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {DIETARY_FILTERS.map((filter) => {
                  const active = dietary === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setDietary(filter.id)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] transition-all duration-700 ease-cinematic sm:px-3 sm:text-xs sm:tracking-[0.16em] ${
                        active
                          ? 'border-orange-300/70 bg-orange-500/25 text-amber-100'
                          : 'border-stone-100/15 bg-stone-900/35 text-stone-300 hover:border-orange-300/45 hover:text-amber-100'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredItems.length ? (
              <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item) => (
                  <motion.button
                    key={item.id}
                    layoutId={`plate-${item.id}`}
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className="group glass-charcoal overflow-hidden rounded-3xl text-left"
                    whileHover={{ y: -7 }}
                    transition={{ duration: 0.8, ease: EASE }}
                  >
                    <motion.div layoutId={`plate-image-${item.id}`} className="relative h-44 w-full overflow-hidden">
                      <DishImage
                        src={item.image}
                        alt={item.name}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full border border-orange-200/45 bg-stone-900/70 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-orange-100">
                        {item.heat} Heat
                      </span>
                    </motion.div>
                    <div className="min-w-0 p-4">
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <h5 className="min-w-0 text-xl leading-tight text-stone-50 break-words">{item.name}</h5>
                        <span className="font-[var(--font-accent)] text-lg tracking-[0.08em] text-orange-200">{item.price}</span>
                      </div>
                      <p className="mt-2 text-sm text-stone-300/85">{item.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.dietary.map((flag) => (
                          <span key={flag} className="rounded-full border border-stone-100/20 bg-stone-950/45 px-2 py-1 text-[10px] uppercase tracking-[0.13em] text-stone-200">
                            {dietaryLabel(flag)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="glass-charcoal rounded-3xl p-8 text-center text-sm text-stone-300/80">
                No dishes found with this filter. Try changing the dietary option or search phrase.
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/84 p-0 backdrop-blur-sm md:items-center md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            onClick={() => setActiveItem(null)}
          >
            <motion.article
              layoutId={`plate-${activeItem.id}`}
              className="menu-detail-modal relative h-[100dvh] max-h-[100dvh] w-full overflow-hidden rounded-none md:h-auto md:max-h-[92vh] md:max-w-4xl md:rounded-3xl"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-20 hidden rounded-full border border-orange-200/45 bg-stone-950/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-stone-100 md:inline-flex"
                onClick={() => setActiveItem(null)}
              >
                Close
              </button>

              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-stone-100/10 bg-stone-950/95 px-4 py-3 backdrop-blur md:hidden">
                <p className="font-[var(--font-accent)] text-[11px] uppercase tracking-[0.14em] text-orange-200/80">Plate Detail</p>
                <button
                  type="button"
                  className="rounded-full border border-orange-200/45 bg-orange-500/20 px-4 py-2 text-xs uppercase tracking-[0.12em] text-orange-100"
                  onClick={() => setActiveItem(null)}
                >
                  Close
                </button>
              </div>

              <div className="h-[calc(100dvh-3.5rem)] overflow-y-auto md:h-auto md:max-h-[92vh]">
                <div className="grid md:grid-cols-[1.05fr_1fr]">
                  <motion.div layoutId={`plate-image-${activeItem.id}`} className="relative min-h-[240px] md:min-h-[500px]">
                    <DishImage
                      src={activeItem.image}
                      alt={activeItem.name}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent md:bg-gradient-to-r" />
                  </motion.div>

                  <div className="menu-detail-panel space-y-6 p-6 sm:p-8">
                    <div>
                      <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.14em] text-orange-200/80 sm:tracking-[0.3em]">Plate Detail</p>
                      <h4 className="mt-2 text-2xl text-stone-50 sm:text-3xl">{activeItem.name}</h4>
                      <p className="mt-2 text-sm text-stone-200/95">{activeItem.description}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-100/80">Ingredients</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeItem.ingredients.map((ingredient) => (
                          <span key={ingredient} className="rounded-full border border-stone-100/20 bg-stone-950/50 px-3 py-1 text-xs text-stone-200">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-orange-100/80">Allergens</p>
                        <p className="mt-2 text-sm text-stone-200/95">{activeItem.allergens.join(' • ')}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-orange-100/80">Price</p>
                        <p className="mt-2 font-[var(--font-accent)] text-2xl tracking-[0.08em] text-orange-200">{activeItem.price}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-orange-300/40 bg-gradient-to-r from-orange-500/20 to-amber-400/10 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-100/90">Pairing Recommendation</p>
                      <p className="mt-2 text-lg text-amber-100">{activeItem.pairing}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
