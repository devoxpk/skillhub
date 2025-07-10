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
import { Textarea } from '@/app/components/ui/textarea';
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Package, 
  BookOpen, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Users,
  RefreshCw,
  ExternalLink,
  Settings,
  Filter,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for bundles
const mockBundles = [
  {
    id: 1,
    title: 'Full Stack Developer Bundle',
    description: 'Complete web development course bundle including frontend, backend, and database technologies.',
    price: 399.99,
    originalPrice: 599.99,
    discount: 33,
    status: 'published',
    learnWorldsId: 'lw_bundle_001',
    lastSynced: '2024-03-15T10:30:00Z',
    syncStatus: 'synced',
    enrollments: 245,
    revenue: 97975.55,
    rating: 4.8,
    reviewCount: 89,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-15',
    instructor: 'John Smith',
    category: 'Web Development',
    items: [
      { id: 1, type: 'course', title: 'HTML & CSS Fundamentals', duration: '8 hours', price: 99.99 },
      { id: 2, type: 'course', title: 'JavaScript Mastery', duration: '12 hours', price: 149.99 },
      { id: 3, type: 'course', title: 'React Development', duration: '15 hours', price: 199.99 },
      { id: 4, type: 'course', title: 'Node.js Backend', duration: '10 hours', price: 149.99 }
    ]
  },
  {
    id: 2,
    title: 'Data Science Masterclass',
    description: 'Comprehensive data science bundle covering Python, machine learning, and data visualization.',
    price: 299.99,
    originalPrice: 449.99,
    discount: 33,
    status: 'draft',
    learnWorldsId: 'lw_bundle_002',
    lastSynced: '2024-03-14T15:45:00Z',
    syncStatus: 'pending',
    enrollments: 156,
    revenue: 46798.44,
    rating: 4.6,
    reviewCount: 67,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-14',
    instructor: 'Dr. Sarah Johnson',
    category: 'Data Science',
    items: [
      { id: 5, type: 'course', title: 'Python for Data Science', duration: '10 hours', price: 129.99 },
      { id: 6, type: 'course', title: 'Machine Learning Basics', duration: '14 hours', price: 179.99 },
      { id: 7, type: 'course', title: 'Data Visualization', duration: '8 hours', price: 99.99 },
      { id: 8, type: 'event', title: 'Live Q&A Session', duration: '2 hours', price: 39.99 }
    ]
  },
  {
    id: 3,
    title: 'Digital Marketing Suite',
    description: 'Complete digital marketing bundle including SEO, social media, and content marketing.',
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    status: 'published',
    learnWorldsId: 'lw_bundle_003',
    lastSynced: '2024-03-15T09:15:00Z',
    syncStatus: 'error',
    enrollments: 89,
    revenue: 17799.11,
    rating: 4.4,
    reviewCount: 34,
    createdAt: '2024-02-15',
    updatedAt: '2024-03-15',
    instructor: 'Mike Wilson',
    category: 'Marketing',
    items: [
      { id: 9, type: 'course', title: 'SEO Fundamentals', duration: '6 hours', price: 89.99 },
      { id: 10, type: 'course', title: 'Social Media Marketing', duration: '8 hours', price: 109.99 },
      { id: 11, type: 'course', title: 'Content Marketing Strategy', duration: '7 hours', price: 99.99 }
    ]
  }
];

// Mock available courses and events for adding to bundles
const mockAvailableItems = [
  { id: 12, type: 'course', title: 'Advanced JavaScript', duration: '16 hours', price: 179.99, instructor: 'John Smith' },
  { id: 13, type: 'course', title: 'Vue.js Development', duration: '12 hours', price: 149.99, instructor: 'Jane Doe' },
  { id: 14, type: 'event', title: 'Web Dev Workshop', duration: '4 hours', price: 79.99, instructor: 'John Smith' },
  { id: 15, type: 'course', title: 'Database Design', duration: '10 hours', price: 129.99, instructor: 'Bob Johnson' },
  { id: 16, type: 'course', title: 'API Development', duration: '8 hours', price: 119.99, instructor: 'Alice Brown' }
];

