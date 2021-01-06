import React, { DependencyList, useEffect, useState } from "react";

interface WithFallBackProps {
    when: boolean
    fallback: JSX.Element
    children?: JSX.Element | JSX.Element[]
}

export default function WithFallBack({ when, fallback, children }: WithFallBackProps) {
    if (when)
        return <>{fallback}</>
    return <>{children}</>
}

export function WithLaggedFallBack({ when, fallback, children }: WithFallBackProps) {
    const lagged = useLag(125);
    if (lagged)
        return null
    if (when)
        return <>{fallback}</>
    return <>{children}</>
}


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