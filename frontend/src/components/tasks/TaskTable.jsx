import { Link } from "react-router-dom";
import { Table } from "../common/Table";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskStatusBadge } from "./TaskStatusBadge";

export function TaskTable({ tasks }) {
  return (
    <Table
      rows={tasks}
      columns={[
        { key: "key", label: "Key", render: (task) => <Link to={`/tasks/${task.id}`}>{task.key}</Link> },
        { key: "title", label: "Title" },
        { key: "status", label: "Status", render: (task) => <TaskStatusBadge status={task.status} /> },
        { key: "priority", label: "Priority", render: (task) => <TaskPriorityBadge priority={task.priority} /> },
        { key: "storyPoints", label: "Points" },
      ]}
    />
  );
}
