import { useContext } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import { EmptyState } from "../../components/common/State";
import { PageHeader } from "../../components/layout/PageHeader";
import { TaskForm } from "../../components/tasks/TaskForm";

export default function EditTask() {
  const { id } = useParams();
  const { tasks } = useContext(TaskContext);
  const task = tasks.find((item) => item.id === id);
  if (!task) return <EmptyState title="Task not found" />;
  return <><PageHeader title="Edit Task" description={task.key} /><section className="card"><TaskForm task={task} /></section></>;
}
