import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product, getDiscountPercent } from '@/data/products';
import { getWishlist, saveWishlist } from '@/data/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  stagger?: 'up' | 'down';
}

const tagColors: Record<string, string> = {
  'Best selling': 'bg-badge-bestselling text-primary-foreground',
  'Trendy': 'bg-primary text-primary-foreground',
  'New': 'bg-badge-new text-primary-foreground',
  'Premium': 'bg-foreground text-background',
};

const ProductCard = ({ product, stagger = 'up' }: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(getWishlist().includes(product.id));
  const discount = getDiscountPercent(product.price, product.originalPrice);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wl = getWishlist();
    const updated = wishlisted ? wl.filter(id => id !== product.id) : [...wl, product.id];
    saveWishlist(updated);
    setWishlisted(!wishlisted);
  };

  return (
    <div className={stagger === 'down' ? 'stagger-down' : 'stagger-up'}>
      <Link to={`/product/${product.id}`} className="block">
        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {product.tags.map(tag => (
              <span key={tag} className={`text-[9px] font-bold px-2 py-0.5 rounded-sm ${tagColors[tag] || 'bg-muted text-muted-foreground'}`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Image */}
        <div className="relative rounded-lg overflow-hidden bg-secondary aspect-[3/4]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
          
          {/* Wishlist */}
          <button onClick={toggleWishlist} className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center shadow-md">
            <Heart size={16} className={wishlisted ? 'text-primary fill-primary' : 'text-foreground'} />
          </button>

          {/* Fast delivery badge */}
          {product.isFastDelivery && (
            <div className="absolute bottom-2 left-2 bg-card/90 px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1">
              <span>⚡</span> Fast delivery
            </div>
          )}

          {/* Discount badge */}
          {discount > 30 && (
            <div className="absolute top-2 left-2 bg-sale text-sale-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
              -{discount}%
            </div>
          )}
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1 mt-2">
          {product.colors.slice(0, 5).map((color, i) => (
            <div key={i} className="w-4 h-4 rounded-sm border border-border" style={{ backgroundColor: color }} />
          ))}
          {product.colors.length > 5 && (
            <span className="text-[9px] text-muted-foreground">+{product.colors.length - 5}</span>
          )}
        </div>

        {/* Info */}
        <h3 className="text-xs font-medium mt-1.5 line-clamp-1 text-foreground">{product.name}</h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-sm font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        {product.originalPrice && (
          <p className="text-[11px] text-sale font-medium">Get it for ₹{(product.price - 100).toLocaleString()}</p>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
