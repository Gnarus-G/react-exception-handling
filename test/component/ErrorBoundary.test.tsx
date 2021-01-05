import React from "react"
import { render } from '@testing-library/react'
import ErrorBoundary from '../../src/component/ErrorBoundary'

test("renders error", () => {
    const { getByText } = render(<ErrorBoundary error={new Error("Bad Thing happened")}>
        <div>All good</div>
    </ErrorBoundary>
    )
    expect(getByText(/Bad Thing happened/)).toBeVisible()
})

test("renders with advice", () => {
    const { getByText } = render(<ErrorBoundary error={new Error("Bad Thing happened")} advice="Contact me">
        <div>All good</div>
    </ErrorBoundary>
    )
    expect(getByText(/Bad Thing happened/)).toBeVisible()
    expect(getByText(/Contact me/)).toBeVisible()
})

test("renders children when no erros", () => {
    const { getByText } = render(<ErrorBoundary error={null} advice="Contact me">
        <div>All good</div>
    </ErrorBoundary>
    )
    expect(getByText(/All good/)).toBeVisible()
})