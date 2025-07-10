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
import { Checkbox } from '@/app/components/ui/checkbox';
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Filter,
  Download,
  Upload,
  Users,
  BookOpen,
  Calendar,
  MoreVertical,
  Send,
  Archive,
  Flag,
  MessageSquare,
  TrendingUp,
  Star,
  User,
  Mail,
  Phone,
  Globe,
  Building,
  GraduationCap,
  Award,
  DollarSign
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data for form submissions
const mockSubmissions = [
  {
    id: 1,
    type: 'course_approval',
    title: 'Complete Web Development Bootcamp',
    submittedBy: {
      id: 101,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'instructor'
    },
    status: 'pending_review',
    priority: 'high',
    submittedAt: '2024-03-15T10:30:00Z',
    reviewedAt: null,
    reviewedBy: null,
    data: {
      courseTitle: 'Complete Web Development Bootcamp',
      description: 'A comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and MongoDB',
      category: 'Web Development',
      price: 149.99,
      duration: '40 hours',
      level: 'Beginner to Advanced',
      prerequisites: 'Basic computer skills',
      learningOutcomes: [
        'Build responsive websites with HTML and CSS',
        'Master JavaScript fundamentals and ES6+',
        'Create dynamic web applications with React',
        'Develop backend APIs with Node.js and Express',
        'Work with databases using MongoDB'
      ],
      curriculum: [
        { section: 'HTML & CSS Fundamentals', lessons: 12 },
        { section: 'JavaScript Essentials', lessons: 15 },
        { section: 'React Development', lessons: 18 },
        { section: 'Backend with Node.js', lessons: 10 },
        { section: 'Database Integration', lessons: 8 }
      ]
    },
    attachments: [
      { name: 'course_outline.pdf', size: '2.5 MB', type: 'pdf' },
      { name: 'sample_video.mp4', size: '45.2 MB', type: 'video' }
    ],
    comments: [
      {
        id: 1,
        author: 'Admin User',
        content: 'Course content looks comprehensive. Please add more practical projects.',
        createdAt: '2024-03-15T14:20:00Z'
      }
    ]
  },
  {
    id: 2,
    type: 'instructor_application',
    title: 'Instructor Application - Sarah Johnson',
    submittedBy: {
      id: 102,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'applicant'
    },
    status: 'approved',
    priority: 'medium',
    submittedAt: '2024-03-12T09:15:00Z',
    reviewedAt: '2024-03-14T11:30:00Z',
    reviewedBy: 'Admin User',
    data: {
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'https://sarahjohnson.dev',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      experience: '8 years',
      expertise: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'GraphQL'],
      education: [
        { degree: 'Master of Computer Science', institution: 'Stanford University', year: '2016' },
        { degree: 'Bachelor of Software Engineering', institution: 'UC Berkeley', year: '2014' }
      ],
      workExperience: [
        { company: 'Google', position: 'Senior Software Engineer', duration: '2020-2024' },
        { company: 'Facebook', position: 'Software Engineer', duration: '2018-2020' },
        { company: 'Airbnb', position: 'Frontend Developer', duration: '2016-2018' }
      ],
      teachingExperience: 'Conducted workshops at tech conferences and mentored junior developers',
      motivation: 'I want to share my knowledge and help others break into the tech industry'
    },
    attachments: [
      { name: 'resume.pdf', size: '1.2 MB', type: 'pdf' },
      { name: 'portfolio.pdf', size: '3.8 MB', type: 'pdf' },
      { name: 'certificates.zip', size: '5.1 MB', type: 'archive' }
    ],
    comments: [
      {
        id: 1,
        author: 'Admin User',
        content: 'Excellent background and experience. Approved for instructor role.',
        createdAt: '2024-03-14T11:30:00Z'
      }
    ]
  },
  {
    id: 3,
    type: 'course_update',
    title: 'Course Update - Advanced React Patterns',
    submittedBy: {
      id: 103,
      name: 'Dr. Emily Davis',
      email: 'emily.davis@example.com',
      role: 'instructor'
    },
    status: 'rejected',
    priority: 'low',
    submittedAt: '2024-03-10T16:45:00Z',
    reviewedAt: '2024-03-13T10:20:00Z',
    reviewedBy: 'Admin User',
    data: {
      courseId: 15,
      updateType: 'content_revision',
      changes: [
        'Added 5 new video lessons on React Hooks',
        'Updated existing content to React 18',
        'Added practical exercises for each section',
        'Included downloadable code samples'
      ],
      reason: 'Student feedback requested more hands-on examples and updated content'
    },
    attachments: [
      { name: 'updated_curriculum.pdf', size: '1.8 MB', type: 'pdf' }
    ],
    comments: [
      {
        id: 1,
        author: 'Admin User',
        content: 'The proposed changes need more detailed documentation. Please resubmit with lesson plans.',
        createdAt: '2024-03-13T10:20:00Z'
      }
    ]
  },
  {
    id: 4,
    type: 'partnership_proposal',
    title: 'Corporate Training Partnership - TechCorp Inc.',
    submittedBy: {
      id: 104,
      name: 'Michael Brown',
      email: 'michael.brown@techcorp.com',
      role: 'external'
    },
    status: 'under_review',
    priority: 'high',
    submittedAt: '2024-03-08T13:20:00Z',
    reviewedAt: null,
    reviewedBy: null,
    data: {
      companyName: 'TechCorp Inc.',
      contactPerson: 'Michael Brown',
      email: 'michael.brown@techcorp.com',
      phone: '+1 (555) 987-6543',
      website: 'https://techcorp.com',
      employeeCount: 500,
      trainingNeeds: [
        'Full-stack web development',
        'Cloud computing (AWS/Azure)',
        'DevOps and CI/CD',
        'Data science and analytics'
      ],
      budget: '$50,000 - $100,000',
      timeline: '6 months',
      expectedOutcomes: 'Upskill 100+ developers in modern web technologies'
    },
    attachments: [
      { name: 'company_profile.pdf', size: '4.2 MB', type: 'pdf' },
      { name: 'training_requirements.docx', size: '890 KB', type: 'document' }
    ],
    comments: []
  },
  {
    id: 5,
    type: 'refund_request',
    title: 'Refund Request - Python for Data Science',
    submittedBy: {
      id: 105,
      name: 'Lisa Wilson',
      email: 'lisa.wilson@example.com',
      role: 'student'
    },
    status: 'pending_review',
    priority: 'medium',
    submittedAt: '2024-03-14T11:10:00Z',
    reviewedAt: null,
    reviewedBy: null,
    data: {
      courseId: 22,
      courseTitle: 'Python for Data Science',
      purchaseDate: '2024-03-01',
      amount: 89.99,
      reason: 'course_not_as_described',
      description: 'The course content is too basic and does not match the advanced level advertised',
      progress: 15,
      requestedAmount: 89.99
    },
    attachments: [],
    comments: []
  }
];

