import MaterialIcon from './MaterialIcon'

export default function StarRating({ rating, reviewCount }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<MaterialIcon key={i} name="star" className="text-[14px] text-yellow-500" fill={1} />)
    } else if (rating >= i - 0.5) {
      stars.push(<MaterialIcon key={i} name="star_half" className="text-[14px] text-yellow-500" fill={0.5} />)
    } else {
      stars.push(<MaterialIcon key={i} name="star" className="text-[14px] text-outline-variant" />)
    }
  }

  return (
    <div className="flex items-center gap-xs mb-sm">
      <div className="flex items-center">{stars}</div>
      {reviewCount != null && (
        <span className="text-[10px] text-on-surface-variant">({reviewCount} Ulasan)</span>
      )}
    </div>
  )
}
