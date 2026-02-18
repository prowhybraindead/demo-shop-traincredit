'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, CreditCard } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const PRODUCTS = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299.99, image: '🎧' },
  { id: 2, name: 'Ergonomic Mechanical Keyboard', price: 149.50, image: '⌨️' },
  { id: 3, name: '4K Ultra HD Monitor', price: 499.00, image: '🖥️' },
  { id: 4, name: 'Smart Home Hub', price: 89.99, image: '🏠' },
];

export default function Shop() {
  const [cart, setCart] = useState<{ id: number, qty: number }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('demo_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('demo_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === id);
      if (existing) return prev.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { id, qty: 1 }];
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const total = cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // const apiEndpoint = `${process.env.NEXT_PUBLIC_CORE_URL}/external/transaction`;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total })
      });

      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.error("Checkout failed");
      }
    } catch {
      toast.error("Error during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Toaster />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">Demo Electronics Store</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRODUCTS.map(product => (
              <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="text-4xl mb-4">{product.image}</div>
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-slate-500 font-mono">${product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => addToCart(product.id)}
                  className="mt-4 bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 sticky top-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Shopping Cart
            </h2>

            {cart.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => {
                  const product = PRODUCTS.find(p => p.id === item.id);
                  if (!product) return null;
                  return (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-slate-500">Qty: {item.qty} x ${product.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    <CreditCard className="w-5 h-5" />
                    {loading ? 'Processing...' : 'Secure Checkout'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
