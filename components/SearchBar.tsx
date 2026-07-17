"use client";

interface SearchBarProps {
    search: string;
    onSearch: (value: string) => void;
}

export default function SearchBar({
    search,
    onSearch,
}: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Rechercher par titre ou auteur..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
    );
}