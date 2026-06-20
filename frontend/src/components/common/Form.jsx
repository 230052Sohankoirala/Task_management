export function Input(props) {
  return <input className="field" {...props} />;
}

export function Textarea(props) {
  return <textarea className="field textarea" {...props} />;
}

export function Select({ children, ...props }) {
  return (
    <select className="field" {...props}>
      {children}
    </select>
  );
}

export function DateInput(props) {
  return <Input type="date" {...props} />;
}

export function FileUpload(props) {
  return <input className="field" type="file" {...props} />;
}
