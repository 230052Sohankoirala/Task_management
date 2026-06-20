import { motion } from "framer-motion";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";
import { Button } from "./Button";

export function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation">
      <motion.div className="modal" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <header className="modal-header">
          <h2>{title}</h2>
          <IconButton icon={X} label="Close" onClick={onClose} />
        </header>
        {children}
      </motion.div>
    </div>
  );
}

export function ConfirmModal({ open, title, message, onCancel, onConfirm }) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <p>{message}</p>
      <footer className="modal-actions">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </footer>
    </Modal>
  );
}
