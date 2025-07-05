import { VscChevronLeft, VscChevronRight, VscDebugPause } from "react-icons/vsc"
import { AppButton } from "../components/appButton"
import { ScreenControlButton } from "../components/screenControlButton"
import { FcMusic, FcReading } from "react-icons/fc"

interface HeaderProps {
    hymnalProjecting: boolean;
    bibleProjecting: boolean;
    hymnalActived: boolean;
    bibleActived: boolean;
    setBibleProjection: (value: boolean) => void;
    setHymnalProjection: (value: boolean) => void;
    setBibleActive: (value: boolean) => void;
    setHymnalActive: (value: boolean) => void;
}

export const Header = ({
    hymnalProjecting, 
    bibleProjecting, 
    hymnalActived, 
    bibleActived,
    setBibleProjection,
    setHymnalProjection,
    setBibleActive,
    setHymnalActive
}: HeaderProps) => {
    return (
        <header className="absolute w-full h-[60px] bg-white flex justify-between items-center p-2">
            <div className="flex justify-start items-center gap-2">
                <AppButton 
                    name="HIMNARIO" 
                    icon={FcMusic} 
                    active={hymnalActived} 
                    projecting={hymnalProjecting} 
                    setProjecting={setHymnalProjection}
                    setActived={setHymnalActive}
                />
                <AppButton 
                    name="SANTA BIBLIA" 
                    icon={FcReading} 
                    active={bibleActived} 
                    projecting={bibleProjecting} 
                    setProjecting={setBibleProjection}
                    setActived={setBibleActive}
                />
            </div>
            <div className="flex justify-end items-center gap-2">
                <ScreenControlButton icon={VscChevronLeft} />
                <ScreenControlButton icon={VscDebugPause} />
                <ScreenControlButton icon={VscChevronRight} />
            </div>
        </header>
    )
}