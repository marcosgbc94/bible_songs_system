import { Header } from "./layouts/header";
import { BibleService } from './bible';

const bible = new BibleService();

const allVerses = await bible.getBible();
const genesis = await bible.getBook("Génesis");
const cap3 = await bible.getChapter("Juan", 3);
const j316 = await bible.getVerse("Juan", 3, 16);
console.log(j316)

export default function App() {
  return (
    <div className="absolute w-full h-full bg-slate-200">
      <Header />
    </div>
  );
}

