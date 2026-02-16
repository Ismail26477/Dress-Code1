import productRustShirt from '@/assets/product-rust-shirt.png';
import productBlackJacket from '@/assets/product-black-jacket.png';
import productStripedShirt from '@/assets/product-striped-shirt.png';
import productGoldenGown from '@/assets/product-golden-gown.png';
import productBlackGown from '@/assets/product-black-gown.png';
import productGoldenJacket from '@/assets/product-golden-jacket.png';
import productBohoDress from '@/assets/product-boho-dress.png';
import productPinkDress from '@/assets/product-pink-dress.png';
import productGreenDress from '@/assets/product-green-dress.png';
import productBlueGown from '@/assets/product-blue-gown.png';
import productColorblockTee from '@/assets/product-colorblock-tee.png';
import productPinkBellGown from '@/assets/product-pink-bell-gown.png';
import productCreamPleatedDress from '@/assets/product-cream-pleated-dress.png';
import productSheerSkirtSet from '@/assets/product-sheer-skirt-set.png';
import productLaceMidiDress from '@/assets/product-lace-midi-dress.png';
import productEmbroideredSuit from '@/assets/product-embroidered-suit.png';
import productCamelCoat from '@/assets/product-camel-coat.png';
import productSequinGown from '@/assets/product-sequin-gown.png';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tags: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  isFastDelivery?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export const categories: Category[] = [
  { id: "men", name: "Men", icon: "👔", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
  { id: "women", name: "Women", icon: "👗", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop" },
  { id: "western-men", name: "Western Men", icon: "🧥", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=200&fit=crop" },
  { id: "western-women", name: "Western Women", icon: "👠", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707998?w=200&h=200&fit=crop" },
  { id: "accessories", name: "Accessories", icon: "💎", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=200&h=200&fit=crop" },
  { id: "footwear", name: "Footwear", icon: "👟", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" },
  { id: "kids", name: "Kids", icon: "🧒", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=200&h=200&fit=crop" },
  { id: "ethnic", name: "Ethnic Wear", icon: "🪷", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop" },
];

export const products: Product[] = [
  // ——— Uploaded image products ———
  { id: 1, name: "Colorblock Cross Tee", price: 699, originalPrice: 1199, image: productColorblockTee, category: "men", tags: ["Trendy", "New"], colors: ["#000", "#f5f5dc", "#808080"], sizes: ["S", "M", "L", "XL"], rating: 4.4, reviews: 198, description: "Modern colorblock t-shirt with geometric cross pattern. Premium cotton blend.", isFastDelivery: true },
  { id: 2, name: "Blush Bell Sleeve Gown", price: 3490, originalPrice: 5999, image: productPinkBellGown, category: "women", tags: ["Premium", "Trendy"], colors: ["#D4A0A0", "#f5f5dc", "#000"], sizes: ["S", "M", "L"], rating: 4.8, reviews: 267, description: "Elegant blush pink gown with dramatic bell sleeves and button detailing." },
  { id: 3, name: "Cream Pleated Midi Dress", price: 2990, originalPrice: 4999, image: productCreamPleatedDress, category: "western-women", tags: ["Best selling", "Trendy"], colors: ["#f5f5dc", "#000", "#C0C0C0"], sizes: ["XS", "S", "M", "L"], rating: 4.7, reviews: 345, description: "Sophisticated cream pleated dress with contrast-trimmed statement sleeves.", isFastDelivery: true },
  { id: 4, name: "Sheer Overlay Skirt Set", price: 2490, originalPrice: 3999, image: productSheerSkirtSet, category: "western-women", tags: ["Trendy", "New"], colors: ["#000", "#fff"], sizes: ["XS", "S", "M", "L"], rating: 4.6, reviews: 189, description: "White off-shoulder crop top paired with black sheer maxi overlay skirt." },
  { id: 5, name: "Lace Cape Midi Dress", price: 3990, originalPrice: 6999, image: productLaceMidiDress, category: "women", tags: ["Premium", "Best selling"], colors: ["#C9B99A", "#FFD700", "#f5f5dc"], sizes: ["S", "M", "L", "XL"], rating: 4.9, reviews: 412, description: "Champagne midi dress with intricate lace cape overlay. Perfect for celebrations.", isFastDelivery: true },
  { id: 6, name: "Embroidered Cotton Suit", price: 1890, originalPrice: 3499, image: productEmbroideredSuit, category: "ethnic", tags: ["Best selling", "Trendy"], colors: ["#8B6F47", "#fff", "#556B2F"], sizes: ["S", "M", "L", "XL"], rating: 4.5, reviews: 534, description: "Elegant brown cotton suit with white floral embroidery on sleeves and hem." },
  { id: 7, name: "Camel Wool Trench Coat", price: 4990, originalPrice: 8999, image: productCamelCoat, category: "western-women", tags: ["Premium", "Best selling"], colors: ["#C19A6B", "#000", "#2F4F4F"], sizes: ["S", "M", "L"], rating: 4.8, reviews: 156, description: "Luxurious camel wool trench coat with belted waist. Timeless winter essential." },
  { id: 8, name: "Burgundy Sequin Gown", price: 5990, originalPrice: 9999, image: productSequinGown, category: "western-women", tags: ["Premium"], colors: ["#800020", "#000", "#C0C0C0"], sizes: ["XS", "S", "M", "L"], rating: 4.9, reviews: 123, description: "Breathtaking burgundy sequin mermaid gown with bishop sleeves. Red carpet ready." },
  
  // ——— Previous uploaded image products ———
  { id: 9, name: "Rust Cotton Formal Shirt", price: 1290, originalPrice: 2199, image: productRustShirt, category: "men", tags: ["New", "Trendy"], colors: ["#A0522D", "#556B2F", "#f5f5dc"], sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.6, reviews: 312, description: "Premium rust cotton formal shirt with modern slim fit.", isFastDelivery: true },
  { id: 10, name: "Black Leather Varsity Jacket", price: 4490, originalPrice: 6999, image: productBlackJacket, category: "western-men", tags: ["Premium", "Best selling"], colors: ["#000", "#1a1a2e"], sizes: ["M", "L", "XL"], rating: 4.9, reviews: 189, description: "All-black leather varsity jacket with wool body." },
  { id: 11, name: "Striped Linen Casual Shirt", price: 990, originalPrice: 1599, image: productStripedShirt, category: "men", tags: ["Trendy", "New"], colors: ["#C08081", "#87CEEB", "#fff"], sizes: ["S", "M", "L", "XL"], rating: 4.4, reviews: 267, description: "Relaxed fit striped linen shirt for effortless summer style." },
  { id: 12, name: "Golden Embroidered Anarkali", price: 4990, originalPrice: 8999, image: productGoldenGown, category: "ethnic", tags: ["Premium", "Best selling"], colors: ["#DAA520", "#000080", "#f5f5dc"], sizes: ["S", "M", "L", "XL"], rating: 4.9, reviews: 456, description: "Stunning golden embroidered anarkali gown. Perfect for weddings.", isFastDelivery: true },
  { id: 13, name: "Black Satin Floral Gown", price: 3990, originalPrice: 6499, image: productBlackGown, category: "western-women", tags: ["Premium", "Trendy"], colors: ["#000", "#C0C0C0", "#DAA520"], sizes: ["XS", "S", "M", "L"], rating: 4.8, reviews: 234, description: "Elegant black satin top with champagne floral print skirt." },
  { id: 14, name: "Golden Embroidered Jacket Set", price: 3490, originalPrice: 5999, image: productGoldenJacket, category: "ethnic", tags: ["Premium", "New"], colors: ["#DAA520", "#000", "#8B4513"], sizes: ["S", "M", "L", "XL"], rating: 4.7, reviews: 178, description: "Luxurious golden embroidered sheer jacket with matching palazzo." },
  { id: 15, name: "Bohemian Embroidered Maxi", price: 2490, originalPrice: 4499, image: productBohoDress, category: "western-women", tags: ["Trendy", "New"], colors: ["#f5f5dc", "#DC143C", "#4682B4"], sizes: ["XS", "S", "M", "L"], rating: 4.6, reviews: 345, description: "Bohemian off-shoulder maxi dress with colorful floral embroidery." },
  { id: 16, name: "Blush Tiered Mini Dress", price: 1190, originalPrice: 1899, image: productPinkDress, category: "western-women", tags: ["Best selling", "Trendy"], colors: ["#D2869D", "#000", "#f5f5dc"], sizes: ["XS", "S", "M", "L"], rating: 4.5, reviews: 567, description: "Feminine blush pink tiered mini dress with pleated detailing." },
  { id: 17, name: "Emerald Ruffle Dress", price: 1490, originalPrice: 2499, image: productGreenDress, category: "western-women", tags: ["New", "Best selling"], colors: ["#006400", "#000", "#800020"], sizes: ["XS", "S", "M", "L"], rating: 4.7, reviews: 289, description: "Stunning emerald green cold-shoulder ruffle dress.", isFastDelivery: true },
  { id: 18, name: "Royal Blue Mermaid Gown", price: 5990, originalPrice: 9999, image: productBlueGown, category: "western-women", tags: ["Premium"], colors: ["#191970", "#000", "#4169E1"], sizes: ["XS", "S", "M", "L"], rating: 4.9, reviews: 123, description: "Breathtaking royal blue mermaid gown with sequin embroidery." },
];

export const flashSaleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price * 1.5).slice(0, 6);

export const getProductsByCategory = (categoryId: string) => products.filter(p => p.category === categoryId);

export const getDiscountPercent = (price: number, originalPrice?: number) => {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
