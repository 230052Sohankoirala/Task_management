export const notifications = [
  "Task assigned", "Mentioned", "Due soon", "Overdue", "Status changed", "Added to project", "New comment", "Sprint started", "Task assigned", "Due soon",
].map((type, index) => ({
  id: `n${index + 1}`,
  type,
  title: type,
  message: `${type} notification for ${index % 2 ? "Beacon Mobile" : "Atlas Platform"}.`,
  read: index > 3,
  createdAt: `2026-06-${String(20 - index).padStart(2, "0")}T09:00:00.000Z`,
}));
