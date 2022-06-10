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

export class IMenu {
    id: number = 0
    text: string = ''
    path: string = ''
    component?: string;
    icon: string = ''
    isActive: boolean = false
    pid: number = 0
    type: number = 0
    sort: number = 0
    parent!: IMenu
    children!: IMenu[]
    created!: Date;
    updated!: Date;
}