
import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';


export function useMsg() {
    const [open, setOpen] = React.useState(false);

    return (
        <Snackbar
            open={open}
            autoHideDuration={1200}
            onClose={() => {
                setOpen(false);
                // router.push('/dashboard')
            }}
        >
            <Alert severity="success" sx={{ width: '100%' }}>
                login success!
            </Alert>
        </Snackbar>)
}
