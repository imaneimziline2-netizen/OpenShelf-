"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditBookPage() {
    const params = useParams();
    const router = useRouter();

    const id = params.id as string;

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publicationYear: "",
        description: "",
        available: true,
    });

    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await fetch(`/api/books/${id}`);

                if (!response.ok) {
                    alert("Livre introuvable");
                    router.push("/");
                    return;
                }

                const data = await response.json();

                setFormData({
                    title: data.title,
                    author: data.author,
                    isbn: data.isbn,
                    category: data.category,
                    publicationYear: data.publicationYear.toString(),
                    description: data.description,
                    available: data.available,
                });
            } catch (error) {
                console.error(error);
                alert("Erreur serveur");
            } finally {
                setLoading(false);
            }
        }

        fetchBook();
    }, [id, router]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
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

    if (loading) {
        return <p className="mt-20 text-center text-lg">Chargement...</p>;
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-10 pt-24">
            <Link href="/" className="text-sm text-gray-500 hover:text-black">
                ← Retour au catalogue
            </Link>

            <h1 className="mt-4 text-5xl font-serif font-bold">
                Modifier le livre
            </h1>

            <p className="mt-2 text-gray-500">
                Mettez à jour les informations de l ouvrage dans l archive
                numérique.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 rounded-md border border-gray-200 bg-white p-8"
            >
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Titre de l ouvrage
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Auteur
                        </label>

                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            ISBN
                        </label>

                        <input
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Genre / Catégorie
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        >
                            <option value="Roman">Roman</option>
                            <option value="Science">Science</option>
                            <option value="Histoire">Histoire</option>
                            <option value="Informatique">Informatique</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Année de publication
                        </label>

                        <input
                            type="number"
                            name="publicationYear"
                            value={formData.publicationYear}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium">
                        Synopsis & Notes
                    </label>

                    <textarea
                        name="description"
                        rows={7}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full resize-none rounded border border-gray-300 p-4 outline-none focus:border-black"
                    />

                    <p className="mt-2 text-right text-xs text-gray-400">
                        {formData.description.length} / 1000 caractères
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <button
                        type="submit"
                        className="rounded bg-slate-900 px-8 py-3 text-white transition hover:bg-slate-800"
                    >
                        Mettre à jour
                    </button>

                    <Link
                        href={`/books/${id}`}
                        className="text-sm text-gray-500 underline hover:text-black"
                    >
                        Annuler les modifications
                    </Link>
                </div>
            </form>
        </main>
    );
}
