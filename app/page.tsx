"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/Book";
import BookCard from "@/components/BookCard";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    }

    fetchBooks();
  }, []);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-5xl font-serif font-bold">
        Catalogue Lumina
      </h1>

      <div className="grid grid-cols-4 gap-6 mt-8">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </main>
  );
}