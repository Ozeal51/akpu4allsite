export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search meals..."
        className="w-full rounded-lg border border-brown-600/20 bg-white px-4 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <span className="absolute left-3 top-2.5 text-brown-700">🔎</span>
    </div>
  )
}
