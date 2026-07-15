import { Book } from "@/types/Book";

const API_URL = "/api/books";

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des livres");
  }

  return response.json();
}