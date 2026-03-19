'use client';

import { useState, useEffect } from 'react';
import { icons } from '@/data/icons';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface iIconDetailProps {
  iconName: string | null;
  defaultStyle?: string;
  onClose: () => void;
}

export function IconDetail({ iconName, defaultStyle = 'solid', onClose }: iIconDetailProps) {
  const icon = iconName ? icons.find((i) => i.name === iconName) : null;
  const [activeStyle, setActiveStyle] = useState(defaultStyle);
  const [copied, setCopied] = useState(false);
  const [copyAnnouncement, setCopyAnnouncement] = useState('');

  useEffect(() => {
    if (iconName) setActiveStyle(defaultStyle);
  }, [iconName, defaultStyle]);

  const copyHtml = async () => {
    if (!icon) return;
    const html = `<i class="vi vi-${activeStyle} vi-${icon.name}"></i>`;
    try {
      await navigator.clipboard.writeText(html);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = html;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setCopyAnnouncement('HTML copied to clipboard');
    setTimeout(() => {
      setCopied(false);
      setCopyAnnouncement('');
    }, 2000);
  };

  return (
    <Dialog open={!!icon} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden" data-testid="icon-detail-dialog">
        {icon && (
          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
            <div
              className="flex flex-col items-center justify-center bg-brand-secondary-900 p-8 sm:p-12 min-h-[200px] sm:min-h-[300px]"
              data-testid="icon-detail-preview"
            >
              <i
                className={`vi vi-${activeStyle} vi-${icon.name} text-7xl sm:text-8xl text-white`}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2 mt-6" role="group" aria-label="Icon style selector">
                {icon.styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setActiveStyle(style)}
                    aria-pressed={activeStyle === style}
                    data-testid={`icon-detail-style-${style}`}
                    className={`px-3 py-2 min-w-[48px] min-h-[44px] rounded text-xs font-mono cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-brand-secondary-900 ${
                      activeStyle === style
                        ? 'bg-white text-brand-secondary-900'
                        : 'bg-brand-secondary-700 text-brand-secondary-300 hover:bg-brand-secondary-600'
                    }`}
                  >
                    {activeStyle === style && <span aria-hidden="true" className="mr-1">&#10003;</span>}
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col gap-4">
              <div>
                <DialogTitle className="text-2xl font-bold">{icon.name}</DialogTitle>
                <DialogDescription className="text-xs uppercase tracking-wider">{icon.category}</DialogDescription>
              </div>

              <div className="flex items-end gap-3" aria-label="Size preview">
                {['text-sm', 'text-base', 'text-xl', 'text-3xl', 'text-5xl'].map((size) => (
                  <i
                    key={size}
                    className={`vi vi-${activeStyle} vi-${icon.name} ${size} text-brand-secondary-600`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div className="rounded-lg bg-brand-secondary-900 p-4" data-testid="icon-detail-code">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-brand-tertiary-400 uppercase tracking-wider">HTML</span>
                  <button
                    onClick={copyHtml}
                    data-testid="icon-detail-copy"
                    className="text-xs text-brand-secondary-400 hover:text-white cursor-pointer transition-colors focus:outline-none focus:text-white focus:ring-2 focus:ring-white/50 rounded px-2 py-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <code className="text-sm text-white font-mono break-all">
                  {`<i class="vi vi-${activeStyle} vi-${icon.name}"></i>`}
                </code>
              </div>

              <div data-testid="icon-detail-aliases">
                <span className="text-xs text-brand-secondary-500 uppercase tracking-wider">Aliases</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {icon.aliases.map((alias) => (
                    <span
                      key={alias}
                      className="rounded-full bg-brand-primary-100 px-2.5 py-0.5 text-xs text-brand-primary-700"
                    >
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div aria-live="polite" className="sr-only" data-testid="copy-announcement">
          {copyAnnouncement}
        </div>
      </DialogContent>
    </Dialog>
  );
}
