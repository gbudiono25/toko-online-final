import { useEffect, useState } from "react";
import MaterialIcon from "./MaterialIcon";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { fetchProducts } from "../services/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        const normalized = data.map((product) => ({
          id: product.id,
          name: product.name,
          category: product.category,
          rating: product.rating,
          reviewCount: product.review_count,
          price: `Rp ${product.price.toLocaleString("id-ID")}`,
          oldPrice: product.old_price
            ? `Rp ${product.old_price.toLocaleString("id-ID")}`
            : null,
          badge: product.badge_text
            ? {
                text: product.badge_text,
                type: product.badge_type || "secondary",
              }
            : null,
          image: product.image_url,
          alt: product.alt_text,
        }));
        setProducts(normalized);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <p className="px-gutter max-w-container-max mx-auto mt-xl text-on-surface-variant">
        Memuat produk...
      </p>
    );
  }

  if (error) {
    return (
      <p className="px-gutter max-w-container-max mx-auto mt-xl text-error">
        Gagal memuat produk: {error}
      </p>
    );
  }

  return (
    <section className="px-gutter max-w-container-max mx-auto mt-xl">
      <div className="flex flex-col md:flex-row gap-lg">
        <FilterSidebar />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-md">
            <p className="text-body-sm text-on-surface-variant">
              Menampilkan{" "}
              <span className="font-bold text-on-surface">24 Produk</span>{" "}
              Terbaik
            </p>
            <div className="flex items-center gap-sm">
              <span className="text-body-sm text-on-surface-variant">
                Urutkan:
              </span>
              <select className="bg-white border border-outline-variant rounded px-sm py-xs text-body-sm outline-none focus:ring-1 focus:ring-secondary">
                <option>Terpopuler</option>
                <option>Terbaru</option>
                <option>Harga Terendah</option>
                <option>Harga Tertinggi</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-xl flex justify-center items-center gap-sm">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-secondary transition-all">
              <MaterialIcon name="chevron_left" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary text-on-secondary font-label-md">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-secondary font-label-md">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-secondary font-label-md">
              3
            </button>
            <span className="text-outline-variant">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-secondary transition-all">
              <MaterialIcon name="chevron_right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
