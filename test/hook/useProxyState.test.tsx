/// <reference path="../../index.tsx"/>

import { render } from "@testing-library/react"
import { act, renderHook } from "@testing-library/react-hooks"
import React, { useEffect } from "react"
import { WithFallBack } from "../.."
import { useProxy } from "../../src"

const worker = async (s?: string) => {
    return "done"
}

const shirker = async () => {
    throw new Error("I'm Bad")
}

test("happy path", async () => {
    const { result } = renderHook(() => useProxy(worker))
    const current = () => result.current;

    expect(current().error).toBeNull()

    let workResult = "";
    await act(async () => {
        workResult = await current().h()
    })

    expect(workResult).toBe("done")
    expect(current().error).toBeNull()
})

test("fail simple path", async () => {
    const { result } = renderHook(() => useProxy(shirker))
    const current = () => result.current;

    expect(current().error).toBeNull()

    let workResult = "";
    await act(async () => {
        workResult = await current().h()
    })

    expect(workResult).toBeFalsy()
    expect(current().error?.message).toBe("I'm Bad")
})

describe("dynamic loading state", () => {
    test('with no error', async () => {
        const { findByText } = render(<TestComp worker={worker} />)
        const loadingDiv = await findByText("Loading...")
        expect(loadingDiv).toBeVisible()

        const doneDiv = await findByText("All Good")
        expect(doneDiv).toBeVisible()
    })

    test('with error caught', async () => {
        const { findByText } = render(<TestComp worker={worker} />)
        const loadingDiv = await findByText("Loading...")
        expect(loadingDiv).toBeVisible()

        const doneDiv = await findByText("All Good")
        expect(doneDiv).toBeVisible()
    })
})

interface TestCompProps {
    worker: () => Promise<string>
}
const TestComp = ({ worker }: TestCompProps) => {
    const { h, loading } = useProxy(worker);

    useEffect(() => {
        h();
    }, [])

    return (
        <WithFallBack fallback={<div>Loading...</div>} when={loading}>
            <div>All Good</div>
        </WithFallBack>
    )
}