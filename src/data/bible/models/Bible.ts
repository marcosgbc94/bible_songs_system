import { Book } from './Book';

export interface Bible {
  name: string;
  abbreviation: string;
  version: string;
  books: Book[];
}