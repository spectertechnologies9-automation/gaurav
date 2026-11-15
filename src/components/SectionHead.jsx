export default function SectionHead({ n, label, id, children, text, color = 'yellow' }) {
  return (
    <div className="shead">
      <div className="shead__row reveal">
        <span className="num">{n}</span>
        <span className="tag" style={{ '--c': `var(--${color})` }}>
          {label}
        </span>
      </div>
      <h2 id={id} className="h-lg reveal">
        {children}
      </h2>
      {text && <p className="reveal">{text}</p>}
    </div>
  );
}
