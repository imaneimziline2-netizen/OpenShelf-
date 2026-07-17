"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/Book";
import BookCard from "@/components/BookCard";
import Filter from "@/components/Filter";

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    useEffect(() => {
        async function fetchBooks() {
            const response = await fetch("/api/books");
            const data = await response.json();
            setBooks(data);
        }

        fetchBooks();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "Voulez-vous vraiment supprimer ce livre ?",
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/books/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                return;
            }

            setBooks((prev) => prev.filter((book) => book._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase()) ||
            book.isbn.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            status === "all" ||
            (status === "available" && book.available) ||
            (status === "borrowed" && !book.available);

        return matchesSearch && matchesStatus;
    });

    return (
        <main className="max-w-7xl mx-auto p-4 sm:p-6 pt-20 sm:pt-24">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
                Catalogue Lumina
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl text-gray-600 text-sm sm:text-base">
                Explorez notre collection de centaines d ouvrages à travers tous
                les genres, du classique académique à la littérature
                contemporaine.
            </p>

            <div className="pt-10 sm:pt-15">
                <Filter
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                />
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book._id}
                        book={book}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </main>
    );
}