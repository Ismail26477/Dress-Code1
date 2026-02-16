import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getCart, saveCart } from '@/data/store';

const Checkout = () => {
  const navigate = useNavigate();
  const cart = getCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const placeOrder = () => {
    saveCart([]);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-sale rounded-full flex items-center justify-center mb-4">
          <Check size={32} className="text-sale-foreground" />
        </div>
        <h1 className="font-script text-2xl font-bold text-foreground">Order Confirmed!</h1>
        <p className="text-sm text-muted-foreground mt-2">Your order has been placed successfully. You'll receive a confirmation shortly.</p>
        <p className="text-xs text-muted-foreground mt-1">Order ID: #SK{Date.now().toString().slice(-6)}</p>
        <Link to="/" className="mt-6 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold text-sm">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <div className="sticky top-0 bg-card z-40 flex items-center gap-3 px-3 py-3 border-b border-border">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}><ArrowLeft size={22} /></button>
        <h1 className="text-lg font-bold">Checkout</h1>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-2 py-4 px-6">
        {['Address', 'Payment', 'Confirm'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {i + 1 < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={`text-xs ${i + 1 <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s}</span>
            {i < 2 && <div className={`w-8 h-0.5 ${i + 1 < step ? 'bg-primary' : 'bg-muted'}`} />}
          </div>
        ))}
      </div>

      <div className="px-4">
        {step === 1 && (
          <div className="space-y-3">
            <h2 className="font-semibold text-sm">Delivery Address</h2>
            {['Full Name', 'Phone Number', 'Address Line 1', 'Address Line 2', 'City', 'Pincode'].map(field => (
              <input key={field} placeholder={field} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-card placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <h2 className="font-semibold text-sm">Payment Method</h2>
            {['Cash on Delivery', 'UPI / Google Pay', 'Credit / Debit Card', 'Net Banking'].map(method => (
              <label key={method} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary">
                <input type="radio" name="payment" className="accent-primary" defaultChecked={method === 'Cash on Delivery'} />
                <span className="text-sm">{method}</span>
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <h2 className="font-semibold text-sm">Order Summary</h2>
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="w-12 h-14 rounded-lg overflow-hidden bg-secondary">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium line-clamp-1">{item.product.name}</p>
                  <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold">₹{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between font-bold">
              <span>Total</span><span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-mobile mx-auto p-4">
        <button onClick={() => step < 3 ? setStep(step + 1) : placeOrder()}
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-sm">
          {step < 3 ? 'Continue' : `Place Order • ₹${total.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
