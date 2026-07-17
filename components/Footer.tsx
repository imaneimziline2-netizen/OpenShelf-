import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-100 border-t mt-16 sm:mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                    Lumina Library
                </h2>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
                    <Link href="#" className="hover:text-gray-900 transition">
                        Terms of Service
                    </Link>
                    <Link href="#" className="hover:text-gray-900 transition">
                        Library Hours
                    </Link>
                    <Link href="#" className="hover:text-gray-900 transition">
                        Contact Us
                    </Link>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 text-center">
                    © 2026 Lumina Library. All rights reserved.
                </p>
            </div>
        </footer>
    );
}