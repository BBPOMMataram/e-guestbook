import { DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../services/instansi";

export default function Footer({ bg = "bg-gray-900" }) {
    const currentYear = new Date().getFullYear();

    const instansi = useSelector(state => state.instansiReducer.item)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchItem('instansi'))
    }, [dispatch])

    return (
        <>
            <div className="flex bg-gray-900 p-4 [&>div]:p-4 text-gray-300">
                <div className="logo text-center md:mx-6">
                    <Image src={"/images/logo-withoutlabel.png"} width={80} height={110} alt="logo badan pom" />
                    <div>{instansi.name}</div>
                </div>
                <div className="footer">
                    <div className="[&>div]:py-1">
                        <h2 className="text-xl">Kontak Kami</h2>
                        <div className="h-[10px] w-[55px] border-b-2 border-bpom-m mb-2"></div>
                        <p>{`${instansi.address}`}</p>
                        <div className="w-fit"><DevicePhoneMobileIcon width={20} className="inline" /> {instansi.phone}</div>
                        <div className="w-fit"><EnvelopeIcon width={20} className="inline" /> {instansi.email}</div>
                        <div className="flex"><Image src={"/images/whatsapp.svg"} width={18} height={18} alt="whatsapp icon" /> <div className="ml-3"> {instansi.whatsapp}</div></div>
                    </div>
                </div>
            </div>
            <div className={`flex justify-center p-4 text-gray-400 border-t-2 border-gray-800 ${bg}`}>
                <p><a href="#">BBPOM di Mataram</a> &copy; {currentYear === 2022 ? "2022" : `2022 -  ${currentYear}`}</p>
            </div>
        </>
    )
}