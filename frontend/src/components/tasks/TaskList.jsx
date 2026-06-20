import { TaskCard } from "./TaskCard";

export function TaskList({ tasks }) {
  return <div className="task-grid">{tasks.map((task) => <TaskCard key={task.id} task={task} />)}</div>;
}
