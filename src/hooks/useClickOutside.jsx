import { useEffect, useState } from 'react';

export default function useClickOutside(ref) {
    let [result, setResult] = useState(false)

    const clickOutside = (e) => {
        if (!ref.current.contains(e.target)) {
            setResult(true)
            console.log(true);
        }
    }

    useEffect(() => {
        if (ref.current) {
            setTimeout(() => document.addEventListener("click", clickOutside), 100)
            return () => { document.removeEventListener("click", clickOutside) }
        }
    }, [])

    return result
}