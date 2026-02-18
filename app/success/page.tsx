'use client';

import React from 'react';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import Link from 'next/link';

export default function Success() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Order Confirmed!</h1>
                    <p className="text-slate-500">Thank you for your purchase. We&apos;ve sent a confirmation email.</p>
                </div>

                {/* Timeline */}
                <div className="relative pt-2 px-4 text-left">
                    <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-200"></div>

                    <div className="space-y-8 relative">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full z-10 ring-4 ring-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 pt-1">
                                <p className="font-bold text-slate-900 text-sm">Order Placed</p>
                                <p className="text-xs text-slate-500">Just now</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-white border-2 border-slate-300 rounded-full z-10 ring-4 ring-white flex items-center justify-center">
                                <Package className="w-4 h-4 text-slate-400" />
                            </div>
                            <div className="flex-1 pt-1 opacity-60">
                                <p className="font-bold text-slate-900 text-sm">Processing</p>
                                <p className="text-xs text-slate-500">Estimated: 24h</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-white border-2 border-slate-300 rounded-full z-10 ring-4 ring-white flex items-center justify-center">
                                <Truck className="w-4 h-4 text-slate-400" />
                            </div>
                            <div className="flex-1 pt-1 opacity-60">
                                <p className="font-bold text-slate-900 text-sm">Out for Delivery</p>
                                <p className="text-xs text-slate-500">Estimated: 3 days</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Link
                    href="/"
                    className="block w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition active:scale-95 flex items-center justify-center gap-2"
                >
                    <Home className="w-4 h-4" /> Continue Shopping
                </Link>
            </div>
        </div>
    );
}
