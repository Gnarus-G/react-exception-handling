export interface ProxyState {
    loading: boolean;
    error: Error | null;
}
export interface AsyncProxyHandler<T> extends ProxyState {
    h: T;
}
export declare function useProxy<T extends AsyncFunction>(asink: T): AsyncProxyHandler<T>;
export declare function useProxy<T extends AsyncInterface<T>>(asink: T): AsyncProxyHandler<T>;
declare type AsyncInterface<T> = {
    [k in keyof T]: (...params: any[]) => Promise<any>;
};
declare type AsyncFunction = ((...params: any[]) => Promise<any>);
export {};