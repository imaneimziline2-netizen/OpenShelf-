import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { bookSchema } from "@/lib/validators";

export async function GET() {
    try {
        await connectDB();

        const books = await Book.find();

        return NextResponse.json(books);
    } catch (error) {
        return NextResponse.json({ message: "Error serveur" }, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const result = bookSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    errors: result.error.flatten(),
                },
                {
                    status: 400,
                },
            );
        }

        const newBook = await Book.create(result.data);

        return NextResponse.json(newBook, {
            status: 201,
        });
    } catch (error) {
        console.error("POST ERROR:", error);

        return NextResponse.json(
            {
                message: "Erreur serveur",
                error,
            },
            {
                status: 500,
            },
        );
    }
}
