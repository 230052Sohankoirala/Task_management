import { MessageCircle, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { formatDate } from "../../utils/formatters";
import { Avatar } from "../common/Avatar";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskTypeIcon } from "./TaskTypeIcon";

export function TaskCard({ task }) {
  const { users } = useContext(UserContext);
  const assignee = users.find((user) => user.id === task.assigneeId);
  const commentCount = Array.isArray(task.comments) ? task.comments.length : task.comments || 0;
  const attachmentCount = Array.isArray(task.attachments) ? task.attachments.length : task.attachments || 0;
  return (
    <article className="task-card">
      <div className="task-card-top">
        <span>{task.key}</span>
        <TaskTypeIcon type={task.type} />
      </div>
      <Link to={`/tasks/${task.id}`} className="task-title">{task.title}</Link>
      <div className="task-labels">{(task.labels || []).map((label) => <small key={label}>{label}</small>)}</div>
      <div className="task-meta">
        <TaskPriorityBadge priority={task.priority} />
        <span>{formatDate(task.dueDate)}</span>
      </div>
      <footer>
        <Avatar name={assignee?.name} />
        <span><MessageCircle size={14} />{commentCount}</span>
        <span><Paperclip size={14} />{attachmentCount}</span>
        <strong>{task.storyPoints}</strong>
      </footer>
    </article>
  );
}
