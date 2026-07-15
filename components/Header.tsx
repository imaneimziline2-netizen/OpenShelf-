import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          Lumina Library
        </h1>

        <nav className="flex items-center gap-8 text-sm">
          <Link
            href="/"
            className="font-semibold border-b-2 border-black pb-1 hover:text-gray-700 transition"
          >
            Home
          </Link>

          <Link
            href="/books/create"
            className="text-gray-600 hover:text-black transition"
          >
            Add a Book
          </Link>
        </nav>
      </div>
    </header>
  );
}