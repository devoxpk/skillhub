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
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Upload,
  ChevronDown,
  ChevronRight,
  
  Play,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Copy,
  Move,
  Archive,
  MoreVertical,
  Image,
  Headphones,
  Link,
  FileQuestion,
  ClipboardList,
  Calendar
} from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';

// Mock data for courses and their content structure
const mockCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Smith',
    status: 'published',
    totalSections: 8,
    totalUnits: 45,
    totalDuration: '32 hours',
    enrollments: 1250,
    lastUpdated: '2024-03-15'
  },
  {
    id: 2,
    title: 'Advanced React Masterclass',
    instructor: 'Sarah Johnson',
    status: 'draft',
    totalSections: 6,
    totalUnits: 28,
    totalDuration: '18 hours',
    enrollments: 890,
    lastUpdated: '2024-03-14'
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    instructor: 'Dr. Emily Davis',
    status: 'published',
    totalSections: 10,
    totalUnits: 62,
    totalDuration: '45 hours',
    enrollments: 567,
    lastUpdated: '2024-03-13'
  }
];

// Mock course content structure
const mockCourseContent = {
  1: {
    sections: [
      {
        id: 1,
        title: 'Introduction to Web Development',
        description: 'Get started with the basics of web development',
        order: 1,
        isPublished: true,
        duration: '2 hours',
        units: [
          {
            id: 1,
            title: 'Welcome to the Course',
            type: 'video',
            duration: '5 min',
            order: 1,
            isPublished: true,
            isFree: true,
            content: {
              videoUrl: 'https://example.com/video1.mp4',
              description: 'Course introduction and overview'
            }
          },
          {
            id: 2,
            title: 'Setting Up Your Development Environment',
            type: 'video',
            duration: '15 min',
            order: 2,
            isPublished: true,
            isFree: false,
            content: {
              videoUrl: 'https://example.com/video2.mp4',
              description: 'Install and configure development tools'
            }
          },
          {
            id: 3,
            title: 'Course Resources',
            type: 'document',
            duration: '5 min',
            order: 3,
            isPublished: true,
            isFree: true,
            content: {
              documentUrl: 'https://example.com/resources.pdf',
              description: 'Download course materials and resources'
            }
          }
        ]
      },
      {
        id: 2,
        title: 'HTML Fundamentals',
        description: 'Learn the building blocks of web pages',
        order: 2,
        isPublished: true,
        duration: '4 hours',
        units: [
          {
            id: 4,
            title: 'HTML Structure and Syntax',
            type: 'video',
            duration: '20 min',
            order: 1,
            isPublished: true,
            isFree: false,
            content: {
              videoUrl: 'https://example.com/video3.mp4',
              description: 'Understanding HTML tags and structure'
            }
          },
          {
            id: 5,
            title: 'HTML Elements Quiz',
            type: 'quiz',
            duration: '10 min',
            order: 2,
            isPublished: true,
            isFree: false,
            content: {
              questions: 10,
              passingScore: 80,
              description: 'Test your knowledge of HTML elements'
            }
          },
          {
            id: 6,
            title: 'Build Your First Webpage',
            type: 'assignment',
            duration: '30 min',
            order: 3,
            isPublished: true,
            isFree: false,
            content: {
              instructions: 'Create a simple HTML page with proper structure',
              submissionType: 'file',
              description: 'Hands-on practice with HTML'
            }
          }
        ]
      },
      {
        id: 3,
        title: 'CSS Styling',
        description: 'Make your web pages beautiful with CSS',
        order: 3,
        isPublished: false,
        duration: '6 hours',
        units: [
          {
            id: 7,
            title: 'CSS Basics',
            type: 'video',
            duration: '25 min',
            order: 1,
            isPublished: false,
            isFree: false,
            content: {
              videoUrl: 'https://example.com/video4.mp4',
              description: 'Introduction to CSS selectors and properties'
            }
          },
          {
            id: 8,
            title: 'CSS Cheat Sheet',
            type: 'document',
            duration: '5 min',
            order: 2,
            isPublished: false,
            isFree: false,
            content: {
              documentUrl: 'https://example.com/css-cheat-sheet.pdf',
              description: 'Quick reference for CSS properties'
            }
          }
        ]
      }
    ]
  }
};

const unitTypeIcons = {
  video: Video,
  document: FileText,
  audio: Headphones,
  quiz: FileQuestion,
  assignment: ClipboardList,
  live_session: Calendar,
  download: Download,
  external_link: Link,
  image: Image
};

