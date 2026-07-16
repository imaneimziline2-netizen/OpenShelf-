"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 ">
                <h1 className="text-3xl font-serif font-bold text-gray-900">
                    Lumina Library
                </h1>

                <nav className="flex items-center gap-8 text-sm ">
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
        </header>
    );
}