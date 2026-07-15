import { Schema, model, models } from "mongoose";


const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    available :{
        type: Boolean,
        default: true
    },
    
} ,{timestamps: true});

const Book = models.Book || model("Book", bookSchema);

export default Book ;