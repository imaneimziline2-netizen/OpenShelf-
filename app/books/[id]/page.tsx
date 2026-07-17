"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Book } from "@/types/Book";
import { useRouter } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function BookDetails({ params }: PageProps) {
    const [book, setBook] = useState<Book | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchBook() {
            const { id } = await params;

            const response = await fetch(`/api/books/${id}`);
            const data = await response.json();

            setBook(data);
        }

        fetchBook();
    }, [params]);

    if (!book) {
        return (
            <p className="mt-10 text-center text-lg font-medium">
                Chargement...
            </p>
        );
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Voulez-vous vraiment supprimer ce livre ?",
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/books/${book?._id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Livre supprimé avec succès");

            router.push("/");
        } catch (error) {
            console.error(error);
            alert("Erreur serveur");
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-6 py-10 pt-20">
            <Link href="/" className="text-sm text-gray-500 hover:text-black">
                ← Retour au catalogue
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* LEFT */}
                <div className="border rounded-lg shadow-sm h-fit">
                    <h3 className="font-semibold text-lg border-b p-4">
                        Informations du livre
                    </h3>

                    <div className="p-5 space-y-5">
                        <div className="flex justify-between">
                            <span className="text-gray-500">ISBN</span>
                            <span className="font-medium">{book.isbn}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Année</span>
                            <span className="font-medium">
                                {book.publicationYear}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Catégorie</span>
                            <span className="font-medium">{book.category}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Disponibilité</span>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    book.available
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {book.available ? "Disponible" : "Emprunté"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-2 border rounded-lg shadow-sm p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-5xl font-bold">{book.title}</h1>

                            <p className="mt-2 text-2xl italic text-gray-500">
                                {book.author}
                            </p>
                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                                book.available
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {book.available ? "🟢 Disponible" : "🔴 Emprunté"}
                        </span>
                    </div>

                    <hr className="my-8" />

                    <h2 className="text-xl font-semibold mb-4">
                        Description de l ouvrage
                    </h2>

                    <p className="text-gray-700 leading-8 text-justify">
                        {book.description}
                    </p>

                    <hr className="my-8" />

                    <div className="flex gap-4">
                        <Link
                            href={`/books/edit/${book._id}`}
                            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                        >
                            Modifier
                        </Link>

                        <button
                            onClick={handleDelete}
                            className="border border-red-500 text-red-500 px-6 py-3 rounded-md hover:bg-red-50 transition"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
