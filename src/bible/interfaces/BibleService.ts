import { Verse } from "../models/Verse";

export interface BibleService {
  getBible(): Promise<Verse[]>;
  getBook(book: string): Promise<Verse[]>;
  getChapter(book: string, chapter: number): Promise<Verse[]>;
  getVerse(book: string, chapter: number, verse: number): Promise<Verse | null>;
}