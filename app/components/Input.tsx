"use client";

import { useEffect, useState } from "react";
import AmountCard from "./AmountCard";

type M = {
    sub: string,
    amount: string,
    color: number,
    id: string,
}[]

const Input = () => {

    const [sub, setSub] = useState("");
    const [amount, setAmount] = useState("");
    const [rsmonth, setRsmonth] = useState(0);

    const [mobject, setMobject] = useState<M>([]);

    useEffect(() => {
        const savedData = localStorage.getItem("mobject");
        if (savedData) {
            try {
                setMobject(JSON.parse(savedData));
            } catch (error) {
                console.error("Failed to parse localStorage data:", error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("mobject", JSON.stringify(mobject));
    }, [mobject]);

    const colorOn = [
        "bg-green-200",
        "bg-red-200",
        "bg-blue-200",
        "bg-purple-200",
        "bg-indigo-200",
    ]

    useEffect(() => {
        let total = 0;
        mobject.forEach((i) => (
            total += Number(i.amount)

        ))
        setRsmonth(total)
    }, [mobject]);

    const handleAdd = () => {

        if (amount === "") return;
        if (sub === "") return;
        const newOn = {
            sub,
            amount,
            color: Math.floor(Math.random() * 4) + 1,
            id: crypto.randomUUID(),
        }

        setMobject(prev => [...prev, newOn])
        setSub("");
        setAmount("");
    }

    const handleDelete = (id: string) => {
        setMobject(mobject.filter(t => t.id !== id ));
    }

    console.log(mobject);

    return (
        <section>
            <form onSubmit={handleAdd} className="flex flex-col gap-3 items-center justify-center">
                <input required value={sub} onChange={(e) => setSub(e.target.value)} type="text" placeholder="subscription name" className="input" />
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="amount" className="input input-primary" />
                <button className="btn w-fit" type="submit">add</button>
            </form>
            <div className="bg-red-300 p-5 rounded-2xl my-5 font-bold text-2xl">
                Total: 
                {rsmonth}rs/month. {rsmonth * 12}rs/year.
            </div>
            <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Map through mobject array and render AmountCard component for each item */}
                {mobject.map((m) => (
                    <AmountCard key={m.id} m={m} handleDelete={handleDelete}/>
                ))}
            </div>

            <div>
                Total:
                {rsmonth} rs/month. {rsmonth * 12} rs/year.
            </div>
        </section>
    )
}

export default Input