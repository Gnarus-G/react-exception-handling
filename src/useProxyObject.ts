import React from 'react'
import { AsyncProxyHandler, ProxyState } from '.';

export interface AsyncInterface {
    [key: string]: (...params: any[]) => Promise<any>
};

export default function useProxyObject<T extends AsyncInterface>
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
                    setState({ loading: true, error: null })
                    return ret;
                } catch (error) {
                    setState({ loading: true, error: null })
                }
            }
        },
    })

    return {
        ...state,
        h
    }
}