import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItem } from '../../services/instansi';
import { toggleModalAbout } from '../../services/modal-about';
import { toggleSideBar } from '../../services/sidebar';
import ModalAbout from '../modal-about';

export default function Navbar() {
    const humburgerLine = 'h-1 w-6 my-1 rounded-full bg-white transition duration-1000';

    const isSideBarOpen = useSelector(state => state.sideBar.isSideBarOpen)
    const instansi = useSelector(state => state.instansiReducer.item)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchItem('instansi'))
    }, [dispatch])

    return (
        <>
            <nav className="flex items-center text-gray-100 bg-black p-1 font-serif uppercase">
                <div className="flex flex-col w-7 ml-3 group" onClick={() => dispatch(toggleSideBar())}>
                    <div className={`${humburgerLine} ${isSideBarOpen ? "rotate-45 translate-y-3 opacity-70 group-hover:opacity-90" : "opacity-70 group-hover:opacity-90"}`}></div>
                    <div className={`${humburgerLine} ${isSideBarOpen ? "opacity-0" : "opacity-70 group-hover:opacity-90"}`}></div>
                    <div className={`${humburgerLine} ${isSideBarOpen ? "-rotate-45 -translate-y-3 opacity-70 group-hover:opacity-90" : "opacity-70 group-hover:opacity-90"}`}></div>
                </div>
                <div className="ml-auto mr-8">
                    <span className='flex items-center'>
                        <div className='group relative cursor-pointer' tabIndex={0}><span className=''>Information</span><span className='align-middle inline-block'></span>
                            <nav className='mt-2 absolute hidden group-focus-within:block bg-gray-600 right-0 p-2 z-10'>
                                <ul className='[&>li]:list-none  [&>a]:transition-colors [&>a]:duration-200 [&>li]:whitespace-nowrap hover:[&>li]:!text-green-300 [&>li]:py-1'>
                                    <li><Link href="/#profilinstansi">Profil Instansi</Link></li>
                                    <li><Link href="/#pemeriksaanproduksiobat">Pemeriksaan Sarana Produksi Obat dan Makanan</Link></li>
                                    <li><Link href="/#pemeriksaandistribusiobat">Pemeriksaan Sarana Distribusi Obat dan Makanan</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className='cursor-pointer mx-4' onClick={() => dispatch(toggleModalAbout())}> <span className="">About</span> </div>
                        <Link href={'auth/login'} >
                            <ArrowLeftOnRectangleIcon width={20} />
                        </Link>
                    </span>
                </div>
            </nav >
            <ModalAbout about={instansi.about} />
        </>
    )
}