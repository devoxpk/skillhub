'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Search, Download, ArrowUpRight, ArrowDownRight, DollarSign, BarChart } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  user: {
    name: string;
    email: string;
  };
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 299.99,
    description: 'Course Purchase: Web Development Fundamentals',
    status: 'completed',
    date: '2024-01-20 10:30 AM',
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  },
  {
    id: '2',
    type: 'debit',
    amount: 150.00,
    description: 'Instructor Payout',
    status: 'completed',
    date: '2024-01-19 03:45 PM',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    }
  },
  {
    id: '3',
    type: 'credit',
    amount: 199.99,
    description: 'Course Purchase: UI/UX Design Basics',
    status: 'pending',
    date: '2024-01-20 09:15 AM',
    user: {
      name: 'Bob Wilson',
      email: 'bob@example.com'
    }
  },
  {
    id: '4',
    type: 'credit',
    amount: 499.99,
    description: 'Course Bundle Purchase',
    status: 'failed',
    date: '2024-01-18 02:30 PM',
    user: {
      name: 'Alice Brown',
      email: 'alice@example.com'
    }
  }
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter(transaction =>
    Object.values(transaction).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    transaction.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = transactions
    .filter(t => t.status === 'completed' && t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPayouts = transactions
    .filter(t => t.status === 'completed' && t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'failed':
        return 'bg-red-50 text-red-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              <div className="p-2 bg-green-50 rounded-full">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-gray-900">
                ${totalRevenue.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                12.5%
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Payouts</h3>
              <div className="p-2 bg-red-50 rounded-full">
                <DollarSign className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-gray-900">
                ${totalPayouts.toFixed(2)}
              </span>
              <span className="text-sm text-red-600 flex items-center">
                <ArrowDownRight className="w-4 h-4" />
                8.3%
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Net Revenue</h3>
              <div className="p-2 bg-blue-50 rounded-full">
                <BarChart className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-gray-900">
                ${(totalRevenue - totalPayouts).toFixed(2)}
              </span>
              <span className="text-sm text-blue-600 flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                15.2%
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
              <div className="p-2 bg-purple-50 rounded-full">
                <BarChart className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-gray-900">95.8%</span>
              <span className="text-sm text-purple-600 flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                2.1%
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900">{transaction.id}</td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.user.name}
                        </div>
                        <div className="text-sm text-gray-500">{transaction.user.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {transaction.description}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-sm font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <span>Showing {filteredTransactions.length} of {transactions.length} transactions</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}