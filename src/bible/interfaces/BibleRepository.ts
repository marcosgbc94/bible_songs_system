import { Verse } from '../models/Verse';

export interface BibleRepository {
  getVerse(book: string, chapter: number, verse: number): Promise<Verse | null>;
  getChapter(book: string, chapter: number): Promise<Verse[]>;
}