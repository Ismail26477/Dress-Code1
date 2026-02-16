import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const items = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/wishlist', icon: Heart, label: 'Wishlist' },
    { to: '/cart', icon: ShoppingBag, label: 'Cart' },
    { to: '/account', icon: User, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border max-w-mobile mx-auto">
      <div className="flex items-center justify-around py-2">
        {items.map(item => {
          const active = item.to === '/' ? path === '/' : path.startsWith(item.to);
          return (
            <Link key={item.to} to={item.to} className="flex flex-col items-center gap-0.5 py-1 px-3">
              <item.icon size={20} className={active ? 'text-primary' : 'text-muted-foreground'} fill={active ? 'currentColor' : 'none'} />
              <span className={`text-[10px] ${active ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
