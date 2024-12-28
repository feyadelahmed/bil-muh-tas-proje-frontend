import Alert from 'react-bootstrap/Alert';

export default function({level, msg}) {
  const variant = level == "error" ? "danger" : "primary";
  return (
    <Alert variant={variant}>
      {msg}
    </Alert>
  );
}