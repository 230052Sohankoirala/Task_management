import { AlertCircle, Inbox, Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return <div className="state"><Loader2 className="spin" /> Loading</div>;
}

export function Skeleton() {
  return <div className="skeleton" />;
}

export function EmptyState({ title = "Nothing here yet", description = "Create something to get started." }) {
  return <div className="state"><Inbox /><strong>{title}</strong><span>{description}</span></div>;
}

export function ErrorState({ title = "Something went wrong", description = "Please try again." }) {
  return <div className="state error"><AlertCircle /><strong>{title}</strong><span>{description}</span></div>;
}
