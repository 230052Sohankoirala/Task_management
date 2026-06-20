import { motion } from "framer-motion";

export function Dropdown({ open, children }) {
  if (!open) return null;
  return (
    <motion.div className="dropdown" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
}
