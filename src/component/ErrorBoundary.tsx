import React from 'react'

interface ErrorBoundaryProps {
    error: Error
    advice?: string
    children?: JSX.Element | JSX.Element[]
}

export function ErrorBoundary({ children, error, advice }: ErrorBoundaryProps) {
    if (error)
        return <div>{error.toString()}{advice && ` -->> ${advice}`}</div>
    else
        return <>{children}</>;
}