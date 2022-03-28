



interface IForm {
    [k: string]: string | number | File
}

const baseUrl = 'https://app.0xc8.com'
export const _req = (url: string, data?: IForm, cfg?: Request): Promise<Response> => new Promise((resolve, reject) => {
    const headerDefault = {
        'content-type': 'application/json'
    }
    const token = sessionStorage.getItem('access_token')
    const config = Object.assign({
        method: 'POST',
        body: JSON.stringify(data)
    }, cfg, {
        headers: Object.assign(headerDefault, cfg?.headers || {}, token ? {
            Authorization: 'Bearer ' + token
        } : {})
    })
    fetch(baseUrl + url, {
        ...config,
    })
        .then(r => r.json())
        .then(res => {
            const { data, code, message }: { data: Response, code: number, message: string } = res
            if (code === 200) {
                resolve(data)
            } else if (code === 401) {
                console.log('Unauthorized');
            } else {
                console.log('message: ', message);
            }
        })
})


export const _get = (url: string, data?: IForm, cfg?: Request) => _req(url, data, Object.assign({ method: 'GET' }, cfg))