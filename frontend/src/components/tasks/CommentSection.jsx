import { Button } from "../common/Button";
import { Textarea } from "../common/Form";

export function CommentSection() {
  return <section className="card"><h3>Comments</h3><Textarea placeholder="Add a comment" /><Button>Post comment</Button></section>;
}
