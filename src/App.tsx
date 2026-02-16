import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import PromoPopup from "./components/PromoPopup";
import WhatsAppButton from "./components/WhatsAppButton";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SearchPage from "./pages/SearchPage";
import Wishlist from "./pages/Wishlist";
import CategoryPage from "./pages/CategoryPage";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideHeaderPaths = ['/product/', '/cart', '/checkout'];
  const showHeader = !hideHeaderPaths.some(p => location.pathname.startsWith(p));
  const hideBottomPaths = ['/product/', '/checkout'];
  const showBottom = !hideBottomPaths.some(p => location.pathname.startsWith(p));

  return (
    <div className="max-w-mobile mx-auto min-h-screen bg-background relative">
      {showHeader && <Header />}
      <main className={showHeader ? 'pt-[110px]' : ''}>
        {children}
      </main>
      {showBottom && <BottomNav />}
      <WhatsAppButton />
      <PromoPopup />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
