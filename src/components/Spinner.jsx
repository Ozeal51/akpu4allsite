export default function Spinner({ label }) {
  return (
    <div className="flex items-center gap-2 text-brown-700">
      <svg className="animate-spin w-5 h-5 text-deepgreen-700" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3" />
        <path d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z" fill="currentColor" />
      </svg>
      {label && <span className="text-sm">{label}</span>}
    </div>
  )
}
