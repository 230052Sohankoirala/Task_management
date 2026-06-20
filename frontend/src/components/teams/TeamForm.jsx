import { Button } from "../common/Button";
import { Input, Textarea } from "../common/Form";

export function TeamForm() {
  return <form className="form-grid"><label>Team name<Input /></label><label className="span-2">Description<Textarea /></label><Button>Save team</Button></form>;
}
