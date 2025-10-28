import { Link } from "react-router-dom";

export default function Home() {
  const cards = [
    { name: "Weather App", path: "/weather" },
    { name: "Users App", path: "/users" },
    { name: "Gold & Silver", path: "/gold" },
    { name: "Movies DB", path: "/movies" },
    { name: "About Us", path: "/about" },
    { name: "Contact Me", path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 pb-16">
      {/* Heading Section */}
      <h2 className="text-4xl font-extrabold mb-10 text-gray-800 text-center tracking-wide">
        Welcome to <span className="text-blue-600">Saira's Web Hub</span>
      </h2>
      <p className="text-gray-600 text-lg mb-12 text-center max-w-xl">
        Explore our collection of interactive mini projects — crafted with
        <span className="font-semibold text-blue-500"> React </span> &{" "}
        <span className="font-semibold text-indigo-500"> Tailwind CSS</span>.
      </p>

      {/* Cards Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <Link
            key={i}
            to={card.path}
            className="bg-white shadow-md hover:shadow-2xl rounded-2xl p-8 w-64 text-center transform hover:-translate-y-2 transition duration-300 border border-gray-200 hover:border-blue-500"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {card.name}
            </h3>
            <p className="text-gray-500 text-sm">
              Click to explore the {card.name.toLowerCase()} page.
            </p>
          </Link>
        ))}
      </div>

      {/* Decorative Section */}
      <div className="mt-16">
        <p className="text-gray-400 text-sm">
          Made with ❤️ by <span className="text-gray-600 font-medium">Sairah</span>
        </p>
      </div>
    </div>
  );
}
