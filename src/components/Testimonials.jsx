export default function Testimonials() {
  const items = [
    {
      name: "Agbo Joy",
      text: "Best swallow in Abuja! Fast delivery and delicious soups.",
    },
    { name: "Sammy", text: "Amala & Ewedu was perfect. Highly recommend." },
    { name: "Eliana", text: "Authentic taste that reminds me of home." },
  ]
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-deepgreen-700">Testimonials</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-brown-600/10 shadow-soft card-hover bg-cream-100"
            >
              <p className="text-brown-700 text-sm">{it.text}</p>
              <div className="mt-4 text-sm font-semibold text-deepgreen-700">
                — {it.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
