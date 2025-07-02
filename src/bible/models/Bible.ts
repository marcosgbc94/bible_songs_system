import { Book } from "./Book";

export interface Bible {
  language: string;
  translation: string;
  books: Book[];
}