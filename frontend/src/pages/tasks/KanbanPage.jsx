import { PageHeader } from "../../components/layout/PageHeader";
import { KanbanBoard } from "../../components/board/KanbanBoard";

export default function KanbanPage() {
  return <><PageHeader title="Sprint Board" description="Track the work in the currently active sprint." /><KanbanBoard /></>;
}
