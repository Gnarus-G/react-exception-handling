import { useState } from "react";

interface State {
    loading: boolean
    error: Error | null
}

interface AsyncHandlingState<T> extends State {
    h(work: (worker: T) => Promise<void>): Promise<void>
}

/**
 * @param worker some object that does asynchronous stuff.
 */
export default function useProxyState<T>(worker: T): AsyncHandlingState<T> {

    const [state, setState] = useState<State>({ loading: false, error: null });

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