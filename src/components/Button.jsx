import { Button } from '@mantine/core';

export default function({label, onClick, disabled, danger, notfullwidth}) {
  return (
    <div>
      <Button color={danger && 'red'} fullWidth={!notfullwidth} onClick={onClick} disabled={disabled}>
        {label}
      </Button> 
    </div>
  );
}