import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Edit } from "lucide-react";
import { TaskContext } from "../../contexts/TaskContext";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { EmptyState } from "../../components/common/State";
import { PageHeader } from "../../components/layout/PageHeader";
import { ActivityTimeline } from "../../components/tasks/ActivityTimeline";
import { AttachmentList } from "../../components/tasks/AttachmentList";
import { CommentSection } from "../../components/tasks/CommentSection";
import { SubtaskList } from "../../components/tasks/SubtaskList";
import { TaskPriorityBadge } from "../../components/tasks/TaskPriorityBadge";
import { TaskStatusBadge } from "../../components/tasks/TaskStatusBadge";
import { TaskTypeIcon } from "../../components/tasks/TaskTypeIcon";

export default function TaskDetails() {
  const { id } = useParams();
  const { tasks } = useContext(TaskContext);
  const task = tasks.find((item) => item.id === id);
  if (!task) return <EmptyState title="Task not found" />;
  return <><PageHeader title={`${task.key}: ${task.title}`} description={task.description} action={<Link to={`/tasks/${task.id}/edit`}><Button icon={Edit}>Edit task</Button></Link>} /><div className="two-col"><Card><div className="inline-stack"><TaskTypeIcon type={task.type} /><TaskStatusBadge status={task.status} /><TaskPriorityBadge priority={task.priority} /></div><p>Estimated {task.estimatedHours}h · Logged {task.loggedHours}h · {task.storyPoints} points</p><ActivityTimeline /></Card><div className="stack"><SubtaskList subtasks={task.subtasks} /><AttachmentList count={task.attachments} /><CommentSection /></div></div></>;
}
