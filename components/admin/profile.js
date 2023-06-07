import { ArrowRightIcon, LinkIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import { fetchItems, setItem, toggleFormModal } from "../../services/profile";
import FormProfile from "./modals/profile";

export default function Profile() {
    const items = useSelector(state => state.profileReducer.items)
    const accessToken = useSelector(state => state.user.accessToken)

    const [editMode, setEditMode] = useState(false)
    const [modalFormTitle, setModalFormTitle] = useState("")
    const [valuePerPage, setValuePerPage] = useState(5); // dont init to 0 because it will get 15 values

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchItems(`/profile?value_per_page=${valuePerPage}&page=${items?.current_page}`))
    }, [dispatch, valuePerPage, items.current_page])

    const itemApps = () => {
        // create sequence number for table per page
        let number = 1
        if (items?.current_page !== 1) {
            number = (items?.current_page - 1) * valuePerPage + 1
        }

        return items.data?.map((item, index) => {
            return (
                <tr key={index++}>
                    <td>{number++}</td>
                    <td>{item.name}</td>
                    <td><a href={item.link}><LinkIcon width={20} /></a></td>
                    <td>{item.content}</td>
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
            )
        })
    }

    const getItem = async (id) => {
        const item = await axios.get(`/profile/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .catch(err => { throw (err.response) })
        return item
    }

    const removeItem = async (id) => {
        await axios.delete(`/profile/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(() => {
                dispatch(fetchItems(`/profile?value_per_page=${valuePerPage}&page=${items?.current_page}`))
                toast.success('Item is removed !')
            })
            .catch(({ message }) => toast.error(message))
    }

    const btnNewHandler = () => {
        dispatch(toggleFormModal())
        // dispatch(emptyApp())
        setModalFormTitle("Form profile baru")
        setEditMode(false)
    }

    const btnEditHandler = async (id) => {
        setModalFormTitle("Form edit profile")
        await getItem(id)
            .then(({ data }) => {
                dispatch(setItem(data.data))
                dispatch(toggleFormModal())
                setEditMode(true)
            })
            .catch(({ data }) => toast.error(data.message))
    }

    return (
        <section className="my-4">
            <h2 className="text-xl flex mb-2"><ArrowRightIcon width={20} className="mr-2" /> Profil Instansi</h2>
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
                        <th>Nama</th>
                        <th>Link</th>
                        <th>Isi</th>
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
                        <button className={cn("bg-gray-400 p-2 rounded py-1 mx-[.1rem] my-2",
                            {
                                "text-white": active,
                                "bg-gray-300 text-gray-400": disabled
                            })}
                            dangerouslySetInnerHTML={{ __html: label }}
                            onClick={() => dispatch(fetchItems(url))}
                            disabled={disabled}
                        />
                    </Fragment>
                )
            })}
            <FormProfile title={modalFormTitle} editMode={editMode} valuePerPage={valuePerPage} currentPage={items?.current_page} />
        </section>
    )
}