const unitTypeColors = {
  video: 'bg-blue-100 text-blue-800',
  document: 'bg-green-100 text-green-800',
  audio: 'bg-purple-100 text-purple-800',
  quiz: 'bg-orange-100 text-orange-800',
  assignment: 'bg-red-100 text-red-800',
  live_session: 'bg-indigo-100 text-indigo-800',
  download: 'bg-gray-100 text-gray-800',
  external_link: 'bg-cyan-100 text-cyan-800',
  image: 'bg-pink-100 text-pink-800'
};

const CourseContentManagement = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(1);
  const [courseContent, setCourseContent] = useState(mockCourseContent);
  const [expandedSections, setExpandedSections] = useState<number[]>([1, 2]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [newUnitType, setNewUnitType] = useState('video');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const currentCourseContent = selectedCourse ? courseContent[selectedCourse] : null;

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const addSection = () => {
    if (!selectedCourse || !newSectionTitle.trim()) return;
    
    const newSection = {
      id: Date.now(),
      title: newSectionTitle,
      description: '',
      order: (currentCourseContent?.sections.length || 0) + 1,
      isPublished: false,
      duration: '0 min',
      units: []
    };

    setCourseContent(prev => ({
      ...prev,
      [selectedCourse]: {
        ...prev[selectedCourse],
        sections: [...(prev[selectedCourse]?.sections || []), newSection]
      }
    }));

    setNewSectionTitle('');
    setIsAddSectionOpen(false);
  };

  const addUnit = (sectionId: number) => {
    if (!selectedCourse || !newUnitTitle.trim()) return;
    
    const section = currentCourseContent?.sections.find(s => s.id === sectionId);
    const newUnit = {
      id: Date.now(),
      title: newUnitTitle,
      type: newUnitType,
      duration: '0 min',
      order: (section?.units.length || 0) + 1,
      isPublished: false,
      isFree: false,
      content: {}
    };

    setCourseContent(prev => ({
      ...prev,
      [selectedCourse]: {
        ...prev[selectedCourse],
        sections: prev[selectedCourse].sections.map(section => 
          section.id === sectionId 
            ? { ...section, units: [...section.units, newUnit] }
            : section
        )
      }
    }));

    setNewUnitTitle('');
    setNewUnitType('video');
    setIsAddUnitOpen(false);
  };

  const deleteSection = (sectionId: number) => {
    if (!selectedCourse) return;
    if (confirm('Are you sure you want to delete this section and all its units?')) {
      setCourseContent(prev => ({
        ...prev,
        [selectedCourse]: {
          ...prev[selectedCourse],
          sections: prev[selectedCourse].sections.filter(s => s.id !== sectionId)
        }
      }));
    }
  };

  const deleteUnit = (sectionId: number, unitId: number) => {
    if (!selectedCourse) return;
    if (confirm('Are you sure you want to delete this unit?')) {
      setCourseContent(prev => ({
        ...prev,
        [selectedCourse]: {
          ...prev[selectedCourse],
          sections: prev[selectedCourse].sections.map(section => 
            section.id === sectionId 
              ? { ...section, units: section.units.filter(u => u.id !== unitId) }
              : section
          )
        }
      }));
    }
  };

  const toggleSectionPublished = (sectionId: number) => {
    if (!selectedCourse) return;
    setCourseContent(prev => ({
      ...prev,
      [selectedCourse]: {
        ...prev[selectedCourse],
        sections: prev[selectedCourse].sections.map(section => 
          section.id === sectionId 
            ? { ...section, isPublished: !section.isPublished }
            : section
        )
      }
    }));
  };

  const toggleUnitPublished = (sectionId: number, unitId: number) => {
    if (!selectedCourse) return;
    setCourseContent(prev => ({
      ...prev,
      [selectedCourse]: {
        ...prev[selectedCourse],
        sections: prev[selectedCourse].sections.map(section => 
          section.id === sectionId 
            ? { 
                ...section, 
                units: section.units.map(unit => 
                  unit.id === unitId 
                    ? { ...unit, isPublished: !unit.isPublished }
                    : unit
                )
              }
            : section
        )
      }
    }));
  };

  const getUnitIcon = (type: string) => {
    const IconComponent = unitTypeIcons[type] || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Content Management</h1>
          <p className="text-gray-600 mt-1">Manage course sections and units with nested structure</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Bulk Import
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Selection Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Courses</CardTitle>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedCourse === course.id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCourse(course.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{course.title}</h3>
                    <Badge className={course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {course.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">by {course.instructor}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Sections:</span>
                      <span>{course.totalSections}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Units:</span>
                      <span>{course.totalUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{course.totalDuration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Course Content Area */}
        <div className="lg:col-span-3">
          {selectedCourse && currentCourseContent ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Course Content Structure</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {courses.find(c => c.id === selectedCourse)?.title}
                    </p>
                  </div>
                  <Dialog open={isAddSectionOpen} onOpenChange={setIsAddSectionOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Section
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Section</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="section-title">Section Title</Label>
                          <Input
                            id="section-title"
                            value={newSectionTitle}
                            onChange={(e) => setNewSectionTitle(e.target.value)}
                            placeholder="Enter section title..."
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddSectionOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addSection}>
                            Add Section
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentCourseContent.sections.map((section) => (
                    <div key={section.id} className="border rounded-lg">
                      {/* Section Header */}
                      <div className="p-4 bg-gray-50 border-b">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleSection(section.id)}
                            >
                              {expandedSections.includes(section.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                            <div>
                              <h3 className="font-medium text-gray-900">{section.title}</h3>
                              <p className="text-sm text-gray-500">
                                {section.units.length} units • {section.duration}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={section.isPublished}
                              onCheckedChange={() => toggleSectionPublished(section.id)}
                            />
                            <span className="text-sm text-gray-500">
                              {section.isPublished ? 'Published' : 'Draft'}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setSelectedSection(section)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Section
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Move className="h-4 w-4 mr-2" />
                                  Move
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => deleteSection(section.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>

                      {/* Section Content */}
                      {expandedSections.includes(section.id) && (
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-gray-700">Units</h4>
                            <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Unit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add New Unit</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="unit-title">Unit Title</Label>
                                    <Input
                                      id="unit-title"
                                      value={newUnitTitle}
                                      onChange={(e) => setNewUnitTitle(e.target.value)}
                                      placeholder="Enter unit title..."
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="unit-type">Unit Type</Label>
                                    <Select value={newUnitType} onValueChange={setNewUnitType}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="video">Video</SelectItem>
                                        <SelectItem value="document">Document</SelectItem>
                                        <SelectItem value="audio">Audio</SelectItem>
                                        <SelectItem value="quiz">Quiz</SelectItem>
                                        <SelectItem value="assignment">Assignment</SelectItem>
                                        <SelectItem value="live_session">Live Session</SelectItem>
                                        <SelectItem value="download">Download</SelectItem>
                                        <SelectItem value="external_link">External Link</SelectItem>
                                        <SelectItem value="image">Image</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setIsAddUnitOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={() => addUnit(section.id)}>
                                      Add Unit
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="space-y-2">
                            {section.units.map((unit) => (
                              <div key={unit.id} className="flex items-center justify-between p-3 bg-white border rounded">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-2">
                                    {getUnitIcon(unit.type)}
                                    <Badge className={unitTypeColors[unit.type] || 'bg-gray-100 text-gray-800'}>
                                      {unit.type.replace('_', ' ')}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{unit.title}</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                      <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {unit.duration}
                                      </span>
                                      {unit.isFree && (
                                        <Badge className="bg-green-100 text-green-800 text-xs">
                                          Free
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={unit.isPublished}
                                    onCheckedChange={() => toggleUnitPublished(section.id, unit.id)}
                                  />
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem onClick={() => setSelectedUnit(unit)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Unit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Preview
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Copy className="h-4 w-4 mr-2" />
                                        Duplicate
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Move className="h-4 w-4 mr-2" />
                                        Move
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => deleteUnit(section.id, unit.id)}
                                        className="text-red-600"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            ))}
                            {section.units.length === 0 && (
                              <div className="text-center py-8 text-gray-500">
                                <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>No units in this section yet</p>
                                <p className="text-sm">Click "Add Unit" to get started</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {currentCourseContent.sections.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No sections yet</h3>
                      <p className="mb-4">Start building your course by adding sections</p>
                      <Button onClick={() => setIsAddSectionOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Section
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Select a Course</h3>
                  <p>Choose a course from the sidebar to manage its content</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Unit Edit Dialog */}
      {selectedUnit && (
        <Dialog open={!!selectedUnit} onOpenChange={() => setSelectedUnit(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Unit: {selectedUnit.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Unit Title</Label>
                <Input value={selectedUnit.title} />
              </div>
              <div>
                <Label>Unit Type</Label>
                <Select value={selectedUnit.type}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duration</Label>
                <Input value={selectedUnit.duration} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={selectedUnit.isFree} />
                <Label>Free Preview</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={selectedUnit.isPublished} />
                <Label>Published</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedUnit(null)}>
                  Cancel
                </Button>
                <Button>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CourseContentManagement;