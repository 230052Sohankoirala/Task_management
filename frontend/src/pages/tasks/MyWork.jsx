import { useContext, useState } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import { PageHeader } from "../../components/layout/PageHeader";
import { TaskFilters } from "../../components/tasks/TaskFilters";
import { TaskTable } from "../../components/tasks/TaskTable";

export default function MyWork() {
  const { tasks } = useContext(TaskContext);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const filtered = tasks.filter((task) => (task.title.toLowerCase().includes(search.toLowerCase()) || task.key.toLowerCase().includes(search.toLowerCase())) && (!priority || task.priority === priority) && (!type || task.type === type));
  return <><PageHeader title="My Work" description="Assigned tasks, reviews, and active delivery." /><TaskFilters search={search} setSearch={setSearch} priority={priority} setPriority={setPriority} type={type} setType={setType} /><TaskTable tasks={filtered} /></>;
}
