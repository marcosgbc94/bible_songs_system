import { Chapter } from "./Chapter";

export interface Book {
  id: number;
  name: string;
  abbreviation: string;
  testament: "old" | "new";
  chapters: Chapter[];
}