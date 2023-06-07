import {
    CircleStackIcon,
    HomeIcon,
    MapPinIcon,
    UserCircleIcon,
    UserGroupIcon
} from "@heroicons/react/20/solid";
import cs from "classnames";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleColor } from "../../../services/sidebar";
import MenuItem from "../../menus/admin-item";


export default function Sidebar() {
    const isSideBarOpen = useSelector(state => state.sideBar.isSideBarOpen)
    const randomColor = useSelector(state => state.sideBar.randomColor)
    const dispatch = useDispatch()
    useEffect(() => { dispatch(toggleColor()) }, [isSideBarOpen, dispatch])

    const itemMenus = [
        {
            icon: <HomeIcon width={20} />, text: 'Dashboard', link: '/admin'
        },
        {
            icon: <CircleStackIcon width={20} />, text: 'Master', link: '#',
            subMenus: [
                { text: 'Aplikasi', link: "/admin/master/aplikasi" },
                { text: 'Instansi', link: "/admin/master/instansi" },
                { text: 'Pem Produksi', link: "/admin/master/pem-produksi" },
                { text: 'Pem Distribusi', link: "/admin/master/pem-distribusi" },
            ]
        },
        { icon: <MapPinIcon width={20} />, text: 'ATM Terdekat', link: '/admin/atm' },
        { icon: <UserCircleIcon width={20} />, text: 'Profil', link: '/admin/instansi' },
        { icon: <UserGroupIcon width={20} />, text: 'Tamu', link: '/admin/tamu' },
    ]

    return (
        <aside className={cs("flex flex-col transition-all duration-500 bg-gray-800 text-gray-200",
            { "w-[256px]": isSideBarOpen, "w-12": !isSideBarOpen }
        )}>
            <div className={cs("w-full px-2 pt-4 pb-6 text-center bg-gradient-to-b via-bpom-m",
                { "from-bpom-g": randomColor, "from-bpom-b": !randomColor }
            )}>
                <Image src="/images/logo.png"
                    alt="logo bpom sidebar"
                    width={50}
                    height={50}
                />
            </div>
            <div className="flex flex-col h-full">
                {itemMenus.map(({ icon, text, link, subMenus }, i) =>
                    <MenuItem link={link} icon={icon} text={text} isOpen={isSideBarOpen} key={i} subMenus={subMenus} />
                )}
            </div>
        </aside>
    )
}