import { asset } from "../utils/assets"
export default function Footer() {
  return (
    <footer className="border-t border-brown-600/10 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <img src={asset("logo.svg")} alt="Akpu4All" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-deepgreen-700 text-lg">Akpu4All</span>
          </div>
          <p className="text-sm text-brown-700 mt-3">
            Fresh Swallow, Anytime, Anywhere. Authentic Nigerian flavors with fast and relaible delivery.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-deepgreen-700">Contact Us</h4>
          <ul className="text-sm text-brown-700 mt-2 space-y-1">
            <li>+234 7086101544</li>
            <li>sirozeal512gmail.com</li>
            <li>Abuja, Nigeria</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-deepgreen-700">Quick Links</h4>
          <ul className="text-sm text-brown-700 mt-2 space-y-1">
            <li><a href="/" className="hover:text-deepgreen-700">Home</a></li>
            <li><a href="/menu" className="hover:text-deepgreen-700">Menu</a></li>
            <li><a href="/cart" className="hover:text-deepgreen-700">Cart</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-brown-700 py-4 border-t border-brown-600/10">
        © {new Date().getFullYear()} Akpu4All. All rights reserved.
      </div>
    </footer>
  )
}
