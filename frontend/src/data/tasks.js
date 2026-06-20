const statuses = ["Backlog", "To Do", "In Progress", "In Review", "Done"];
const types = ["Epic", "Story", "Task", "Bug", "Subtask"];
const priorities = ["Critical", "High", "Medium", "Low"];
const labels = [["frontend"], ["api"], ["ux"], ["qa"], ["release"], ["security"]];

export const tasks = Array.from({ length: 20 }, (_, index) => {
  const project = ["ATL", "BCN", "NTH", "HBR"][index % 4];
  return {
    id: `t${index + 1}`,
    key: `${project}-${index + 1}`,
    title: [
      "Design task detail layout",
      "Implement notification preferences",
      "Create sprint velocity report",
      "Fix board drag persistence",
      "Add project health indicator",
    ][index % 5],
    description: "Mock task description with enough context for planning, ownership, and QA.",
    projectId: `p${(index % 4) + 1}`,
    type: types[index % types.length],
    status: statuses[index % statuses.length],
    priority: priorities[index % priorities.length],
    reporterId: "u2",
    assigneeId: `u${(index % 6) + 1}`,
    labels: labels[index % labels.length],
    sprintId: index < 12 ? `s${(index % 3) + 1}` : "",
    storyPoints: (index % 8) + 1,
    startDate: "2026-06-01",
    dueDate: `2026-07-${String((index % 24) + 1).padStart(2, "0")}`,
    estimatedHours: 8 + index,
    loggedHours: index % 9,
    parentTaskId: index > 14 ? "t1" : "",
    subtasks: index < 4 ? [`st${index + 1}`] : [],
    attachments: index % 3,
    watchers: ["u1", "u2"],
    comments: index % 5,
  };
});
