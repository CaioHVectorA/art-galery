//@ts-nocheck
export function setLocalStorage(key: string, data: any) {
    let finalData = data;
    if (typeof data === 'object') {
        finalData = JSON.stringify(data) as string
    }
    localStorage.setItem(key, finalData)
}
export function getLocalStorage(key: string) {
    if (!localStorage.getItem(key)) return null
    const d = localStorage.getItem(key) as string
    try {
        const r = JSON.parse(d)
        return r
    } catch (error) {
        return d
    }
}