import { useState } from "react";

/**
 * 
 * @param worker some object that does asynchronous stuff.
 */
export default function useExceptionalState<T>(worker: T): ExceptionalResult<T> {
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
