import { ArrowRightIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import { fetchGuests, setAddress, setEmail, setFromInstansi, setHp, setId, setJabatan, setName, setPangkat, setService, toggleGuestModalForm, toggleIsShowFullImage } from "../../../services/guest";
import ImageViewer from "./image-viewer";
import FormModal from "./modal";

export default function Atm() {
    const items = useSelector(state => state.guestReducer.items)
    const isShowFullImage = useSelector(state => state.guestReducer.isShowFullImage)
    const accessToken = useSelector(state => state.user.accessToken)

    const [editMode, setEditMode] = useState(false)
    const [modalFormTitle, setModalFormTitle] = useState("")
    const [valuePerPage, setValuePerPage] = useState(10); // dont init to 0 because it will get 15 values
    const [imageUrl, setImageUrl] = useState("")

    const dispatch = useDispatch()
    const fetchUrl = `guest-book?value_per_page=${valuePerPage}&page=${items?.current_page}`

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

    useEffect(() => {
        dispatch(fetchGuests(fetchUrl))
    }, [dispatch, valuePerPage, fetchUrl])

    const itemApps = () => {
        // create sequence number for table per page
        let number = 1
        if (items?.current_page !== 1) {
            number = (items?.current_page - 1) * valuePerPage + 1
        }

        return items.data?.map((item, index) => (
            <tr key={index}>
                <td>{number++}</td>
                <td>{item.name}</td>
                <td className="cursor-pointer" onClick={() => { setImageUrl(item.selfie); dispatch(toggleIsShowFullImage()) }} ><Image src={item.selfie} alt={`foto ${item.name}`} width={500} height={500} /></td>
                <td>{item.company === 'undefined' ? '-' : item.company}</td>
                <td>{item.hp}</td>
                <td>{services[item.service].name}</td>
                <td>{item.address ?? '-'}</td>
                <td>{item.email ?? '-'}</td>
                <td>{item.pangkat ?? '-'}</td>
                <td>{item.jabatan ?? '-'}</td>
                <td>{new Date(item.updated_at).toLocaleString()}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
                <td className="hidden">{item.id}</td>
                <td className="[&>a]:inline-block whitespace-nowrap">
                    <a href="#" className="remove" onClick={() => removeItem(item.id)}>
                        <TrashIcon width={18} className="text-red-600" />
                    </a>
                    <a href="#" className="edit mx-2" onClick={() => btnEditHandler(item.id)}>
                        <PencilSquareIcon width={18} className="text-green-600" />
                    </a>
                </td>
            </tr>
        ))
    }

    const getItem = async (id) => {
        const item = await axios.get(`guest-book/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return item
    }

    const removeItem = async (id) => {
        await axios.delete(`guest-book/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                dispatch(fetchGuests(fetchUrl))
                toast.success('Item is removed !')
            })
            .catch(err => toast.error(err.message))
    }

    const btnEditHandler = async (id) => {
        setModalFormTitle("Form edit Tamu")
        const { data } = await getItem(id)

        const {
            name, company, hp, service, address, email, pangkat, jabatan
        } = data.data

        dispatch(setName(name))
        dispatch(setFromInstansi(company))
        dispatch(setHp(hp))
        dispatch(setService(service))
        dispatch(setAddress(address))
        dispatch(setEmail(email))
        dispatch(setPangkat(pangkat))
        dispatch(setJabatan(jabatan))
        dispatch(setId(id))

        dispatch(toggleGuestModalForm())
        setEditMode(true)
    }

    return (
        <section className="my-4 overflow-auto">
            <h1 className="text-2xl font-semibold flex mb-2"><ArrowRightIcon width={20} className="mr-2" /> Tamu</h1>
            <select className="block my-2 p-2" name="value-per-page"
                value={valuePerPage}
                onChange={e => setValuePerPage(e.target.value)}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <table className="[&>thead>tr>th]:border-2 [&>thead>tr>th]:p-2 [&>tbody>tr>td]:p-2 [&>tbody>tr>td]:border-2">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Foto</th>
                        <th>Perusahaan / Instansi</th>
                        <th>HP / WA</th>
                        <th>Layanan</th>
                        <th>Alamat</th>
                        <th>Email</th>
                        <th>Pangkat</th>
                        <th>Jabatan</th>
                        <th>Terakhir diubah</th>
                        <th>Tgl Dibuat</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {itemApps()}
                </tbody>
            </table>
            <span className="py-1 px-2 rounded mr-2">{`${items.data?.length} dari ${items?.total}`}</span>
            {items.links?.map((item, i) => {
                let { url, label, active } = item

                label = label === '&laquo; Previous' ? "&laquo;"
                    : label === 'Next &raquo;' ? '&raquo;' : label

                let disabled = items.current_page === items.last_page && label === '&raquo;'
                    || items.current_page === 1 && label === '&laquo;'
                return (
                    <Fragment key={i}>
                        <button className={classNames("bg-gray-400 p-2 rounded py-1 mx-[.1rem] my-2",
                            {
                                "text-white": active,
                                "bg-gray-300 text-gray-400": disabled
                            })}
                            dangerouslySetInnerHTML={{ __html: label }}
                            onClick={() => dispatch(fetchGuests(url))}
                            disabled={disabled}
                        />
                    </Fragment>
                )
            })}
            <FormModal title={modalFormTitle} editMode={editMode} fetchUrl={fetchUrl} />
            <ImageViewer imageUrl={imageUrl} show={isShowFullImage} />
        </section>
    )
}