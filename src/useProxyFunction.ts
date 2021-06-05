import React from 'react'
import { AsyncProxyHandler, ProxyState } from '.';

export type AsyncFunction = ((...params: any[]) => Promise<any>);

export default function useProxyFunction<T extends AsyncFunction>
    (w: T): AsyncProxyHandler<T> {

    const [state, setState] = React.useState<ProxyState>
        ({ loading: false, error: null });

    const h = new Proxy(w, {
        async apply(target, _, args) {
            let ret: any;
            try {
                setState({ loading: true, error: null })
                ret = await target(...args);
                setState({ loading: false, error: null })
                return ret;
            } catch (error) {
                setState({ loading: false, error })
            }
        }
    })

    return {
        ...state,
        h
    }
}