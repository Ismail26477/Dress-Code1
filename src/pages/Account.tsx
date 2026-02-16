import { ArrowLeft, ChevronRight, User, MapPin, Package, Heart, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const menuItems = [
  { icon: Package, label: 'My Orders', to: '#' },
  { icon: Heart, label: 'Wishlist', to: '/wishlist' },
  { icon: MapPin, label: 'Addresses', to: '#' },
  { icon: Settings, label: 'Settings', to: '#' },
  { icon: HelpCircle, label: 'Help & Support', to: '#' },
];

const Account = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-card z-40 flex items-center gap-3 px-3 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft size={22} /></button>
        <h1 className="text-lg font-bold">My Account</h1>
      </div>

      {/* Profile */}
      <div className="px-4 py-6 flex items-center gap-3 border-b border-border">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
          <User size={24} className="text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-bold text-base">Guest User</h2>
          <p className="text-xs text-muted-foreground">Login to access your orders & wishlist</p>
        </div>
      </div>

      {/* Menu */}
      <div className="py-2">
        {menuItems.map(item => (
          <Link key={item.label} to={item.to} className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary">
            <item.icon size={20} className="text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </Link>
        ))}
        <button className="flex items-center gap-3 px-4 py-3.5 w-full text-left hover:bg-secondary">
          <LogOut size={20} className="text-destructive" />
          <span className="text-sm font-medium text-destructive">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Account;
