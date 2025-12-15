import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DoctorNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Doctor Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The doctor you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/doctors">Browse Doctors</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
