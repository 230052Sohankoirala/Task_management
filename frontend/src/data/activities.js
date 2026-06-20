export const activities = Array.from({ length: 15 }, (_, index) => ({
  id: `a${index + 1}`,
  userId: `u${(index % 6) + 1}`,
  action: ["updated status", "commented on", "created", "assigned", "logged work on"][index % 5],
  target: [`ATL-${index + 1}`, "Sprint 16", "Northstar Analytics"][index % 3],
  createdAt: `2026-06-${String(20 - index).padStart(2, "0")}T12:00:00.000Z`,
}));
