import { BibleRepository } from "../interfaces/BibleRepository";
import { Verse } from "../models/Verse";
import { JsonBibleDataSource } from "../infrastructure/jsonBibleDataSource";
import { Chapter } from "../models/Chapter";
import { Book } from "../models/Book";
import { Bible } from "../models/Bible";

export class BibleService implements BibleService {
  private dataSource = new JsonBibleDataSource();

  public async getBible(): Promise<Bible> {
    return await this.dataSource.findBible();
  }

  public async getBook(book: string): Promise<Book | undefined> {
    return await this.dataSource.findBook(book);
  }

  public async getChapter(book: string, chapter: number): Promise<Chapter | undefined> {
    return await this.dataSource.findChapter(book, chapter);
  }

  public async getVerse(book: string, chapter: number, verse: number): Promise<Verse | null> {
    return await this.dataSource.findVerse(book, chapter, verse);
  }
}
