import React from 'react'
import { AsyncProxyHandler, ProxyState } from '.';

export type AsyncInterface<T> = {
    [k in keyof T]: (...params: any[]) => Promise<any>
};

export default function useProxyObject<T extends AsyncInterface<T>>
    (obj: T): AsyncProxyHandler<T> {

    const [state, setState] = React.useState<ProxyState>
        ({ loading: false, error: null });

    const h = new Proxy(obj, {
        get(target, p) {

            //@ts-ignore
            const fun = target[p];

            return async (...params: any) => {
                try {
                    setState({ loading: true, error: null })
                    const ret = await fun.apply(target, params);
                    setState({ loading: false, error: null })
                    return ret;
                } catch (error) {
                    setState({ loading: true, error })
                }
            }
        },
    })

    return {
        ...state,
        h
    }
}