import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Success() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold">Order Confirmed!</h1>
                <p className="text-slate-500">Thank you for your purchase. Your order has been placed successfully.</p>

                <div className="relative pt-6">
                    <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-slate-200"></div>
                    <div className="space-y-6 relative">
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-4 bg-green-500 rounded-full z-10 ring-4 ring-white"></div>
                            <div className="bg-slate-50 p-3 rounded-lg flex-1 text-left">
                                <p className="font-semibold text-sm">Order Placed</p>
                                <p className="text-xs text-slate-400">Just now</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-4 bg-slate-200 rounded-full z-10 ring-4 ring-white"></div>
                            <div className="bg-slate-50 p-3 rounded-lg flex-1 text-left opacity-60">
                                <p className="font-semibold text-sm">Payment Verified</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-4 bg-slate-200 rounded-full z-10 ring-4 ring-white"></div>
                            <div className="bg-slate-50 p-3 rounded-lg flex-1 text-left opacity-60">
                                <p className="font-semibold text-sm">Shipping</p>
                            </div>
                        </div>
                    </div>
                </div>

                <a href="/" className="block w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition mt-6">
                    Continue Shopping
                </a>
            </div>
        </div>
    );
}
