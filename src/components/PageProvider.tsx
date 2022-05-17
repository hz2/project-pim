import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { Alert, Snackbar } from '@mui/material';

import { reducer, initialState, ContextType, defaultDispatch } from "@/reducer/reducer"



export const UserContext: React.Context<ContextType> = React.createContext({
    state: initialState,
    dispatch: defaultDispatch
})

export interface PageProps {
    children: React.ReactNode
}

export default function PageProvider({ children }: PageProps) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { msg } = state
    return (<>
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{ state, dispatch }}>
                {children}
            </UserContext.Provider>
        </ThemeProvider>
        <Snackbar
            open={msg.state}
            autoHideDuration={1200}
            onClose={() => dispatch({ type: "close_msg" })}
        >
            <Alert severity={msg.type} sx={{ width: '100%' }}>{msg.text}</Alert>
        </Snackbar>
    </>)
}