import React from 'react'
export interface WithFallBackProps {
    when: boolean
    fallback: JSX.Element | JSX.Element[]
    children?: JSX.Element | JSX.Element[]
}

export default function WithFallBack({ when, fallback, children }: WithFallBackProps) {
    if (when)
        return <>{fallback}</>;
    return <>{children}</>
}