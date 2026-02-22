/**
 * =====================================================
 * NANO BANANA - FICHIER DE CONFIGURATION DU CONTENU
 * =====================================================
 * 
 * Ce fichier contient TOUTES les configurations modifiables du site.
 * Modifiez les valeurs ci-dessous selon vos besoins.
 * 
 * STRUCTURE :
 * 1. SITE_CONFIG - Informations générales du site
 * 2. PRODUCTS - Liste des produits (saveurs)
 * 3. NAVBAR_CONFIG - Configuration de la barre de navigation
 * 4. FOOTER_CONFIG - Configuration du pied de page
 */


// =====================================================
// 1. CONFIGURATION GÉNÉRALE DU SITE
// =====================================================

export const SITE_CONFIG = {
  // Nom de la marque (affiché dans la navbar et le footer)
  brandName: "Nano Banana",
  
  // Slogan principal
  tagline: "Premium Craft Juices",
  
  // Description pour le SEO
  description: "Découvrez nos jus artisanaux premium aux saveurs uniques",
  
  // Nombre total de frames dans chaque séquence d'images
  totalFrames: 191,
};

// =====================================================
// CONFIGURATION DE L'INTRO
// =====================================================
export const INTRO_CONFIG = {
  brandName: "Nano Banana",
  tagline: "Premium Juice Experience",
  countdownFrom: 3,  // Durée du décompte en secondes
};


// =====================================================
// 2. CONFIGURATION DES PRODUITS (SAVEURS)
// =====================================================

/**
 * DIRECTION DES FRAMES :
 * - "forward"  : 1 (1).gif → 1 (191).gif (1 est le DÉBUT, 191 est la FIN)
 * - "reverse"  : 1 (191).gif → 1 (1).gif (191 est le DÉBUT, 1 est la FIN)
 */

export type Product = ProductConfig;

export interface ProductConfig {
  // Identifiant unique (utilisé pour le dossier des images)
  id: string;
  
  // Nom affiché du produit
  name: string;
  
  // Sous-titre du produit
  subtitle: string;
  
  // Description courte
  description: string;
  
  // Prix (format: "$X.XX")
  price: string;
  
  // Couleurs du thème (dégradé)
  colors: {
    from: string;  // Couleur de départ du dégradé
    to: string;    // Couleur de fin du dégradé
  };
  
  // Chemin vers le dossier des images (dans /public)
  imagePath: string;
  
  // Direction de lecture des frames
  // "forward" = 1→191 | "reverse" = 191→1
  frameDirection: "forward" | "reverse";

  // Nombre de frames (optionnel, défaut 191)
  frameCount?: number;
  
  // Textes affichés pendant le scroll (4 sections)
  scrollTexts: {
    headline: string;    // Titre principal
    subheadline: string; // Sous-titre
  }[];
  
  // Caractéristiques du produit (affichées dans la section d'achat)
  features: {
    label: string;  // Nom de la caractéristique
    value: string;  // Valeur
  }[];
}

