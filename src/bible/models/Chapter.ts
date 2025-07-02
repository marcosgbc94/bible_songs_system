import { Verse } from "./Verse";

export interface Chapter {
    book: string;
    chapter: number;
    verses: Verse[];
}