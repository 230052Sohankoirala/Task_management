import { EmptyState } from "../common/State";
import { TaskCard } from "./TaskCard";

export function TaskList({ tasks }) {
  return tasks.length ? <div className="task-grid">{tasks.map((task) => <TaskCard key={task.id} task={task} />)}</div> : <EmptyState title="No tasks yet" description="New tasks will appear here after you create them." />;
}
