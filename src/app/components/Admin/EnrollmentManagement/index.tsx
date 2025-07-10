'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import  Badge  from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Users, 
  BookOpen, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for enrollments
const mockEnrollments = [
  {
    id: 1,
    userId: 101,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    courseId: 1,
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'John Smith',
    enrollmentDate: '2024-01-15',
    status: 'active',
    progress: 75,
    completionDate: null,
    paymentStatus: 'paid',
    amount: 199.99,
    subscriptionType: 'one-time',
    lastAccessed: '2024-03-15'
  },
  {
    id: 2,
    userId: 102,
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    courseId: 2,
    courseTitle: 'Advanced React Masterclass',
    instructor: 'Sarah Johnson',
    enrollmentDate: '2024-02-01',
    status: 'completed',
    progress: 100,
    completionDate: '2024-03-10',
    paymentStatus: 'paid',
    amount: 149.99,
    subscriptionType: 'monthly',
    lastAccessed: '2024-03-10'
  },
  {
    id: 3,
    userId: 103,
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    courseId: 3,
    courseTitle: 'Data Science Fundamentals',
    instructor: 'Dr. Emily Davis',
    enrollmentDate: '2024-03-01',
    status: 'suspended',
    progress: 25,
    completionDate: null,
    paymentStatus: 'failed',
    amount: 179.99,
    subscriptionType: 'annual',
    lastAccessed: '2024-03-05'
  },
  {
    id: 4,
    userId: 104,
    userName: 'Sarah Wilson',
    userEmail: 'sarah@example.com',
    courseId: 4,
    courseTitle: 'Full Stack Developer Bundle',
    instructor: 'Multiple Instructors',
    enrollmentDate: '2024-01-20',
    status: 'active',
    progress: 60,
    completionDate: null,
    paymentStatus: 'paid',
    amount: 399.99,
    subscriptionType: 'one-time',
    lastAccessed: '2024-03-14'
  }
];

// Mock subscription plans
const mockSubscriptionPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    price: 29.99,
    interval: 'monthly',
    features: ['Access to basic courses', 'Community support', 'Mobile app access'],
    activeSubscribers: 1250,
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    name: 'Pro Plan',
    price: 79.99,
    interval: 'monthly',
    features: ['All basic features', 'Premium courses', 'Live sessions', 'Priority support'],
    activeSubscribers: 890,
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: 3,
    name: 'Annual Pro',
    price: 799.99,
    interval: 'yearly',
    features: ['All pro features', '2 months free', 'Exclusive content', 'One-on-one mentoring'],
    activeSubscribers: 456,
    status: 'active',
    createdAt: '2024-01-01'
  }
];

