import MaterialIcon from './MaterialIcon'

export default function FilterSidebar() {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-md">
      <div className="bg-surface-container-low p-sm rounded-xl border border-outline-variant">
        <h3 className="font-label-md text-primary mb-sm flex items-center justify-between">
          Filter
          <MaterialIcon name="tune" className="text-[18px]" />
        </h3>
        <div className="space-y-sm">
          <div>
            <p className="text-label-sm font-semibold mb-xs">Harga</p>
            <div className="flex items-center gap-xs">
              <input
                className="w-full text-xs p-xs border border-outline-variant rounded bg-white outline-none"
                placeholder="Min"
                type="text"
              />
              <span className="text-outline-variant">-</span>
              <input
                className="w-full text-xs p-xs border border-outline-variant rounded bg-white outline-none"
                placeholder="Max"
                type="text"
              />
            </div>
          </div>
          <div>
            <p className="text-label-sm font-semibold mb-xs">Rating</p>
            <div className="space-y-1">
              <label className="flex items-center gap-xs cursor-pointer group">
                <input className="rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
                <span className="text-body-sm flex items-center text-on-surface-variant group-hover:text-primary">
                  4.0 ke atas <MaterialIcon name="star" className="text-[14px] text-yellow-500 ml-1" fill={1} />
                </span>
              </label>
              <label className="flex items-center gap-xs cursor-pointer group">
                <input className="rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
                <span className="text-body-sm flex items-center text-on-surface-variant group-hover:text-primary">
                  3.0 ke atas <MaterialIcon name="star" className="text-[14px] text-yellow-500 ml-1" fill={1} />
                </span>
              </label>
            </div>
          </div>
          <div>
            <p className="text-label-sm font-semibold mb-xs">Ketersediaan</p>
            <label className="flex items-center gap-xs cursor-pointer group">
              <input className="rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
              <span className="text-body-sm text-on-surface-variant group-hover:text-primary">Stok Tersedia</span>
            </label>
          </div>
        </div>
        <button className="w-full mt-md py-xs bg-primary text-on-primary rounded font-label-md hover:bg-primary-container transition-colors">
          Terapkan Filter
        </button>
      </div>
      <div className="bg-secondary-container/10 p-sm rounded-xl border border-secondary-container/20">
        <p className="text-label-sm text-secondary font-bold mb-xs">Butuh Bantuan?</p>
        <p className="text-xs text-on-surface-variant mb-sm">
          CS kami siap membantu Anda memilih produk yang tepat sesuai spesifikasi.
        </p>
        <button className="w-full py-xs bg-secondary text-on-secondary rounded font-label-md flex items-center justify-center gap-xs">
          <MaterialIcon name="chat" className="text-[16px]" /> Chat Sales
        </button>
      </div>
    </aside>
  )
}
