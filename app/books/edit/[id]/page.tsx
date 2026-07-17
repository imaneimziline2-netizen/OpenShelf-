export default function EditBookPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-10 pt-25">
      <h1 className="mb-6 text-3xl font-bold">
        Modifier un livre
      </h1>

      <form className="space-y-5 rounded-lg bg-white p-6 shadow">
        <div>
          <label className="mb-2 block font-medium">Titre</label>
          <input
            type="text"
            defaultValue="Le Petit Prince"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Auteur</label>
          <input
            type="text"
            defaultValue="Antoine de Saint-Exupéry"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">ISBN</label>
          <input
            type="text"
            defaultValue="9780156013987"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Catégorie</label>
          <input
            type="text"
            defaultValue="Roman"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Année</label>
          <input
            type="number"
            defaultValue={1943}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea
            rows={5}
            defaultValue="Un grand classique de la littérature."
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