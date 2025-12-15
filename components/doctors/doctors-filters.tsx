'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { SearchParams } from '@/app/(root)/doctors/page';

const specializations = [
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic',
  'Dermatologist',
  'Ophthalmologist',
  'General Physician',
  'Psychiatrist',
];

interface DoctorsFiltersProps {
  departments: { id: string; name: string }[];
  searchParams: SearchParams;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export function DoctorsFilters({
  departments,
  searchParams,
  onFilterChange,
  onClearFilters,
}: DoctorsFiltersProps) {
  const maxFee = parseInt(searchParams.fee || '5000');
  const minExperience = parseInt(searchParams.experience || '0');

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-blue-600"
        >
          Clear all
        </Button>
      </div>

      <div className="space-y-6">
        {/* Specialization */}
        <div>
          <Label className="mb-2 block">Specialization</Label>
          <Select
            value={searchParams.specialization || 'none'}
            onValueChange={(value) => onFilterChange('specialization', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Specializations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-specializations">All Specializations</SelectItem>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Department */}
        <div>
          <Label className="mb-2 block">Department</Label>
          <Select
            value={searchParams.department || 'none'}
            onValueChange={(value) => onFilterChange('department', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-departments">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Experience */}
        <div>
          <Label className="mb-3 block">
            Minimum Experience: {minExperience} years
          </Label>
          <Slider
            value={[minExperience]}
            onValueChange={(values) =>
              onFilterChange('experience', values[0].toString())
            }
            max={30}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0 years</span>
            <span>30+ years</span>
          </div>
        </div>

        {/* Consultation Fee */}
        <div>
          <Label className="mb-3 block">
            Max Consultation Fee: ₹{maxFee}
          </Label>
          <Slider
            value={[maxFee]}
            onValueChange={(values) =>
              onFilterChange('fee', values[0].toString())
            }
            max={5000}
            step={100}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹0</span>
            <span>₹5000+</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
