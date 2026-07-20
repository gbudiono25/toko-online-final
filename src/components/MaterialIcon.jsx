export default function MaterialIcon({ name, className = '', fill = 0 }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={fill ? { fontVariationSettings: `'FILL' ${fill}` } : undefined}
    >
      {name}
    </span>
  )
}
