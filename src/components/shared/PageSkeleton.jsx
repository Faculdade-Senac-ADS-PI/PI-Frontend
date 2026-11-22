export function PageSkeleton() {
  return (
    <div
      className="shell py-10 sm:py-14"
      role="status"
      aria-live="polite"
      aria-label="Carregando página"
    >
      <div className="space-y-5" aria-hidden="true">
        <div className="skeleton h-7 w-36 rounded-full" />
        <div className="skeleton h-12 w-full max-w-2xl rounded-2xl" />
        <div className="skeleton h-5 w-full max-w-xl rounded-full" />
      </div>

      <div
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-hidden="true"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="glass-card space-y-5 p-6"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="skeleton h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-2/3 rounded-full" />
                <div className="skeleton h-3 w-1/2 rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="skeleton h-3 w-full rounded-full" />
              <div className="skeleton h-3 w-5/6 rounded-full" />
            </div>
            <div className="flex gap-2">
              <div className="skeleton h-6 w-16 rounded-full" />
              <div className="skeleton h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Carregando…</span>
    </div>
  )
}
