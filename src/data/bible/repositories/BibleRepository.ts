// data/bible/repositories/BibleRepository.ts
import { BibleJsonDataSource } from '../datasources/BibleDataSource';
import { Bible } from '../models/Bible';
import { Book } from '../models/Book';
import { Chapter } from '../models/Chapter';
import { Verse } from '../models/Verse';

export class BibleRepository {
  private bible: Bible | null = null;
  private dataSource = new BibleJsonDataSource();

  private async loadBible(): Promise<Bible> {
    if (!this.bible) {
      this.bible = await this.dataSource.loadBible();
    }
    return this.bible;
  }

  async getBible(): Promise<Bible> {
    return await this.loadBible();
  }

  async getBooks(): Promise<Book[]> {
    const bible = await this.loadBible();
    return bible.books;
  }

  async getBook(name: string): Promise<Book | undefined> {
    const books = await this.getBooks();
    return books.find(b => b.book.toLowerCase() === name.toLowerCase());
  }

  async getChapters(bookName: string): Promise<Chapter[] | undefined> {
    const book = await this.getBook(bookName);
    return book?.chapters;
  }

  async getChapter(bookName: string, chapter: number): Promise<Chapter | undefined> {
    const chapters = await this.getChapters(bookName);
    return chapters?.find(c => c.chapter === chapter);
  }

  async getVerses(book: string, chapter: number): Promise<Verse[] | undefined> {
    const chapterData = await this.getChapter(book, chapter);
    return chapterData?.verses;
  }

  async getVerse(book: string, chapter: number, verse: number): Promise<Verse | null> {
    const verses = await this.getVerses(book, chapter);
    return verses?.find(v => v.verse === verse) ?? null;
  }
}
