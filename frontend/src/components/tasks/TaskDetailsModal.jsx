import { Modal } from "../common/Modal";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { TaskPriorityBadge } from "./TaskPriorityBadge";

export function TaskDetailsModal({ task, open, onClose }) {
  return (
    <Modal open={open} title={task?.key} onClose={onClose}>
      <h3>{task?.title}</h3>
      <p>{task?.description}</p>
      <div className="inline-stack"><TaskStatusBadge status={task?.status} /><TaskPriorityBadge priority={task?.priority} /></div>
    </Modal>
  );
}
