import { Loader2 } from "lucide-react";
import clsx from "clsx";

export function Button({ children, variant = "primary", size = "md", loading = false, icon: Icon, className, ...props }) {
  return (
    <button className={clsx("btn", `btn-${variant}`, `btn-${size}`, className)} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 size={16} className="spin" /> : Icon ? <Icon size={16} /> : null}
      <span>{children}</span>
    </button>
  );
}
