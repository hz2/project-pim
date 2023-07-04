import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <span>© 2022-present</span>
      <span> </span>
      <MuiLink color="inherit" href="/">
        0xc8.com
      </MuiLink>
      <span> / pim system</span>
    </Typography>
  );
}
