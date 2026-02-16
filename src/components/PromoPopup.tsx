import { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

const PromoPopup = () => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('promo-seen');
    if (!seen) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem('promo-seen', '1');
  };

  const copyCode = () => {
    navigator.clipboard.writeText('SHIVAM25');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center max-w-mobile mx-auto">
      <div className="absolute inset-0 bg-foreground/60" onClick={close} />
      <div className="relative bg-card rounded-2xl mx-6 p-6 animate-slide-up shadow-2xl w-full">
        <button onClick={close} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <X size={16} className="text-foreground" />
        </button>

        <div className="text-center">
          <p className="text-4xl mb-2">🎉</p>
          <h3 className="font-script text-2xl text-primary font-bold">Welcome!</h3>
          <p className="text-sm text-muted-foreground mt-1">Get 25% off on your first order</p>

          <div className="mt-4 bg-secondary rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Coupon Code</p>
              <p className="text-lg font-bold text-foreground tracking-widest">SHIVAM25</p>
            </div>
            <button onClick={copyCode} className="bg-primary text-primary-foreground px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-medium">
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>

          <button onClick={close} className="mt-4 w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-sm">
            Start Shopping
          </button>
          <p className="text-[10px] text-muted-foreground mt-2">*Min order ₹999. Valid for 7 days.</p>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
