/** Responsive <picture> from a portrait slot in data/site.js. */
export default function Picture({ slot, sizes, eager = false, className, style }) {
  const { base, widths, fallback, alt, width, height } = slot;
  const srcSet = widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={eager ? 'eager' : 'lazy'}
        fetchpriority={eager ? 'high' : undefined}
        decoding="async"
      />
    </picture>
  );
}
