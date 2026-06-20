import { Tabs } from "../common/Tabs";

export function ProjectTabs({ active, onChange }) {
  return <Tabs tabs={["Overview", "Board", "Backlog", "Tasks", "Members", "Activity", "Settings"]} active={active} onChange={onChange} />;
}
