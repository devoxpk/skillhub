'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import  Badge  from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Search, Eye, Edit, Trash2, Plus, TrendingUp, DollarSign, Users, Star, Filter } from 'lucide-react';
import Image from 'next/image';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    type: 'course',
    instructor: 'John Smith',
    price: 199.99,
    originalPrice: 299.99,
    status: 'published',
    category: 'Web Development',
    enrollments: 1250,
    rating: 4.8,
    reviews: 324,
    revenue: 249875,
    createdAt: '2024-01-15',
    thumbnail: '/api/placeholder/300/200',
    description: 'Learn full-stack web development from scratch with hands-on projects'
  },
  {
    id: 2,
    title: 'Advanced React Masterclass',
    type: 'course',
    instructor: 'Sarah Johnson',
    price: 149.99,
    originalPrice: 199.99,
    status: 'published',
    category: 'Frontend',
    enrollments: 890,
    rating: 4.9,
    reviews: 156,
    revenue: 133491,
    createdAt: '2024-02-01',
    thumbnail: '/api/placeholder/300/200',
    description: 'Master advanced React concepts and build production-ready applications'
  },
  {
    id: 3,
    title: 'Live Coding Session: Building APIs',
    type: 'event',
    instructor: 'Mike Chen',
    price: 49.99,
    originalPrice: 49.99,
    status: 'scheduled',
    category: 'Backend',
    enrollments: 45,
    rating: 4.7,
    reviews: 12,
    revenue: 2249.55,
    createdAt: '2024-03-10',
    thumbnail: '/api/placeholder/300/200',
    description: 'Interactive live session on building RESTful APIs with Node.js'
  },
  {
    id: 4,
    title: 'Full Stack Developer Bundle',
    type: 'bundle',
    instructor: 'Multiple Instructors',
    price: 399.99,
    originalPrice: 599.99,
    status: 'published',
    category: 'Full Stack',
    enrollments: 234,
    rating: 4.6,
    reviews: 89,
    revenue: 93597.66,
    createdAt: '2024-01-20',
    thumbnail: '/api/placeholder/300/200',
    description: 'Complete bundle with 5 courses covering frontend, backend, and deployment'
  },
  {
    id: 5,
    title: 'Data Science Fundamentals',
    type: 'course',
    instructor: 'Dr. Emily Davis',
    price: 179.99,
    originalPrice: 249.99,
    status: 'draft',
    category: 'Data Science',
    enrollments: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    createdAt: '2024-03-15',
    thumbnail: '/api/placeholder/300/200',
    description: 'Introduction to data science with Python and machine learning basics'
  }
];

const ProductManagement = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesType = typeFilter === 'all' || product.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-purple-100 text-purple-800';
      case 'event': return 'bg-orange-100 text-orange-800';
      case 'bundle': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = products.reduce((sum, product) => sum + product.revenue, 0);
  const totalEnrollments = products.reduce((sum, product) => sum + product.enrollments, 0);
  const averageRating = products.filter(p => p.rating > 0).reduce((sum, product) => sum + product.rating, 0) / products.filter(p => p.rating > 0).length;
  const publishedProducts = products.filter(p => p.status === 'published').length;

  const deleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage courses, events, and bundles</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
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
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{totalEnrollments.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
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
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+0.3</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published Products</p>
                <p className="text-2xl font-bold text-gray-900">{publishedProducts}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Filter className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">of {products.length} total products</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products, instructors, or categories..."
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
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="course">Courses</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="bundle">Bundles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-600">Product</th>
                  <th className="text-left p-4 font-medium text-gray-600">Type</th>
                  <th className="text-left p-4 font-medium text-gray-600">Instructor</th>
                  <th className="text-left p-4 font-medium text-gray-600">Price</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Enrollments</th>
                  <th className="text-left p-4 font-medium text-gray-600">Rating</th>
                  <th className="text-left p-4 font-medium text-gray-600">Revenue</th>
                  <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.title}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getTypeColor(product.type)}>
                        {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-900">{product.instructor}</p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">${product.price}</p>
                        {product.originalPrice !== product.price && (
                          <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(product.status)}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-900">{product.enrollments.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-gray-900">{product.rating || 'N/A'}</span>
                        {product.reviews > 0 && (
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedProduct(product)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Product Preview</DialogTitle>
                            </DialogHeader>
                            {selectedProduct && (
                              <div className="space-y-4">
                                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                  <Image
                                    src={selectedProduct.thumbnail}
                                    alt={selectedProduct.title}
                                    width={600}
                                    height={300}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold">{selectedProduct.title}</h3>
                                  <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Instructor</p>
                                    <p className="font-medium">{selectedProduct.instructor}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="font-medium">{selectedProduct.category}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Price</p>
                                    <p className="font-medium">${selectedProduct.price}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Enrollments</p>
                                    <p className="font-medium">{selectedProduct.enrollments}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
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

export default ProductManagement;