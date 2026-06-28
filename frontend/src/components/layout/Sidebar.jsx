import { NavLink } from "react-router-dom";
import { Activity, BarChart3, Calendar, CheckSquare, ClipboardList, FolderKanban, LayoutDashboard, ListTodo, Settings, Shield, Users, UserCog } from "lucide-react";
import clsx from "clsx";
import { ROLES } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";

const mainLinks = [
  ["/", LayoutDashboard, "Dashboard"],
  ["/my-work", CheckSquare, "My Work"],
  ["/projects", FolderKanban, "Projects"],
  ["/board", ClipboardList, "Board"],
  ["/backlog", ListTodo, "Backlog"],
  ["/teams", Users, "Teams"],
  ["/calendar", Calendar, "Calendar"],
  ["/reports", BarChart3, "Reports"],
  ["/notifications", Activity, "Notifications"],
  ["/activity", Activity, "Activity"],
  ["/settings", Settings, "Settings"],
];

const adminLinks = [
  ["/admin", Shield, "Overview"],
  ["/admin/users", UserCog, "Access & Roles"],
  ["/admin/projects", FolderKanban, "Projects"],
  ["/reports", BarChart3, "Reports"],
  ["/activity", Activity, "Audit Log"],
  ["/workspace-settings", Settings, "Workspace"],
];

export function Sidebar({ collapsed, mobileOpen, onClose }) {
  const { user } = useAuth();
  const links = user?.role === ROLES.ADMIN ? adminLinks : mainLinks;

  return (
    <aside className={clsx("sidebar", collapsed && "collapsed", mobileOpen && "mobile-open")}>
      <div className="brand"><span>TM</span><strong>TaskPilot</strong></div>
      {user?.role === ROLES.ADMIN ? <div className="sidebar-section admin-primary"><small>Admin</small></div> : null}
      <nav>
        {links.map(([to, Icon, label]) => (
          <NavLink key={to} to={to} end={to === "/"} onClick={onClose}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
