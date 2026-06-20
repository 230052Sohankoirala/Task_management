import { PageHeader } from "../../components/layout/PageHeader";
import { TaskForm } from "../../components/tasks/TaskForm";

export default function CreateTask() {
  return <><PageHeader title="Create Task" description="Capture ownership, estimate, dates, and workflow status." /><section className="card"><TaskForm /></section></>;
}
