import cs from "classnames";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toggleIsShowFullImage } from "../../../services/guest";

export default function ImageViewer({ show, imageUrl }) {
    const dispatch = useDispatch()
    return (
        <div className={cs("fixed h-screen w-screen buttom-0 top-0 left-0 right-0 z-10 bg-gray-300 bg-opacity-70 flex flex-col",
            { "visible": show, "invisible": !show }
        )}>
            <button className="text-2xl m-4 text-red-500" onClick={() => dispatch(toggleIsShowFullImage())}>X</button>
            <div className="flex justify-center mx-8">
                <Image src={imageUrl || "/images/logo.png"} alt="foto fullscreen" width={640} height={480} />
            </div>
        </div>
    )
}