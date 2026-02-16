import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Heart, ShoppingBag, X, ChevronRight, Truck, RotateCcw, Shield, Headphones } from 'lucide-react';
import { getCart, getWishlist } from '@/data/store';
import { categories } from '@/data/products';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = getCart().reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = getWishlist().length;

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card max-w-mobile mx-auto">
        {/* Top bar */}
        <div className="bg-primary px-3 py-1.5 text-center">
          <p className="text-primary-foreground text-[10px] font-medium tracking-wider uppercase">
            Free shipping on orders above ₹999 | Use code DRESSCODE25
          </p>
        </div>

        {/* Header Row */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)} className="p-1">
              <Menu size={22} className="text-foreground" />
            </button>
            <button onClick={() => navigate('/search')} className="p-1">
              <Search size={20} className="text-foreground" />
            </button>
          </div>

          <Link to="/" className="text-center">
            <h1 className="font-script text-2xl font-bold text-foreground leading-none">Dress Code</h1>
            <p className="text-[8px] tracking-[3px] uppercase text-muted-foreground font-medium">Kapad & Readymade</p>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/wishlist" className="p-1 relative">
              <Heart size={20} className="text-foreground" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>
              )}
            </Link>
            <Link to="/cart" className="p-1 relative">
              <ShoppingBag size={20} className="text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* USP Bar */}
        <div className="flex items-center justify-around px-2 py-2 bg-secondary border-b border-border">
          <div className="flex items-center gap-1">
            <Truck size={12} className="text-primary" />
            <span className="text-[9px] text-secondary-foreground font-medium">Free Ship</span>
          </div>
          <div className="flex items-center gap-1">
            <RotateCcw size={12} className="text-primary" />
            <span className="text-[9px] text-secondary-foreground font-medium">Easy Return</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={12} className="text-primary" />
            <span className="text-[9px] text-secondary-foreground font-medium">100% Original</span>
          </div>
          <div className="flex items-center gap-1">
            <Headphones size={12} className="text-primary" />
            <span className="text-[9px] text-secondary-foreground font-medium">24/7 Support</span>
          </div>
        </div>
      </header>

      {/* Side Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] max-w-mobile mx-auto">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[75%] bg-card animate-slide-up overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between bg-primary">
              <div>
                <h2 className="font-script text-xl text-primary-foreground">Dress Code</h2>
                <p className="text-[8px] tracking-[2px] uppercase text-primary-foreground/80">Kapad & Readymade</p>
              </div>
              <button onClick={() => setMenuOpen(false)}>
                <X size={20} className="text-primary-foreground" />
              </button>
            </div>

            <nav className="py-2">
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center justify-between px-4 py-3 hover:bg-secondary">
                <span className="text-sm font-medium">Home</span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </Link>
              {categories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.id}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between px-4 py-3 hover:bg-secondary">
                  <span className="text-sm font-medium">{cat.icon} {cat.name}</span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-2">
                <Link to="/account" onClick={() => setMenuOpen(false)} className="flex items-center justify-between px-4 py-3 hover:bg-secondary">
                  <span className="text-sm font-medium">👤 My Account</span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center justify-between px-4 py-3 hover:bg-secondary">
                  <span className="text-sm font-medium">❤️ Wishlist</span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center justify-between px-4 py-3 hover:bg-secondary">
                  <span className="text-sm font-medium">🛒 Cart</span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
