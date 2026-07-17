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
      className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none"
    />
  );
}