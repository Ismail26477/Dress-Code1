import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories, getProductsByCategory, products } from '@/data/products';
import StaggeredGrid from '@/components/StaggeredGrid';

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = categories.find(c => c.id === id);
  const items = id === 'all' ? products : getProductsByCategory(id || '');

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-card z-40 flex items-center gap-3 px-3 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft size={22} /></button>
        <h1 className="text-lg font-bold">{category?.name || 'All Products'}</h1>
        <span className="text-xs text-muted-foreground ml-auto">{items.length} items</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-sm text-muted-foreground">No products in this category yet</p>
        </div>
      ) : (
        <div className="pt-3">
          <StaggeredGrid products={items} />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
