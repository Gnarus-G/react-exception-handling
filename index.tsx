import React, { useState } from "react";

interface ProxyState {
    loading: boolean
    error: Error | null
}

interface AsyncHandlingState<T> extends ProxyState {
    h(work: (worker: T) => Promise<void>): Promise<void>
}

/**
 * @param worker some object that does asynchronous stuff.
 */
export function useProxyState<T>(worker: T): AsyncHandlingState<T> {

    const [state, setState] = useState<ProxyState>({ loading: false, error: null });

    async function h(work: (worker: T) => Promise<void>) {
        try {
            setState({ loading: true, error: null })
            await work(worker)
            setState({ loading: false, error: null })
        } catch (error) {
            setState({ loading: false, error })
        }
    }

    const { loading, error } = state;
    return {
        loading,
        error,
        h
    }
}

export interface WithFallBackProps {
    when: boolean
    fallback: JSX.Element | JSX.Element[]
    children?: JSX.Element | JSX.Element[]
}

export function WithFallBack({ when, fallback, children }: WithFallBackProps) {
    if (when)
        return <>{fallback}</>;
    return <>{children}</>
}

export interface ErrorBoundaryProps {
    error: Error | null
    advice?: string
    children?: JSX.Element | JSX.Element[]
}

export function ErrorBoundary({ children, error, advice }: ErrorBoundaryProps) {
    if (error)
        return <div>{error.toString()}{advice && ` -->> ${advice}`}</div>
    else
        return <>{children}</>;
}