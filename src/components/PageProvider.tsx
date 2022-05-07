import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/src/theme';



export interface PageProps {
    children: React.ReactNode
}

export default function PageProvider({ children }: PageProps) {


    return (<ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
    )
}