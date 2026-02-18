import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Call Core API securely from server-side
        const coreUrl = process.env.NEXT_PUBLIC_CORE_URL || 'http://localhost:3000';
        const response = await fetch(`${coreUrl}/api/external/transaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CORE_API_KEY || 'demo_secret' // Secure secret here
            },
            body: JSON.stringify({
                amount: body.total,
                description: 'Demo Shop Purchase',
                merchantId: 'demo_shop_01',
                items: body.items
            })
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (e: unknown) {
        console.error("Checkout Error:", e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
