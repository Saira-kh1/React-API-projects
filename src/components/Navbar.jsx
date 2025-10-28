import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass =
    "text-gray-700 hover:text-indigo-600 hover:underline underline-offset-4 transition";
  const activeClass = "text-indigo-600 font-semibold underline underline-offset-4";

  return (
    <nav className="bg-white text-gray-800 px-8 py-4 shadow-md flex justify-between items-center">
      {/* Logo / Title */}
      <h1 className="text-2xl font-extrabold tracking-wide text-indigo-600">
        Saira's Web Hub
      </h1>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-lg font-medium">
        <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          Home
        </NavLink>
        <NavLink to="/weather" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          Weather
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          Users
        </NavLink>
        <NavLink to="/gold" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          Gold
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          Movies
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          Contact
        </NavLink>
      </ul>
    </nav>
  );
}
