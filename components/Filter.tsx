"use client";

interface FilterProps {
    search: string;
    setSearch: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
}

export default function Filter({
    search,
    setSearch,
    status,
    setStatus,
}: FilterProps) {
    return (
        <div className="mb-6 sm:mb-8 rounded-lg border p-4 sm:p-5">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                    <label className="mb-1.5 sm:mb-2 block text-xs font-semibold uppercase text-gray-500">
                        Recherche
                    </label>
                    <input
                        type="text"
                        placeholder="Titre, auteur ou ISBN..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-md border px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base"
                    />
                </div>

                <div>
                    <label className="mb-1.5 sm:mb-2 block text-xs font-semibold uppercase text-gray-500">
                        Disponibilité
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full rounded-md border px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base"
                    >
                        <option value="all">Tous</option>
                        <option value="available">Disponible</option>
                        <option value="borrowed">Emprunté</option>
                    </select>
                </div>
            </div>
        </div>
    );
}