import {
    BookOpenIcon, HomeIcon,
    MapPinIcon
} from "@heroicons/react/20/solid";
import cs from "classnames";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleColor } from "../../services/sidebar";
import MenuItem from "../menus/item";


export default function Sidebar() {
    const isSideBarOpen = useSelector(state => state.sideBar.isSideBarOpen)
    const randomColor = useSelector(state => state.sideBar.randomColor)
    const dispatch = useDispatch()
    useEffect(() => { dispatch(toggleColor()) }, [isSideBarOpen, dispatch])

    const itemMenus = [
        { icon: <HomeIcon width={20} />, text: 'Dashboard', link: '/' },
        { icon: <MapPinIcon width={20} />, text: 'ATM Terdekat', link: '/atm' },
        { icon: <BookOpenIcon width={20} />, text: 'Buku Tamu', link: '/guestbook' },
    ]

    return (
        <aside className={cs("flex flex-col transition-all duration-500 bg-gray-800 text-gray-200", { "w-64": isSideBarOpen, "w-12": !isSideBarOpen })}>
            <div className={cs("w-full px-2 pt-4 pb-6 text-center bg-gradient-to-b via-bpom-m", { "from-bpom-g": randomColor, "from-bpom-b": !randomColor })}>
                <Image src="/images/logo.png"
                    alt="logo bpom sidebar"
                    width={50}
                    height={50}
                />
            </div>
            <div className="flex justify-center flex-col h-full pb-20"> {/* pb buat naikin dikit */}
                {itemMenus.map(({ icon, text, link }, i) =>
                    <MenuItem link={link} icon={icon} text={text} isOpen={isSideBarOpen} key={i} />
                )}
            </div>
        </aside>
    )
}