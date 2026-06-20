export function Tooltip({ label, children }) {
  return <span className="tooltip" data-tip={label}>{children}</span>;
}