// Mock enrollment trends data
const enrollmentTrends = [
  { month: 'Jan', enrollments: 120, revenue: 23980 },
  { month: 'Feb', enrollments: 150, revenue: 29970 },
  { month: 'Mar', enrollments: 180, revenue: 35960 },
  { month: 'Apr', enrollments: 200, revenue: 39980 },
  { month: 'May', enrollments: 220, revenue: 43970 },
  { month: 'Jun', enrollments: 250, revenue: 49950 }
];

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [subscriptionPlans, setSubscriptionPlans] = useState(mockSubscriptionPlans);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [selectedEnrollment, setSelectedEnrollment] = useState<typeof mockEnrollments[0] | null>(null);
  const [activeTab, setActiveTab] = useState('enrollments');

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter;
    const matchesSubscription = subscriptionFilter === 'all' || enrollment.subscriptionType === subscriptionFilter;
    
    return matchesSearch && matchesStatus && matchesSubscription;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionTypeColor = (type: string) => {
    switch (type) {
      case 'monthly': return 'bg-blue-100 text-blue-800';
      case 'annual': return 'bg-purple-100 text-purple-800';
      case 'one-time': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEnrollments = enrollments.length;
  const activeEnrollments = enrollments.filter(e => e.status === 'active').length;
  const completedEnrollments = enrollments.filter(e => e.status === 'completed').length;
  const totalRevenue = enrollments.reduce((sum, enrollment) => sum + enrollment.amount, 0);
  const averageProgress = enrollments.reduce((sum, enrollment) => sum + enrollment.progress, 0) / enrollments.length;

  const updateEnrollmentStatus = (id: number, newStatus: string) => {
    setEnrollments(enrollments.map(enrollment => 
      enrollment.id === id ? { ...enrollment, status: newStatus } : enrollment
    ));
  };

  const deleteEnrollment = (id: number) => {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      setEnrollments(enrollments.filter(e => e.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enrollment Management</h1>
          <p className="text-gray-600 mt-1">Track enrollments and manage subscription plans</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Manual Enrollment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{totalEnrollments}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{activeEnrollments}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">{Math.round((activeEnrollments / totalEnrollments) * 100)}% of total</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedEnrollments}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">{Math.round((completedEnrollments / totalEnrollments) * 100)}% completion rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+8.2%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(averageProgress)}%</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">Across all enrollments</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="enrollments" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscription Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollments" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users, courses, or emails..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by subscription" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="one-time">One-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Enrollments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollments ({filteredEnrollments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-600">Student</th>
                      <th className="text-left p-4 font-medium text-gray-600">Course</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600">Progress</th>
                      <th className="text-left p-4 font-medium text-gray-600">Payment</th>
                      <th className="text-left p-4 font-medium text-gray-600">Subscription</th>
                      <th className="text-left p-4 font-medium text-gray-600">Enrolled</th>
                      <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">{enrollment.userName}</p>
                            <p className="text-sm text-gray-500">{enrollment.userEmail}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">{enrollment.courseTitle}</p>
                            <p className="text-sm text-gray-500">by {enrollment.instructor}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(enrollment.status)}>
                            {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${enrollment.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{enrollment.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <Badge className={getPaymentStatusColor(enrollment.paymentStatus)}>
                              {enrollment.paymentStatus.charAt(0).toUpperCase() + enrollment.paymentStatus.slice(1)}
                            </Badge>
                            <p className="text-sm text-gray-500 mt-1">${enrollment.amount}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getSubscriptionTypeColor(enrollment.subscriptionType)}>
                            {enrollment.subscriptionType.charAt(0).toUpperCase() + enrollment.subscriptionType.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-900">{enrollment.enrollmentDate}</p>
                          <p className="text-sm text-gray-500">Last: {enrollment.lastAccessed}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedEnrollment(enrollment)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Enrollment Details</DialogTitle>
                                </DialogHeader>
                                {selectedEnrollment && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm text-gray-500">Student</Label>
                                        <p className="font-medium">{selectedEnrollment.userName}</p>
                                        <p className="text-sm text-gray-500">{selectedEnrollment.userEmail}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm text-gray-500">Course</Label>
                                        <p className="font-medium">{selectedEnrollment.courseTitle}</p>
                                        <p className="text-sm text-gray-500">by {selectedEnrollment.instructor}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm text-gray-500">Enrollment Date</Label>
                                        <p className="font-medium">{selectedEnrollment.enrollmentDate}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm text-gray-500">Last Accessed</Label>
                                        <p className="font-medium">{selectedEnrollment.lastAccessed}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm text-gray-500">Progress</Label>
                                        <p className="font-medium">{selectedEnrollment.progress}%</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm text-gray-500">Status</Label>
                                        <Badge className={getStatusColor(selectedEnrollment.status)}>
                                          {selectedEnrollment.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Select
                              value={enrollment.status}
                              onValueChange={(value) => updateEnrollmentStatus(enrollment.id, value)}
                            >
                              <SelectTrigger className="w-24 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEnrollment(enrollment.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
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

        <TabsContent value="subscriptions" className="space-y-6">
          {/* Subscription Plans */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Subscription Plans</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="flex items-baseline space-x-1 mt-2">
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-gray-500">/{plan.interval}</span>
                      </div>
                    </div>
                    <Badge className={plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {plan.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Features:</p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Active Subscribers:</span>
                      <span className="font-medium">{plan.activeSubscribers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-500">Monthly Revenue:</span>
                      <span className="font-medium">
                        ${(plan.price * plan.activeSubscribers * (plan.interval === 'yearly' ? 1/12 : 1)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnrollmentManagement;