'use client';

import { useState } from 'react';
import { IconSearch } from '@/components/ui/IconSearch';
import { IconGrid } from '@/components/ui/IconGrid';
import { IconDetail } from '@/components/ui/IconDetail';
import { Toggle } from '@/components/ui/toggle';
import { icons } from '@/data/icons';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('solid');
  const [solidOn, setSolidOn] = useState(false);
  const [outlinedOn, setOutlinedOn] = useState(false);

  const styleSet = new Set<string>();
  if (solidOn) styleSet.add('solid');
  if (outlinedOn) styleSet.add('outlined');
  if (styleSet.size === 0) { styleSet.add('solid'); styleSet.add('outlined'); }

  const handleSelect = (iconName: string, style: string) => {
    setSelectedIcon(iconName);
    setSelectedStyle(style);
  };

  return (
    <div className="min-h-[80vh]" data-testid="home-page">
      <header className="border-b border-brand-secondary-200 bg-gradient-to-b from-brand-primary-50 to-background">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 text-center">
          <h1
            className="mb-3 text-4xl font-bold tracking-tight text-brand-secondary-900 sm:text-5xl"
            data-testid="home-title"
          >
            Vedic Icons
          </h1>
          <p className="mb-8 text-brand-secondary-600">
            A pure CSS icon library inspired by Indian art, culture, and sacred geometry.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 items-stretch sm:items-center">
            <IconSearch value={search} onChange={setSearch} />
            <div className="flex self-center w-fit border border-brand-secondary-200 rounded-lg overflow-hidden h-[50px]" role="group" aria-label="Filter by icon style">
              <Toggle
                pressed={solidOn}
                onPressedChange={setSolidOn}
                data-testid="style-filter-solid"
                aria-label={solidOn ? 'Solid icons selected, click to deselect' : 'Click to show only solid icons'}
                className="px-4 h-full min-w-[56px] text-sm rounded-none border-none aria-pressed:bg-brand-primary-600 aria-pressed:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary-400 focus:ring-inset"
              >
                {solidOn && <span aria-hidden="true" className="mr-1">&#10003;</span>}
                Solid
              </Toggle>
              <div className="w-px bg-brand-secondary-200" aria-hidden="true" />
              <Toggle
                pressed={outlinedOn}
                onPressedChange={setOutlinedOn}
                data-testid="style-filter-outlined"
                aria-label={outlinedOn ? 'Outlined icons selected, click to deselect' : 'Click to show only outlined icons'}
                className="px-4 h-full min-w-[56px] text-sm rounded-none border-none aria-pressed:bg-brand-primary-600 aria-pressed:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary-400 focus:ring-inset"
              >
                {outlinedOn && <span aria-hidden="true" className="mr-1">&#10003;</span>}
                Outlined
              </Toggle>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10" aria-label="Icon browser">
        <div className="mb-6 flex items-center justify-between text-sm text-brand-secondary-600">
          <span data-testid="icon-count" aria-live="polite">{icons.length} {icons.length === 1 ? 'icon' : 'icons'}</span>
        </div>
        <IconGrid filter={search} styleFilter={styleSet} onSelect={handleSelect} />
      </main>

      <IconDetail iconName={selectedIcon} defaultStyle={selectedStyle} onClose={() => setSelectedIcon(null)} />
    </div>
  );
}
