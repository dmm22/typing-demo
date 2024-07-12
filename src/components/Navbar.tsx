import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa"

export default function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between mb-8">
      <Link className="text-3xl font-bold text-sky-600" to="/" tabIndex={1}>
        Logo
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          <Link to="/profile" tabIndex={3}>
            <FaUser className="p-1.5 text-4xl text-white rounded-full bg-neutral-600" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
