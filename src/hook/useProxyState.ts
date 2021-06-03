import { useState } from "react";

interface State {
    loading: boolean
    error: Error
}

type PartialState = Partial<State>;

interface ExceptionalResult<T> extends State {
    setState: (state: State) => void
    setPartialState: (partialState: PartialState) => void
    h(work: (worker: T) => Promise<void>): Promise<void>
}

/**
 * 
 * @param worker some object that does asynchronous stuff.
 */
export function useProxyState<T>(worker: T): ExceptionalResult<T> {

    const [state, setState] = useState<State>({ loading: false, error: null });

    function setPartialState(partial: PartialState) {
        setState({ ...state, ...partial })
    }

    async function h(work: (worker: T) => Promise<void>) {
        try {
            setPartialState({ loading: true })
            await work(worker)
            setPartialState({ loading: false })
        } catch (error) {
            setPartialState({ loading: false, error })
        }
    }

    const { loading, error } = state;
    return {
        loading,
        error,
        setState,
        setPartialState,
        h
    }
}
