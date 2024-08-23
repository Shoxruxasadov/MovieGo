import { useState } from "react"

export default function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        const value = window.localStorage.getItem(key)
        return value ? JSON.parse(value) : initialValue
    })

    const setValue = value => {
        const valueToStore = value instanceof Function ? value(state) : value
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        setState(value)
    }

    return [state, setValue]
}