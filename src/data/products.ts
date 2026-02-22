export interface ProductSection {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  gradient: string;
  gradientStart: string;
  gradientEnd: string;
  imagePath: string;
  frameCount: number;
  sections: ProductSection[];
  ingredients: string[];
  nutrition: {
    calories: number;
    sugar: string;
    protein: string;
    vitamin: string;
  };
}

export const products: Product[] = [
  {
    id: "mango",
    name: "Mango Fusion",
    tagline: "Radiance Within",
    description: "A luminous blend of turmeric, citrus, and tropical fruits that illuminates from within and supports natural wellness.",
    price: 11.49,
    gradient: "from-yellow-400 via-amber-400 to-orange-400",
    gradientStart: "#facc15",
    gradientEnd: "#fb923c",
    imagePath: "/images/mango",
    frameCount: 191,
    sections: [
      {
        title: "Ancient Wisdom",
        description: "Turmeric and ginger, revered for millennia, now perfected in a modern wellness formula."
      },
      {
        title: "Anti-Inflammatory",
        description: "Curcumin-rich turmeric with black pepper extract for maximum bioavailability and benefits."
      },
      {
        title: "Inner Radiance",
        description: "Nourish your skin from within with beta-carotene and vitamin-rich tropical fruits."
      },
      {
        title: "Warming Energy",
        description: "Feel the gentle warmth spread through your body, awakening your natural vitality."
      }
    ],
    ingredients: ["Turmeric", "Orange", "Mango", "Carrot", "Black Pepper", "Coconut"],
    nutrition: {
      calories: 110,
      sugar: "16g natural",
      protein: "2g",
      vitamin: "250% Vitamin A"
    }
  },
  {
    id: "chocolate",
    name: "Chocolate Bliss",
    tagline: "Indulgent Wellness",
    description: "A rich, velvety fusion of premium cacao and natural superfoods. Decadent taste meets powerful nutrition in every sip.",
    price: 12.99,
    gradient: "from-amber-900 via-yellow-900 to-stone-800",
    gradientStart: "#78350f",
    gradientEnd: "#44403c",
    imagePath: "/images/chocolate",
    frameCount: 191,
    sections: [
      {
        title: "Pure Cacao",
        description: "Organic Peruvian cacao, cold-processed to preserve antioxidants and deliver authentic chocolate richness."
      },
      {
        title: "Mood Elevation",
        description: "Natural theobromine and phenylethylamine work together to boost your mood and mental clarity."
      },
      {
        title: "Guilt-Free Indulgence",
        description: "All the pleasure of chocolate with none of the guilt. Sweetened only with natural dates and coconut."
      },
      {
        title: "Sustained Energy",
        description: "Complex carbohydrates and healthy fats provide smooth, lasting energy without the crash."
      }
    ],
    ingredients: ["Raw Cacao", "Coconut Milk", "Dates", "Maca", "Vanilla", "Sea Salt"],
    nutrition: {
      calories: 145,
      sugar: "12g natural",
      protein: "4g",
      vitamin: "180% Magnesium"
    }
  },
  {
    id: "pomegranate",
    name: "Pomegranate Power",
    tagline: "Ancient Superfruit",
    description: "The legendary fruit of vitality, cold-pressed to capture its ruby-red essence and potent antioxidant power.",
    price: 13.49,
    gradient: "from-red-600 via-rose-600 to-pink-500",
    gradientStart: "#dc2626",
    gradientEnd: "#ec4899",
    imagePath: "/images/pomegranate",
    frameCount: 191,
    sections: [
      {
        title: "Ruby Elixir",
        description: "Each bottle contains the essence of six hand-picked pomegranates, bursting with jewel-toned goodness."
      },
      {
        title: "Heart Health",
        description: "Punicalagins and polyphenols support cardiovascular wellness and healthy blood flow."
      },
      {
        title: "Cellular Protection",
        description: "Three times more antioxidants than green tea, defending your cells against oxidative stress."
      },
      {
        title: "Timeless Beauty",
        description: "Revered since ancient times for promoting radiant skin and youthful vitality."
      }
    ],
    ingredients: ["Pomegranate", "Hibiscus", "Beetroot", "Raspberry", "Rose Water"],
    nutrition: {
      calories: 100,
      sugar: "15g natural",
      protein: "2g",
      vitamin: "200% Vitamin C"
    }
  }
];
