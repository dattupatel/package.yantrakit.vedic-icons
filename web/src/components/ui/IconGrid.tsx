'use client';

import { icons } from '@/data/icons';

interface iIconGridProps {
  filter?: string;
  styleFilter?: Set<string>;
  onSelect: (iconName: string, style: string) => void;
}

export function IconGrid({ filter, styleFilter, onSelect }: iIconGridProps) {
  const filtered = filter
    ? icons.filter(
        (icon) =>
          icon.name.includes(filter.toLowerCase()) ||
          icon.aliases.some((a) => a.includes(filter.toLowerCase())) ||
          icon.category.includes(filter.toLowerCase())
      )
    : icons;

  const visibleItems = filtered.flatMap((icon) =>
    icon.styles.filter((style) => !styleFilter || styleFilter.has(style)).map((style) => ({
      icon,
      style,
    }))
  );

  return (
    <div
      data-testid="icon-grid"
      role="list"
      aria-label="Icon list"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3"
    >
      {visibleItems.length === 0 && (
        <div
          data-testid="icon-grid-empty"
          role="status"
          aria-live="polite"
          className="col-span-full flex flex-col items-center justify-center py-20 text-center"
        >
          <i className="vi vi-solid vi-diya text-5xl text-brand-secondary-200 mb-4" aria-hidden="true" />
          <p className="text-lg font-medium text-brand-secondary-600">No icons found</p>
          <p className="text-sm text-brand-secondary-500 mt-1">Try a different search term</p>
        </div>
      )}
      {visibleItems.map(({ icon, style }) => (
        <button
          key={`${style}-${icon.name}`}
          role="listitem"
          onClick={() => onSelect(icon.name, style)}
          data-testid={`icon-card-${style}-${icon.name}`}
          aria-label={`${icon.name} ${style} icon`}
          className="group flex flex-col items-center gap-2 rounded-xl border border-brand-secondary-200 bg-white p-5 min-h-[80px] transition-all hover:border-brand-primary-300 hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary-400 focus:ring-offset-2"
        >
          <i
            className={`vi vi-${style} vi-${icon.name} text-3xl text-brand-secondary-700 group-hover:text-brand-primary-600 transition-colors`}
            aria-hidden="true"
          />
          <span className="text-[11px] text-brand-secondary-600 font-mono">
            {icon.name}
          </span>
        </button>
      ))}
    </div>
  );
}
