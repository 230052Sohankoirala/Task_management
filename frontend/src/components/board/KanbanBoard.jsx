import { useContext, useMemo, useState } from "react";
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { TaskContext } from "../../contexts/TaskContext";
import { TASK_STATUSES } from "../../utils/constants";
import { Button } from "../common/Button";
import { IconButton } from "../common/IconButton";
import { TaskCard } from "../tasks/TaskCard";
import { TaskFilters } from "../tasks/TaskFilters";

function DraggableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });
  return <div ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform) }} {...listeners} {...attributes}><TaskCard task={task} /></div>;
}

function Column({ status, tasks }) {
  const [collapsed, setCollapsed] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <section className={`kanban-column ${isOver ? "over" : ""}`} ref={setNodeRef}>
      <header><button onClick={() => setCollapsed((value) => !value)}>{collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}{status}</button><span>{tasks.length}</span></header>
      {!collapsed ? <div className="kanban-stack">{tasks.map((task) => <DraggableTask key={task.id} task={task} />)}</div> : null}
    </section>
  );
}

export function KanbanBoard() {
  const { tasks, updateTaskStatus } = useContext(TaskContext);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("priority");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const filtered = useMemo(() => tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()) || task.key.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => !priority || task.priority === priority)
    .filter((task) => !type || task.type === type)
    .sort((a, b) => String(a[sort]).localeCompare(String(b[sort]))), [tasks, search, priority, type, sort]);

  return (
    <div className="board-space">
      <div className="board-toolbar">
        <TaskFilters search={search} setSearch={setSearch} priority={priority} setPriority={setPriority} type={type} setType={setType} />
        <select className="field compact" value={sort} onChange={(event) => setSort(event.target.value)}><option value="priority">Sort priority</option><option value="dueDate">Sort due date</option><option value="storyPoints">Sort points</option></select>
        <Button icon={Plus}>Add task</Button>
      </div>
      <DndContext sensors={sensors} onDragEnd={({ active, over }) => { if (over?.id) updateTaskStatus(active.id, over.id); }}>
        <div className="kanban-board">
          {TASK_STATUSES.map((status) => <Column key={status} status={status} tasks={filtered.filter((task) => task.status === status)} />)}
        </div>
      </DndContext>
    </div>
  );
}
