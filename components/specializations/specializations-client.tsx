'use client';

import { useState } from 'react';
import { SpecializationCard } from './specialization-card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

interface Specialization {
  id: string;
  name: string;
  doctorCount: number;
  icon: string;
  color: string;
  description: string;
  commonConditions: string[];
}

export function SpecializationsClient({
  specializations,
}: {
  specializations: Specialization[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'doctors'>('name');

  // Filter specializations based on search
  const filteredSpecializations = specializations.filter((spec) =>
    spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spec.commonConditions.some(condition => 
      condition.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort specializations
  const sortedSpecializations = [...filteredSpecializations].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return b.doctorCount - a.doctorCount;
  });

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg border p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search specializations or conditions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort */}
          <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as 'name' | 'doctors')}>
            <TabsList>
              <TabsTrigger value="name">A-Z</TabsTrigger>
              <TabsTrigger value="doctors">Most Doctors</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <p className="text-gray-600">
          Showing {sortedSpecializations.length} of {specializations.length} specializations
        </p>
      </div>

      {/* Specializations Grid */}
      {sortedSpecializations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSpecializations.map((specialization) => (
            <SpecializationCard
              key={specialization.id}
              specialization={specialization}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No specializations found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms
          </p>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-16 bg-blue-50 rounded-lg p-8 border border-blue-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-gray-600 mb-6">
            Not sure which specialist you need? Our general physicians can help 
            diagnose your condition and refer you to the right specialist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/doctors?specialization=General+Physician"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Book General Consultation
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
