import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingBag, Star, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import { products, getDiscountPercent } from '@/data/products';
import { getCart, saveCart, getWishlist, saveWishlist, addRecentlyViewed } from '@/data/store';
import { useNavigate } from 'react-router-dom';
import ProductReviews from '@/components/ProductReviews';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(product ? getWishlist().includes(product.id) : false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product) addRecentlyViewed(product.id);
  }, [product?.id]);

  if (!product) return <div className="p-4 pt-28 text-center text-muted-foreground">Product not found</div>;

  const discount = getDiscountPercent(product.price, product.originalPrice);

  const toggleWishlist = () => {
    const wl = getWishlist();
    const updated = wishlisted ? wl.filter(i => i !== product.id) : [...wl, product.id];
    saveWishlist(updated);
    setWishlisted(!wishlisted);
  };

  const addToCart = () => {
    const cart = getCart();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity, selectedSize: selectedSize || product.sizes[0], selectedColor: selectedColor || product.colors[0] });
    }
    saveCart(cart);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pb-24">
      {/* Top nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur max-w-mobile mx-auto flex items-center justify-between px-3 py-3">
        <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft size={22} /></button>
        <div className="flex items-center gap-3">
          <button onClick={toggleWishlist} className="p-1">
            <Heart size={20} className={wishlisted ? 'text-primary fill-primary' : ''} />
          </button>
          <button className="p-1"><Share2 size={20} /></button>
          <Link to="/cart" className="p-1"><ShoppingBag size={20} /></Link>
        </div>
      </div>

      {/* Image */}
      <div className="aspect-[3/4] bg-secondary">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="px-4 pt-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">{tag}</span>
          ))}
        </div>

        <h1 className="text-lg font-bold text-foreground">{product.name}</h1>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            <Star size={14} className="text-accent fill-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-sm font-bold text-sale">-{discount}% off</span>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">Inclusive of all taxes</p>

        {/* Colors */}
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Color</p>
          <div className="flex gap-2">
            {product.colors.map((color, i) => (
              <button key={i} onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary' : 'border-border'}`}
                style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <button key={size} onClick={() => setSelectedSize(size)}
                className={`min-w-[40px] h-9 px-3 rounded-lg border text-sm font-medium ${selectedSize === size ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-4 flex items-center gap-3">
          <p className="text-sm font-semibold">Qty</p>
          <div className="flex items-center border border-border rounded-lg">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2"><Minus size={16} /></button>
            <span className="px-4 text-sm font-medium">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="p-2"><Plus size={16} /></button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-sm font-semibold mb-1">Description</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* USP */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[{ icon: Truck, text: 'Free Shipping' }, { icon: RotateCcw, text: 'Easy Returns' }, { icon: Shield, text: '100% Genuine' }].map((item, i) => (
            <div key={i} className="bg-secondary rounded-lg p-2 text-center">
              <item.icon size={16} className="mx-auto text-primary" />
              <p className="text-[10px] font-medium mt-1 text-secondary-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <ProductReviews productId={product.id} productRating={product.rating} productReviewCount={product.reviews} />

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-6">
            <h3 className="font-script text-lg font-bold mb-3">You May Also Like</h3>
            <div className="grid grid-cols-2 gap-3">
              {related.map((p, i) => (
                <Link key={p.id} to={`/product/${p.id}`} className={i % 2 === 1 ? 'stagger-down' : ''}>
                  <div className="rounded-lg overflow-hidden bg-secondary aspect-[3/4]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h4 className="text-xs font-medium mt-1 line-clamp-1">{p.name}</h4>
                  <span className="text-xs font-bold">₹{p.price.toLocaleString()}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-mobile mx-auto p-3 flex gap-3">
        <button onClick={addToCart}
          className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${addedToCart ? 'bg-sale text-sale-foreground' : 'bg-primary text-primary-foreground'}`}>
          <ShoppingBag size={18} />
          {addedToCart ? 'Added! ✓' : 'Add to Cart'}
        </button>
        <Link to="/cart" className="bg-foreground text-background py-3 px-6 rounded-xl font-bold text-sm">
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
