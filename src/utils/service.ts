import Router from 'next/router'


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const _base = (url: string, config: RequestInit): Promise<any> => new Promise((resolve, reject) => {
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
            const { data, code, message }: { data: any, code: number, message: string } = res
            if (code === 200) {
                resolve(data)
            } else if (code === 401) {
                console.log('Unauthorized');
                Router.push('/sign-in')
            } else {
                console.log('message: ', message);
                reject(res)
            }
        })
})

export const _req = (url: string, data?: any, cfg?: RequestInit) => _base(url, {
    body: JSON.stringify(data),
    method: cfg?.method || "POST",
    headers: {
        'content-type': 'application/json'
    },
    ...cfg
})

export const _get = (url: string, data?: any, cfg?: RequestInit) => _base(url + '?' + new URLSearchParams(data).toString(), {
    method: "GET",
    headers: {
        'content-type': 'application/json'
    },
    ...cfg
})

export const _delete = (url: string, data?: any, cfg?: RequestInit) => _req(url, data, {
    method: "DELETE"
})

export const _upload = (url: string, data: FormData) => _base(url, {
    method: 'POST',
    body: data
})