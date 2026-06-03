export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <svg className="mandala-spin w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#2D6A4F" strokeWidth="2" strokeDasharray="8 4" opacity="0.3" />
          <circle cx="32" cy="32" r="20" stroke="#D4A843" strokeWidth="2" strokeDasharray="6 3" opacity="0.5" />
          <circle cx="32" cy="32" r="12" stroke="#2D6A4F" strokeWidth="2" strokeDasharray="4 2" opacity="0.7" />
          <circle cx="32" cy="32" r="4" fill="#2D6A4F" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <circle
              key={angle}
              cx={32 + 20 * Math.cos((angle * Math.PI) / 180)}
              cy={32 + 20 * Math.sin((angle * Math.PI) / 180)}
              r="3"
              fill="#D4A843"
              opacity="0.8"
            />
          ))}
        </svg>
        <p className="mt-4 text-text-muted text-sm text-center font-body">Loading...</p>
      </div>
    </div>
  );
}
