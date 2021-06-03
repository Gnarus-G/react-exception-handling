import React from "react"
import { render } from "@testing-library/react"
import { WithFallBack} from "../../src/component"

describe("WithFallBack component behavior", () => {
    test("renders fallback", () => {
        const { getByText } = render(<WithFallBack fallback={<div>Loading...</div>} when={true}>
            <div>All good</div>
        </WithFallBack>)

        expect(getByText("Loading...")).toBeVisible()
    })

    test("renders children", () => {
        const { getByText } = render(<WithFallBack fallback={<div>Loading...</div>} when={false}>
            <div>All good</div>
        </WithFallBack>)

        expect(getByText("All good")).toBeVisible()
    })
})