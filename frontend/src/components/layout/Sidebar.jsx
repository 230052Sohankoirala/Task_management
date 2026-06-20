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
  ["/admin", Shield, "Admin Dashboard"],
  ["/admin/users", UserCog, "Users"],
  ["/admin/projects", FolderKanban, "All Projects"],
  ["/workspace-settings", Settings, "Workspace Settings"],
  ["/analytics", BarChart3, "Analytics"],
];

export function Sidebar({ collapsed, mobileOpen, onClose }) {
  const { user } = useAuth();
  return (
    <aside className={clsx("sidebar", collapsed && "collapsed", mobileOpen && "mobile-open")}>
      <div className="brand"><span>F</span><strong>FlowDesk</strong></div>
      <nav>
        {mainLinks.map(([to, Icon, label]) => (
          <NavLink key={to} to={to} end={to === "/"} onClick={onClose}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      {user?.role === ROLES.ADMIN ? (
        <div className="sidebar-section">
          <small>Admin</small>
          <nav>
            {adminLinks.map(([to, Icon, label]) => (
              <NavLink key={to} to={to} end={to === "/admin"} onClick={onClose}>
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </aside>
  );
}
