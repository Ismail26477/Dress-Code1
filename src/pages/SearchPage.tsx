import { useState, useMemo } from 'react';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSidebar, setShowSidebar] = useState(true);

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }
    return result;
  }, [query, selectedCategory]);

  const allCategories = [{ id: 'all', name: 'All', icon: '🏠', image: '' }, ...categories];

  return (
    <div className="pb-20">
      {/* Search header */}
      <div className="sticky top-0 bg-card z-40 border-b border-border">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} /></button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="w-full bg-secondary rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="p-1.5">
            <SlidersHorizontal size={20} className={showSidebar ? 'text-primary' : 'text-foreground'} />
          </button>
        </div>
      </div>

      {/* Content with sidebar */}
      <div className="flex">
        {/* Category sidebar */}
        {showSidebar && (
          <div className="w-20 min-h-screen bg-secondary border-r border-border flex-shrink-0 overflow-y-auto">
            {allCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full py-3 px-1 text-center border-l-2 transition-colors ${selectedCategory === cat.id ? 'border-primary bg-card' : 'border-transparent'}`}
              >
                <span className="text-lg">{cat.icon}</span>
                <p className={`text-[9px] mt-0.5 leading-tight ${selectedCategory === cat.id ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{cat.name}</p>
              </button>
            ))}
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1 p-2">
          <p className="text-[10px] text-muted-foreground px-1 mb-2">{filtered.length} products found</p>
          <div className="grid grid-cols-2 gap-2">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} stagger={i % 2 === 0 ? 'up' : 'down'} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
