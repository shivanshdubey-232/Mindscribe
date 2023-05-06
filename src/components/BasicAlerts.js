import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts(props) {
  const {alert} = props;
  if(alert){
    return (
      <Stack sx={{ width: '100%', position: "absolute", top: "55px" }} spacing={2}>
        <Alert severity={alert.type}>{alert.msg}</Alert>
      </Stack>
    );
  }
}