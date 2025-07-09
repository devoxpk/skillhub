'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Search, Star, ThumbsUp, MessageCircle, MoreVertical } from 'lucide-react';

interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  content: string;
  likes: number;
  replies: number;
  itemName: string;
  itemType: 'course' | 'collection';
  createdAt: string;
  status: 'published' | 'pending' | 'reported';
}

const mockReviews: Review[] = [
  {
    id: '1',
    authorName: 'John Doe',
    authorAvatar: '👤',
    rating: 5,
    content: 'Excellent course! The content is well-structured and easy to follow. I learned a lot from this course.',
    likes: 24,
    replies: 3,
    itemName: 'Web Development Fundamentals',
    itemType: 'course',
    createdAt: '2024-01-20 10:30 AM',
    status: 'published'
  },
  {
    id: '2',
    authorName: 'Jane Smith',
    authorAvatar: '👤',
    rating: 4,
    content: 'Great collection of resources. Would be even better with more advanced topics.',
    likes: 15,
    replies: 2,
    itemName: 'UI/UX Design Resources',
    itemType: 'collection',
    createdAt: '2024-01-19 03:45 PM',
    status: 'published'
  },
  {
    id: '3',
    authorName: 'Bob Wilson',
    authorAvatar: '👤',
    rating: 3,
    content: 'The course is good but needs more practical examples.',
    likes: 8,
    replies: 1,
    itemName: 'JavaScript Basics',
    itemType: 'course',
    createdAt: '2024-01-18 11:20 AM',
    status: 'reported'
  },
  {
    id: '4',
    authorName: 'Alice Brown',
    authorAvatar: '👤',
    rating: 5,
    content: 'Very comprehensive collection. Helped me a lot in my learning journey.',
    likes: 32,
    replies: 4,
    itemName: 'Mobile Development Resources',
    itemType: 'collection',
    createdAt: '2024-01-20 09:15 AM',
    status: 'pending'
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = reviews.filter(review =>
    Object.values(review).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ));
  };

  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-50 text-green-700';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'reported':
        return 'bg-red-50 text-red-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>
        <Button variant="outline">Export Reviews</Button>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>

          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                      {review.authorAvatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{review.authorName}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(review.status)}`}
                    >
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                    <Button variant="ghost" size="sm" className="-mr-2">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-600 mb-3">{review.content}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{review.replies}</span>
                    </div>
                  </div>
                  <div className="text-gray-500">
                    <span className="mr-4">{review.itemType === 'course' ? '📚' : '📂'} {review.itemName}</span>
                    <span>{review.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <span>Showing {filteredReviews.length} of {reviews.length} reviews</span>
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