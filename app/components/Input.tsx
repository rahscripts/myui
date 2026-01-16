"use client";

import { useState } from "react";

type M = [
   { sub: string,
    amount: string,
    color: number,}
]

const Input = () => {

    const [sub, setSub] = useState("");
    const [amount, setAmount] = useState("");

    const [mobject, setMobject]= useState<M>([]);

    const colorOn = [
        "bg-green-200",
       "bg-red-200",
         "bg-blue-200",
       "bg-purple-200",
         "bg-indigo-200",
        
    ]

    const handleAdd = () => {

        if (amount === "") return ;
        if (sub === "") return ;
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

    console.log(mobject);

  return (
    <section>
        <div className="flex flex-col gap-3">
           <input value={sub} onChange={(e) => setSub(e.target.value)} type="text" placeholder="subscription name" className="input" />
           <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="amount" className="input input-primary" />
           <button className="btn w-fit" onClick={handleAdd}>add</button>
        </div>
        <div className="flex gap-2">
            {mobject.map((m) => (
                <div key={m.id} className={`${colorOn[m.color]} flex flex-col items-center justify-center w-fit p-5 rounded-xl `}>
                    <div className="font-bold uppercase text-3xl">{m.sub}</div>
                    <div className="opacity-90">{m.amount}rs/month</div>
                    <div>{12 * Number(m.amount)}rs/year</div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Input