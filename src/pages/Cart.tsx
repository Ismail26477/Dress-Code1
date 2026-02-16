import { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getCart, saveCart, type CartItem } from '@/data/store';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => { setCart(getCart()); }, []);

  const update = (newCart: CartItem[]) => { setCart(newCart); saveCart(newCart); };
  const remove = (id: number) => update(cart.filter(i => i.product.id !== id));
  const changeQty = (id: number, delta: number) => {
    update(cart.map(i => i.product.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const savings = cart.reduce((sum, i) => sum + ((i.product.originalPrice || i.product.price) - i.product.price) * i.quantity, 0);

  return (
    <div className="pb-40">
      <div className="sticky top-0 bg-card z-40 flex items-center gap-3 px-3 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft size={22} /></button>
        <h1 className="text-lg font-bold">Cart ({cart.length})</h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🛒</p>
          <p className="text-muted-foreground text-sm">Your cart is empty</p>
          <Link to="/" className="inline-block mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold">Shop Now</Link>
        </div>
      ) : (
        <>
          <div className="px-3 py-3 space-y-3">
            {cart.map(item => (
              <div key={item.product.id} className="flex gap-3 bg-card rounded-xl border border-border p-3">
                <Link to={`/product/${item.product.id}`} className="w-20 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Size: {item.selectedSize}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-sm font-bold">₹{item.product.price.toLocaleString()}</span>
                    {item.product.originalPrice && <span className="text-[10px] text-muted-foreground line-through">₹{item.product.originalPrice.toLocaleString()}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => changeQty(item.product.id, -1)} className="p-1.5"><Minus size={14} /></button>
                      <span className="px-3 text-xs font-medium">{item.quantity}</span>
                      <button onClick={() => changeQty(item.product.id, 1)} className="p-1.5"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => remove(item.product.id)} className="p-1.5 text-destructive"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-mobile mx-auto p-4">
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              {savings > 0 && <div className="flex justify-between text-sm"><span className="text-sale">Savings</span><span className="text-sale font-medium">-₹{savings.toLocaleString()}</span></div>}
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span className="text-sale font-medium">Free</span></div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border"><span>Total</span><span>₹{subtotal.toLocaleString()}</span></div>
            </div>
            <Link to="/checkout" className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-xl font-bold text-sm">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
