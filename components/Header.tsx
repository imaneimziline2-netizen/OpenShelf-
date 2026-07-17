"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                    Lumina Library
                </h1>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
                    aria-label="Menu"
                >
                    <Menu size={24} />
                </button>

                <nav className="hidden md:flex items-center gap-8 text-sm">
                    <Link
                        href="/"
                        className={`pb-1 transition ${
                            pathname === "/"
                                ? "border-b-2 border-black font-semibold text-black"
                                : "text-gray-600 hover:text-black"
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/books/create"
                        className={`pb-1 transition ${
                            pathname === "/books/create"
                                ? "border-b-2 border-black font-semibold text-black"
                                : "text-gray-600 hover:text-black"
                        }`}
                    >
                        Add a Book
                    </Link>
                </nav>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t bg-white px-4 py-4 shadow-lg">
                    <nav className="flex flex-col gap-3 text-sm">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={`py-2 px-3 rounded transition ${
                                pathname === "/"
                                    ? "bg-slate-100 font-semibold text-black"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/books/create"
                            onClick={() => setIsMenuOpen(false)}
                            className={`py-2 px-3 rounded transition ${
                                pathname === "/books/create"
                                    ? "bg-slate-100 font-semibold text-black"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                            }`}
                        >
                            Add a Book
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}