'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Users, DollarSign, BookOpen, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart } from 'recharts';

// Mock data for dashboard stats
const dashboardStats = {
  totalUsers: 12543,
  totalEarnings: 89750.50,
  activeInstructors: 234,
  pendingApprovals: 18,
  coursesPublished: 456,
  monthlyGrowth: 12.5
};

// Mock data for charts
const monthlyData = [
  { month: 'Jan', users: 1200, earnings: 8500, courses: 45 },
  { month: 'Feb', users: 1350, earnings: 9200, courses: 52 },
  { month: 'Mar', users: 1480, earnings: 10100, courses: 48 },
  { month: 'Apr', users: 1620, earnings: 11300, courses: 61 },
  { month: 'May', users: 1750, earnings: 12800, courses: 58 },
  { month: 'Jun', users: 1890, earnings: 14200, courses: 67 }
];

const recentActivities = [
  { id: 1, action: 'New course submitted for approval', instructor: 'Sarah Wilson', time: '2 hours ago', type: 'approval' },
  { id: 2, action: 'User registration spike detected', details: '+45 new users', time: '4 hours ago', type: 'users' },
  { id: 3, action: 'Payment processed', details: '$299.99 - Web Development Course', time: '6 hours ago', type: 'payment' },
  { id: 4, action: 'Course published', instructor: 'Michael Brown', time: '8 hours ago', type: 'course' },
  { id: 5, action: 'Review flagged for moderation', details: 'Inappropriate content detected', time: '12 hours ago', type: 'review' }
];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform overview and key metrics</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={timeRange === '7d' ? 'default' : 'outline'} 
            onClick={() => setTimeRange('7d')}
            size="sm"
          >
            7 Days
          </Button>
          <Button 
            variant={timeRange === '30d' ? 'default' : 'outline'} 
            onClick={() => setTimeRange('30d')}
            size="sm"
          >
            30 Days
          </Button>
          <Button 
            variant={timeRange === '90d' ? 'default' : 'outline'} 
            onClick={() => setTimeRange('90d')}
            size="sm"
          >
            90 Days
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{dashboardStats.monthlyGrowth}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardStats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Instructors</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.activeInstructors}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{dashboardStats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0">
                  {activity.type === 'approval' && <Clock className="h-5 w-5 text-orange-500" />}
                  {activity.type === 'users' && <Users className="h-5 w-5 text-blue-500" />}
                  {activity.type === 'payment' && <DollarSign className="h-5 w-5 text-green-500" />}
                  {activity.type === 'course' && <BookOpen className="h-5 w-5 text-purple-500" />}
                  {activity.type === 'review' && <CheckCircle className="h-5 w-5 text-red-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  {activity.instructor && (
                    <p className="text-sm text-gray-500">by {activity.instructor}</p>
                  )}
                  {activity.details && (
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;