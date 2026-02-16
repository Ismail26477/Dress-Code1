import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/products';

interface StaggeredGridProps {
  products: Product[];
}

const StaggeredGrid = ({ products }: StaggeredGridProps) => (
  <div className="grid grid-cols-2 gap-3 px-3">
    {products.map((product, i) => (
      <ProductCard
        key={product.id}
        product={product}
        stagger={i % 2 === 0 ? 'up' : 'down'}
      />
    ))}
  </div>
);

export default StaggeredGrid;
