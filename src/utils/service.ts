


import Router from 'next/router'

export interface IForm {
    [k: string]: string | number | boolean | File
}

export type IData<Type> = Type

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const _base = (url: string, config: RequestInit): Promise<IData<IForm | IForm[]>> => new Promise((resolve, reject) => {
    const token = sessionStorage.getItem('access_token')
    const auth = token ? {
        Authorization: 'Bearer ' + token
    } : {}
    fetch(baseUrl + url, {
        ...config,
        headers: Object.assign(config?.headers || {}, auth)
    })
        .then(r => r.json())
        .then((res) => {
            const { data, code, message }: { data: IData<IForm | IForm[]>, code: number, message: string } = res
            if (code === 200) {
                resolve(data)
            } else if (code === 401) {
                console.log('Unauthorized');
                Router.push('/sign-in')
            } else {
                console.log('message: ', message);
            }
        })
})

export const _req = (url: string, data?: IForm, cfg?: RequestInit) => _base(url, {
    body: JSON.stringify(data),
    method: cfg?.method || "POST",
    headers: {
        'content-type': 'application/json'
    },
    ...cfg
})

export const _get = (url: string, data?: IForm, cfg?: RequestInit) => _req(url, data, {
    method: "GET"
})

export const _delete = (url: string, data?: IForm, cfg?: RequestInit) => _req(url, data, {
    method: "DELETE"
})

export const _upload = (url: string, data: FormData) => _base(url, {
    method: 'POST',
    body: data
})