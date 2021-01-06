import { render } from "@testing-library/react"
import { act, renderHook } from "@testing-library/react-hooks"
import React, { useEffect } from "react"
import WithFallBack from "../../src/component/WithFallBack"
import useExceptionalState from "../../src/hook/useExceptionalState"

const worker = async () => {
    return "done"
}

const shirker = async () => {
    throw new Error("I'm Bad")
}

test("happy path", async () => {
    const { result } = renderHook(() => useExceptionalState(worker))
    const current = () => result.current;
    expect(current().loading).toBe(false)
    expect(current().error).toBeNull()

    let workResult: string;
    await act(async () => {
        await current().h(async worker => {
            workResult = await worker()
        })
        expect(current().loading).toBe(false)
    })

    expect(workResult).toBe("done")
    expect(current().error).toBeNull()
})

test("fail simple path", async () => {
    const { result } = renderHook(() => useExceptionalState(shirker))
    const current = () => result.current;
    expect(current().loading).toBe(false)
    expect(current().error).toBeNull()

    let workResult: string;
    await act(async () => {
        await current().h(async worker => {
            workResult = await worker()
        })
        expect(current().loading).toBe(false)
    })

    expect(workResult).toBeUndefined()
    expect(current().error.message).toBe("I'm Bad")
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

const TestComp = ({ worker }) => {
    const { h, loading } = useExceptionalState(worker);

    useEffect(() => {
        h(async worker => await worker().then())
    }, [])

    return <WithFallBack fallback={<div>Loading...</div>} when={loading}>
        <div>All Good</div>
    </WithFallBack>
}