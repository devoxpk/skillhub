'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

type TableData = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
};

const initialData: TableData[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Student',
    status: 'Active',
    lastActive: '2024-01-20',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Instructor',
    status: 'Inactive',
    lastActive: '2024-01-19',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Student',
    status: 'Active',
    lastActive: '2024-01-20',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Instructor',
    status: 'Active',
    lastActive: '2024-01-20',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Student',
    status: 'Inactive',
    lastActive: '2024-01-18',
  },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<TableData[]>(initialData);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filteredData = initialData.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setData(filteredData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">General Overview</h2>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline">Export</Button>
          <Button>Add New</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 font-medium text-gray-900">
                    {item.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-500">
                    {item.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-500">
                    {item.role}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                  {item.lastActive}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                  <Button
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing {data.length} of {initialData.length} entries
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