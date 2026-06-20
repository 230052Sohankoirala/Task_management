import { useTheme } from "../../hooks/useTheme";
import { Button } from "../../components/common/Button";
import { Input, Select } from "../../components/common/Form";
import { PageHeader } from "../../components/layout/PageHeader";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  return <><PageHeader title="Settings" description="Personal preferences for theme, alerts, language, and time zone." /><section className="card settings-grid"><label className="switch"><input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />Dark mode</label><label className="switch"><input type="checkbox" defaultChecked />Email notifications</label><label className="switch"><input type="checkbox" defaultChecked />Push notifications</label><label className="switch"><input type="checkbox" defaultChecked />Assignment notifications</label><label className="switch"><input type="checkbox" defaultChecked />Mention notifications</label><label>Language<Select defaultValue="en"><option value="en">English</option><option value="es">Spanish</option></Select></label><label>Time zone<Input defaultValue="Asia/Katmandu" /></label><Button>Save settings</Button></section></>;
}
