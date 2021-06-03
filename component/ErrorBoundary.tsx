import React from 'react'

export interface ErrorBoundaryProps {
    error: Error | null
    advice?: string
    children?: JSX.Element | JSX.Element[]
}

export default function ErrorBoundary({ children, error, advice }: ErrorBoundaryProps) {
    if (error)
        return <div>{error.toString()}{advice && ` -->> ${advice}`}</div>
    else
        return <>{children}</>;
}