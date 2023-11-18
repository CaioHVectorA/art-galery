//@ts-nocheck
import { getLocalStorage } from '../LS'
type nullable = string | null
export default function useUser(): { email: nullable, name: nullable, id: number | null, isErrored: boolean } {
    const { email, name, id, isErrored } = getLocalStorage('_user') ? {...getLocalStorage('_user'), isErrored: false} : { email: null, name: null, id: null, isErrored: true }
    return { email, id, isErrored, name }    
}
