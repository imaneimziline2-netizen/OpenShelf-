"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/Book";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
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
        <main className="max-w-7xl mx-auto p-6 pt-20">
            <h1 className="text-5xl font-serif font-bold">Catalogue Lumina</h1>
            <p className="w-1/2 mt-4">
                Explorez notre collection de centaines d ouvrages à travers tous
                les genres, du classique académique à la littérature
                contemporaine.
            </p>

            <div className="pt-15">
                <Filter
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
            />
            </div>

            <div className="grid grid-cols-4 gap-6 mt-8">
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
