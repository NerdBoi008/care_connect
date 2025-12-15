'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { DoctorsFilters } from './doctors-filters';

interface DoctorsMobileFiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departments: { id: string; name: string }[];
  searchParams: any;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export function DoctorsMobileFilters({
  open,
  onOpenChange,
  departments,
  searchParams,
  onFilterChange,
  onClearFilters,
}: DoctorsMobileFiltersProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Filter Doctors</SheetTitle>
        </SheetHeader>
        <DoctorsFilters
          departments={departments}
          searchParams={searchParams}
          onFilterChange={onFilterChange}
          onClearFilters={() => {
            onClearFilters();
            onOpenChange(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
