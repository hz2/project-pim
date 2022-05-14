
import * as React from 'react';

interface IState {
    msgStatus: boolean
    msgText: string | undefined
}

type ACTIONTYPE =
    | { type: string, data?: string }
    | null | undefined

export type ContextType = {
    state: IState;
    dispatch: React.Dispatch<ACTIONTYPE>

}

export const defaultDispatch: React.Dispatch<ACTIONTYPE> = () => null

export const initialState: IState = {
    msgStatus: false,
    msgText: '',
}

export const reducer: React.Reducer<IState, ACTIONTYPE> = (state, action) => {
    if (!action) {
        return state
    }
    switch (action.type) {
        case "open_msg":
            return {
                ...state,
                msgStatus: true,
                msgText: action.data
            }
        case "close_msg":
            return {
                ...state,
                msgStatus: false,
                msgText: ''
            }

        default:
            return state
    }
}



// export const _msg = (text: string) => {
//     dispatch({ type: "open_msg", data: text })
// }