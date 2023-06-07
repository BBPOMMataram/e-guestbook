import { ArrowRightIcon, LinkIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import { fetchAtm, setItem, toggleFormAtmModal } from "../../../services/atm";
import FormAtmModal from "./modal";

export default function Atm() {
    const items = useSelector(state => state.atmReducer.items)
    const accessToken = useSelector(state => state.user.accessToken)

    const [editMode, setEditMode] = useState(false)
    const [modalFormTitle, setModalFormTitle] = useState("")
    const [valuePerPage, setValuePerPage] = useState(5); // dont init to 0 because it will get 15 values

    const dispatch = useDispatch()
    const fetchUrl = `/atm?value_per_page=${valuePerPage}&page=${items?.current_page}`

    useEffect(() => {
        dispatch(fetchAtm(fetchUrl))
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
                <td>{item.bankName}</td>
                <td className="max-w-sm">{item.address}</td>
                <td><a href={item.maps}><LinkIcon width={20} /></a></td>
                <td>{new Date(item.updatedAt).toLocaleString()}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
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
        const item = await axios.get(`/atm/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        return item
    }

    const removeItem = async (id) => {
        await axios.delete(`/atm/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(() => {
                dispatch(fetchAtm(fetchUrl))
                toast.success('Item is removed !')
            })
            .catch(err => console.log(err))
    }

    const btnNewHandler = () => {
        dispatch(toggleFormAtmModal())
        // dispatch(emptyApp())
        setModalFormTitle("Form ATM Terdekat baru")
        setEditMode(false)
    }

    const btnEditHandler = async (id) => {
        setModalFormTitle("Form edit ATM Terdekat")
        const item = await getItem(id)
        dispatch(setItem(item.data.data))
        dispatch(toggleFormAtmModal())
        setEditMode(true)
    }

    return (
        <section className="my-4">
            <h1 className="text-2xl font-semibold flex mb-2"><ArrowRightIcon width={20} className="mr-2" /> ATM Terdekat</h1>
            <button className="bg-bpom-b text-white p-2 rounded my-2 px-4"
                onClick={btnNewHandler}>New</button>
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
                        <th>Nama ATM</th>
                        <th>Nama Bank</th>
                        <th>Alamat</th>
                        <th>Maps</th>
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
                            onClick={() => dispatch(fetchAtm(url))}
                            disabled={disabled}
                        />
                    </Fragment>
                )
            })}
            <FormAtmModal title={modalFormTitle} editMode={editMode} fetchUrl={fetchUrl} />
        </section>
    )
}