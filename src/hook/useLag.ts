import { DependencyList, useEffect, useState } from "react";

export function useLag(delay?: number, dependencies?: DependencyList) {
    const [lag, setLag] = useState(true);
    useEffect(() => {
        let isMounted = true;
        setTimeout(() => {
            if (isMounted)
                setLag(false)
        }, delay || 0)

        return () => { isMounted = false };
    }, dependencies)
    return lag
}