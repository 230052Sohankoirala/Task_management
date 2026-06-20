import { Paperclip } from "lucide-react";

export function AttachmentList({ count = 0 }) {
  return <section className="card"><h3>Attachments</h3><p><Paperclip size={15} />{count} attached files</p></section>;
}
