'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', exact: true },
  { href: '/doctors', label: 'Find Doctors' },
  { href: '/specializations', label: 'Specializations' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="text-gray-900">
              HealthCare<span className="text-blue-600">Plus</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors',
                  isActive(link.href, link.exact)
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {link.label}

                {/* Active underline */}
                {isActive(link.href, link.exact) && (
                  <span className="absolute -bottom-5.5 left-0 h-0.5 w-full bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
