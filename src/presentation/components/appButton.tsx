import { IconType } from "react-icons"
import { RiLiveFill, RiLiveLine } from "react-icons/ri"

interface appButtonTypes {
    name: string,
    icon: IconType,
    active: boolean,
    setActived: (value: boolean) => void,
    projecting: boolean,
    setProjecting: (value: boolean) => void
}

export const AppButton = ({
    icon: Icon,
    name,
    active,
    setActived,
    projecting,
    setProjecting
}: appButtonTypes) => {
    
    return (
        <div className={`h-[40px] rounded-xl flex justify-center items-center ${active ? 'bg-blue-200 hover:bg-blue-300' : 'bg-slate-200 hover:bg-slate-300'}`}>
            <button 
                type="button" 
                onClick={() => setActived(!active)}
                className="p-2 px-3 h-full gap-2 flex justify-center items-center rounded-l-xl rounded-r-none cursor-pointer"
            >
                {<Icon />}
                {name}
            </button>
            <button 
                type="button"
                onClick={() => setProjecting(!projecting)}
                className={`p-2 px-3 h-full rounded-r-xl rounded-l-none cursor-pointer ${projecting ? 'bg-blue-300 hover:bg-blue-400' : 'bg-slate-200 hover:bg-slate-300'}`}
            >
                {
                    projecting ? <RiLiveFill className="text-blue-600"/> : <RiLiveLine/>
                }
            </button>
        </div>
    )
}