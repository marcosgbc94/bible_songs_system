import { Bible } from './Bible';

export interface RawBible {
  version: string;
  last_updated: string;
  last_updater: string;
  content: Bible[];
}
