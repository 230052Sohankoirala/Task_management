import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TaskContext } from "../../contexts/TaskContext";
import { PRIORITIES, TASK_STATUSES, TASK_TYPES } from "../../utils/constants";
import { Button } from "../common/Button";
import { DateInput, Input, Select, Textarea } from "../common/Form";
import { AssigneeSelector } from "./AssigneeSelector";

export function TaskForm({ task }) {
  const navigate = useNavigate();
  const { saveTask } = useContext(TaskContext);
  const { projects } = useContext(ProjectContext);
  const [form, setForm] = useState(task || {
    title: "", description: "", projectId: "", type: "Task", status: "Backlog", priority: "Medium", reporterId: "u1", assigneeId: "u4", labels: ["frontend"], sprintId: "", storyPoints: 3, startDate: "", dueDate: "", estimatedHours: 8, loggedHours: 0, parentTaskId: "", subtasks: [], attachments: 0, watchers: ["u1"], comments: 0,
  });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <form className="form-grid" onSubmit={(event) => { event.preventDefault(); saveTask(form); navigate(form.sprintId ? "/board" : "/backlog"); }}>
      <label>Title<Input value={form.title} onChange={(event) => update("title", event.target.value)} required /></label>
      <label>Project<Select value={form.projectId} onChange={(event) => update("projectId", event.target.value)}><option value="">No project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</Select></label>
      <label>Type<Select value={form.type} onChange={(event) => update("type", event.target.value)}>{TASK_TYPES.map((item) => <option key={item}>{item}</option>)}</Select></label>
      <label>Status<Select value={form.status} onChange={(event) => update("status", event.target.value)}>{TASK_STATUSES.map((item) => <option key={item}>{item}</option>)}</Select></label>
      <label>Priority<Select value={form.priority} onChange={(event) => update("priority", event.target.value)}>{PRIORITIES.map((item) => <option key={item}>{item}</option>)}</Select></label>
      <label>Assignee<AssigneeSelector value={form.assigneeId} onChange={(value) => update("assigneeId", value)} /></label>
      <label>Due date<DateInput value={form.dueDate} onChange={(event) => update("dueDate", event.target.value)} /></label>
      <label>Story points<Input type="number" value={form.storyPoints} onChange={(event) => update("storyPoints", Number(event.target.value))} /></label>
      <label className="span-2">Description<Textarea value={form.description} onChange={(event) => update("description", event.target.value)} /></label>
      <Button icon={Save}>Save task</Button>
    </form>
  );
}
