import { IconType } from "react-icons"

interface screenControlButtonTypes {
    icon: IconType
}

export const ScreenControlButton = ({
    icon: Icon
}: screenControlButtonTypes) => {
    return (
        <button 
            type="button"
            className="size-[40px] rounded-xl bg-slate-200 hover:bg-slate-300 cursor-pointer flex justify-center items-center"
        >
            {<Icon />}
        </button>
    )
}