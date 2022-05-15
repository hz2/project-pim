
import * as React from 'react';

interface IState {
    msg: {
        state: boolean
        text: string | undefined
        type: 'success' | 'info' | 'warning' | 'error'
    }
}

type ACTIONTYPE =
    | { type: string, data?: string | IState }
    | null | undefined

export type ContextType = {
    state: IState;
    dispatch: React.Dispatch<ACTIONTYPE>

}

export const defaultDispatch: React.Dispatch<ACTIONTYPE> = () => null

export const initialState: IState = {
    msg: {
        state: false,
        text: '',
        type: 'success'
    }
}

export const reducer: React.Reducer<IState, ACTIONTYPE> = (state, action) => {
    if (!action) {
        return state
    }
    const payload = action.data;
    switch (action.type) {
        case "open_msg":
            return {
                ...state,
                msg: {
                    ...initialState.msg,
                    ...payload?.msg
                }
            }
        case "close_msg":
            return {
                ...state,
                msg: initialState.msg
            }

        default:
            return state
    }
}



// export const _msg = (text: string) => {
//     dispatch({ type: "open_msg", data: text })
// }