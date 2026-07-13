export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-gold-dark/60 sm:w-20" />
      <span className="text-gold-dark text-lg">✦</span>
      <span className="h-px w-12 bg-gold-dark/60 sm:w-20" />
    </div>
  );
}

export function CrescentDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-gold/70 sm:w-28" />
      <span className="text-gold text-xl leading-none">☾</span>
      <span className="h-px w-16 bg-gold/70 sm:w-28" />
    </div>
  );
}
