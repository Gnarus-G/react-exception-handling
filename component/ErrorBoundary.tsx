import React from 'react'

export default function ErrorBoundary({ children, error, advice }: ErrorBoundaryProps) {
    if (error)
        return <div>{error.toString()}{advice && ` -->> ${advice}`}</div>
    else
        return <>{children}</>;
}