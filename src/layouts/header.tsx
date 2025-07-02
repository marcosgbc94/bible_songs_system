import { VscChevronLeft, VscChevronRight, VscDebugPause } from "react-icons/vsc"
import { AppButton } from "../components/appButton"
import { ScreenControlButton } from "../components/screenControlButton"
import { FcMusic, FcReading } from "react-icons/fc"

export const Header = () => {
    return (
        <header className="absolute w-full h-[60px] bg-white flex justify-between items-center p-2">
            <div className="flex justify-start items-center gap-2">
                <AppButton name="HIMNARIO" icon={FcMusic} active={true} projecting={true} />
                <AppButton name="SANTA BIBLIA" icon={FcReading} active={false} projecting={false} />
            </div>
            <div className="flex justify-end items-center gap-2">
                <ScreenControlButton icon={VscChevronLeft} />
                <ScreenControlButton icon={VscDebugPause} />
                <ScreenControlButton icon={VscChevronRight} />
            </div>
        </header>
    )
}