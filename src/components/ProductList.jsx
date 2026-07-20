import MaterialIcon from './MaterialIcon'
import ProductCard from './ProductCard'
import FilterSidebar from './FilterSidebar'
import { products } from '../data'

export default function ProductList() {
  return (
    <section className="px-gutter max-w-container-max mx-auto mt-xl">
      <div className="flex flex-col md:flex-row gap-lg">
        <FilterSidebar />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-md">
            <p className="text-body-sm text-on-surface-variant">
              Menampilkan <span className="font-bold text-on-surface">24 Produk</span> Terbaik
            </p>
            <div className="flex items-center gap-sm">
              <span className="text-body-sm text-on-surface-variant">Urutkan:</span>
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
  )
}
