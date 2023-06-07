import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../../../services/sidebar';

export default function Navbar() {
    const { data: session } = useSession()
    const humburgerLine = 'h-1 w-6 my-1 rounded-full bg-white transition duration-1000';

    const isSideBarOpen = useSelector(state => state.sideBar.isSideBarOpen)
    const dispatch = useDispatch()

    return (
        <nav className="flex items-center text-gray-200 bg-black p-1">
            <div className="flex flex-col w-7 ml-3 group" onClick={() => dispatch(toggleSideBar())}>
                <div className={`${humburgerLine} ${isSideBarOpen ? "rotate-45 translate-y-3 opacity-70 group-hover:opacity-90" : "opacity-70 group-hover:opacity-90"}`}></div>
                <div className={`${humburgerLine} ${isSideBarOpen ? "opacity-0" : "opacity-70 group-hover:opacity-90"}`}></div>
                <div className={`${humburgerLine} ${isSideBarOpen ? "-rotate-45 -translate-y-3 opacity-70 group-hover:opacity-90" : "opacity-70 group-hover:opacity-90"}`}></div>
            </div>
            <div className="ml-auto mr-8">
                <span className='flex items-center [&>div]:ml-2 hover:[&>div]:text-bpom-g [&>div]:transition-colors [&>div]:duration-200'>
                    <div>{`Selamat datang ${session?.user.name}`} </div>
                    <div className="cursor-pointer" title='logout' onClick={() => signOut({ callbackUrl: '/auth/login' })}>
                        <ArrowRightOnRectangleIcon width={20} />
                    </div>
                </span>
            </div>
        </nav >
    )
}