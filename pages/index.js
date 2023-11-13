import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Camera from "../components/camera";
import axios from "../config/axios";
import { useDateTime } from "../hooks/useDateTime";
import { emptyGuestStates, fetchGuests, getAllGuestSijelapp, setAddress, setEmail, setFromInstansi, setHp, setJabatan, setName, setPangkat, setService } from "../services/guest";

export default function GuestBook() {
    const name = useSelector(state => state.guestReducer.name)
    const fromInstansi = useSelector(state => state.guestReducer.fromInstansi)
    const hp = useSelector(state => state.guestReducer.hp)
    const service = useSelector(state => state.guestReducer.service)
    const selfie = useSelector(state => state.guestReducer.image)
    const address = useSelector(state => state.guestReducer.address)
    const email = useSelector(state => state.guestReducer.email)
    const pangkat = useSelector(state => state.guestReducer.pangkat)
    const jabatan = useSelector(state => state.guestReducer.jabatan)
    const guestSijelapp = useSelector(state => state.guestReducer.itemsSijelapp)
    const items = useSelector(state => state.guestReducer.items)

    const dispatch = useDispatch()
    const { date, time, wish } = useDateTime()

    useEffect(() => {
        dispatch(getAllGuestSijelapp()) // filling dataset in field name for guest of sijelapp (pembawa sampel)

        dispatch(fetchGuests('guest-book')) // filling dataset in field name for guest
    }, [dispatch])


    const submitHandler = (e) => {
        e.preventDefault()

        if (!name || !hp || !service) {
            return toast.error('Tolong lengkapi form dulu !')
        }

        var phoneRules = /^(0|62|\+62)[0-9]{9,11}$/; //digits 10 - 12
        if (!phoneRules.test(hp)) {
            return toast.error('No HP tidak valid!');
        }

        if (!selfie) {
            return toast.error('Foto dulu dong !')
        }

        const guest = new FormData()

        guest.append('name', name)
        guest.append('company', fromInstansi)
        guest.append('hp', hp)
        // guest.append('service', services.filter(i => i.id == service)[0].name)
        guest.append('service', service)
        guest.append('address', address)
        guest.append('email', email)
        guest.append('pangkat', pangkat)
        guest.append('jabatan', jabatan)

        const base64Selfie = selfie.split(',')[1];
        const bufSelfie = Buffer.from(base64Selfie, 'base64')
        const blobSelfie = new Blob([bufSelfie], { type: 'image/png' })

        guest.append('selfie', blobSelfie)

        axios.post(`guestbook`,
            guest
        ).then(({ data }) => {
            toast.success(`Selamat datang ${data.data.name}, terima kasih telah berkunjung !`)
            dispatch(emptyGuestStates())
        })
    }

    const services = [
        { id: 1, name: 'Pengujian Barang Bukti Narkoba' },
        { id: 2, name: 'Pengujian Obat & Makanan' },
        { id: 3, name: 'Informasi & Pengaduan' },
        { id: 4, name: 'Sertifikasi' },
        { id: 5, name: 'Wajib Lapor' },
        { id: 6, name: 'Kunjungan' },
        { id: 7, name: 'Keperluan Pribadi' },
        { id: 8, name: 'Keperluan Lain' },
    ]

    const dataListGuest = items
        .filter((item, index) => items.findIndex(obj => obj.name === item.name) === index)
        .map((item, index) => {
            return (
                <Fragment key={index}>
                    <option value={item.name} />
                </Fragment>
            )
        })

    const dataListGuestSiJelapp = guestSijelapp.map((item, index) => {
        return (
            <Fragment key={index}>
                <option value={item.nama_petugas} />
            </Fragment>
        )
    })

    const DataListFromInstansi = guestSijelapp
        //filter same values
        .filter((item, index) => guestSijelapp.findIndex(obj => obj.nama_pemilik === item.nama_pemilik) === index)
        .map((item, index) => {
            return (
                <Fragment key={index}>
                    <option value={item.nama_pemilik} />
                </Fragment>
            )
        })

    const autoFill = (value) => {
        if (value) {
            axios(`guest-book/search/${value}`)
                .then(({ data }) => {
                    // dispatch(setGuestStates(data))
                    data.service && dispatch(setService(data.service));
                    data.hp && dispatch(setHp(data.hp));
                    data.company && dispatch(setFromInstansi(data.company));
                    data.address && dispatch(setAddress(data.address));
                    data.email && dispatch(setEmail(data.email));
                    data.pangkat && dispatch(setPangkat(data.pangkat));
                    data.jabatan && dispatch(setJabatan(data.jabatan));
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Head>
                <title>E Tamu - BBPOM di Mataram</title>
                <meta name="description" content="E Buku tamu BBPOM di Mataram" />
            </Head>

            <main className="font-serif">
                <div className="flex justify-evenly items-center bg-sky-100 p-5 shadow-md text-teal-900">
                    <div className="logo">
                        <Image src={'/images/logo.webp'} alt="Logo BPOM" width={120} height={120} priority={true} />
                    </div>
                    <div className="title">
                        <h1 className="text-center p-2 mt-2 text-xl font-bold">BUKU TAMU</h1>
                        <p className="text-center text-xl">Balai Besar POM di Mataram</p>
                        <p className="text-center text-sm">Jln. Caturwarga - Mataram</p>
                    </div>
                    <div className="datetime">
                        <div className="text-center">{`${date}`}</div>
                        <div className="text-center">{time}</div>
                        <div className="text-center text-lg mt-4 font-bold">{wish}</div>
                    </div>
                </div>
                <div className="content ml-2">
                    <form action="#">
                        <div className="flex flex-col justify-evenly md:flex-row [&>div]:p-2">
                            <div className="flex-1 [&>div]:my-3">
                                <div className="group-input flex flex-col">
                                    <label htmlFor="name">Nama <span className="text-red-600">*</span></label>
                                    <input type="text" className="capitalize appearance-none p-2 bg-transparent border-b border-teal-700 focus:outline-none"
                                        name="name" id="name" placeholder="name" value={name} onChange={(e) => { dispatch(setName(e.target.value)); autoFill(e.target.value) }}
                                        list="guest" />
                                    <datalist id="guest">
                                        {dataListGuest}
                                        {dataListGuestSiJelapp}
                                    </datalist>
                                </div>
                                <div className="group-input flex flex-col">
                                    <label className="capitalize" htmlFor="layanan">layanan <span className="text-red-600">*</span></label>
                                    <select className="appearance-none bg-transparent border-b border-teal-700 focus:outline-none focus:bg-sky-100 p-2"
                                        name="layanan" id="layanan" value={service} onChange={(e) => dispatch(setService(e.target.value))}>
                                        <option key='0' value='0'>==Pilih layanan==</option>
                                        {services.map(service =>
                                            <option key={service.id} value={service.id}>{service.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="group-input flex flex-col">
                                    <label className="capitalize" htmlFor="hp">hp <span className="text-red-600">*</span></label>
                                    <input type="text" className="capitalize appearance-none p-2 bg-transparent border-b border-teal-700 focus:outline-none"
                                        name="hp" id="hp" placeholder="Handphone" value={hp} onChange={(e) => dispatch(setHp(e.target.value))} />
                                </div>
                                <div className="group-input flex flex-col">
                                    <label className="capitalize" htmlFor="fromInstansi">perusahaan / instansi</label>
                                    <input type="text" className="capitalize appearance-none p-2 bg-transparent border-b border-teal-700 focus:outline-none"
                                        name="fromInstansi" id="fromInstansi" placeholder="Instansi" value={fromInstansi} onChange={(e) => dispatch(setFromInstansi(e.target.value))}
                                        list="from-instansi" />
                                    <datalist id="from-instansi">
                                        {DataListFromInstansi}
                                    </datalist>
                                </div>
                                <div>
                                    Note: <span className="text-red-600">*</span> (wajib diisi)
                                </div>
                            </div>
                            <div className="flex-1 [&>div]:my-3">
                                <div className="group-input flex flex-col">
                                    <label className="capitalize" htmlFor="address">Alamat</label>
                                    <input type="text" className="capitalize appearance-none p-2 bg-transparent border-b border-teal-700 focus:outline-none"
                                        name="address" id="address" placeholder="address" value={address} onChange={(e) => dispatch(setAddress(e.target.value))} />
                                </div>
                                <div className="group-input flex flex-col">
                                    <label className="capitalize" htmlFor="email">email</label>
                                    <input type="text" className="capitalize appearance-none p-2 bg-transparent border-b border-teal-700 focus:outline-none"
                                        name="email" id="email" placeholder="email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
                                </div>
                                <div className="group-input flex flex-col">
                                    <label className="capitalize" htmlFor="pangkat">pangkat</label>
                                    <input type="text" className="capitalize appearance-none p-2 bg-transparent border-b border-teal-700 focus:outline-none"
                                        name="pangkat" id="pangkat" placeholder="pangkat" value={pangkat} onChange={(e) => dispatch(setPangkat(e.target.value))} />
                                </div>
                                <div className="group-input flex flex-col">
                                    <label className="capitalize" htmlFor="jabatan">jabatan</label>
                                    <input type="text" className="capitalize appearance-none p-2 bg-transparent border-b border-teal-700 focus:outline-none"
                                        name="jabatan" id="jabatan" placeholder="jabatan" value={jabatan} onChange={(e) => dispatch(setJabatan(e.target.value))} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="group-input flex flex-col my-3 lg:w-4/5 mx-auto">
                                    <label className="capitalize" htmlFor="photo">Foto <span className="text-red-600">*</span></label>
                                    <Camera />
                                </div>
                            </div>
                        </div>
                        <button className="bg-bpom-b text-white py-2 pl-6 pr-4 ml-2 rounded" onClick={e => submitHandler(e)}>Simpan <PaperAirplaneIcon width={25} className="inline ml-2" /></button>
                    </form>
                </div>
            </main>
        </>
    )
}
