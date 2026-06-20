import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
import { PageHeader } from "../components/layout/PageHeader";
import { TaskTable } from "../components/tasks/TaskTable";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { tasks } = useContext(TaskContext);
  const results = tasks.filter((task) => `${task.key} ${task.title}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeader title="Search Results" description={`Results for "${query}"`} /><TaskTable tasks={results} /></>;
}
