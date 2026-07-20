import MaterialIcon from './MaterialIcon'

const features = [
  { icon: 'local_shipping', title: 'Gratis Ongkir', subtitle: 'Min. belanja Rp 500rb' },
  { icon: 'verified_user', title: 'Garansi Resmi', subtitle: 'Produk 100% Original' },
  { icon: 'payments', title: 'Pembayaran Aman', subtitle: 'Multi-metode bayar' },
  { icon: 'support_agent', title: 'Dukungan 24/7', subtitle: 'Respon cepat & solutif' },
]

export default function FeaturesBar() {
  return (
    <section className="mt-xl bg-surface-container py-lg px-gutter border-y border-outline-variant">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-md">
        {features.map((f) => (
          <div key={f.title} className="flex items-center gap-sm">
            <div className="p-sm bg-white rounded-full shadow-sm text-secondary">
              <MaterialIcon name={f.icon} className="text-[32px]" />
            </div>
            <div>
              <p className="font-label-md text-primary">{f.title}</p>
              <p className="text-[12px] text-on-surface-variant">{f.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
