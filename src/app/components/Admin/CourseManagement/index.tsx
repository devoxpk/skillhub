'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import  Badge  from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Lock,
  Unlock,
  Settings,
  FileText,
  Video,
  Download
} from 'lucide-react';
import Image from 'next/image';

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Smith',
    category: 'Web Development',
    status: 'published',
    enrollments: 1250,
    duration: '40 hours',
    lessons: 120,
    price: 199.99,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    thumbnail: '/api/placeholder/300/200',
    description: 'Learn full-stack web development from scratch',
    difficulty: 'Beginner',
    language: 'English',
    certificate: true,
    dripSchedule: {
      enabled: true,
      releasePattern: 'weekly',
      startDate: '2024-01-20'
    },
    accessControl: {
      prerequisite: null,
      enrollmentLimit: 2000,
      enrollmentDeadline: '2024-12-31'
    },
    compliance: {
      contentReview: true,
      qualityCheck: true,
      accessibilityCheck: false,
      copyrightClear: true,
      instructorVerified: true
    }
  },
  {
    id: 2,
    title: 'Advanced React Masterclass',
    instructor: 'Sarah Johnson',
    category: 'Frontend',
    status: 'published',
    enrollments: 890,
    duration: '25 hours',
    lessons: 75,
    price: 149.99,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-05',
    thumbnail: '/api/placeholder/300/200',
    description: 'Master advanced React concepts and patterns',
    difficulty: 'Advanced',
    language: 'English',
    certificate: true,
    dripSchedule: {
      enabled: false,
      releasePattern: 'immediate',
      startDate: null
    },
    accessControl: {
      prerequisite: 'Basic React Knowledge',
      enrollmentLimit: 500,
      enrollmentDeadline: '2024-11-30'
    },
    compliance: {
      contentReview: true,
      qualityCheck: true,
      accessibilityCheck: true,
      copyrightClear: true,
      instructorVerified: true
    }
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    instructor: 'Dr. Emily Davis',
    category: 'Data Science',
    status: 'draft',
    enrollments: 0,
    duration: '35 hours',
    lessons: 95,
    price: 179.99,
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    thumbnail: '/api/placeholder/300/200',
    description: 'Introduction to data science with Python',
    difficulty: 'Intermediate',
    language: 'English',
    certificate: true,
    dripSchedule: {
      enabled: true,
      releasePattern: 'biweekly',
      startDate: '2024-04-01'
    },
    accessControl: {
      prerequisite: 'Basic Python Knowledge',
      enrollmentLimit: 1000,
      enrollmentDeadline: '2024-12-31'
    },
    compliance: {
      contentReview: false,
      qualityCheck: false,
      accessibilityCheck: false,
      copyrightClear: true,
      instructorVerified: true
    }
  }
];

