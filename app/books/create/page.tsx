import { BookForm } from "@/components/BookForm";

export default function CreateBookPage() {
    return (
        <main className="mx-auto max-w-5xl px-6 py-12 pt-25">
            <div className="mb-12 text-center">
                <h1 className="font-serif text-5xl font-bold text-slate-900">
                    Ajouter un nouveau livre
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                    Enrichissez notre collection partagée en soumettant un
                    nouvel ouvrage à la bibliothèque Lumina.
                </p>
            </div>

            <BookForm />
        </main>
    );
}