export const PRODUCTS: ProductConfig[] = [
  // -------------------------------------------------
  // PRODUIT 1 : MANGO FUSION
  // -------------------------------------------------
  {
    id: "mango",
    name: "Mango Fusion",
    subtitle: "Tropical Paradise",
    description: "Un voyage exotique avec des mangues mûries au soleil, mélangées à une touche d'agrumes pour une explosion de fraîcheur tropicale.",
    price: "$4.99",
    
    // Thème jaune-orange riche
    colors: {
      from: "#fbbf24",  // Amber 400
      to: "#ea580c",    // Orange 600
    },
    
    // Chemin des images
    imagePath: "/images/mango",
    
    // Direction: 191 → 1 (reverse)
    frameDirection: "reverse",
    
    // Textes pendant le scroll
    scrollTexts: [
      {
        headline: "Mangue Pure",
        subheadline: "Récoltée à maturité parfaite",
      },
      {
        headline: "Sans Sucre Ajouté",
        subheadline: "100% naturel et authentique",
      },
      {
        headline: "Vitamines Naturelles",
        subheadline: "Boost d'énergie quotidien",
      },
      {
        headline: "Goût Premium",
        subheadline: "Une expérience gustative unique",
      },
    ],
    
    // Caractéristiques
    features: [
      { label: "Volume", value: "350ml" },
      { label: "Calories", value: "120 kcal" },
      { label: "Sucres", value: "24g naturels" },
      { label: "Origine", value: "Inde" },
    ],
  },
  
  // -------------------------------------------------
  // PRODUIT 2 : CHOCOLATE BLISS
  // -------------------------------------------------
  {
    id: "chocolate",
    name: "Chocolate Bliss",
    subtitle: "Indulgence Absolue",
    description: "Une boisson chocolatée onctueuse préparée avec du cacao brut et une touche de banane pour une douceur irrésistible.",
    price: "$5.49",
    
    // Thème NOIR PROFOND / MARRON GLACÉ
    colors: {
      from: "#3f2212",  // Marron très foncé
      to: "#0f0502",    // Presque noir
    },
    
    // Chemin des images
    imagePath: "/images/chocolate",
    
    // Direction: 1 → 191 (forward)
    frameDirection: "forward",
    
    // Textes pendant le scroll
    scrollTexts: [
      {
        headline: "Cacao Premium",
        subheadline: "Sélectionné des meilleures plantations",
      },
      {
        headline: "Onctuosité Parfaite",
        subheadline: "Texture veloutée et crémeuse",
      },
      {
        headline: "Énergie Naturelle",
        subheadline: "Boost de bien-être instantané",
      },
      {
        headline: "Plaisir Gourmand",
        subheadline: "Sans culpabilité",
      },
    ],
    
    // Caractéristiques
    features: [
      { label: "Volume", value: "350ml" },
      { label: "Calories", value: "180 kcal" },
      { label: "Protéines", value: "8g" },
      { label: "Origine", value: "Ghana" },
    ],
  },
  
  // -------------------------------------------------
  // PRODUIT 3 : POMEGRANATE POWER
  // -------------------------------------------------
  {
    id: "pomegranate",
    name: "Pomegranate Power",
    subtitle: "Antioxydant Suprême",
    description: "Le pouvoir des grenades fraîchement pressées, riches en antioxydants pour une vitalité incomparable.",
    price: "$5.99",
    
    // Thème ROUGE RUBIS / BORDEAUX
    colors: {
      from: "#be123c",  // Rose 700
      to: "#4c0519",    // Rose 950 (Très sombre)
    },
    
    // Chemin des images
    imagePath: "/images/pomegranate",
    
    // Direction: 191 → 1 (reverse)
    frameDirection: "reverse",
    
    // Textes pendant le scroll
    scrollTexts: [
      {
        headline: "Grenade Pure",
        subheadline: "Pressée à froid pour plus de fraîcheur",
      },
      {
        headline: "Super Antioxydants",
        subheadline: "Protection cellulaire optimale",
      },
      {
        headline: "Vitalité Intense",
        subheadline: "Énergie durable toute la journée",
      },
      {
        headline: "Goût Intense",
        subheadline: "Saveur authentique et puissante",
      },
    ],
    
    // Caractéristiques
    features: [
      { label: "Volume", value: "350ml" },
      { label: "Calories", value: "140 kcal" },
      { label: "Antioxydants", value: "Très élevé" },
      { label: "Origine", value: "Turquie" },
    ],
  },
];


// =====================================================
// 3. CONFIGURATION DE LA NAVBAR
// =====================================================

export const NAVBAR_CONFIG = {
  // Liens de navigation
  links: [
    { label: "Produits", href: "#products" },
    { label: "À Propos", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  
  // Texte du bouton principal
  ctaButtonText: "Commander",
  
  // URL du bouton principal
  ctaButtonUrl: "#order",
};


// =====================================================
// 4. CONFIGURATION DU FOOTER
// =====================================================

export const FOOTER_CONFIG = {
  // Description de la marque
  brandDescription: "Jus artisanaux premium préparés avec des ingrédients naturels soigneusement sélectionnés.",
  
  // Colonnes de liens
  columns: [
    {
      title: "Boutique",
      links: [
        { label: "Tous les Produits", href: "#" },
        { label: "Nouveautés", href: "#" },
        { label: "Meilleures Ventes", href: "#" },
        { label: "Offres Spéciales", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "#" },
        { label: "Livraison", href: "#" },
        { label: "Retours", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ],
  
  // Configuration de la newsletter
  newsletter: {
    title: "Newsletter",
    description: "Recevez nos offres exclusives et nouveautés",
    placeholder: "Votre email",
    buttonText: "S'inscrire",
  },
  
  // Texte de copyright (l'année est ajoutée automatiquement)
  copyrightText: "Nano Banana. Tous droits réservés.",
  
  // Liens des réseaux sociaux
  socialLinks: [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Facebook", url: "https://facebook.com" },
  ],
};