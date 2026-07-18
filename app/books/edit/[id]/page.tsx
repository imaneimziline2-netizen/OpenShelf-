"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
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
        return (
            <p className="mt-20 text-center text-lg">
                Chargement...
            </p>
        );
    }

    return (
        <section className="mx-auto max-w-3xl px-6 py-10 pt-25">
            <h1 className="mb-6 text-3xl font-bold">
                Modifier un livre
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-lg bg-white p-6 shadow"
            >
                <div>
                    <label className="mb-2 block font-medium">
                        Titre
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Auteur
                    </label>

                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        ISBN
                    </label>

                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Catégorie
                    </label>

                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Année
                    </label>

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

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                    />

                    <label>Disponible</label>
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