type CardItem = { sub: string; amount: string; color: number; id: string; category: string; subscription: boolean };
type CardProps = { m: CardItem; handleDelete: (id: string) => void };

// Only render subscriptions with dashed premium border
const SubscriptionCard = ({ m, handleDelete }: CardProps) => 
  !m.subscription ? null : (
    <div className="border-2 border-dashed border-gray-400 bg-white rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all">
      {/* Header with name and delete button */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-sm text-gray-800">{m.sub}</h3>
          <p className="text-xs text-gray-500 capitalize">{m.category}</p>
        </div>
        <button
          onClick={() => handleDelete(m.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
          title="Delete"
        >
          ✕
        </button>
      </div>

      {/* Price display */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">₹{m.amount}</span>
          <span className="text-xs text-gray-600">/month</span>
        </div>
        <p className="text-xs text-gray-600">₹{Number(m.amount) * 12}/year</p>
      </div>
    </div>
  );

export default SubscriptionCard;