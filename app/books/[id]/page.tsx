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
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchBook() {
            const { id } = await params;

            const response = await fetch(`/api/books/${id}`);
            const data = await response.json();

            if (!response.ok) {
                setNotFound(true);
            } else {
                setBook(data);
            }

            setLoading(false);
        }

        fetchBook();
    }, [params]);

    if (loading) {
        return (
            <p className="mt-10 text-center text-lg font-medium">
                Chargement...
            </p>
        );
    }

    if (notFound) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center px-6">
                <h1 className="text-5xl font-bold text-red-600">
                    Livre introuvable
                </h1>

                <p className="mt-4 text-gray-600">
                    Le livre demandé n existe pas ou a été supprimé.
                </p>

                <Link
                    href="/"
                    className="mt-8 rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
                >
                    Retour au catalogue
                </Link>
            </main>
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pt-20">
            <Link href="/" className="text-sm text-gray-500 hover:text-black">
                ← Retour au catalogue
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
                <div className="border rounded-lg shadow-sm h-fit">
                    <h3 className="font-semibold text-base sm:text-lg border-b p-3 sm:p-4">
                        Informations du livre
                    </h3>

                    <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm sm:text-base">
                                ISBN
                            </span>
                            <span className="font-medium text-sm sm:text-base break-all text-right ml-2">
                                {book?.isbn}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm sm:text-base">
                                Année
                            </span>
                            <span className="font-medium text-sm sm:text-base">
                                {book?.publicationYear}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm sm:text-base">
                                Catégorie
                            </span>
                            <span className="font-medium text-sm sm:text-base">
                                {book?.category}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm sm:text-base">
                                Disponibilité
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold inline-block w-28 sm:w-auto text-center ${
                                    book?.available
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {book?.available ? "Disponible" : "Emprunté"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 border rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                                {book?.title}
                            </h1>

                            <p className="mt-2 text-xl sm:text-2xl italic text-gray-500">
                                {book?.author}
                            </p>
                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-medium inline-block w-full sm:w-auto text-center ${
                                book?.available
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {book?.available ? "🟢 Disponible" : "🔴 Emprunté"}
                        </span>
                    </div>

                    <hr className="my-6 sm:my-8" />

                    <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        Description de l ouvrage
                    </h2>

                    <p className="text-gray-700 leading-6 sm:leading-8 text-justify text-sm sm:text-base">
                        {book?.description}
                    </p>

                    <hr className="my-6 sm:my-8" />

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Link
                            href={`/books/edit/${book?._id}`}
                            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition text-center text-sm sm:text-base"
                        >
                            Modifier
                        </Link>

                        <button
                            onClick={handleDelete}
                            className="border border-red-500 text-red-500 px-6 py-3 rounded-md hover:bg-red-50 transition text-center text-sm sm:text-base"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
