
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
    const msgType = {
        'open_msg': 'success',
        'open_err': 'error',
        'open_warn': 'warning',
        'open_info': 'info'
    }
    const genMsg = (type: 'open_msg' | 'open_err' | 'open_warn' | 'open_info') => ({
        state: true,
        text: payload,
        type: msgType[type]
    })
    switch (action.type) {
        case "open_msg":
            return {
                ...state,
                msg: genMsg(action.type)
            } as IState
        case "open_err":
            return {
                ...state,
                msg: genMsg(action.type)
            } as IState
        case "open_warn":
            return {
                ...state,
                msg: genMsg(action.type)
            } as IState
        case "open_info":
            return {
                ...state,
                msg: genMsg(action.type)
            } as IState
        case "close_msg":
            return {
                ...state,
                msg: {
                    ...state.msg,
                    state: false
                }
            }

        default:
            return state
    }
}



// export const _msg = (text: string) => {
//     dispatch({ type: "open_msg", data: text })
// }