// Mock submission trends data
const submissionTrends = [
  { month: 'Sep', total: 45, approved: 32, rejected: 8, pending: 5 },
  { month: 'Oct', total: 67, approved: 48, rejected: 12, pending: 7 },
  { month: 'Nov', total: 89, approved: 65, rejected: 15, pending: 9 },
  { month: 'Dec', total: 123, approved: 89, rejected: 20, pending: 14 },
  { month: 'Jan', total: 156, approved: 112, rejected: 25, pending: 19 },
  { month: 'Feb', total: 178, approved: 128, rejected: 28, pending: 22 },
  { month: 'Mar', total: 201, approved: 145, rejected: 31, pending: 25 }
];

// Mock submission type distribution
const submissionTypes = [
  { type: 'Course Approval', count: 45, percentage: 35 },
  { type: 'Instructor Application', count: 32, percentage: 25 },
  { type: 'Course Update', count: 25, percentage: 19 },
  { type: 'Partnership Proposal', count: 15, percentage: 12 },
  { type: 'Refund Request', count: 12, percentage: 9 }
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6B7280'];

const FormSubmissionsManagement = () => {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedSubmissions, setSelectedSubmissions] = useState<number[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<typeof mockSubmissions[0] | null>(null);
  const [activeTab, setActiveTab] = useState('submissions');
  const [reviewComment, setReviewComment] = useState('');

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.submittedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.submittedBy.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesType = typeFilter === 'all' || submission.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || submission.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course_approval': return <BookOpen className="h-4 w-4" />;
      case 'instructor_application': return <Users className="h-4 w-4" />;
      case 'course_update': return <Edit className="h-4 w-4" />;
      case 'partnership_proposal': return <Building className="h-4 w-4" />;
      case 'refund_request': return <DollarSign className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending_review': return <Clock className="h-4 w-4" />;
      case 'under_review': return <Eye className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'archived': return <Archive className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const updateSubmissionStatus = (submissionId: number, newStatus: string) => {
    setSubmissions(submissions.map(submission => 
      submission.id === submissionId 
        ? { 
            ...submission, 
            status: newStatus, 
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Current Admin'
          }
        : submission
    ));
  };

  const bulkUpdateStatus = (newStatus: string) => {
    setSubmissions(submissions.map(submission => 
      selectedSubmissions.includes(submission.id)
        ? { 
            ...submission, 
            status: newStatus, 
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Current Admin'
          }
        : submission
    ));
    setSelectedSubmissions([]);
  };

  const toggleSubmissionSelection = (submissionId: number) => {
    setSelectedSubmissions(prev => 
      prev.includes(submissionId)
        ? prev.filter(id => id !== submissionId)
        : [...prev, submissionId]
    );
  };

  const selectAllSubmissions = () => {
    if (selectedSubmissions.length === filteredSubmissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions(filteredSubmissions.map(s => s.id));
    }
  };

  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter(s => s.status === 'pending_review').length;
  const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected').length;
  const underReviewSubmissions = submissions.filter(s => s.status === 'under_review').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Form Submissions</h1>
          <p className="text-gray-600 mt-1">Manage approval workflows and form submissions</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedSubmissions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Bulk Actions ({selectedSubmissions.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => bulkUpdateStatus('approved')}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => bulkUpdateStatus('rejected')}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => bulkUpdateStatus('under_review')}>
                  <Eye className="h-4 w-4 mr-2" />
                  Mark Under Review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => bulkUpdateStatus('archived')}>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Form
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{totalSubmissions}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{pendingSubmissions}</p>
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
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">{underReviewSubmissions}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-blue-600">In progress</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedSubmissions}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600">{Math.round((approvedSubmissions / totalSubmissions) * 100)}% approval rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{rejectedSubmissions}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-red-600">{Math.round((rejectedSubmissions / totalSubmissions) * 100)}% rejection rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="submissions">Submissions Queue</TabsTrigger>
          <TabsTrigger value="workflows">Approval Workflows</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search submissions, users, or content..."
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
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="course_approval">Course Approval</SelectItem>
                    <SelectItem value="instructor_application">Instructor Application</SelectItem>
                    <SelectItem value="course_update">Course Update</SelectItem>
                    <SelectItem value="partnership_proposal">Partnership Proposal</SelectItem>
                    <SelectItem value="refund_request">Refund Request</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submissions Table */}
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">
                        <Checkbox
                          checked={selectedSubmissions.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                          onCheckedChange={selectAllSubmissions}
                        />
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">ID</th>
                      <th className="text-left p-4 font-medium text-gray-600">Type</th>
                      <th className="text-left p-4 font-medium text-gray-600">Title</th>
                      <th className="text-left p-4 font-medium text-gray-600">Submitted By</th>
                      <th className="text-left p-4 font-medium text-gray-600">Priority</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600">Submitted</th>
                      <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <Checkbox
                            checked={selectedSubmissions.includes(submission.id)}
                            onCheckedChange={() => toggleSubmissionSelection(submission.id)}
                          />
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-gray-900">#{submission.id}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(submission.type)}
                            <span className="text-sm capitalize">{submission.type.replace('_', ' ')}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-gray-900 max-w-xs truncate">{submission.title}</p>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">{submission.submittedBy.name}</p>
                            <p className="text-sm text-gray-500">{submission.submittedBy.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getPriorityColor(submission.priority)}>
                            {submission.priority.charAt(0).toUpperCase() + submission.priority.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(submission.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(submission.status)}
                              <span>{submission.status.replace('_', ' ').charAt(0).toUpperCase() + submission.status.replace('_', ' ').slice(1)}</span>
                            </div>
                          </Badge>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-700">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedSubmission(submission)}
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
                                {submission.status === 'pending_review' && (
                                  <>
                                    <DropdownMenuItem onClick={() => updateSubmissionStatus(submission.id, 'under_review')}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      Start Review
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateSubmissionStatus(submission.id, 'approved')}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Quick Approve
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {submission.status === 'under_review' && (
                                  <>
                                    <DropdownMenuItem onClick={() => updateSubmissionStatus(submission.id, 'approved')}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateSubmissionStatus(submission.id, 'rejected')}>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuItem>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Add Comment
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Attachments
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateSubmissionStatus(submission.id, 'archived')}>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Archive
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

        <TabsContent value="workflows" className="space-y-6">
          {/* Workflow Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Approval Workflows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Course Approval</p>
                        <p className="text-sm text-gray-500">Review → Admin Approval → Publish</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Instructor Application</p>
                        <p className="text-sm text-gray-500">Background Check → Interview → Approval</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Partnership Proposal</p>
                        <p className="text-sm text-gray-500">Legal Review → Business Review → Approval</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workflow Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Auto-assign reviewers</Label>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Email notifications</Label>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Escalation after 48h</Label>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Require approval comments</Label>
                    <Checkbox />
                  </div>
                </div>
                <div className="pt-4">
                  <Label className="text-sm text-gray-500">Default SLA (hours)</Label>
                  <Input type="number" defaultValue="24" className="mt-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submission Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={submissionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} name="Total" />
                    <Line type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={2} name="Approved" />
                    <Line type="monotone" dataKey="rejected" stroke="#EF4444" strokeWidth={2} name="Rejected" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submission Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={submissionTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percentage }) => `${type} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {submissionTypes.map((entry, index) => (
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
                <CardTitle>Approval Rate by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={submissionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="approved" fill="#10B981" name="Approved" />
                    <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Processing Time</span>
                    <span className="font-medium">2.3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fastest Processing</span>
                    <span className="font-medium text-green-600">4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Slowest Processing</span>
                    <span className="font-medium text-red-600">7 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">SLA Compliance</span>
                    <span className="font-medium text-blue-600">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Submission Details Dialog */}
      {selectedSubmission && (
        <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {getTypeIcon(selectedSubmission.type)}
                <span>{selectedSubmission.title}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm text-gray-500">Submitted By</Label>
                  <p className="font-medium">{selectedSubmission.submittedBy.name}</p>
                  <p className="text-sm text-gray-500">{selectedSubmission.submittedBy.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedSubmission.status)}>
                    {selectedSubmission.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Priority</Label>
                  <Badge className={getPriorityColor(selectedSubmission.priority)}>
                    {selectedSubmission.priority}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Submitted</Label>
                  <p className="font-medium">{new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Submission Data */}
              <div>
                <Label className="text-sm text-gray-500 mb-3 block">Submission Details</Label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(selectedSubmission.data, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Attachments */}
              {selectedSubmission.attachments.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-500 mb-3 block">Attachments</Label>
                  <div className="space-y-2">
                    {selectedSubmission.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{attachment.name}</p>
                            <p className="text-sm text-gray-500">{attachment.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              {selectedSubmission.comments.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-500 mb-3 block">Comments</Label>
                  <div className="space-y-3">
                    {selectedSubmission.comments.map((comment) => (
                      <div key={comment.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review Comment */}
              <div>
                <Label className="text-sm text-gray-500">Add Review Comment</Label>
                <Textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Add your review comments..."
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                  Close
                </Button>
                {selectedSubmission.status === 'pending_review' && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => updateSubmissionStatus(selectedSubmission.id, 'rejected')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Reject
                    </Button>
                    <Button onClick={() => updateSubmissionStatus(selectedSubmission.id, 'approved')}>
                      Approve
                    </Button>
                  </>
                )}
                {selectedSubmission.status === 'under_review' && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => updateSubmissionStatus(selectedSubmission.id, 'rejected')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Reject
                    </Button>
                    <Button onClick={() => updateSubmissionStatus(selectedSubmission.id, 'approved')}>
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FormSubmissionsManagement;