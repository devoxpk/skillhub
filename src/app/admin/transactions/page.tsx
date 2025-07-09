'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Avatar } from '@/app/components/ui/avatar';

type Transaction = {
  id: number;
  userName: string;
  userAvatar: string;
  courseName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  status: 'Completed' | 'Pending' | 'Failed';
  invoiceId: string;
};

const initialTransactions: Transaction[] = [
  {
    id: 1,
    userName: 'John Doe',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    courseName: 'Web Development Fundamentals',
    amount: 99.99,
    date: '2024-01-20 14:30',
    paymentMethod: 'Credit Card',
    status: 'Completed',
    invoiceId: 'INV-2024-001',
  },
  {
    id: 2,
    userName: 'Sarah Wilson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    courseName: 'Data Science Essentials',
    amount: 149.99,
    date: '2024-01-19 10:15',
    paymentMethod: 'PayPal',
    status: 'Pending',
    invoiceId: 'INV-2024-002',
  },
  {
    id: 3,
    userName: 'Michael Brown',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    courseName: 'Mobile App Development',
    amount: 199.99,
    date: '2024-01-18 16:45',
    paymentMethod: 'Credit Card',
    status: 'Failed',
    invoiceId: 'INV-2024-003',
  },
  {
    id: 4,
    userName: 'Emily Davis',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    courseName: 'UI/UX Design Principles',
    amount: 79.99,
    date: '2024-01-17 09:20',
    paymentMethod: 'PayPal',
    status: 'Completed',
    invoiceId: 'INV-2024-004',
  },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filteredTransactions = initialTransactions.filter((transaction) =>
      Object.values(transaction).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setTransactions(filteredTransactions);
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage all payment transactions
          </p>
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-xs"
          />
          <Button>Export Report</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar
                      className="h-8 w-8 rounded-full"
                      src={transaction.userAvatar}
                      alt={transaction.userName}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.userName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {transaction.courseName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${transaction.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {transaction.paymentMethod}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getStatusColor(transaction.status)
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.invoiceId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing {transactions.length} of {initialTransactions.length} transactions
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}