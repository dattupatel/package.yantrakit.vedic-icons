'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/examples', label: 'Examples' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      data-testid="nav"
      aria-label="Main navigation"
      className="border-b border-brand-secondary-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          data-testid="nav-logo"
          aria-label="Vedic Icons home"
          className="text-brand-primary-600 font-bold text-lg"
        >
          Vedic Icons
        </Link>
        <div className="flex items-center gap-6" role="list">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              role="listitem"
              data-testid={`nav-link-${label.toLowerCase()}`}
              aria-current={pathname === href ? 'page' : undefined}
              className={`text-sm transition-colors ${
                pathname === href
                  ? 'text-brand-primary-600 font-medium'
                  : 'text-brand-secondary-500 hover:text-brand-secondary-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
