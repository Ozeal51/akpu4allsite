import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 brand-gradient opacity-20" />
      <div
        className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-deepgreen-700 leading-tight">
            Akpu4All
          </h1>
          <p className="mt-3 md:mt-4 text-lg md:text-xl text-brown-700">
            Fresh Swallow, Anytime, Anywhere
          </p>
          <p className="mt-4 text-sm text-brown-700">
            Order our authentic Nigerian swallows and soups delivered fast with warm hospitality.
          </p>
          <div className="mt-6">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-lg shadow-soft transition"
            >
              Order Now
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-soft">
          <img
            src="https://media.istockphoto.com/id/2195435155/photo/pounded-yam-vegetable-soup-and-stew-with-liver-and-pommo.jpg?s=612x612&w=0&k=20&c=ij8rvKuKjiK8nU38-N70O1G_ez1DSGJZHnJR-mghQRg="
            alt="Nigerian cuisine"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </div>
    </section>
  )
}
