import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

        <h2 className="text-3xl font-serif font-bold text-gray-900">
          Lumina Library
        </h2>

        <div className="flex gap-6 text-sm text-gray-600">

          <Link href="#">Terms of Service</Link>

          <Link href="#">Library Hours</Link>

          <Link href="#">Contact Us</Link>
        </div>

        <p className="text-sm text-gray-500">
          © 2026 Lumina Library. All rights reserved.
        </p>

      </div>
    </footer>
  );
}