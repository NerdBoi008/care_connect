'use client';

import { useState } from 'react';
import { DoctorCard } from './doctor-card';
import { DoctorsFilters } from './doctors-filters';
import { DoctorsMobileFilters } from './doctors-mobile-filters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface Doctor {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  specialization: string;
  qualification: string;
  experience: number;
  fee: number;
  bio: string;
  department: string;
  rating: number;
  reviews: number;
  available: boolean;
}

interface Department {
  id: string;
  name: string;
}

interface SearchParams {
  search?: string;
  specialization?: string;
  department?: string;
  experience?: string;
  fee?: string;
  availability?: string;
  sort?: string;
}

export function DoctorsClient({
  initialDoctors,
  departments,
  searchParams,
}: {
  initialDoctors: Doctor[];
  departments: Department[];
  searchParams: SearchParams;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(urlSearchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    updateSearchParams('search', value);
  }, 300);

  const clearFilters = () => {
    router.replace(pathname);
  };

  const activeFiltersCount = Object.keys(searchParams).filter(
    (key) => key !== 'search' && key !== 'sort'
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-24">
            <DoctorsFilters
              departments={departments}
              searchParams={searchParams}
              onFilterChange={updateSearchParams}
              onClearFilters={clearFilters}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search & Sort Bar */}
          <div className="bg-white rounded-lg border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or specialization..."
                  className="pl-10"
                  defaultValue={searchParams.search || ''}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {/* Sort Dropdown */}
              <Tabs
                defaultValue={searchParams.sort || 'name'}
                onValueChange={(value) => updateSearchParams('sort', value)}
              >
                <TabsList className="hidden md:flex">
                  <TabsTrigger value="name">Name</TabsTrigger>
                  <TabsTrigger value="experience-desc">Experience</TabsTrigger>
                  <TabsTrigger value="fee-asc">Price: Low</TabsTrigger>
                  <TabsTrigger value="fee-desc">Price: High</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-gray-600">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                </span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto p-0 text-blue-600"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {initialDoctors.length} doctor{initialDoctors.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Doctors Grid */}
          {initialDoctors.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {initialDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No doctors found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      <DoctorsMobileFilters
        open={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
        departments={departments}
        searchParams={searchParams}
        onFilterChange={updateSearchParams}
        onClearFilters={clearFilters}
      />
    </div>
  );
}
