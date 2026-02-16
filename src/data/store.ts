import type { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Review {
  id: number;
  productId: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const getCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem('sk-cart') || '[]');
  } catch { return []; }
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('sk-cart', JSON.stringify(cart));
};

export const getWishlist = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem('sk-wishlist') || '[]');
  } catch { return []; }
};

export const saveWishlist = (wishlist: number[]) => {
  localStorage.setItem('sk-wishlist', JSON.stringify(wishlist));
};

// Recently Viewed
export const getRecentlyViewed = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem('sk-recent') || '[]');
  } catch { return []; }
};

export const addRecentlyViewed = (productId: number) => {
  const recent = getRecentlyViewed().filter(id => id !== productId);
  recent.unshift(productId);
  localStorage.setItem('sk-recent', JSON.stringify(recent.slice(0, 12)));
};

// Reviews
export const getReviews = (productId: number): Review[] => {
  try {
    const all = JSON.parse(localStorage.getItem('sk-reviews') || '[]') as Review[];
    return all.filter(r => r.productId === productId);
  } catch { return []; }
};

export const addReview = (review: Omit<Review, 'id' | 'date'>) => {
  try {
    const all = JSON.parse(localStorage.getItem('sk-reviews') || '[]') as Review[];
    all.push({ ...review, id: Date.now(), date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) });
    localStorage.setItem('sk-reviews', JSON.stringify(all));
  } catch {}
};
