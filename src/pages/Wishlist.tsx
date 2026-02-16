import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { getWishlist } from '@/data/store';
import StaggeredGrid from '@/components/StaggeredGrid';

const Wishlist = () => {
  const navigate = useNavigate();
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => { setIds(getWishlist()); }, []);

  const items = products.filter(p => ids.includes(p.id));

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-card z-40 flex items-center gap-3 px-3 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft size={22} /></button>
        <h1 className="text-lg font-bold">Wishlist ({items.length})</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">❤️</p>
          <p className="text-sm text-muted-foreground">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="pt-3">
          <StaggeredGrid products={items} />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
