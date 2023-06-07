import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import cs from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ItemMenu({ icon, text, isOpen, link, subMenus }) {
    const randomColor = useSelector(state => state.sideBar.randomColor)

    const [isSubMenuOpenned, setIsSubMenuOpenned] = useState(false)
    const router = useRouter()

    useEffect(() => {
        router.pathname.split('/')[2] === 'master' && setIsSubMenuOpenned(true)
    }, [router])

    const itemSubMenus = subMenus?.map((item, i) => {
        return (
            <Link key={i} href={item.link}>
                <li className={
                    cs(`group pl-5 transition-all duration-200 max-w-[30rem] cursor-pointer relative
                    hover:text-bpom-m py-2 whitespace-nowrap`,
                        {
                            "justify-start pl-5 whitespace-nowrap hover:w-fit": !isOpen,
                            "px-4 pl-6": isOpen
                        },
                        {
                            "hover:bg-bpom-g": !randomColor,
                            "hover:bg-bpom-b": randomColor,
                        },
                        {
                            "bg-bpom-g": item.link === router.pathname && randomColor,
                            "bg-bpom-b": item.link === router.pathname && !randomColor,
                        }
                    )
                }
                >
                    <span className={cs('pr-4 group-hover:visible', { 'invisible': !isOpen })}>{item.text}</span>
                </li>
            </Link>
        )
    })

    return (
        <Link
            href={link}
        >
            <a>
                <div
                    className={
                        cs(`group flex items-center pl-3 max-w-[30rem] cursor-pointer relative
                    hover:text-bpom-m transition-all duration-300`,
                            {
                                "justify-start whitespace-nowrap hover:w-fit": !isOpen,
                                "px-4": isOpen
                            },
                            {
                                "hover:bg-bpom-g": !randomColor,
                                "hover:bg-bpom-b": randomColor,
                            },
                            {
                                "bg-bpom-g": link === router.pathname && randomColor,
                                "bg-bpom-b": link === router.pathname && !randomColor,
                            }
                        )
                    }
                    onClick={() => setIsSubMenuOpenned(!isSubMenuOpenned)}
                >
                    <span>{icon}</span>
                    <span className={cs('ml-3 pr-4 flex-1 group-hover:visible py-3', { 'invisible': !isOpen })}>{text}</span>
                    {subMenus && <span className={cs(' group-hover:visible pr-2',
                        { 'invisible': !isOpen },
                    )}>
                        {isSubMenuOpenned ? <ChevronDownIcon width={15} /> : <ChevronLeftIcon width={15} />}
                    </span>}
                </div>
                <ul className={cs("list-disc list-inside transition-all duration-100",
                    {
                        "h-0 opacity-0": !isSubMenuOpenned,
                        "h-full opacity-100": isSubMenuOpenned,
                    })}>
                    {itemSubMenus}
                </ul>
            </a>
        </Link>
    )
}