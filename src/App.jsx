import { lazy, Suspense } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import FeaturesBar from "./components/FeaturesBar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import MaterialIcon from "./components/MaterialIcon";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const CartPage = lazy(() => import("./pages/CartPage"));

function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-6 z-[100] bg-primary text-on-primary px-md py-sm rounded-xl shadow-xl flex items-center gap-sm transition-all">
      <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
        <MaterialIcon name="check" className="text-[16px]" />
      </span>
      <span className="text-sm font-label-md">{toast}</span>
    </div>
  );
}

function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <Categories />
        <ProductList />
        <FeaturesBar />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
          <Header />
          <Suspense
            fallback={
              <div className="min-h-[40vh] flex items-center justify-center text-on-surface-variant">
                Memuat halaman...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Suspense>
          <Toast />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
