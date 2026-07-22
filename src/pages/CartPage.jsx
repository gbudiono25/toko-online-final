import { useState } from 'react'
import { useCart } from '../context/CartContext'
import MaterialIcon from '../components/MaterialIcon'

export default function CartPage() {
  const { items, totalQty } = useCart()
  const [shipping, setShipping] = useState('reg')
  const [payment, setPayment] = useState('va')
  const [promo, setPromo] = useState('')
  const [vaOpen, setVaOpen] = useState(false)

  const shippingOptions = [
    { id: 'reg', name: 'J&T Express (Regular)', eta: 'Estimasi 2-3 hari kerja', price: 25000 },
    { id: 'ons', name: 'SiCepat BEST (Overnight)', eta: 'Estimasi besok sampai', price: 45000 },
    { id: 'inst', name: 'Gojek/Grab Instant', eta: 'Estimasi 2-4 jam', price: 85000 },
    { id: 'cargo', name: 'JNE Trucking (Cargo)', eta: 'Estimasi 5-7 hari kerja', price: 12000 },
  ]

  const selectedShipping = shippingOptions.find((s) => s.id === shipping) || shippingOptions[0]

  const subtotal = items.reduce((sum, it) => {
    const numeric = parseInt((it.price || '0').replace(/\D/g, '')) || 0
    return sum + numeric * it.qty
  }, 0)

  const discount = promo.trim().toUpperCase() === 'PROMONTHLY' ? 50000 : 0
  const serviceFee = 2000
  const total = subtotal + selectedShipping.price + serviceFee - discount

  const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

  const updateQty = (id, delta) => {
    // qty update would need a setter in context; for now we keep it local via items read
    console.log('update qty', id, delta)
  }

  return (
    <main className="max-w-container-max mx-auto px-gutter py-lg min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-md">
          <h1 className="font-headline-sm text-headline-sm text-primary mb-md">Keranjang Belanja</h1>

          <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
            {items.length === 0 && (
              <div className="p-md text-center text-on-surface-variant">Keranjang kosong</div>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                className="p-md flex flex-col sm:flex-row gap-md border-b border-outline-variant items-center sm:items-start"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.alt || item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-grow space-y-xs text-center sm:text-left">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-sm text-lg text-primary">{item.name}</h3>
                    <button className="text-error hover:opacity-80 transition-opacity">
                      <MaterialIcon name="delete" />
                    </button>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">Varian: Default</p>
                  <p className="text-primary font-bold text-lg">{item.price}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-md pt-sm">
                    <div className="flex items-center border border-outline rounded-lg bg-surface-container-lowest">
                      <button className="px-sm py-base hover:bg-surface-variant transition-colors">-</button>
                      <input
                        className="w-12 text-center border-none bg-transparent focus:ring-0 font-bold"
                        min="1"
                        type="number"
                        value={item.qty}
                        readOnly
                      />
                      <button className="px-sm py-base hover:bg-surface-variant transition-colors">+</button>
                    </div>
                    <span className="text-on-surface-variant text-body-sm">
                      Subtotal: {formatRupiah(parseInt((item.price || '0').replace(/\D/g, '')) * item.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping */}
          <div className="bg-white p-md rounded-xl border border-outline-variant shadow-sm space-y-md">
            <h2 className="font-headline-sm text-lg text-primary flex items-center gap-xs">
              <MaterialIcon name="local_shipping" className="text-secondary" />
              Pilih Ekspedisi Pengiriman
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
              {shippingOptions.map((opt) => (
                <label
                  key={opt.id}
                  className="relative flex cursor-pointer rounded-lg border border-outline-variant p-md focus:outline-none hover:bg-surface-container-low transition-colors"
                >
                  <input
                    checked={shipping === opt.id}
                    className="hidden peer"
                    name="shipping"
                    type="radio"
                    value={opt.id}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <p className="font-bold text-primary">{opt.name}</p>
                      <p className="text-on-surface-variant">{opt.eta}</p>
                    </div>
                    <p className="text-secondary font-bold">{formatRupiah(opt.price)}</p>
                  </div>
                  <div className="absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-secondary pointer-events-none" />
                </label>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white p-md rounded-xl border border-outline-variant shadow-sm space-y-md">
            <h2 className="font-headline-sm text-lg text-primary flex items-center gap-xs">
              <MaterialIcon name="account_balance_wallet" className="text-secondary" />
              Metode Pembayaran
            </h2>
            <div className="space-y-sm">
              <div className="border border-outline-variant rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-md bg-surface-container-low hover:bg-surface-variant transition-colors"
                  onClick={() => setVaOpen((v) => !v)}
                >
                  <span className="font-bold text-primary">Virtual Account (VA)</span>
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
                <div className={`${vaOpen ? '' : 'hidden'} p-md grid grid-cols-2 sm:grid-cols-4 gap-md border-t border-outline-variant`}>
                  {['BCA', 'Mandiri', 'BNI', 'BRI'].map((bank) => (
                    <div key={bank} className="flex flex-col items-center gap-xs cursor-pointer opacity-80 hover:opacity-100 transition-all">
                      <div className="h-10 w-16 bg-surface-container-high rounded flex items-center justify-center font-black text-blue-800 italic">{bank}</div>
                      <span className="text-[10px] font-bold uppercase">{bank} VA</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                <label className="flex items-center gap-md border border-outline-variant p-md rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
                  <input
                    checked={payment === 'qris'}
                    className="w-4 h-4 text-secondary focus:ring-secondary"
                    name="payment"
                    type="radio"
                    value="qris"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                      <MaterialIcon name="qr_code_2" className="text-sm" />
                    </div>
                    <span className="font-bold text-primary">QRIS</span>
                  </div>
                </label>
                <label className="flex items-center gap-md border border-outline-variant p-md rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
                  <input
                    checked={payment === 'ewallet'}
                    className="w-4 h-4 text-secondary focus:ring-secondary"
                    name="payment"
                    type="radio"
                    value="ewallet"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <MaterialIcon name="account_balance_wallet" className="text-sm" />
                    </div>
                    <span className="font-bold text-primary">E-Wallet (GoPay/OVO/Dana)</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-md">
            {/* Promo */}
            <div className="bg-white p-md rounded-xl border border-outline-variant shadow-sm space-y-sm">
              <label className="font-bold text-primary text-sm">Kupon & Diskon</label>
              <div className="flex gap-xs">
                <input
                  className="flex-grow border border-outline rounded-lg px-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  placeholder="Masukkan kode promo"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  type="text"
                />
                <button className="bg-primary text-white px-md py-sm rounded-lg font-bold hover:bg-primary-container transition-colors">
                  Terapkan
                </button>
              </div>
              <div className="flex items-center gap-xs p-xs bg-surface-container border border-dashed border-secondary rounded-lg">
                <MaterialIcon name="confirmation_number" className="text-secondary text-sm" />
                <span className="text-xs text-on-surface-variant font-medium">Hemat Rp 50.000 dengan "PROMONTHLY"</span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-md rounded-xl border border-outline-variant shadow-sm space-y-md">
              <h2 className="font-headline-sm text-lg text-primary">Ringkasan Belanja</h2>
              <div className="space-y-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Total Harga ({totalQty} barang)</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Total Ongkos Kirim</span>
                  <span>{formatRupiah(selectedShipping.price)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-error font-medium">
                    <span>Diskon Promo</span>
                    <span>- {formatRupiah(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>Biaya Layanan</span>
                  <span>{formatRupiah(serviceFee)}</span>
                </div>
                <hr className="border-outline-variant" />
                <div className="flex justify-between items-center pt-xs">
                  <span className="font-bold text-primary text-lg">Total Tagihan</span>
                  <span className="font-bold text-secondary text-xl">{formatRupiah(total)}</span>
                </div>
              </div>
              <button className="w-full bg-secondary text-white py-md rounded-xl font-bold text-lg hover:bg-secondary-container hover:shadow-lg transition-all active:scale-[0.98]">
                Bayar Sekarang
              </button>
              <div className="flex items-center justify-center gap-xs text-[10px] text-outline uppercase tracking-widest font-bold pt-sm">
                <MaterialIcon name="verified_user" className="text-xs" />
                Pembayaran Aman & Terenkripsi
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}