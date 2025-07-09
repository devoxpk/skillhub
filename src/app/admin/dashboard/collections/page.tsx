'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Search, Plus, MoreVertical, Lock, Unlock, Share2 } from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  emoji: string;
  description: string;
  privacy: 'private' | 'public' | 'shareable';
  items: number;
  createdAt: string;
  updatedAt: string;
}

const mockCollections: Collection[] = [
  {
    id: '1',
    title: 'Web Development Basics',
    emoji: '💻',
    description: 'Essential resources for web development beginners',
    privacy: 'public',
    items: 24,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'UI/UX Design Resources',
    emoji: '🎨',
    description: 'Collection of design tools and inspiration',
    privacy: 'private',
    items: 15,
    createdAt: '2024-01-16',
    updatedAt: '2024-01-19'
  },
  {
    id: '3',
    title: 'JavaScript Tips & Tricks',
    emoji: '⚡',
    description: 'Advanced JavaScript concepts and examples',
    privacy: 'shareable',
    items: 32,
    createdAt: '2024-01-17',
    updatedAt: '2024-01-20'
  },
  {
    id: '4',
    title: 'Mobile App Development',
    emoji: '📱',
    description: 'Resources for iOS and Android development',
    privacy: 'public',
    items: 18,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-20'
  },
  {
    id: '5',
    title: 'DevOps Best Practices',
    emoji: '🔧',
    description: 'Tools and guides for DevOps engineers',
    privacy: 'private',
    items: 27,
    createdAt: '2024-01-19',
    updatedAt: '2024-01-20'
  }
];

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCollections = collections.filter(collection =>
    Object.values(collection).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getPrivacyIcon = (privacy: Collection['privacy']) => {
    switch (privacy) {
      case 'private':
        return <Lock className="w-4 h-4" />;
      case 'public':
        return <Unlock className="w-4 h-4" />;
      case 'shareable':
        return <Share2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Collections</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Collection
        </Button>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{collection.emoji}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{collection.title}</h3>
                      <p className="text-sm text-gray-500">{collection.items} items</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="-mt-1 -mr-2">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {collection.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    {getPrivacyIcon(collection.privacy)}
                    <span className="capitalize">{collection.privacy}</span>
                  </div>
                  <span>Updated {collection.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <span>Showing {filteredCollections.length} of {collections.length} collections</span>
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