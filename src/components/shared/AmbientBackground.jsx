export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-60" />

      <div className="aurora -left-40 -top-52 h-[38rem] w-[38rem] animate-drift bg-golden-orange/20" />
      <div className="aurora -right-52 top-10 h-[34rem] w-[34rem] animate-drift bg-fiery-terracotta/15 [animation-delay:-8s]" />
      <div className="aurora bottom-[-14rem] left-1/3 h-[32rem] w-[32rem] animate-drift bg-space-indigo/60 [animation-delay:-14s]" />

      <div className="absolute left-1/2 top-0 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(240,162,2,0.09),transparent_70%)]" />

      <div className="noise-overlay absolute inset-0 opacity-[0.035] mix-blend-soft-light" />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  )
}
