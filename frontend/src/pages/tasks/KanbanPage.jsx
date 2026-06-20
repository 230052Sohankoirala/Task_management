import { PageHeader } from "../../components/layout/PageHeader";
import { KanbanBoard } from "../../components/board/KanbanBoard";

export default function KanbanPage() {
  return <><PageHeader title="Kanban Board" description="Drag tasks through workflow columns." /><KanbanBoard /></>;
}
