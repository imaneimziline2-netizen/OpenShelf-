"use client";
import { Book } from "@/types/Book";
import { useParams , useRouter  } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBookPage() {
    const [book, setBook] = useState<Book | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publicationYear: "",
        description: "",
        available: true,
    });

    const params = useParams();
    const id = params.id as string;

    const router = useRouter();

    useEffect(() => {
        async function fetchBook() {
            const response = await fetch(`/api/books/${id}`);

            const data = await response.json();

            if (response.ok) {
                setBook(data);
            }
        }
        fetchBook();
    }, [id]);

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                category: book.category,
                publicationYear: book.publicationYear.toString(),
                description: book.description,
                available: book.available,
            });
        }
    }, [book]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/books/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    publicationYear: Number(formData.publicationYear),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Erreur lors de la mise à jour");
                return;
            }

            alert("Livre modifié avec succès");
            router.push(`/books/${id}`);
        } catch (error) {
            console.error(error);
            alert("Erreur serveur");
        }
    };

    return (
        <section className="mx-auto max-w-3xl px-6 py-10 pt-25">
            <h1 className="mb-6 text-3xl font-bold">Modifier un livre</h1>

            <form
                className="space-y-5 rounded-lg bg-white p-6 shadow"
                onSubmit={handleSubmit}
            >
                <div>
                    <label className="mb-2 block font-medium">Titre</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">Auteur</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">Catégorie</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">Année</label>
                    <input
                        type="number"
                        name="publicationYear"
                        value={formData.publicationYear}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                    Enregistrer les modifications
                </button>
            </form>
        </section>
    );
}
