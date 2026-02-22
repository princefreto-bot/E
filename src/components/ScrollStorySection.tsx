import { ProductConfig } from '../config/content';
import ProductBottleScroll from './ProductBottleScroll';

interface ScrollStorySectionProps {
  product: ProductConfig;
}

/**
 * Section de storytelling avec scroll
 * Combine le canvas d'animation et les overlays de texte
 */
export default function ScrollStorySection({ product }: ScrollStorySectionProps) {
  return (
    <section id="story" className="relative">
      <ProductBottleScroll product={product} />
    </section>
  );
}
