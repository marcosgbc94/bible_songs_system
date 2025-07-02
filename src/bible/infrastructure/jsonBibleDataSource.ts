import { getJsonDataController } from '../../libs/jsonLib';
import { Verse } from '../models/Verse';
import { RawBible } from '../models/RawBible';
import { Bible } from '../models/Bible';
import { Book } from '../models/Book';
import { Chapter } from '../models/Chapter';

export class JsonBibleDataSource {
  // Carga la primera versión de la Biblia (puedes extender para otras versiones)
  private async loadBible(): Promise<Bible> {
    const result = await getJsonDataController("bible");

    if (
      !result || typeof result !== 'object' || Array.isArray(result) ||
      !('content' in result)
    ) throw new Error('Formato inválido de JSON Biblia');

    const rawBible = result as RawBible;

    // Retorna la primera versión (puedes agregar parámetro para elegir versión)
    return rawBible.content[0];
  }

  // Retorna toda la Biblia (primera versión)
  public async findBible(): Promise<Bible> {
    return await this.loadBible();
  }

  // Retorna un libro específico (objeto Book)
  public async findBook(bookName: string): Promise<Book | undefined> {
    const bible = await this.loadBible();
    return bible.books.find(b => b.name.toLowerCase() === bookName.toLowerCase());
  }

  // Retorna un capítulo específico (objeto Chapter) de un libro
  public async findChapter(bookName: string, chapterNumber: number): Promise<Chapter | undefined> {
    const book = await this.findBook(bookName);
    if (!book) return undefined;

    return book.chapters.find((_, index) => index === chapterNumber - 1);
  }

  // Retorna un versículo específico de un capítulo y libro
  public async findVerse(bookName: string, chapterNumber: number, verseNumber: number): Promise<Verse | null> {
    const chapter = await this.findChapter(bookName, chapterNumber);
    if (!chapter) return null;

    const verse = chapter.verses.find((_, index) => index === verseNumber - 1);
    return verse ?? null;
  }
}
