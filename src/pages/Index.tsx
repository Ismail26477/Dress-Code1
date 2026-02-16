import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeroSlider from '@/components/HeroSlider';
import FlashSaleTimer from '@/components/FlashSaleTimer';
import StaggeredGrid from '@/components/StaggeredGrid';
import { categories, products, flashSaleProducts } from '@/data/products';
import { getRecentlyViewed } from '@/data/store';

const Index = () => {
  const featured = products.filter(p => p.tags.includes('Best selling')).slice(0, 8);
  const trending = products.filter(p => p.tags.includes('Trendy')).slice(0, 6);
  const newArrivals = products.filter(p => p.tags.includes('New')).slice(0, 6);
  const [recentlyViewed, setRecentlyViewed] = useState<typeof products>([]);

  useEffect(() => {
    const ids = getRecentlyViewed();
    setRecentlyViewed(ids.map(id => products.find(p => p.id === id)!).filter(Boolean).slice(0, 8));
  }, []);

  return (
    <div className="pb-4">
      {/* Hero */}
      <section className="pt-2">
        <HeroSlider />
      </section>

      {/* Offer strip */}
      <section className="mx-3 mt-3 bg-accent/30 rounded-lg px-3 py-2 flex items-center gap-2">
        <span className="text-lg">🎁</span>
        <div>
          <p className="text-xs font-bold text-foreground">Special Offer: Flat 25% Off</p>
          <p className="text-[10px] text-muted-foreground">Use code SHIVAM25 on orders above ₹999</p>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-5">
        <h2 className="font-script text-xl font-bold px-3 mb-3 text-foreground">Shop by Category</h2>
        <div className="flex overflow-x-auto gap-3 px-3 hide-scrollbar">
          {categories.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center gap-1.5 min-w-[64px]">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-medium text-foreground text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="mt-6">
        <div className="px-3 mb-3">
          <FlashSaleTimer />
        </div>
        <div className="flex overflow-x-auto gap-3 px-3 hide-scrollbar">
          {flashSaleProducts.map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="min-w-[140px] max-w-[140px]">
              <div className="rounded-lg overflow-hidden bg-secondary aspect-[3/4]">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[11px] font-medium mt-1 line-clamp-1 text-foreground">{p.name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-primary">₹{p.price}</span>
                {p.originalPrice && <span className="text-[10px] text-muted-foreground line-through">₹{p.originalPrice}</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Selling - Staggered Grid */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-3 mb-3">
          <h2 className="font-script text-xl font-bold text-foreground">Best Selling</h2>
          <Link to="/category/all" className="text-xs text-primary font-medium">View All</Link>
        </div>
        <StaggeredGrid products={featured} />
      </section>

      {/* Membership Banner */}
      <section className="mx-3 mt-6 bg-foreground rounded-xl p-4 text-center">
        <p className="font-script text-xl text-background">Join Shivam Club</p>
        <p className="text-xs text-background/70 mt-1">Get exclusive deals & early access to new collections</p>
        <button className="mt-3 bg-accent text-accent-foreground text-xs font-bold px-6 py-2 rounded-full">
          Join Free
        </button>
      </section>

      {/* Trending */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-3 mb-3">
          <h2 className="font-script text-xl font-bold text-foreground">Trending Now</h2>
          <Link to="/search" className="text-xs text-primary font-medium">See All</Link>
        </div>
        <StaggeredGrid products={trending} />
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="mt-6">
          <div className="flex items-center justify-between px-3 mb-3">
            <h2 className="font-script text-xl font-bold text-foreground">New Arrivals</h2>
            <Link to="/search" className="text-xs text-primary font-medium">See All</Link>
          </div>
          <StaggeredGrid products={newArrivals} />
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mt-6">
          <h2 className="font-script text-xl font-bold px-3 mb-3 text-foreground">Recently Viewed</h2>
          <div className="flex overflow-x-auto gap-3 px-3 hide-scrollbar">
            {recentlyViewed.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="min-w-[120px] max-w-[120px]">
                <div className="rounded-lg overflow-hidden bg-secondary aspect-[3/4]">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="text-[10px] font-medium mt-1 line-clamp-1 text-foreground">{p.name}</h3>
                <span className="text-xs font-bold text-foreground">₹{p.price.toLocaleString()}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* You Might Also Like */}
      <section className="mt-6 mb-2">
        <h2 className="font-script text-xl font-bold px-3 mb-3 text-foreground">You Might Also Like</h2>
        <StaggeredGrid products={products.slice(8, 18)} />
      </section>
    </div>
  );
};

export default Index;
