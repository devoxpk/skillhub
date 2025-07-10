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
import { Textarea } from '@/app/components/ui/textarea';
import { 
  Search, 
  Eye, 
  Download, 
  Plus, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Filter,
  Users,
  CreditCard,
  Calendar,
  MoreVertical,
  Send,
  FileText,
  Banknote,
  Wallet,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Mock data for payouts
const mockPayouts = [
  {
    id: 1,
    instructorId: 101,
    instructorName: 'John Smith',
    instructorEmail: 'john.smith@example.com',
    amount: 2450.00,
    currency: 'USD',
    status: 'pending',
    requestedAt: '2024-03-15T10:30:00Z',
    processedAt: null,
    paymentMethod: 'bank_transfer',
    bankDetails: {
      accountNumber: '****1234',
      bankName: 'Chase Bank',
      routingNumber: '****5678'
    },
    period: {
      start: '2024-02-01',
      end: '2024-02-29'
    },
    earnings: {
      grossRevenue: 3500.00,
      platformFee: 1050.00,
      netEarnings: 2450.00,
      feePercentage: 30
    },
    salesBreakdown: [
      { courseId: 1, courseTitle: 'Web Development Bootcamp', sales: 15, revenue: 2250.00 },
      { courseId: 2, courseTitle: 'Advanced JavaScript', sales: 8, revenue: 1250.00 }
    ]
  },
  {
    id: 2,
    instructorId: 102,
    instructorName: 'Sarah Johnson',
    instructorEmail: 'sarah.johnson@example.com',
    amount: 1875.50,
    currency: 'USD',
    status: 'completed',
    requestedAt: '2024-03-10T14:20:00Z',
    processedAt: '2024-03-12T09:15:00Z',
    paymentMethod: 'paypal',
    paypalEmail: 'sarah.johnson@paypal.com',
    period: {
      start: '2024-02-01',
      end: '2024-02-29'
    },
    earnings: {
      grossRevenue: 2679.29,
      platformFee: 803.79,
      netEarnings: 1875.50,
      feePercentage: 30
    },
    salesBreakdown: [
      { courseId: 3, courseTitle: 'React Masterclass', sales: 12, revenue: 1800.00 },
      { courseId: 4, courseTitle: 'Node.js Fundamentals', sales: 6, revenue: 879.29 }
    ]
  },
  {
    id: 3,
    instructorId: 103,
    instructorName: 'Dr. Emily Davis',
    instructorEmail: 'emily.davis@example.com',
    amount: 3200.75,
    currency: 'USD',
    status: 'processing',
    requestedAt: '2024-03-08T11:45:00Z',
    processedAt: '2024-03-14T16:30:00Z',
    paymentMethod: 'bank_transfer',
    bankDetails: {
      accountNumber: '****9876',
      bankName: 'Bank of America',
      routingNumber: '****4321'
    },
    period: {
      start: '2024-02-01',
      end: '2024-02-29'
    },
    earnings: {
      grossRevenue: 4572.50,
      platformFee: 1371.75,
      netEarnings: 3200.75,
      feePercentage: 30
    },
    salesBreakdown: [
      { courseId: 5, courseTitle: 'Data Science Complete Course', sales: 20, revenue: 3000.00 },
      { courseId: 6, courseTitle: 'Machine Learning Basics', sales: 10, revenue: 1572.50 }
    ]
  },
  {
    id: 4,
    instructorId: 104,
    instructorName: 'Michael Brown',
    instructorEmail: 'michael.brown@example.com',
    amount: 890.25,
    currency: 'USD',
    status: 'failed',
    requestedAt: '2024-03-05T08:15:00Z',
    processedAt: '2024-03-07T12:00:00Z',
    paymentMethod: 'paypal',
    paypalEmail: 'michael.brown@paypal.com',
    period: {
      start: '2024-02-01',
      end: '2024-02-29'
    },
    earnings: {
      grossRevenue: 1271.79,
      platformFee: 381.54,
      netEarnings: 890.25,
      feePercentage: 30
    },
    salesBreakdown: [
      { courseId: 7, courseTitle: 'Python for Beginners', sales: 8, revenue: 1271.79 }
    ],
    failureReason: 'Invalid PayPal account'
  }
];

// Mock instructor earnings data
const mockInstructorEarnings = [
  {
    instructorId: 101,
    instructorName: 'John Smith',
    totalEarnings: 15750.00,
    pendingPayouts: 2450.00,
    completedPayouts: 13300.00,
    coursesCount: 5,
    avgMonthlyEarnings: 2625.00,
    lastPayoutDate: '2024-02-15',
    joinDate: '2023-06-01'
  },
  {
    instructorId: 102,
    instructorName: 'Sarah Johnson',
    totalEarnings: 12400.50,
    pendingPayouts: 0,
    completedPayouts: 12400.50,
    coursesCount: 3,
    avgMonthlyEarnings: 2066.75,
    lastPayoutDate: '2024-03-12',
    joinDate: '2023-08-15'
  },
  {
    instructorId: 103,
    instructorName: 'Dr. Emily Davis',
    totalEarnings: 18900.75,
    pendingPayouts: 3200.75,
    completedPayouts: 15700.00,
    coursesCount: 4,
    avgMonthlyEarnings: 3150.13,
    lastPayoutDate: '2024-02-20',
    joinDate: '2023-04-10'
  }
];

// Mock payout trends data
const payoutTrends = [
  { month: 'Sep', amount: 12500, count: 15 },
  { month: 'Oct', amount: 15800, count: 18 },
  { month: 'Nov', amount: 18200, count: 22 },
  { month: 'Dec', amount: 21500, count: 25 },
  { month: 'Jan', amount: 19800, count: 23 },
  { month: 'Feb', amount: 22300, count: 27 },
  { month: 'Mar', amount: 25100, count: 30 }
];

// Mock payment method distribution
const paymentMethodData = [
  { method: 'Bank Transfer', count: 45, percentage: 60 },
  { method: 'PayPal', count: 25, percentage: 33 },
  { method: 'Stripe', count: 5, percentage: 7 }
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6B7280'];

const PayoutsManagement = () => {
  const [payouts, setPayouts] = useState(mockPayouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selectedPayout, setSelectedPayout] = useState<typeof mockPayouts[0] | null>(null);
  const [activeTab, setActiveTab] = useState('payouts');
  const [processingNote, setProcessingNote] = useState('');

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = payout.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.instructorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || payout.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payout.paymentMethod === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <RefreshCw className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const processPayout = (payoutId: number, newStatus: string) => {
    setPayouts(payouts.map(payout => 
      payout.id === payoutId 
        ? { 
            ...payout, 
            status: newStatus, 
            processedAt: new Date().toISOString()
          }
        : payout
    ));
  };

  const totalPayouts = payouts.reduce((sum, payout) => sum + payout.amount, 0);
  const pendingPayouts = payouts.filter(p => p.status === 'pending');
  const completedPayouts = payouts.filter(p => p.status === 'completed');
  const failedPayouts = payouts.filter(p => p.status === 'failed');
  const processingPayouts = payouts.filter(p => p.status === 'processing');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payouts Management</h1>
          <p className="text-gray-600 mt-1">Process instructor payouts and manage earnings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Process Batch
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payouts</p>
                <p className="text-2xl font-bold text-gray-900">${totalPayouts.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+15.3%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingPayouts.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">${pendingPayouts.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} pending</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedPayouts.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600">${completedPayouts.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} paid</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900">{processingPayouts.length}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-blue-600">${processingPayouts.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} processing</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">{failedPayouts.length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-red-600">Requires attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="payouts">Payouts Queue</TabsTrigger>
          <TabsTrigger value="earnings">Instructor Earnings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="payouts" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by instructor name, email, or payout ID..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Payouts Table */}
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-600">Payout ID</th>
                      <th className="text-left p-4 font-medium text-gray-600">Instructor</th>
                      <th className="text-left p-4 font-medium text-gray-600">Amount</th>
                      <th className="text-left p-4 font-medium text-gray-600">Method</th>
                      <th className="text-left p-4 font-medium text-gray-600">Period</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600">Requested</th>
                      <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayouts.map((payout) => (
                      <tr key={payout.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <p className="font-medium text-gray-900">#{payout.id}</p>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">{payout.instructorName}</p>
                            <p className="text-sm text-gray-500">{payout.instructorEmail}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-gray-900">${payout.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{payout.currency}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {payout.paymentMethod === 'bank_transfer' && <Banknote className="h-4 w-4 text-blue-600" />}
                            {payout.paymentMethod === 'paypal' && <Wallet className="h-4 w-4 text-blue-600" />}
                            {payout.paymentMethod === 'stripe' && <CreditCard className="h-4 w-4 text-purple-600" />}
                            <span className="text-sm capitalize">{payout.paymentMethod.replace('_', ' ')}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-700">
                            {new Date(payout.period.start).toLocaleDateString()} - {new Date(payout.period.end).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(payout.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(payout.status)}
                              <span>{payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}</span>
                            </div>
                          </Badge>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-700">
                            {new Date(payout.requestedAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedPayout(payout)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                {payout.status === 'pending' && (
                                  <DropdownMenuItem onClick={() => processPayout(payout.id, 'processing')}>
                                    <Send className="h-4 w-4 mr-2" />
                                    Process
                                  </DropdownMenuItem>
                                )}
                                {payout.status === 'processing' && (
                                  <DropdownMenuItem onClick={() => processPayout(payout.id, 'completed')}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark Complete
                                  </DropdownMenuItem>
                                )}
                                {(payout.status === 'pending' || payout.status === 'processing') && (
                                  <DropdownMenuItem onClick={() => processPayout(payout.id, 'failed')}>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Mark Failed
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Generate Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Receipt
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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

        <TabsContent value="earnings" className="space-y-6">
          {/* Instructor Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-600">Instructor</th>
                      <th className="text-left p-4 font-medium text-gray-600">Total Earnings</th>
                      <th className="text-left p-4 font-medium text-gray-600">Pending Payouts</th>
                      <th className="text-left p-4 font-medium text-gray-600">Completed Payouts</th>
                      <th className="text-left p-4 font-medium text-gray-600">Courses</th>
                      <th className="text-left p-4 font-medium text-gray-600">Avg Monthly</th>
                      <th className="text-left p-4 font-medium text-gray-600">Last Payout</th>
                      <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInstructorEarnings.map((instructor) => (
                      <tr key={instructor.instructorId} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">{instructor.instructorName}</p>
                            <p className="text-sm text-gray-500">Since {new Date(instructor.joinDate).toLocaleDateString()}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-gray-900">${instructor.totalEarnings.toLocaleString()}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-yellow-600">${instructor.pendingPayouts.toLocaleString()}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-green-600">${instructor.completedPayouts.toLocaleString()}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-700">{instructor.coursesCount}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-700">${instructor.avgMonthlyEarnings.toLocaleString()}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-700">
                            {new Date(instructor.lastPayoutDate).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
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

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payout Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={payoutTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [name === 'amount' ? `$${value.toLocaleString()}` : value, name === 'amount' ? 'Amount' : 'Count']} />
                    <Line type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ method, percentage }) => `${method} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Payout Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={payoutTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethodData.map((method) => (
                    <div key={method.method} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {method.method === 'Bank Transfer' && <Banknote className="h-5 w-5 text-blue-600" />}
                        {method.method === 'PayPal' && <Wallet className="h-5 w-5 text-blue-600" />}
                        {method.method === 'Stripe' && <CreditCard className="h-5 w-5 text-purple-600" />}
                        <span className="font-medium">{method.method}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${method.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{method.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Payout Details Dialog */}
      {selectedPayout && (
        <Dialog open={!!selectedPayout} onOpenChange={() => setSelectedPayout(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Payout Details - #{selectedPayout.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm text-gray-500">Instructor</Label>
                  <p className="font-medium">{selectedPayout.instructorName}</p>
                  <p className="text-sm text-gray-500">{selectedPayout.instructorEmail}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Amount</Label>
                  <p className="font-medium text-2xl">${selectedPayout.amount.toLocaleString()} {selectedPayout.currency}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedPayout.status)}>
                    {selectedPayout.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Payment Method</Label>
                  <p className="font-medium capitalize">{selectedPayout.paymentMethod.replace('_', ' ')}</p>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div>
                <Label className="text-sm text-gray-500 mb-3 block">Earnings Breakdown</Label>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Gross Revenue:</span>
                    <span className="font-medium">${selectedPayout.earnings.grossRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee ({selectedPayout.earnings.feePercentage}%):</span>
                    <span className="font-medium text-red-600">-${selectedPayout.earnings.platformFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Net Earnings:</span>
                    <span className="text-green-600">${selectedPayout.earnings.netEarnings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Sales Breakdown */}
              <div>
                <Label className="text-sm text-gray-500 mb-3 block">Sales Breakdown</Label>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Course</th>
                        <th className="text-left p-2">Sales</th>
                        <th className="text-left p-2">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPayout.salesBreakdown.map((sale, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{sale.courseTitle}</td>
                          <td className="p-2">{sale.sales}</td>
                          <td className="p-2">${sale.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Details */}
              {selectedPayout.paymentMethod === 'bank_transfer' && selectedPayout.bankDetails && (
                <div>
                  <Label className="text-sm text-gray-500 mb-3 block">Bank Details</Label>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Bank Name:</span>
                      <span className="font-medium">{selectedPayout.bankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Number:</span>
                      <span className="font-medium">{selectedPayout.bankDetails.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Routing Number:</span>
                      <span className="font-medium">{selectedPayout.bankDetails.routingNumber}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedPayout.paymentMethod === 'paypal' && selectedPayout.paypalEmail && (
                <div>
                  <Label className="text-sm text-gray-500 mb-3 block">PayPal Details</Label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span>PayPal Email:</span>
                      <span className="font-medium">{selectedPayout.paypalEmail}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Failure Reason */}
              {selectedPayout.status === 'failed' && selectedPayout.failureReason && (
                <div>
                  <Label className="text-sm text-gray-500 mb-3 block">Failure Reason</Label>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800">{selectedPayout.failureReason}</p>
                  </div>
                </div>
              )}

              {/* Processing Note */}
              <div>
                <Label className="text-sm text-gray-500">Processing Note</Label>
                <Textarea
                  value={processingNote}
                  onChange={(e) => setProcessingNote(e.target.value)}
                  placeholder="Add processing notes..."
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedPayout(null)}>
                  Close
                </Button>
                {selectedPayout.status === 'pending' && (
                  <Button onClick={() => processPayout(selectedPayout.id, 'processing')}>
                    Process Payout
                  </Button>
                )}
                {selectedPayout.status === 'processing' && (
                  <Button onClick={() => processPayout(selectedPayout.id, 'completed')}>
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PayoutsManagement;