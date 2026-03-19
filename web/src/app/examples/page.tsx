'use client';

import { useState } from 'react';

function CopyBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <button
        onClick={handleCopy}
        data-testid="copy-block"
        aria-label={`Copy ${code}`}
        className="w-full relative rounded-lg bg-brand-secondary-50 px-4 py-3 min-h-[48px] hover:bg-brand-secondary-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-secondary-400 focus:ring-offset-2 text-left"
      >
        <code className="text-sm text-brand-secondary-700 font-mono pr-8 block break-all sm:break-normal sm:truncate">{code}</code>
        <span className="absolute top-2 right-2 text-brand-secondary-400" aria-hidden="true">
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          )}
        </span>
      </button>
      <div aria-live="polite" className="sr-only">
        {copied ? `Copied: ${code}` : ''}
      </div>
    </div>
  );
}

export default function ExamplesPage() {
  return (
    <div className="min-h-[80vh]">
      <div id="main-content" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="mb-3 text-3xl font-bold text-brand-secondary-900">Examples</h1>
        <p className="mb-12 text-brand-secondary-600">
          Vedic Icons only provides the icon classes. Use your CSS framework for sizing, colors, and transforms.
        </p>

        <div className="space-y-16">
          <section aria-labelledby="basic-usage-heading">
            <h2 id="basic-usage-heading" className="mb-2 text-xl font-semibold text-brand-secondary-900">Basic Usage</h2>
            <p className="mb-6 text-sm text-brand-secondary-600">
              Every icon requires three classes: <code className="text-brand-primary-600">vi</code> (base),
              a style (<code className="text-brand-primary-600">vi-solid</code> or <code className="text-brand-primary-600">vi-outlined</code>),
              and the icon name.
            </p>
            <div className="rounded-xl border border-brand-secondary-200 bg-white p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div className="flex flex-col items-center gap-1">
                  <i className="vi vi-solid vi-diya text-4xl text-brand-secondary-700" aria-hidden="true" />
                  <span className="text-[11px] text-brand-secondary-600 font-mono">solid</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <i className="vi vi-outlined vi-diya text-4xl text-brand-secondary-700" aria-hidden="true" />
                  <span className="text-[11px] text-brand-secondary-600 font-mono">outlined</span>
                </div>
              </div>
              <CopyBlock code='<i class="vi vi-solid vi-diya"></i>' />
              <CopyBlock code='<i class="vi vi-outlined vi-diya"></i>' />
            </div>
          </section>

          <section aria-labelledby="sizing-heading">
            <h2 id="sizing-heading" className="mb-2 text-xl font-semibold text-brand-secondary-900">Sizing</h2>
            <p className="mb-6 text-sm text-brand-secondary-600">
              Icons inherit <code className="text-brand-primary-600">font-size</code>. Use Tailwind&apos;s text size classes.
            </p>
            <div className="rounded-xl border border-brand-secondary-200 bg-white p-6 space-y-4">
              <div className="flex flex-wrap items-end gap-4 sm:gap-6">
                {['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl'].map((size) => (
                  <div key={size} className="flex flex-col items-center gap-1">
                    <i className={`vi vi-solid vi-diya ${size} text-brand-secondary-700`} aria-hidden="true" />
                    <span className="text-[9px] text-brand-secondary-600 font-mono">{size}</span>
                  </div>
                ))}
              </div>
              <CopyBlock code='<i class="vi vi-solid vi-diya text-4xl"></i>' />
            </div>
          </section>

          <section aria-labelledby="colors-heading">
            <h2 id="colors-heading" className="mb-2 text-xl font-semibold text-brand-secondary-900">Colors</h2>
            <p className="mb-6 text-sm text-brand-secondary-600">
              Icons inherit <code className="text-brand-primary-600">color</code>. Use Tailwind&apos;s text color classes.
            </p>
            <div className="rounded-xl border border-brand-secondary-200 bg-white p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {[
                  { cls: 'text-red-500', label: 'red-500' },
                  { cls: 'text-amber-400', label: 'amber-400' },
                  { cls: 'text-green-500', label: 'green-500' },
                  { cls: 'text-blue-500', label: 'blue-500' },
                  { cls: 'text-purple-500', label: 'purple-500' },
                  { cls: 'text-pink-500', label: 'pink-500' },
                  { cls: 'text-brand-primary-600', label: 'primary' },
                ].map(({ cls, label }) => (
                  <div key={cls} className="flex flex-col items-center gap-1">
                    <i className={`vi vi-solid vi-diya text-4xl ${cls}`} aria-hidden="true" />
                    <span className="text-[9px] text-brand-secondary-600 font-mono">{label}</span>
                  </div>
                ))}
              </div>
              <CopyBlock code='<i class="vi vi-solid vi-diya text-red-500"></i>' />
            </div>
          </section>

          <section aria-labelledby="rotation-heading">
            <h2 id="rotation-heading" className="mb-2 text-xl font-semibold text-brand-secondary-900">Rotation</h2>
            <p className="mb-6 text-sm text-brand-secondary-600">
              Use Tailwind&apos;s rotation utilities.
            </p>
            <div className="rounded-xl border border-brand-secondary-200 bg-white p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                {[
                  { cls: '', label: 'default' },
                  { cls: 'rotate-45', label: 'rotate-45' },
                  { cls: 'rotate-90', label: 'rotate-90' },
                  { cls: 'rotate-180', label: 'rotate-180' },
                  { cls: '-rotate-45', label: '-rotate-45' },
                  { cls: '-rotate-90', label: '-rotate-90' },
                ].map(({ cls, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <i className={`vi vi-solid vi-diya text-4xl text-brand-secondary-700 ${cls}`} aria-hidden="true" />
                    <span className="text-[9px] text-brand-secondary-600 font-mono">{label}</span>
                  </div>
                ))}
              </div>
              <CopyBlock code='<i class="vi vi-solid vi-diya rotate-90"></i>' />
            </div>
          </section>

          <section aria-labelledby="flip-heading">
            <h2 id="flip-heading" className="mb-2 text-xl font-semibold text-brand-secondary-900">Flip</h2>
            <p className="mb-6 text-sm text-brand-secondary-600">
              Use Tailwind&apos;s scale utilities to flip icons.
            </p>
            <div className="rounded-xl border border-brand-secondary-200 bg-white p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                {[
                  { cls: '', label: 'default' },
                  { cls: 'scale-x-[-1]', label: 'flip horizontal' },
                  { cls: 'scale-y-[-1]', label: 'flip vertical' },
                ].map(({ cls, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <i className={`vi vi-solid vi-diya text-4xl text-brand-secondary-700 ${cls}`} aria-hidden="true" />
                    <span className="text-[9px] text-brand-secondary-600 font-mono">{label}</span>
                  </div>
                ))}
              </div>
              <CopyBlock code='<i class="vi vi-solid vi-diya scale-x-[-1]"></i>' />
            </div>
          </section>

          <section aria-labelledby="animation-heading">
            <h2 id="animation-heading" className="mb-2 text-xl font-semibold text-brand-secondary-900">Animation</h2>
            <p className="mb-6 text-sm text-brand-secondary-600">
              Use Tailwind&apos;s animation utilities. Animations are automatically disabled for users who prefer reduced motion.
            </p>
            <div className="rounded-xl border border-brand-secondary-200 bg-white p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                {[
                  { cls: 'animate-spin motion-reduce:animate-none', label: 'animate-spin' },
                  { cls: 'animate-pulse motion-reduce:animate-none', label: 'animate-pulse' },
                  { cls: 'animate-bounce motion-reduce:animate-none', label: 'animate-bounce' },
                ].map(({ cls, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <i className={`vi vi-solid vi-diya text-4xl text-brand-secondary-700 ${cls}`} aria-hidden="true" />
                    <span className="text-[9px] text-brand-secondary-600 font-mono">{label}</span>
                  </div>
                ))}
              </div>
              <CopyBlock code='<i class="vi vi-solid vi-diya animate-spin"></i>' />
            </div>
          </section>

          <section aria-labelledby="combining-heading">
            <h2 id="combining-heading" className="mb-2 text-xl font-semibold text-brand-secondary-900">Combining Classes</h2>
            <p className="mb-6 text-sm text-brand-secondary-600">
              Mix and match any Tailwind classes with icon classes.
            </p>
            <div className="rounded-xl border border-brand-secondary-200 bg-white p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <i className="vi vi-solid vi-diya text-5xl text-amber-500 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                <i className="vi vi-outlined vi-diya text-5xl text-purple-500 rotate-12" aria-hidden="true" />
                <i className="vi vi-solid vi-diya text-5xl text-red-500 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              </div>
              <CopyBlock code='<i class="vi vi-solid vi-diya text-5xl text-amber-500 animate-pulse"></i>' />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
