import { Sidebar } from "./Sidebar";

export function MobileSidebar({ open, onClose }) {
  return (
    <div className={`mobile-shell ${open ? "show" : ""}`}>
      <button className="mobile-backdrop" aria-label="Close menu" onClick={onClose} />
      <Sidebar mobileOpen={open} onClose={onClose} />
    </div>
  );
}
