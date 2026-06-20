import { MessageCircle, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";
import { users } from "../../data/users";
import { formatDate } from "../../utils/formatters";
import { Avatar } from "../common/Avatar";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskTypeIcon } from "./TaskTypeIcon";

export function TaskCard({ task }) {
  const assignee = users.find((user) => user.id === task.assigneeId);
  return (
    <article className="task-card">
      <div className="task-card-top">
        <span>{task.key}</span>
        <TaskTypeIcon type={task.type} />
      </div>
      <Link to={`/tasks/${task.id}`} className="task-title">{task.title}</Link>
      <div className="task-labels">{task.labels.map((label) => <small key={label}>{label}</small>)}</div>
      <div className="task-meta">
        <TaskPriorityBadge priority={task.priority} />
        <span>{formatDate(task.dueDate)}</span>
      </div>
      <footer>
        <Avatar name={assignee?.name} />
        <span><MessageCircle size={14} />{task.comments}</span>
        <span><Paperclip size={14} />{task.attachments}</span>
        <strong>{task.storyPoints}</strong>
      </footer>
    </article>
  );
}
