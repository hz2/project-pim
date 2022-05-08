import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/src/theme';
import { Alert, Snackbar } from '@mui/material';



export interface PageProps {
    children: React.ReactNode
}

export default function PageProvider({ children }: PageProps) {
    const [open, setOpen] = React.useState(false);
    return (<>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
        <Snackbar
            open={open}
            autoHideDuration={1200}
            onClose={() => {
                setOpen(false);
            }}
        ><Alert severity="success" sx={{ width: '100%' }}>
                login success!
            </Alert>
        </Snackbar>
    </>)
}