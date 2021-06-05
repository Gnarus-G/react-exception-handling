import React, { useEffect } from "react"
import { act, HookResult, renderHook } from "@testing-library/react-hooks"
import { useProxy } from "../src"
import { render } from "@testing-library/react";
import { AsyncProxyHandler } from "../src/interface";

class Asink {
    async run(s?: string, s1?: string) {
        return `Done${s ? " with => " + s : ""}${s1 ? " and " + s1 : ""}`
    }
    async errorOut() {
        throw new Error("Herp Derp!");
    }
}

const asink = new Asink();

describe("useProxy with an async function passed in", () => {
    let hookResult: HookResult<AsyncProxyHandler<Asink>>;

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
            ([asink.run(), asink.run("asdf"), asink.run("asdf", "3w")])

        await act(async () => {
            withHook = await Promise.all
                ([h.run(), h.run("asdf"), h.run("asdf", "3w")])

            expect(withHook).toEqual(without);
        })
    })

    it("catches an error thrown in the original function", async () => {
        const { h } = hookResult.current;

        await act(async () => await h.errorOut())

        const { error } = hookResult.current;

        expect(error).toEqual(new Error("Herp Derp!"));
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
    asink: typeof asink
}

const TestComp = ({ asink }: TestCompProps) => {
    const { h, loading } = useProxy(asink);

    useEffect(() => { h.run() }, [])

    if (loading)
        return <div>Loading...{loading}</div>
    return <div>All Good</div>
}