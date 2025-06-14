import React from 'react';
import { PaymentHistoryItem } from '../../mock/billing';

const PaymentHistoryRow: React.FC<PaymentHistoryItem> = ({ date, amount, status, invoiceId, invoiceLink }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 text-sm">
    <td className="py-3 px-4 text-gray-700">{date}</td>
    <td className="py-3 px-4 text-gray-700">{amount}</td>
    <td className="py-3 px-4">
      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${status === 'Оплачено' ? 'bg-green-100 text-green-700' : status === 'Отклонено' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{status}</span>
    </td>
    <td className="py-3 px-4">
      {invoiceLink ? (
        <a href={invoiceLink} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
          #{invoiceId}
        </a>
      ) : (
        <span className="text-gray-400">—</span>
      )}
    </td>
  </tr>
);

export default PaymentHistoryRow;
