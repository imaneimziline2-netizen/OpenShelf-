import Link from "next/link";
import { Book } from "@/types/Book";
import { BookOpen, Pencil, Trash2 } from "lucide-react";

type Props = {
    book: Book;
    onDelete: (id: string) => void;
};

export default function BookCard({ book, onDelete }: Props) {
    return (
        <div className="bg-white rounded-lg border p-4 sm:p-5 shadow-sm hover:shadow-lg transition">
            <div className="flex justify-center mb-4 sm:mb-5">
                <div className="w-20 h-28 sm:w-24 sm:h-32 bg-gray-100 rounded flex items-center justify-center">
                    <BookOpen size={35} className="sm:w-[45px] sm:h-[45px]" />
                </div>
            </div>

            <span
                className={`text-xs px-2 sm:px-3 py-1 rounded-full inline-block ${
                    book.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}
            >
                {book.available ? "Disponible" : "Emprunté"}
            </span>

            <h2 className="text-lg sm:text-xl font-bold mt-3 sm:mt-4 line-clamp-2">
                {book.title}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base">{book.author}</p>

            <p className="text-gray-500 text-xs sm:text-sm mt-1">{book.category}</p>

            <p className="text-gray-500 text-xs sm:text-sm">{book.publicationYear}</p>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-4 sm:mt-5">
                <Link
                    href={`/books/${book._id}`}
                    className="border px-3 sm:px-4 py-2 rounded text-center text-sm sm:text-base hover:bg-gray-50 transition"
                >
                    Voir détails
                </Link>

                <div className="flex justify-center gap-4">
                    <Link 
                        href={`/books/edit/${book._id}`}
                        className="p-1 hover:text-blue-600 transition"
                    >
                        <Pencil size={18} />
                    </Link>

                    <button 
                        onClick={() => onDelete(book._id)}
                        className="p-1 hover:text-red-600 transition"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}