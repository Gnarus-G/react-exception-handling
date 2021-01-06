import React from "react"
import { render } from "@testing-library/react"
import { WithFallBack, WithLaggedFallBack } from "../../src/component/WithFallBack"

describe("normal component", () => {
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

describe("lagged component", () => {
    test("renders fallback", async () => {
        const { findByText } = render(<WithLaggedFallBack fallback={<div>Loading...</div>} when={true}>
            <div>All good</div>
        </WithLaggedFallBack>)

        expect(await findByText("Loading...")).toBeVisible()
    })

    test("renders children", async () => {
        const { findByText } = render(<WithLaggedFallBack fallback={<div>Loading...</div>} when={false}>
            <div>All good</div>
        </WithLaggedFallBack>)

        expect(await findByText("All good")).toBeVisible()
    })
})

