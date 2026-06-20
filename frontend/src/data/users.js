import { ROLES } from "../utils/constants";

export const users = [
  { id: "u1", name: "Avery Stone", username: "avery", email: "avery@flowdesk.dev", role: ROLES.ADMIN, avatar: "AS", phone: "+1 555 0101", jobTitle: "Workspace Admin", department: "Operations", bio: "Keeps the delivery system healthy.", timezone: "America/New_York" },
  { id: "u2", name: "Maya Chen", username: "maya", email: "maya@flowdesk.dev", role: ROLES.PROJECT_MANAGER, avatar: "MC", phone: "+1 555 0102", jobTitle: "Product Lead", department: "Product", bio: "Turns ambiguity into launch plans.", timezone: "America/Los_Angeles" },
  { id: "u3", name: "Noah Patel", username: "noah", email: "noah@flowdesk.dev", role: ROLES.PROJECT_MANAGER, avatar: "NP", phone: "+1 555 0103", jobTitle: "Engineering Manager", department: "Engineering", bio: "Coordinates platform delivery.", timezone: "Asia/Katmandu" },
  { id: "u4", name: "Lina Brooks", username: "lina", email: "lina@flowdesk.dev", role: ROLES.TEAM_MEMBER, avatar: "LB", phone: "+1 555 0104", jobTitle: "Frontend Engineer", department: "Engineering", bio: "Builds precise user interfaces.", timezone: "Europe/London" },
  { id: "u5", name: "Mateo Rivera", username: "mateo", email: "mateo@flowdesk.dev", role: ROLES.TEAM_MEMBER, avatar: "MR", phone: "+1 555 0105", jobTitle: "QA Analyst", department: "Quality", bio: "Finds risk before users do.", timezone: "America/Chicago" },
  { id: "u6", name: "Iris Kim", username: "iris", email: "iris@flowdesk.dev", role: ROLES.TEAM_MEMBER, avatar: "IK", phone: "+1 555 0106", jobTitle: "UX Designer", department: "Design", bio: "Designs calmer workflows.", timezone: "Asia/Seoul" },
];
