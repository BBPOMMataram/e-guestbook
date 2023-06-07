import { XMarkIcon } from "@heroicons/react/24/solid";
import cs from "classnames";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAbout } from "../services/modal-about";

export default function ModalAbout({ about }) {

    const isModalAboutOpened = useSelector(state => state.modalAbout.isModalAboutOpened);
    const textHeader = useSelector(state => state.modalAbout.textHeader)
    const textContent = about

    const dispatch = useDispatch();

    return (
        <div
            className={
                cs("w-screen h-screen fixed top-0 bottom-0 left-0 right-0 z-10 bg-slate-400 " +
                    "flex justify-center transition-all duration-1000",
                    { "bg-opacity-60 translate-y-0": isModalAboutOpened, "bg-opacity-0 translate-y-[-650px]": !isModalAboutOpened })}
        >
            <div
                className={cs("bg-slate-50 w-[calc(100vw-3rem)] sm:w-[calc(100vw-10rem)] " +
                    "h-[calc(100vh-5rem)] transition-all duration-300",
                    { "translate-y-0": isModalAboutOpened, "translate-y-[-650px]": !isModalAboutOpened })}
            >
                <div className="flex bg-slate-700 text-slate-50 font-bold p-4 sm:pl-10 md:pl-40">
                    <div className="flex-1">{textHeader}</div>
                    <XMarkIcon width={25} className="cursor-pointer" onClick={() => dispatch(toggleModalAbout())} />
                </div>
                <div className="flex h-full">
                    <div className="self-center hidden md:block px-2">
                        <Image src={"/images/welcoming.svg"} alt="image for modal profile" width={250} height={250} />
                    </div>
                    <div className="p-4 font-extralight">{textContent}</div>
                </div>
            </div>
        </div>
    )
};