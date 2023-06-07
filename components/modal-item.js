import { useDispatch } from "react-redux"
import { toggleModalProfile } from "../services/modal"

export default function Item({ textHeader, link, textContent }) {
    const dispatch = useDispatch()

    const onClickHandler = () => {
        link !== '#' ? null : dispatch(toggleModalProfile({ textHeader, textContent }))
    }

    return (
        <a href={link} onClick={() => onClickHandler()} className="bg-slate-600 m-4">
            <div className="flex items-center justify-center rounded-md
                h-20 shadow-md w-80 p-1
                bg-gradient-to-tr from-slate-200 to-slate-200 via-white
                ">
                <h2>{textHeader}</h2>
            </div>
        </a>
    )
}