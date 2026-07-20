import MaterialIcon from './MaterialIcon'
import StarRating from './StarRating'

export default function ProductCard({ product }) {
  const { name, category, rating, reviewCount, price, oldPrice, badge, image, alt } = product

  const badgeClass =
    badge?.type === 'error'
      ? 'bg-error text-on-error'
      : 'bg-secondary text-on-secondary'

  return (
    <div className="bg-white border border-outline-variant rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-surface-container-low">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
          alt={alt}
        />
        {badge && (
          <div className={`absolute top-2 right-2 ${badgeClass} text-[10px] px-2 py-1 rounded-full font-bold`}>
            {badge.text}
          </div>
        )}
      </div>
      <div className="p-sm flex flex-col flex-1">
        <div className="flex items-center gap-xs mb-1">
          <span className="text-[10px] px-2 py-0.5 bg-surface-container-highest text-primary font-bold rounded">
            {category}
          </span>
        </div>
        <h4 className="font-label-md text-on-surface line-clamp-2 mb-xs group-hover:text-secondary transition-colors">
          {name}
        </h4>
        <StarRating rating={rating} reviewCount={reviewCount} />
        <div className="mt-auto">
          <div className="flex flex-col mb-sm">
            {oldPrice && <span className="text-outline-variant text-[12px] line-through">{oldPrice}</span>}
            <span className="text-primary font-bold text-lg">{price}</span>
          </div>
          <button className="w-full border border-primary text-primary py-xs rounded-lg font-label-md hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-xs active:scale-95">
            <MaterialIcon name="add_shopping_cart" className="text-[18px]" />
            Tambah
          </button>
        </div>
      </div>
    </div>
  )
}
