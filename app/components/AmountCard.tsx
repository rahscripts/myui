import React from 'react'

// Define a single card item type
type CardItem = {
    sub: string,
    amount: string,
    color: number,
    id: string,
};

// Define the component props interface - the component receives ONE card item and a delete handler
type AmountCardProps = {
    m: CardItem,
    handleDelete: (id: string) => void,
}

const colorOn = [
    "bg-green-200",
    "bg-red-200",
    "bg-blue-200",
    "bg-purple-200",
    "bg-indigo-200",
]

// Fixed: Accept proper props instead of array type
const AmountCard = ({m, handleDelete}: AmountCardProps) => {
    return (
        <div
            key={m.id}
            className={`${colorOn[m.color]} rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300`}
        >
            <div className="space-y-3">
                <h3 className="uppercase font-bold text-red text-sm tracking-widest opacity-80">
                    {m.sub}
                </h3>
                <button className="btn" onClick={() => handleDelete(m.id)}>delete</button>

                <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">
                        ₹{m.amount}
                    </span>
                    <span className="text-sm opacity-80 mb-1">
                        /month
                    </span>
                </div>

                <p className="text-sm opacity-70">
                    ₹{12 * Number(m.amount)} billed yearly
                </p>
            </div>
        </div>
    )
}

export default AmountCard