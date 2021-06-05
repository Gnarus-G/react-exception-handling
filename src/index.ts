import useProxyFunction, { AsyncFunction } from './useProxyFunction'
import useProxyObject, { AsyncInterface } from './useProxyObject'

export interface ProxyState {
    loading: boolean
    error: Error | null
}

export interface AsyncProxyHandler<T> extends ProxyState {
    h: T
}

export function useProxy<T extends AsyncFunction>
    (asink: T): AsyncProxyHandler<T>;
export function useProxy<T extends AsyncInterface<T>>
    (asink: T): AsyncProxyHandler<T>;

export function useProxy(asink: any): AsyncProxyHandler<any> {
    if (typeof asink === "function")
        return useProxyFunction(asink);
    return useProxyObject(asink);
}