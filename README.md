# react-exception-handling

![CI to npm](https://github.com/Gnarus-G/react-exception-handling/workflows/CI%20to%20npm/badge.svg)

## Why?

Because we get tired of rewriting the same logic, and we'll always need to handle loading resources and errors.

## Usage (v2)

### Trapping an asynchronous function.

The function h() that is returned, will behave exactly like the given function; expcept that it will also toggle the loading state, and catch any errors thrown.

```typescript
const asink = async () => "done";

const { h, error, loading } = useProxy(asink);
useEffect(() => {
    h(); //as a proxy this will call also call asink()
}, []);
```
### Trapping an object that has asynchronous methods.
When calling the methods through the proxy, it will handle the state appropriately, for any of the methods, as it would have for a single function.

Caveat!: For now. The only methods allowed on the object are asynchronous methods. No properties or synchronous methods will be accepted. Not sure how much of a deal breaker this will turn out to be.
```typescript
const asink = {
    async method(){ }
    async otherMethod(){ }
}

const { h, error, loading } = useProxy(asink);
useEffect(() => {
    h.method(); // OR h.otherMethod();
}, []);
```

### Use the error to do your own error handling.
For example, in a useEffect.

```typescript
useEffect(() => {
    if (error) {
        //handle
    }
}, [error]);
```

## Usage (v1)

Don't use. The syntax can be confusing.

```typescript
const asink = async () => "done"; 
// ^^ could be any object, as long as asynchronous stuff happens in h()

const { h, error, loading } = useProxyState(asink);
useEffect(() => {
    h(async worker => { // asink is passed back to us an argument.
        // we use it with h() so that it handle the hook's state
        await worker();
    });
}, []);
```

Use the error to do your own error handling, similarly to v2.
Or with

```tsx
<ErrorBoundary error={error}>
    <div>alert text</div>
</ErrorBoundary>
```

Also track loading state

```tsx
<WithFallBack fallback={<div>Loading...</div>} when={loading}>
    <div>children</div>
</WithFallBack>
```
Note it is not necessary for me to have written these narrow components, because they're easy to write, and irrelevant to the goal of this module. In that spirit, they're not available in v2.
## Contributing

Please do.
