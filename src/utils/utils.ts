

interface IForm {
    [k: string]: string | number | File
}

export const formToObj = (form: FormData) => {
    let obj: IForm = {}
    form.forEach((value, key) => {
        obj[key] = value;
    })
    return obj
}

export { }
