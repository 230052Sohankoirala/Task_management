import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { PageHeader } from "../../components/layout/PageHeader";
import { NotificationItem } from "../../components/notifications/NotificationItem";
import { notifications as seedNotifications } from "../../data/notifications";

export default function Notifications() {
  const [notifications, setNotifications] = useState(seedNotifications);
  const markAll = () => { setNotifications((current) => current.map((item) => ({ ...item, read: true }))); toast.success("All notifications marked read"); };
  return <><PageHeader title="Notifications" description={`${notifications.filter((item) => !item.read).length} unread updates`} action={<Button onClick={markAll}>Mark all as read</Button>} /><div className="stack">{notifications.map((notification) => <NotificationItem key={notification.id} notification={notification} onRead={() => setNotifications((current) => current.map((item) => item.id === notification.id ? { ...item, read: true } : item))} onDelete={() => setNotifications((current) => current.filter((item) => item.id !== notification.id))} />)}</div></>;
}
