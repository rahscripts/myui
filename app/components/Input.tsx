"use client";

import { useEffect, useState } from "react";
import AmountCard from "./AmountCard";
import SubscriptionCard from "./subscriptionCard";

// Define data structure
type Item = { sub: string; amount: string; color: number; id: string; category: string; subscription: boolean }[];

const Input = () => {
    // State management
    const [sub, setSub] = useState("");
    const [amount, setAmount] = useState("");
    const [rsmonth, setRsmonth] = useState(0);
    const [items, setItems] = useState<Item>([]);
    const [cat, setCat] = useState("personal");
    const [isSubscription, setIsSubscription] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("mobject");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse data:", e);
            }
        }
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem("mobject", JSON.stringify(items));
    }, [items]);

    // Calculate total monthly expense
    useEffect(() => {
        const total = items.reduce((sum, item) => sum + Number(item.amount), 0);
        setRsmonth(total);
    }, [items]);

    // Add new item
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !sub) return;
        
        setItems((prev) => [
            ...prev,
            { sub, amount, color: Math.floor(Math.random() * 5), id: crypto.randomUUID(), category: cat, subscription: isSubscription }
        ]);
        setSub("");
        setAmount("");
    };

    // Delete item
    const handleDelete = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

    return (
        <section className="max-w-7xl mx-auto p-4">
            {/* Input Form */}
            <form onSubmit={handleAdd} className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                    <input
                        required
                        value={sub}
                        onChange={(e) => setSub(e.target.value)}
                        type="text"
                        placeholder="Name"
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <input
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        placeholder="Amount"
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <select
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="personal">Personal</option>
                        <option value="health">Health</option>
                        <option value="ott">OTT</option>
                    </select>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={isSubscription}
                            onChange={(e) => setIsSubscription(e.target.checked)}
                            className="w-4 h-4"
                        />
                        Subscription
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-600 transition"
                    >
                        Add
                    </button>
                </div>
            </form>

            {/* Total Summary */}
            <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 mb-6 text-center">
                <p className="text-gray-700">
                    <span className="font-bold text-lg">₹{rsmonth}</span>/month •
                    <span className="font-bold text-lg ml-2">₹{rsmonth * 12}</span>/year
                </p>
            </div>

            {/* Items Grid */}
            <div>
                <h2 className="text-sm font-semibold text-gray-600 mb-3">Regular Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {items.map((item) => (
                        <AmountCard key={item.id} m={item} handleDelete={handleDelete} />
                    ))}
                </div>

                <h2 className="text-sm font-semibold text-gray-600 mb-3">Subscriptions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <SubscriptionCard key={item.id} m={item} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Input;