import React from "react"
import { useLag } from "../hook/useLag";
import { WithFallBackProps } from './WithFallBack';

export default function WithLaggedFallBack({ when, fallback, children }: WithFallBackProps) {
    const lagged = useLag(125);
    if (lagged)
        return null
    if (when)
        return <>{fallback} </>
    return <>{children} </>
}