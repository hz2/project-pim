export interface IAccountRow {
    id: number
    name: string
    email: string
    username: string
    avatar: string
    mobile: string
    sex: string
    birthday: Date | null
    address: string
}

export const defaultAccountRow: IAccountRow = {
    id: 0,
    name: '',
    email: '',
    username: '',
    avatar: '',
    mobile: '',
    sex: '',
    birthday: null,
    address: '',

}