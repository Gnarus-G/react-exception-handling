# react-exception-handling
![CI to npm](https://github.com/Gnarus-G/react-exception-handling/workflows/CI%20to%20npm/badge.svg)

## Why?
Because we get tired of rewriting the same logic, and we'll always need to handle loading resources and errors.

## Usage
Custom state hook
```typescript
const someAsyncWorker = async () => "done"; // could be any object, as long as asynchronous stuff happens in h()

const { h, error, loading } = useExceptionalState(someAsyncWorker);
useEffect(() => {
    h(async worker => {
        await worker()
    })
}, []);        
```
Use the error to do your own error handling, in useEffect
```typescript
useEffect(() => {
    if(error){
        //handle
    }
}, [error]); 
```
and/or with
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

## Contributing
Please do.
