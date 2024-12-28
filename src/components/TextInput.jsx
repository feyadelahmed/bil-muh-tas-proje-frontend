import { TextInput, PasswordInput, Textarea } from '@mantine/core';

export default function({value, name, label, onChange, required, password, textarea}) {
  const Element = password
    ? PasswordInput
    : textarea
      ? Textarea
      : TextInput;

  return (
    <Element
      label={label}
      value={value}
      name={name}
      onChange={(event) => onChange(event.currentTarget.value)}
      required={required}
      autoComplete="nope"
    />
  );
}