// Mock bundle performance data
const bundlePerformance = [
  { month: 'Jan', sales: 45, revenue: 17995 },
  { month: 'Feb', sales: 67, revenue: 26733 },
  { month: 'Mar', sales: 89, revenue: 35611 },
  { month: 'Apr', sales: 123, revenue: 49177 },
  { month: 'May', sales: 156, revenue: 62344 },
  { month: 'Jun', sales: 178, revenue: 71122 }
];

const BundleManagement = () => {
  const [bundles, setBundles] = useState(mockBundles);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [syncFilter, setSyncFilter] = useState('all');
  const [selectedBundle, setSelectedBundle] = useState<typeof mockBundles[0] | null>(null);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('bundles');

  const filteredBundles = bundles.filter(bundle => {
    const matchesSearch = bundle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bundle.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bundle.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bundle.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || bundle.category === categoryFilter;
    const matchesSync = syncFilter === 'all' || bundle.syncStatus === syncFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesSync;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'never': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      case 'never': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const totalBundles = bundles.length;
  const publishedBundles = bundles.filter(b => b.status === 'published').length;
  const totalRevenue = bundles.reduce((sum, bundle) => sum + bundle.revenue, 0);
  const totalEnrollments = bundles.reduce((sum, bundle) => sum + bundle.enrollments, 0);
  const averageRating = bundles.reduce((sum, bundle) => sum + bundle.rating, 0) / bundles.length;

  const syncWithLearnWorlds = async (bundleId?: number) => {
    setIsSyncing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (bundleId) {
      setBundles(bundles.map(bundle => 
        bundle.id === bundleId 
          ? { ...bundle, syncStatus: 'synced', lastSynced: new Date().toISOString() }
          : bundle
      ));
    } else {
      setBundles(bundles.map(bundle => ({
        ...bundle,
        syncStatus: 'synced',
        lastSynced: new Date().toISOString()
      })));
    }
    setIsSyncing(false);
  };

  const addItemToBundle = (bundleId: number, item: typeof mockAvailableItems[0]) => {
    setBundles(bundles.map(bundle => 
      bundle.id === bundleId 
        ? { 
            ...bundle, 
            items: [...bundle.items, { ...item, id: Date.now() }],
            price: bundle.price + (item.price * 0.8) // Add with 20% bundle discount
          }
        : bundle
    ));
  };

  const removeItemFromBundle = (bundleId: number, itemId: number) => {
    setBundles(bundles.map(bundle => 
      bundle.id === bundleId 
        ? { 
            ...bundle, 
            items: bundle.items.filter(item => item.id !== itemId),
            price: Math.max(0, bundle.price - (bundle.items.find(item => item.id === itemId)?.price || 0) * 0.8)
          }
        : bundle
    ));
  };

  const deleteBundle = (id: number) => {
    if (confirm('Are you sure you want to delete this bundle?')) {
      setBundles(bundles.filter(b => b.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bundle Management</h1>
          <p className="text-gray-600 mt-1">Manage course bundles and sync with LearnWorlds</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => syncWithLearnWorlds()}
            disabled={isSyncing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync All'}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Bundle
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bundles</p>
                <p className="text-2xl font-bold text-gray-900">{totalBundles}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{publishedBundles}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">{Math.round((publishedBundles / totalBundles) * 100)}% of total</span>
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
              <span className="text-green-600">+22.1%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{totalEnrollments}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+18.7%</span>
              <span className="text-gray-500 ml-1">from last month</span>
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
              <span className="text-gray-500">Across all bundles</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bundle Sales Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bundlePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
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
              <BarChart data={bundlePerformance}>
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

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search bundles, instructors, or categories..."
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
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={syncFilter} onValueChange={setSyncFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sync status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sync Status</SelectItem>
                <SelectItem value="synced">Synced</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="never">Never Synced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bundles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bundles ({filteredBundles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-600">Bundle</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Pricing</th>
                  <th className="text-left p-4 font-medium text-gray-600">Performance</th>
                  <th className="text-left p-4 font-medium text-gray-600">LearnWorlds Sync</th>
                  <th className="text-left p-4 font-medium text-gray-600">Items</th>
                  <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBundles.map((bundle) => (
                  <tr key={bundle.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{bundle.title}</p>
                        <p className="text-sm text-gray-500">by {bundle.instructor}</p>
                        <p className="text-sm text-gray-500">{bundle.category}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(bundle.status)}>
                        {bundle.status.charAt(0).toUpperCase() + bundle.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">${bundle.price}</p>
                        <p className="text-sm text-gray-500 line-through">${bundle.originalPrice}</p>
                        <p className="text-sm text-green-600">{bundle.discount}% off</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm text-gray-900">{bundle.enrollments} enrollments</p>
                        <p className="text-sm text-gray-900">${bundle.revenue.toLocaleString()} revenue</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{bundle.rating} ({bundle.reviewCount})</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getSyncStatusColor(bundle.syncStatus)}>
                            <div className="flex items-center space-x-1">
                              {getSyncStatusIcon(bundle.syncStatus)}
                              <span>{bundle.syncStatus}</span>
                            </div>
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          Last: {new Date(bundle.lastSynced).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">ID: {bundle.learnWorldsId}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm text-gray-900">{bundle.items.length} items</p>
                        <p className="text-xs text-gray-500">
                          {bundle.items.filter(item => item.type === 'course').length} courses,{' '}
                          {bundle.items.filter(item => item.type === 'event').length} events
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedBundle(bundle)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Bundle Details: {selectedBundle?.title}</DialogTitle>
                            </DialogHeader>
                            {selectedBundle && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm text-gray-500">Title</Label>
                                    <p className="font-medium">{selectedBundle.title}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Instructor</Label>
                                    <p className="font-medium">{selectedBundle.instructor}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Category</Label>
                                    <p className="font-medium">{selectedBundle.category}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Status</Label>
                                    <Badge className={getStatusColor(selectedBundle.status)}>
                                      {selectedBundle.status}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label className="text-sm text-gray-500">Description</Label>
                                  <p className="text-gray-900 mt-1">{selectedBundle.description}</p>
                                </div>

                                <div>
                                  <div className="flex justify-between items-center mb-4">
                                    <Label className="text-sm text-gray-500">Bundle Items ({selectedBundle.items.length})</Label>
                                    <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
                                      <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">
                                          <Plus className="h-4 w-4 mr-1" />
                                          Add Item
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Add Item to Bundle</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          {mockAvailableItems.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                                              <div>
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-sm text-gray-500">{item.type} • {item.duration} • ${item.price}</p>
                                                <p className="text-sm text-gray-500">by {item.instructor}</p>
                                              </div>
                                              <Button
                                                size="sm"
                                                onClick={() => {
                                                  addItemToBundle(selectedBundle.id, item);
                                                  setIsAddItemDialogOpen(false);
                                                }}
                                              >
                                                Add
                                              </Button>
                                            </div>
                                          ))}
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                  <div className="space-y-2">
                                    {selectedBundle.items.map((item) => (
                                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                        <div>
                                          <p className="font-medium">{item.title}</p>
                                          <p className="text-sm text-gray-500">{item.type} • {item.duration} • ${item.price}</p>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeItemFromBundle(selectedBundle.id, item.id)}
                                          className="text-red-600 hover:text-red-800"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => syncWithLearnWorlds(bundle.id)}
                          disabled={isSyncing}
                        >
                          <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteBundle(bundle.id)}
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
    </div>
  );
};

export default BundleManagement;