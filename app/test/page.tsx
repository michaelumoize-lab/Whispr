'use client'

import { usePostHog } from '@posthog/react'
import { toast } from 'react-hot-toast'

export default function CheckoutPage() {
    const posthog = usePostHog()

    function handlePurchase() {
        posthog.capture('purchase_completed', { amount: 99 })
        toast.success("button clicked")
    }

    return <button onClick={handlePurchase}>Complete purchase</button>
}