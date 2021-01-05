interface WithFallBackProps {
    when: boolean
    fallback: JSX.Element
    children?: JSX.Element | JSX.Element[]
}

interface ErrorBoundaryProps {
    error: Error
    advice?: string
    children?: JSX.Element | JSX.Element[]
}

interface State {
    loading: boolean
    error: Error
}

type PartialState = {
    [K in keyof State]?: any;
};

interface ExceptionalResult<T> extends State {
    setState: (state: State) => void
    setPartialState: (partialState: PartialState) => void
    h(work: (worker: T) => Promise<void>): Promise<void>
}