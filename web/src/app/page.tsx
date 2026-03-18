export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex max-w-lg flex-col items-center text-center">
        <div className="mb-8 text-8xl leading-none text-accent">&#x0950;</div>

        <h1 className="mb-4 font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Vedic Icons
        </h1>

        <p className="mb-2 text-lg text-muted">
          A pure CSS icon library inspired by Indian art, culture, and sacred
          geometry.
        </p>

        <p className="mb-10 text-sm text-accent-muted">Coming Soon</p>

        <div className="flex flex-col items-center gap-4 text-sm text-muted">
          <code className="rounded-md border border-accent-muted/30 bg-accent-muted/10 px-4 py-2 font-mono text-accent">
            &lt;i class=&quot;vi vi-diya&quot;&gt;&lt;/i&gt;
          </code>
          <p className="max-w-sm">
            Class-based. Framework-agnostic. Tailwind-compatible. Like Font
            Awesome, but rooted in Vedic aesthetics.
          </p>
        </div>
      </div>
    </div>
  );
}
