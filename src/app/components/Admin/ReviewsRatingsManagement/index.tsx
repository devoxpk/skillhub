'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Filter,
  TrendingUp,
  Users,
  BookOpen,
  Flag,
  MoreVertical,
  ExternalLink,
  Reply,
  Archive,
  Ban
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data for reviews and ratings
const mockReviews = [
  {
    id: 1,
    userId: 101,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userAvatar: '/avatars/john.jpg',
    courseId: 1,
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'John Smith',
    rating: 5,
    title: 'Excellent course with great content!',
    content: 'This course exceeded my expectations. The instructor explains everything clearly and the projects are very practical. I learned so much and feel confident in my web development skills now.',
    status: 'approved',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    moderatedAt: '2024-03-15T11:00:00Z',
    moderatedBy: 'Admin User',
    helpfulVotes: 15,
    reportCount: 0,
    isVerifiedPurchase: true,
    courseProgress: 100,
    replies: [
      {
        id: 1,
        userId: 201,
        userName: 'John Smith',
        userType: 'instructor',
        content: 'Thank you for the wonderful review! I\'m glad you found the course helpful.',
        createdAt: '2024-03-15T12:00:00Z'
      }
    ]
  },
  {
    id: 2,
    userId: 102,
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    userAvatar: '/avatars/jane.jpg',
    courseId: 2,
    courseTitle: 'Advanced React Masterclass',
    instructor: 'Sarah Johnson',
    rating: 4,
    title: 'Good course but could use more examples',
    content: 'The course content is solid and covers advanced React concepts well. However, I would have liked to see more real-world examples and case studies.',
    status: 'pending',
    createdAt: '2024-03-14T15:45:00Z',
    updatedAt: '2024-03-14T15:45:00Z',
    moderatedAt: null,
    moderatedBy: null,
    helpfulVotes: 8,
    reportCount: 0,
    isVerifiedPurchase: true,
    courseProgress: 85,
    replies: []
  },
  {
    id: 3,
    userId: 103,
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    userAvatar: '/avatars/mike.jpg',
    courseId: 3,
    courseTitle: 'Data Science Fundamentals',
    instructor: 'Dr. Emily Davis',
    rating: 2,
    title: 'Disappointing content quality',
    content: 'The course seems outdated and the examples don\'t work with current versions of the tools. Very frustrating experience.',
    status: 'flagged',
    createdAt: '2024-03-13T09:20:00Z',
    updatedAt: '2024-03-13T09:20:00Z',
    moderatedAt: null,
    moderatedBy: null,
    helpfulVotes: 3,
    reportCount: 2,
    isVerifiedPurchase: true,
    courseProgress: 25,
    replies: []
  },
  {
    id: 4,
    userId: 104,
    userName: 'Sarah Wilson',
    userEmail: 'sarah@example.com',
    userAvatar: '/avatars/sarah.jpg',
    courseId: 1,
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'John Smith',
    rating: 5,
    title: 'Perfect for beginners!',
    content: 'As someone completely new to programming, this course was exactly what I needed. The pace is perfect and the support community is amazing.',
    status: 'approved',
    createdAt: '2024-03-12T14:15:00Z',
    updatedAt: '2024-03-12T14:15:00Z',
    moderatedAt: '2024-03-12T15:00:00Z',
    moderatedBy: 'Admin User',
    helpfulVotes: 22,
    reportCount: 0,
    isVerifiedPurchase: true,
    courseProgress: 100,
    replies: []
  },
  {
    id: 5,
    userId: 105,
    userName: 'Anonymous User',
    userEmail: 'anonymous@example.com',
    userAvatar: null,
    courseId: 2,
    courseTitle: 'Advanced React Masterclass',
    instructor: 'Sarah Johnson',
    rating: 1,
    title: 'Spam review with inappropriate content',
    content: 'This is clearly spam content with inappropriate language and irrelevant information that should be rejected.',
    status: 'rejected',
    createdAt: '2024-03-11T08:30:00Z',
    updatedAt: '2024-03-11T08:30:00Z',
    moderatedAt: '2024-03-11T09:00:00Z',
    moderatedBy: 'Admin User',
    helpfulVotes: 0,
    reportCount: 5,
    isVerifiedPurchase: false,
    courseProgress: 0,
    replies: []
  }
];

// Mock rating distribution data
const ratingDistribution = [
  { rating: 5, count: 450, percentage: 65 },
  { rating: 4, count: 150, percentage: 22 },
  { rating: 3, count: 60, percentage: 9 },
  { rating: 2, count: 20, percentage: 3 },
  { rating: 1, count: 10, percentage: 1 }
];

// Mock review trends data
const reviewTrends = [
  { month: 'Jan', reviews: 45, avgRating: 4.2 },
  { month: 'Feb', reviews: 67, avgRating: 4.3 },
  { month: 'Mar', reviews: 89, avgRating: 4.5 },
  { month: 'Apr', reviews: 123, avgRating: 4.4 },
  { month: 'May', reviews: 156, avgRating: 4.6 },
  { month: 'Jun', reviews: 178, avgRating: 4.5 }
];

