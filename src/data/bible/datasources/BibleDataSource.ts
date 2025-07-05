import { getJsonDataController } from '../../../libs/jsonLib';
import { Bible } from '../models/Bible';
import { RawBible } from '../models/RawBible';

export class BibleJsonDataSource {
  private bibleCache: Bible | null = null;

  public async loadBible(): Promise<Bible> {
    if (this.bibleCache) return this.bibleCache;

    const bibleContent = await getJsonDataController('bible');

    const rawBible = bibleContent as RawBible;

    const bible = rawBible.content[0]; // se espera un solo contenido
    this.bibleCache = bible;
    
    return bible;
  }
}
