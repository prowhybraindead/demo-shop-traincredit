import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items, total } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Call Core API to create transaction
        const coreUrl = process.env.NEXT_PUBLIC_CORE_URL || 'http://localhost:3000';
        const apiKey = process.env.CORE_API_KEY;

        const response = await fetch(`${coreUrl}/api/external/transaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey || '',
            },
            body: JSON.stringify({
                amount: total,
                currency: 'USD',
                description: `Order #${Date.now()} - ${items.length} items`,
                items // Core can store this in metadata if updated
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Transaction failed');
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error('Checkout Error:', error);
        return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
    }
}
