import Link from "next/link";
import { Book } from "@/types/Book";
import { BookOpen, Pencil, Trash2 } from "lucide-react";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <div className="bg-white rounded-lg border p-5 shadow-sm hover:shadow-lg transition">

      <div className="flex justify-center mb-5">
        <div className="w-24 h-32 bg-gray-100 rounded flex items-center justify-center">
          <BookOpen size={45} />
        </div>
      </div>

      <span
        className={`text-xs px-3 py-1 rounded-full ${
          book.available
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {book.available ? "Disponible" : "Emprunté"}
      </span>

      <h2 className="text-xl font-bold mt-4">
        {book.title}
      </h2>

      <p className="text-gray-600">
        {book.author}
      </p>

      <p className="text-gray-500 text-sm mt-1">
        {book.category}
      </p>

      <p className="text-gray-500 text-sm">
        {book.publicationYear}
      </p>

      <div className="flex justify-between items-center mt-5">
        <Link
          href={`/books/${book._id}`}
          className="border px-4 py-2 rounded"
        >
          Voir détails
        </Link>

        <div className="flex gap-4">
          <Link href={`/books/edit/${book._id}`}>
            <Pencil size={18} />
          </Link>

          <button>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}