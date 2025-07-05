import { Header } from "./presentation/layouts/header";
import { useAppViewModel } from './presentation/viewmodels/AppViewModel';

export default function App() {
  const { 
    projecting, 
    setBibleProjection, 
    setHymnalProjection,
    active,
    setHymnalActive,
    setBibleActive
  } = useAppViewModel();

  return (
    <div className="absolute w-full h-full bg-slate-200">
      <Header 
        hymnalProjecting={projecting.hymnal} 
        bibleProjecting={projecting.bible} 
        hymnalActived={active.hymnal} 
        bibleActived={active.bible} 
        setBibleProjection={setBibleProjection}
        setHymnalProjection={setHymnalProjection}
        setHymnalActive={setHymnalActive}
        setBibleActive={setBibleActive}
      />
    </div>
  );
}

