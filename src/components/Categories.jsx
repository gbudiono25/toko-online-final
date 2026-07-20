import MaterialIcon from './MaterialIcon'
import { categories } from '../data'

export default function Categories() {
  return (
    <section className="px-gutter max-w-container-max mx-auto mt-xl">
      <div className="flex justify-between items-end mb-md">
        <div>
          <h2 className="font-headline-sm text-primary">Kategori Unggulan</h2>
          <p className="text-on-surface-variant font-body-sm">Telusuri produk berdasarkan kebutuhan Anda</p>
        </div>
        <a
          className="text-secondary font-label-md flex items-center gap-base hover:underline transition-all"
          href="#"
        >
          Lihat Semua <MaterialIcon name="arrow_forward" className="text-[18px]" />
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-sm">
        {categories.map((cat) => (
          <div key={cat.name} className="group cursor-pointer">
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-md text-center transition-all group-hover:shadow-md group-hover:border-secondary">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-sm shadow-sm">
                <MaterialIcon name={cat.icon} className="text-primary text-[32px]" />
              </div>
              <p className="font-label-md text-on-surface">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
