'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/app/components/ui/card';

type Collection = {
  id: number;
  title: string;
  description: string;
  coursesCount: number;
  studentsEnrolled: number;
  revenue: number;
  thumbnail: string;
  status: 'Published' | 'Draft';
};

const initialCollections: Collection[] = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development with HTML, CSS, and JavaScript.',
    coursesCount: 5,
    studentsEnrolled: 1200,
    revenue: 24000,
    thumbnail: 'https://placehold.co/600x400/4F46E5/ffffff?text=Web+Dev',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Data Science Essentials',
    description: 'Master the fundamentals of data science and analytics.',
    coursesCount: 4,
    studentsEnrolled: 800,
    revenue: 16000,
    thumbnail: 'https://placehold.co/600x400/2563EB/ffffff?text=Data+Science',
    status: 'Published',
  },
  {
    id: 3,
    title: 'Mobile App Development',
    description: 'Create mobile applications for iOS and Android platforms.',
    coursesCount: 6,
    studentsEnrolled: 950,
    revenue: 19000,
    thumbnail: 'https://placehold.co/600x400/7C3AED/ffffff?text=Mobile+Dev',
    status: 'Draft',
  },
  {
    id: 4,
    title: 'UI/UX Design Principles',
    description: 'Learn modern design principles and create amazing user experiences.',
    coursesCount: 3,
    studentsEnrolled: 600,
    revenue: 12000,
    thumbnail: 'https://placehold.co/600x400/DB2777/ffffff?text=UI+Design',
    status: 'Published',
  },
];

export default function CollectionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [collections, setCollections] = useState<Collection[]>(initialCollections);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filteredCollections = initialCollections.filter((collection) =>
      Object.values(collection).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setCollections(filteredCollections);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Collections</h2>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-xs"
          />
          <Button>Create Collection</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Card key={collection.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={collection.thumbnail}
                alt={collection.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full ${
                  collection.status === 'Published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {collection.status}
              </span>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {collection.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{collection.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div>
                  <p className="font-medium">Courses</p>
                  <p>{collection.coursesCount}</p>
                </div>
                <div>
                  <p className="font-medium">Students</p>
                  <p>{collection.studentsEnrolled}</p>
                </div>
                <div>
                  <p className="font-medium">Revenue</p>
                  <p>${collection.revenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-900"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing {collections.length} of {initialCollections.length} collections
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