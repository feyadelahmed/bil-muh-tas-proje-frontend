import { Select } from '@mantine/core';

export default function({value, options, label, onChange, required}) {
  return (
    <Select
      data={options}
      label={label}
      required={required}
      value={value}
      onChange={onChange}
      searchable
    />
  );
}