'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/app/components/ui/card';
import { Avatar } from '@/app/components/ui/avatar';

type Review = {
  id: number;
  userName: string;
  userAvatar: string;
  courseName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
};

const initialReviews: Review[] = [
  {
    id: 1,
    userName: 'John Doe',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    courseName: 'Web Development Fundamentals',
    rating: 5,
    comment: 'Excellent course! The content is well-structured and easy to follow. The instructor explains everything clearly.',
    date: '2024-01-20',
    status: 'Approved',
  },
  {
    id: 2,
    userName: 'Sarah Wilson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    courseName: 'Data Science Essentials',
    rating: 4,
    comment: 'Great introduction to data science. Could use more practical examples.',
    date: '2024-01-19',
    status: 'Pending',
  },
  {
    id: 3,
    userName: 'Michael Brown',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    courseName: 'Mobile App Development',
    rating: 3,
    comment: 'Content is good but some sections need updating to reflect current practices.',
    date: '2024-01-18',
    status: 'Approved',
  },
  {
    id: 4,
    userName: 'Emily Davis',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    courseName: 'UI/UX Design Principles',
    rating: 5,
    comment: 'Amazing course! Learned so much about modern design principles.',
    date: '2024-01-17',
    status: 'Approved',
  },
];

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filteredReviews = initialReviews.filter((review) =>
      Object.values(review).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setReviews(filteredReviews);
  };

  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course Reviews</h2>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-xs"
          />
          <Button>Export Reviews</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Avatar
                    className="h-10 w-10 rounded-full"
                    src={review.userAvatar}
                    alt={review.userName}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {review.userName}
                    </h3>
                    <p className="text-sm text-gray-500">{review.courseName}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    getStatusColor(review.status)
                  }`}
                >
                  {review.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="ml-2 text-sm text-gray-500">
                    {review.date}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>

              <div className="mt-6 flex gap-2">
                {review.status === 'Pending' && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 text-green-600 hover:text-green-900"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-red-600 hover:text-red-900"
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  className="flex-1 text-gray-600 hover:text-gray-900"
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
          Showing {reviews.length} of {initialReviews.length} reviews
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