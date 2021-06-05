import React, { useEffect } from "react"
import { act, HookResult, renderHook } from "@testing-library/react-hooks"
import { AsyncProxyHandler, useProxy } from "../src"
import { render } from "@testing-library/react";

const asink = async (s?: string, s1?: string) => {
    if (s === "")
        throw new Error("No empty string");
    return `Done${s ? " with => " + s : ""}${s1 ? " and " + s1 : ""}`
}

describe("useProxy with an async function passed in", () => {
    let hookResult: HookResult<AsyncProxyHandler<typeof asink>>;

    beforeEach(() => {
        const { result } = renderHook(() => useProxy(asink))
        hookResult = result;
    });

    it("starts out not loading, and not erroneous", async () => {
        const { loading, error } = hookResult.current;

        expect(loading).toBe(false);
        expect(error).toBeNull();
    })

    it("h() returns the same as original function", async () => {
        const { h } = hookResult.current;

        let withHook: string[];
        const without = await Promise.all
            ([asink(), asink("asdf"), asink("asdf", "3w")])

        await act(async () => {
            withHook = await Promise.all
                ([h(), h("asdf"), h("asdf", "3w")])

            expect(withHook).toEqual(without);
        })
    })

    it("catches an error thrown in the original function", async () => {
        const { h } = hookResult.current;

        await act(async () => {
            // Assuming that "" will lead to an error, 
            // in the original function.
            await h("");
        })

        const { error } = hookResult.current;

        expect(error).toEqual(new Error("No empty string"));
    })

    it("toggles the loading stateful property", async () => {
        const { findByText } = render(<TestComp asink={asink} />)
        const loadingDiv = await findByText("Loading...")
        expect(loadingDiv).toBeVisible()

        const doneDiv = await findByText("All Good")
        expect(doneDiv).toBeVisible()
    })
})

interface TestCompProps {
    asink: () => Promise<string>
}
const TestComp = ({ asink }: TestCompProps) => {
    const { h, loading } = useProxy(asink);

    useEffect(() => { h() }, [])

    if (loading)
        return <div>Loading...{loading}</div>
    return <div>All Good</div>
}