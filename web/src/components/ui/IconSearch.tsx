'use client';

interface iIconSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconSearch({ value, onChange }: iIconSearchProps) {
  return (
    <div className="w-full max-w-2xl">
      <label htmlFor="icon-search" className="sr-only">Search icons by name or alias</label>
      <input
        id="icon-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search icons..."
        data-testid="icon-search-input"
        className="w-full rounded-lg border border-brand-secondary-200 bg-white px-4 py-3 text-brand-secondary-900 placeholder:text-brand-secondary-400 outline-none focus:border-brand-primary-500 focus:ring-2 focus:ring-brand-primary-200 transition-all"
      />
    </div>
  );
}
