"use client";

import { useState } from "react";

export function BookForm() {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publicationYear: "",
        description: "",
        available: true,
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    publicationYear: Number(formData.publicationYear),
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                setErrors({});

                if (data.errors?.fieldErrors) {
                    const fieldErrors: Record<string, string> = {};

                    Object.entries(data.errors.fieldErrors).forEach(
                        ([key, value]) => {
                            fieldErrors[key] = (value as string[])[0];
                        },
                    );

                    setErrors(fieldErrors);
                }

                return;
            }
            setErrors({});
            setSuccessMessage("Livre ajouté avec succès !");
            setFormData({
                title: "",
                author: "",
                isbn: "",
                category: "",
                publicationYear: "",
                description: "",
                available: true,
            });
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error(error);
            alert("Erreur serveur");
        }
    };

    return (
        <div className="mx-auto mt-12 sm:mt-16 max-w-3xl px-4 sm:px-0">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Titre
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Ex: Les Misérables"
                            className={`w-full rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none ${
                                errors.title
                                    ? "border-2 border-red-500"
                                    : "border border-gray-300"
                            }`}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Auteur
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Ex: Victor Hugo"
                            className={`w-full rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none ${
                                errors.author
                                    ? "border-2 border-red-500"
                                    : "border border-gray-300"
                            }`}
                        />
                        {errors.author && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.author}
                            </p>
                        )}
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
                            placeholder="978-3-16-148410-0"
                            className={`w-full rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none ${
                                errors.isbn
                                    ? "border-2 border-red-500"
                                    : "border border-gray-300"
                            }`}
                        />
                        {errors.isbn && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.isbn}
                            </p>
                        )}
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
                            placeholder="YYYY"
                            className={`w-full rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none ${
                                errors.publicationYear
                                    ? "border-2 border-red-500"
                                    : "border border-gray-300"
                            }`}
                        />
                        {errors.publicationYear && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.publicationYear}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Catégorie
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none ${
                            errors.category
                                ? "border-2 border-red-500"
                                : "border border-gray-300"
                        }`}
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="Roman">Roman</option>
                        <option value="Science">Science</option>
                        <option value="Histoire">Histoire</option>
                        <option value="Informatique">Informatique</option>
                    </select>
                    {errors.category && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.category}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brève présentation de l'œuvre..."
                        className={`w-full resize-none rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none ${
                            errors.description
                                ? "border-2 border-red-500"
                                : "border border-gray-300"
                        }`}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.description}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 border-t pt-5 sm:pt-6">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <label className="text-sm sm:text-base">Disponible</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto rounded-md bg-slate-900 px-6 sm:px-8 py-2.5 sm:py-3 text-white transition hover:bg-slate-800 text-sm sm:text-base"
                    >
                        Enregistrer
                    </button>
                </div>

                {successMessage && (
                    <div className="rounded-md border border-green-500 bg-green-100 p-3 text-green-700 text-sm sm:text-base">
                        {successMessage}
                    </div>
                )}
            </form>
        </div>
    );
}