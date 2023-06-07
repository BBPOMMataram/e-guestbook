import cs from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function ItemMenu({ icon, text, isOpen, link }) {
    const randomColor = useSelector(state => state.sideBar.randomColor)

    const router = useRouter()
    return (
        <Link
            href={link}
        >
            <div
                className={
                    cs(`group flex items-center p-3 transition-all duration-500 max-w-[30rem]
                    hover:text-bpom-m hover:z-10`,
                        // when sidebar open / close 
                        {
                            "justify-start whitespace-nowrap hover:w-fit": !isOpen,
                            "px-4": isOpen
                        },
                        // for bg color
                        {
                            "hover:bg-bpom-g": randomColor,
                            "hover:bg-bpom-b": !randomColor,
                        },
                        {
                            "bg-bpom-g": link === router.pathname && randomColor,
                            "bg-bpom-b": link === router.pathname && !randomColor,
                        }
                    )
                }
            >
                <span>{icon}</span> <span className={cs('ml-3 pr-4 group-hover:visible', { 'invisible': !isOpen })}>{text}</span>
            </div>
        </Link>
    )
}