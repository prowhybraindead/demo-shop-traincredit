import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Call Core API securely from server-side
        const envCoreUrl = process.env.NEXT_PUBLIC_CORE_URL || 'http://localhost:3000';
        // Normalize URL logic:
        // 1. Remove trailing slash
        // 2. Remove trailing /api if present
        // 3. Re-append /api/external/transaction
        const normalizedBase = envCoreUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
        const targetUrl = `${normalizedBase}/api/external/transaction`;

        console.log(`[Checkout] Connecting to Core API at: ${targetUrl}`);

        const response = await fetch(targetUrl, {
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
