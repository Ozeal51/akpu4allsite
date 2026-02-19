export default function CategoryFilter({ value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("")}
        className={`px-3 py-1.5 text-sm rounded-full border ${
          value === "" ? "bg-deepgreen-700 text-white border-transparent" : "border-brown-600/20 text-brown-700"
        }`}
      >
        All
      </button>
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`px-3 py-1.5 text-sm rounded-full border ${
            value === o.id ? "bg-deepgreen-700 text-white border-transparent" : "border-brown-600/20 text-brown-700"
          }`}
        >
          {o.name}
        </button>
      ))}
    </div>
  )
}
