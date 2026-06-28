import { useContext } from "react";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/State";
import { PageHeader } from "../../components/layout/PageHeader";
import { NotificationItem } from "../../components/notifications/NotificationItem";
import { NotificationContext } from "../../contexts/NotificationContext";

export default function Notifications() {
  const { notifications, unread, markAllRead, markRead, deleteNotification } = useContext(NotificationContext);

  return <><PageHeader title="Notifications" description={`${unread} unread updates`} action={<Button onClick={markAllRead} disabled={!notifications.length}>Mark all as read</Button>} />{notifications.length ? <div className="stack">{notifications.map((notification) => <NotificationItem key={notification.id} notification={notification} onRead={() => markRead(notification.id)} onDelete={() => deleteNotification(notification.id)} />)}</div> : <EmptyState title="No notifications" description="Alerts and approval updates will appear here." />}</>;
}