const CourseManagement = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<typeof mockCourses[0] | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceScore = (compliance: any) => {
    const total = Object.keys(compliance).length;
    const completed = Object.values(compliance).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const deleteCourse = (id: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourseStatus = (id: number, newStatus: string) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status: newStatus } : course
    ));
  };

  const CourseEditDialog = () => (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course: {selectedCourse?.title}</DialogTitle>
        </DialogHeader>
        {selectedCourse && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="access">Access Control</TabsTrigger>
              <TabsTrigger value="drip">Drip Schedule</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Course Title</Label>
                  <Input defaultValue={selectedCourse.title} />
                </div>
                <div className="space-y-2">
                  <Label>Instructor</Label>
                  <Input defaultValue={selectedCourse.instructor} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue={selectedCourse.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select defaultValue={selectedCourse.difficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input type="number" defaultValue={selectedCourse.price} />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input defaultValue={selectedCourse.duration} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea defaultValue={selectedCourse.description} rows={3} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="certificate" defaultChecked={selectedCourse.certificate} />
                <Label htmlFor="certificate">Provide Certificate upon completion</Label>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Course Content Structure</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <Video className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Section 1: Introduction</p>
                        <p className="text-sm text-gray-500">5 lessons • 2 hours</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Section 2: Fundamentals</p>
                        <p className="text-sm text-gray-500">12 lessons • 8 hours</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Section
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="access" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Prerequisites</Label>
                  <Input 
                    defaultValue={selectedCourse.accessControl.prerequisite || ''} 
                    placeholder="Enter course prerequisites"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Enrollment Limit</Label>
                    <Input 
                      type="number" 
                      defaultValue={selectedCourse.accessControl.enrollmentLimit}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Enrollment Deadline</Label>
                    <Input 
                      type="date" 
                      defaultValue={selectedCourse.accessControl.enrollmentDeadline}
                    />
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Access Restrictions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Payment</Label>
                        <p className="text-sm text-gray-500">Students must pay to access</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Verification Required</Label>
                        <p className="text-sm text-gray-500">Verify email before enrollment</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Manual Approval</Label>
                        <p className="text-sm text-gray-500">Admin approval required</p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="drip" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Drip Schedule</Label>
                    <p className="text-sm text-gray-500">Release content gradually over time</p>
                  </div>
                  <Switch defaultChecked={selectedCourse.dripSchedule.enabled} />
                </div>
                
                {selectedCourse.dripSchedule.enabled && (
                  <div className="space-y-4 border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Release Pattern</Label>
                        <Select defaultValue={selectedCourse.dripSchedule.releasePattern}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input 
                          type="date" 
                          defaultValue={selectedCourse.dripSchedule.startDate || ''}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Content Release Schedule</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4" />
                            <span>Section 1: Introduction</span>
                          </div>
                          <span className="text-sm text-gray-500">Available immediately</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4" />
                            <span>Section 2: Fundamentals</span>
                          </div>
                          <span className="text-sm text-gray-500">Week 2</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4" />
                            <span>Section 3: Advanced Topics</span>
                          </div>
                          <span className="text-sm text-gray-500">Week 4</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Compliance Checklist</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="contentReview" 
                          defaultChecked={selectedCourse.compliance.contentReview}
                        />
                        <div>
                          <Label htmlFor="contentReview">Content Review Completed</Label>
                          <p className="text-sm text-gray-500">All content has been reviewed for quality</p>
                        </div>
                      </div>
                      {selectedCourse.compliance.contentReview ? 
                        <CheckCircle className="h-5 w-5 text-green-600" /> : 
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      }
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="qualityCheck" 
                          defaultChecked={selectedCourse.compliance.qualityCheck}
                        />
                        <div>
                          <Label htmlFor="qualityCheck">Quality Assurance Check</Label>
                          <p className="text-sm text-gray-500">Technical quality verified</p>
                        </div>
                      </div>
                      {selectedCourse.compliance.qualityCheck ? 
                        <CheckCircle className="h-5 w-5 text-green-600" /> : 
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      }
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="accessibilityCheck" 
                          defaultChecked={selectedCourse.compliance.accessibilityCheck}
                        />
                        <div>
                          <Label htmlFor="accessibilityCheck">Accessibility Compliance</Label>
                          <p className="text-sm text-gray-500">Meets accessibility standards</p>
                        </div>
                      </div>
                      {selectedCourse.compliance.accessibilityCheck ? 
                        <CheckCircle className="h-5 w-5 text-green-600" /> : 
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      }
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="copyrightClear" 
                          defaultChecked={selectedCourse.compliance.copyrightClear}
                        />
                        <div>
                          <Label htmlFor="copyrightClear">Copyright Clearance</Label>
                          <p className="text-sm text-gray-500">All content is copyright compliant</p>
                        </div>
                      </div>
                      {selectedCourse.compliance.copyrightClear ? 
                        <CheckCircle className="h-5 w-5 text-green-600" /> : 
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      }
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="instructorVerified" 
                          defaultChecked={selectedCourse.compliance.instructorVerified}
                        />
                        <div>
                          <Label htmlFor="instructorVerified">Instructor Verification</Label>
                          <p className="text-sm text-gray-500">Instructor credentials verified</p>
                        </div>
                      </div>
                      {selectedCourse.compliance.instructorVerified ? 
                        <CheckCircle className="h-5 w-5 text-green-600" /> : 
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      }
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      Compliance Score: {getComplianceScore(selectedCourse.compliance)}%
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    {getComplianceScore(selectedCourse.compliance) >= 80 ? 
                      'Course meets compliance requirements' : 
                      'Additional compliance items need attention'
                    }
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditDialogOpen(false)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Manage course content, access control, and compliance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'published').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, course) => sum + course.enrollments, 0).toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Compliance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(courses.reduce((sum, course) => sum + getComplianceScore(course.compliance), 0) / courses.length)}%
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
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
                  placeholder="Search courses, instructors, or categories..."
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
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Courses ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-600">Course</th>
                  <th className="text-left p-4 font-medium text-gray-600">Instructor</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Enrollments</th>
                  <th className="text-left p-4 font-medium text-gray-600">Compliance</th>
                  <th className="text-left p-4 font-medium text-gray-600">Drip Schedule</th>
                  <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{course.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getDifficultyColor(course.difficulty)}>
                              {course.difficulty}
                            </Badge>
                            <span className="text-sm text-gray-500">{course.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-900">{course.instructor}</p>
                      <p className="text-sm text-gray-500">{course.lessons} lessons • {course.duration}</p>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(course.status)}>
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-900">{course.enrollments.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {getComplianceScore(course.compliance)}%
                          </span>
                        </div>
                        {getComplianceScore(course.compliance) >= 80 ? 
                          <CheckCircle className="h-4 w-4 text-green-600" /> : 
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        }
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {course.dripSchedule.enabled ? (
                          <>
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-600">{course.dripSchedule.releasePattern}</span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">Immediate</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Select
                          value={course.status}
                          onValueChange={(value) => updateCourseStatus(course.id, value)}
                        >
                          <SelectTrigger className="w-24 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCourse(course.id)}
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

      <CourseEditDialog />
    </div>
  );
};

export default CourseManagement;