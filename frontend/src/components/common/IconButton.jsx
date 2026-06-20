import clsx from "clsx";

export function IconButton({ icon: Icon, label, className, ...props }) {
  return (
    <button className={clsx("icon-btn", className)} aria-label={label} title={label} {...props}>
      <Icon size={18} />
    </button>
  );
}
