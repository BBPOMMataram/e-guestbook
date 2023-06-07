import cs from "classnames";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import { fetchGuests, getAllGuestSijelapp, setAddress, setEmail, setFromInstansi, setHp, setJabatan, setName, setPangkat, setService, toggleGuestModalForm } from "../../../services/guest";

export default function FormModal({ title, editMode, fetchUrl }) {
    const modal = useRef(null)
    const nameRef = useRef()

    const dispatch = useDispatch()

    const isGuestModalFormOpenned = useSelector(state => state.guestReducer.isGuestModalFormOpenned)
    const accessToken = useSelector(state => state.user.accessToken)

    const guestSijelapp = useSelector(state => state.guestReducer.itemsSijelapp)
    const name = useSelector(state => state.guestReducer.name)
    const fromInstansi = useSelector(state => state.guestReducer.fromInstansi)
    const hp = useSelector(state => state.guestReducer.hp)
    const service = useSelector(state => state.guestReducer.service)
    const address = useSelector(state => state.guestReducer.address)
    const email = useSelector(state => state.guestReducer.email)
    const pangkat = useSelector(state => state.guestReducer.pangkat)
    const jabatan = useSelector(state => state.guestReducer.jabatan)
    const id = useSelector(state => state.guestReducer.id)

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

    const dataListGuest = guestSijelapp.map((item, index) => {
        return (
            <div key={index}>
                <option value={item.nama_petugas} />
            </div>
        )
    })

    const listFromInstansi = () => guestSijelapp
        //filter same values
        .filter((item, index) => guestSijelapp.findIndex(obj => obj.nama_pemilik === item.nama_pemilik) === index)
        .map((item, index) => {
            return (
                <div key={index}>
                    <option value={item.nama_pemilik} />
                </div>
            )
        })

    useEffect(() => {
        dispatch(getAllGuestSijelapp())

    }, [dispatch]);

    const closeModal = (evt) => {
        if (modal.current && !modal.current.contains(evt.target)) {
            dispatch(toggleGuestModalForm());
        }
    }

    const submitHandler = () => {
        if (!name || !hp || !service) return toast.error('Silahkan lengkapi form !')

        axios.patch(`guest-book/${id}`, {
            name, company: fromInstansi, hp, service, address, email, pangkat, jabatan
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                dispatch(fetchGuests(fetchUrl))
                toast.success(`Success update item`)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        dispatch(getAllGuestSijelapp())
        nameRef.current.focus()
    }, [dispatch])

    return (
        <div className={cs("top-0 left-0 right-0 bottom-0 bg-white bg-opacity-60 z-10 flex justify-center items-center",
            { "hidden": !isGuestModalFormOpenned, "fixed": isGuestModalFormOpenned })}
            onClick={(e) => closeModal(e)}
        >
            <div className="card bg-gray-400 p-4 rounded flex-1 mx-20 my-4 overflow-auto max-h-[35rem]" ref={modal}>
                <div className="header flex text-center border-b-2 border-black py-2">
                    <h1 className="flex-1 text-2xl capitalize font-bold">{title}</h1>
                    <button className="px-4 font-bold" onClick={() => dispatch(toggleGuestModalForm())}>X</button>
                </div>
                <div className="content p-2 [&>div]:mb-4 [&>div>label]:pl-2">
                    <div className="group-input flex flex-col">
                        <label htmlFor="name">Nama <span className="text-red-600">*</span></label>
                        <input type="text" className="p-2 rounded" name="name" id="name" ref={nameRef}
                            value={name} onChange={(e) => dispatch(setName(e.target.value))}
                            list="guest" />
                        <datalist id="guest">
                            {dataListGuest}
                        </datalist>
                    </div>
                    <div className="group-input flex flex-col">
                        <label className="capitalize" htmlFor="fromInstansi">perusahaan / instansi</label>
                        <input type="text" className="p-2 rounded" name="fromInstansi" id="fromInstansi"
                            value={fromInstansi} onChange={(e) => dispatch(setFromInstansi(e.target.value))}
                            list="from-instansi" />
                        <datalist id="from-instansi">
                            {listFromInstansi()}
                        </datalist>
                    </div>
                    <div className="group-input flex flex-col">
                        <label className="capitalize" htmlFor="hp">hp <span className="text-red-600">*</span></label>
                        <input type="text" className="p-2 rounded" name="hp" id="hp"
                            value={hp} onChange={(e) => dispatch(setHp(e.target.value))} />
                    </div>
                    <div className="group-input flex flex-col">
                        <label className="capitalize" htmlFor="layanan">layanan <span className="text-red-600">*</span></label>
                        <select className="p-2" name="layanan" id="layanan" onChange={(e) => dispatch(setService(e.target.value))}
                            value={service}>
                            <option key='0' value='0'>==Pilih layanan==</option>
                            {services.map(item =>
                                <option key={item.id} value={item.id}>{item.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="group-input flex flex-col">
                        <label className="capitalize" htmlFor="address">Alamat</label>
                        <input type="text" className="p-2 rounded" name="address" id="address"
                            value={address} onChange={(e) => dispatch(setAddress(e.target.value))} />
                    </div>
                    <div className="group-input flex flex-col">
                        <label className="capitalize" htmlFor="email">email</label>
                        <input type="text" className="p-2 rounded" name="email" id="email"
                            value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
                    </div>
                    <div className="group-input flex flex-col">
                        <label className="capitalize" htmlFor="pangkat">pangkat</label>
                        <input type="text" className="p-2 rounded" name="pangkat" id="pangkat"
                            value={pangkat} onChange={(e) => dispatch(setPangkat(e.target.value))} />
                    </div>
                    <div className="group-input flex flex-col">
                        <label className="capitalize" htmlFor="jabatan">jabatan</label>
                        <input type="text" className="p-2 rounded" name="jabatan" id="jabatan"
                            value={jabatan} onChange={(e) => dispatch(setJabatan(e.target.value))} />
                    </div>
                    <div>
                        Note: <span className="text-red-600">*</span> (wajib diisi)
                    </div>
                    <input className="bg-bpom-b text-white p-2 rounded" type="button" value={"Submit"}
                        onClick={submitHandler} />
                </div>
            </div>
        </div>
    )
}