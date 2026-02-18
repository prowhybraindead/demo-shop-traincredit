'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, CreditCard, Star, Zap, Plus, Minus } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const PRODUCTS = [
  {
    id: 1,
    name: 'Lumina X1 Headphones',
    price: 299.99,
    image: '🎧',
    desc: 'Active noise cancellation with 40h battery life.',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Chronos Mechanical',
    price: 149.50,
    image: '⌨️',
    desc: 'Aerospace-grade aluminum with custom switches.',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Vision Pro 4K',
    price: 499.00,
    image: '🖥️',
    desc: 'Color-accurate IPS panel for creators.',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Nexus Hub',
    price: 89.99,
    image: '🏠',
    desc: 'Control your entire home with voice.',
    rating: 4.6
  },
];

export default function Shop() {
  const [cart, setCart] = useState<{ id: number, qty: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('demo_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('demo_cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

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

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.id === id) {
        const newQty = Math.max(1, p.qty + delta);
        return { ...p, qty: newQty };
      }
      return p;
    }));
  };

  const total = cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
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

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <Toaster position="top-center" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">TechHaven</span>
          </div>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-neutral-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Product Grid */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-black mb-2">New Arrivals.</h1>
            <p className="text-neutral-500">The latest tech for your setup.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRODUCTS.map(product => (
              <div key={product.id} className="group bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-square bg-neutral-50 rounded-2xl flex items-center justify-center text-7xl mb-6 group-hover:scale-105 transition-transform duration-300">
                  {product.image}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-1 text-amber-400 mt-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold text-neutral-400">{product.rating}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-indigo-600">${product.price}</span>
                </div>
                <p className="text-sm text-neutral-500 mb-6 line-clamp-2">{product.desc}</p>
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-neutral-900 text-white py-3 rounded-xl font-bold hover:bg-neutral-800 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Cart */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-neutral-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              Order Summary
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-neutral-100 rounded-2xl">
                <ShoppingCart className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-400 font-medium">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map(item => {
                    const product = PRODUCTS.find(p => p.id === item.id);
                    if (!product) return null;
                    return (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-neutral-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                          {product.image}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-sm leading-tight">{product.name}</h4>
                            <span className="font-mono text-xs font-bold">${(product.price * item.qty).toFixed(2)}</span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3 bg-neutral-50 rounded-lg p-1">
                              <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white rounded-md shadow-sm transition">
                                <Minus className="w-3 h-3 text-neutral-600" />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                              <button onClick={() => addToCart(item.id)} className="p-1 hover:bg-white rounded-md shadow-sm transition">
                                <Plus className="w-3 h-3 text-neutral-600" />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-neutral-300 hover:text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-neutral-100 pt-6 space-y-3">
                  <div className="flex justify-between text-sm text-neutral-500">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-500">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-black text-xl pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-70 disabled:active:scale-100 mt-4"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" /> Secure Checkout
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-neutral-400 mt-2">
                    Powered by TrainCredit. Secure 256-bit SSL encryption.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
