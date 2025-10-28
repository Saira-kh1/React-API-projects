export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 text-center py-6 mt-10 border-t border-gray-800">
      <p className="text-sm tracking-wide">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">Saira's Web Hub</span> — Built with{" "}
        <span className="text-indigo-400 font-medium">React</span> ⚛️ +{" "}
        <span className="text-indigo-400 font-medium">Tailwind CSS</span> 💨
      </p>

      <div className="mt-3 flex justify-center gap-6">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition"
        >
          Twitter
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition"
        >
          GitHub
        </a>
        <a
          href="mailto:saira@example.com"
          className="hover:text-indigo-400 transition"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}

