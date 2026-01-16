"use client";

import { useState } from "react";

type M = [
    sub: string,
    amount: string
]

const Input = () => {

    const [sub, setSub] = useState("");
    const [amount, setAmount] = useState("");

    const [mobject, setMobject]= useState<M | []>([]);


    const handleAdd = () => {
        const newOn = {
            sub, amount
        }

        setMobject(prev => [...prev, newOn])
        setSub("");
        setAmount("");
    }

    console.log(mobject);

  return (
    <div className="flex flex-col gap-3s">
       <input value={sub} onChange={(e) => setSub(e.target.value)} type="text" placeholder="subscription name" className="input" />
       <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="amount" className="input input-primary" />

       <button className="btn" onClick={handleAdd}>add</button>
    </div>
  )
}

export default Input