// Mock course ratings summary
const courseRatings = [
  { courseId: 1, title: 'Complete Web Development Bootcamp', avgRating: 4.8, totalReviews: 245, instructor: 'John Smith' },
  { courseId: 2, title: 'Advanced React Masterclass', avgRating: 4.6, totalReviews: 156, instructor: 'Sarah Johnson' },
  { courseId: 3, title: 'Data Science Fundamentals', avgRating: 4.2, totalReviews: 89, instructor: 'Dr. Emily Davis' },
  { courseId: 4, title: 'Full Stack Developer Bundle', avgRating: 4.7, totalReviews: 134, instructor: 'Multiple Instructors' }
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6B7280'];

const ReviewsRatingsManagement = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState<typeof mockReviews[0] | null>(null);
  const [moderationNote, setModerationNote] = useState('');
  const [activeTab, setActiveTab] = useState('reviews');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    const matchesCourse = courseFilter === 'all' || review.courseId.toString() === courseFilter;
    
    return matchesSearch && matchesStatus && matchesRating && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'flagged': return <Flag className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const moderateReview = (reviewId: number, newStatus: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            status: newStatus, 
            moderatedAt: new Date().toISOString(),
            moderatedBy: 'Current Admin'
          }
        : review
    ));
  };

  const deleteReview = (reviewId: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(r => r.id !== reviewId));
    }
  };

  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter(r => r.status === 'approved').length;
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;
  const flaggedReviews = reviews.filter(r => r.status === 'flagged').length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings Management</h1>
          <p className="text-gray-600 mt-1">Moderate reviews and manage course ratings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Bulk Actions
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+12.5%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedReviews}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">{Math.round((approvedReviews / totalReviews) * 100)}% of total</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingReviews}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-yellow-600">Needs attention</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-gray-900">{flaggedReviews}</p>
              </div>
              <Flag className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-red-600">Requires review</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              {renderStars(Math.round(averageRating))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="reviews">Reviews Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
          <TabsTrigger value="courses">Course Ratings</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search reviews, users, or courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courseRatings.map((course) => (
                      <SelectItem key={course.courseId} value={course.courseId.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900">{review.userName}</h3>
                          {review.isVerifiedPurchase && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600">for</span>
                          <span className="text-sm font-medium text-blue-600">{review.courseTitle}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                        <p className="text-gray-700 mb-3">{review.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {review.helpfulVotes} helpful
                          </span>
                          <span>Progress: {review.courseProgress}%</span>
                          {review.reportCount > 0 && (
                            <span className="text-red-600 flex items-center">
                              <Flag className="h-3 w-3 mr-1" />
                              {review.reportCount} reports
                            </span>
                          )}
                        </div>
                        {review.replies.length > 0 && (
                          <div className="mt-4 pl-4 border-l-2 border-gray-200">
                            {review.replies.map((reply) => (
                              <div key={reply.id} className="mb-3">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-sm">{reply.userName}</span>
                                  <Badge className="bg-purple-100 text-purple-800 text-xs">
                                    {reply.userType}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {new Date(reply.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(review.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(review.status)}
                          <span>{review.status.charAt(0).toUpperCase() + review.status.slice(1)}</span>
                        </div>
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelectedReview(review)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => moderateReview(review.id, 'approved')}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => moderateReview(review.id, 'rejected')}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => moderateReview(review.id, 'flagged')}>
                            <Flag className="h-4 w-4 mr-2" />
                            Flag
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Reply className="h-4 w-4 mr-2" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteReview(review.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reviewTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="reviews" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ratingDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ rating, percentage }) => `${rating}★ (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {ratingDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Rating Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reviewTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgRating" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ratingDistribution.map((item) => (
                    <div key={item.rating} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {renderStars(item.rating)}
                        <span className="text-sm text-gray-600">({item.rating} stars)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          {/* Course Ratings Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Course Ratings Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-600">Course</th>
                      <th className="text-left p-4 font-medium text-gray-600">Instructor</th>
                      <th className="text-left p-4 font-medium text-gray-600">Average Rating</th>
                      <th className="text-left p-4 font-medium text-gray-600">Total Reviews</th>
                      <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseRatings.map((course) => (
                      <tr key={course.courseId} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <p className="font-medium text-gray-900">{course.title}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-700">{course.instructor}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {renderStars(Math.round(course.avgRating))}
                            <span className="font-medium">{course.avgRating.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-700">{course.totalReviews}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Review Details Dialog */}
      {selectedReview && (
        <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Reviewer</Label>
                  <p className="font-medium">{selectedReview.userName}</p>
                  <p className="text-sm text-gray-500">{selectedReview.userEmail}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Course</Label>
                  <p className="font-medium">{selectedReview.courseTitle}</p>
                  <p className="text-sm text-gray-500">by {selectedReview.instructor}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Rating</Label>
                  <div className="flex items-center space-x-2">
                    {renderStars(selectedReview.rating, 'md')}
                    <span className="font-medium">{selectedReview.rating}/5</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedReview.status)}>
                    {selectedReview.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Review Title</Label>
                <p className="font-medium">{selectedReview.title}</p>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Review Content</Label>
                <p className="text-gray-900 mt-1">{selectedReview.content}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Helpful Votes</Label>
                  <p className="font-medium">{selectedReview.helpfulVotes}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Reports</Label>
                  <p className="font-medium">{selectedReview.reportCount}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Course Progress</Label>
                  <p className="font-medium">{selectedReview.courseProgress}%</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500">Moderation Note</Label>
                <Textarea
                  value={moderationNote}
                  onChange={(e) => setModerationNote(e.target.value)}
                  placeholder="Add moderation notes..."
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedReview(null)}>
                  Close
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => moderateReview(selectedReview.id, 'rejected')}
                  className="text-red-600 hover:text-red-800"
                >
                  Reject
                </Button>
                <Button onClick={() => moderateReview(selectedReview.id, 'approved')}>
                  Approve
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReviewsRatingsManagement;