import { useContext, useState } from "react";
import { Bell, Check, LogOut, Menu, Moon, Plus, Search, Sun, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "../common/IconButton";
import { Button } from "../common/Button";
import { Dropdown } from "../common/Dropdown";
import { Avatar } from "../common/Avatar";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { NotificationContext } from "../../contexts/NotificationContext";

export function Navbar({ onMenu, onCollapse }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { notifications, unread } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-left">
        <IconButton icon={Menu} label="Open menu" onClick={onMenu} className="mobile-only" />
        <IconButton icon={Menu} label="Collapse sidebar" onClick={onCollapse} className="desktop-only" />
        <label className="global-search">
          <Search size={17} />
          <input placeholder="Search tasks, projects, teams" onKeyDown={(event) => event.key === "Enter" && navigate(`/search?q=${event.currentTarget.value}`)} />
        </label>
      </div>
      <div className="nav-actions">
        <Button icon={Plus} onClick={() => navigate("/tasks/create")}>Create Task</Button>
        <IconButton icon={isDark ? Sun : Moon} label="Toggle theme" onClick={toggleTheme} />
        <div className="relative">
          <button className="icon-btn notice-btn" onClick={() => setNoticeOpen((open) => !open)} aria-label="Notifications">
            <Bell size={18} />
            {unread ? <span>{unread}</span> : null}
          </button>
          <Dropdown open={noticeOpen}>
            <div className="dropdown-head">Notifications</div>
            {notifications.slice(0, 5).map((notice) => (
              <Link key={notice.id} to="/notifications" className="dropdown-row"><Check size={14} />{notice.message}</Link>
            ))}
            {!notifications.length ? <span className="dropdown-row">No notifications</span> : null}
          </Dropdown>
        </div>
        <div className="relative">
          <button className="profile-chip" onClick={() => setProfileOpen((open) => !open)}>
            <Avatar name={user?.name} />
            <span>{user?.name}</span>
          </button>
          <Dropdown open={profileOpen}>
            <Link className="dropdown-row" to="/profile"><User size={14} />Profile</Link>
            <button className="dropdown-row" onClick={logout}><LogOut size={14} />Sign out</button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
