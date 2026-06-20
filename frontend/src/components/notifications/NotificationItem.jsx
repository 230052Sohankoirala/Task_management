import { Bell, Trash2 } from "lucide-react";
import { IconButton } from "../common/IconButton";

export function NotificationItem({ notification, onRead, onDelete }) {
  return (
    <article className={`notification-item ${notification.read ? "" : "unread"}`}>
      <Bell size={18} />
      <div><strong>{notification.title}</strong><p>{notification.message}</p></div>
      <button onClick={onRead}>{notification.read ? "Read" : "Mark read"}</button>
      <IconButton icon={Trash2} label="Delete notification" onClick={onDelete} />
    </article>
  );
}
