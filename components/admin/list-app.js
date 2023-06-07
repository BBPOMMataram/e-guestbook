import { ArrowRightIcon, LinkIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import { emptyApp, getApps, setApp } from "../../services/apps";
import { toggleFormModalApp } from "../../services/form-modal-app";
import FormModalApp from "./modals/form-modal-app";

export default function ListApp() {
    const apps = useSelector(state => state.appsReducer.apps)

    const [editMode, setEditMode] = useState(false)
    const [modalFormTitle, setModalFormTitle] = useState("")
    const [valuePerPage, setValuePerPage] = useState(5); // dont init to 0 because it will get 15 values
    const accessToken = useSelector(state => state.user.accessToken)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApps(`/applications?value_per_page=${valuePerPage}&page=${apps?.current_page}`))
    }, [dispatch, valuePerPage, apps.current_page])

    const itemApps = () => {
        let number = 1
        if (apps?.current_page !== 1) {
            number = (apps?.current_page - 1) * valuePerPage + 1
        }
        return apps.data.map((app, index) => {
            return (
                <tr key={index}>
                    <td>{number++}</td>
                    <td>{app.name}</td>
                    <td><a href={app.link}><LinkIcon width={20} /></a></td>
                    <td>{app.desc}</td>
                    <td>{new Date(app.updatedAt).toLocaleString()}</td>
                    <td>{new Date(app.createdAt).toLocaleString()}</td>
                    <td className="hidden">{app.id}</td>
                    <td className="[&>a]:inline-block whitespace-nowrap">
                        <a href="#" className="remove" onClick={() => removeApp(app.id)}>
                            <TrashIcon width={18} className="text-red-600" />
                        </a>
                        <a href="#" className="edit mx-2" onClick={() => btnEditHandler(app.id)}>
                            <PencilSquareIcon width={18} className="text-green-600" />
                        </a>
                    </td>
                </tr>
            )
        })
    }

    const getApp = async (id) => {
        const app = await axios.get(`/applications/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        return app
    }

    const removeApp = async (id) => {
        await axios.delete(`/applications/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(() => {
                dispatch(getApps(`/applications?value_per_page=${valuePerPage}&page=${apps?.current_page}`))
                toast.success('App is removed !')
            })
            .catch(err => console.log(err))
    }

    const btnNewHandler = () => {
        dispatch(toggleFormModalApp())
        dispatch(emptyApp())
        setModalFormTitle("Form aplikasi baru")
        setEditMode(false)
    }

    const btnEditHandler = async (id) => {
        setModalFormTitle("Form edit aplikasi")
        const app = await getApp(id)
        dispatch(setApp(app.data.data))
        dispatch(toggleFormModalApp())
        setEditMode(true)
    }

    return (
        <section className="my-4">
            <h2 className="text-xl flex mb-2"><ArrowRightIcon width={20} className="mr-2" /> Data Aplikasi</h2>
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
            <table className="w-full [&>thead>tr>th]:border-2 [&>thead>tr>th]:p-2 [&>tbody>tr>td]:p-2 [&>tbody>tr>td]:border-2">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Link</th>
                        <th>Keterangan</th>
                        <th>Terakhir diubah</th>
                        <th>Tgl Dibuat</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {apps.data && itemApps()}
                </tbody>
            </table>
            <span className="py-1 px-2 rounded mr-2">{`${apps.data?.length} dari ${apps?.total}`}</span>
            {apps.links?.map((item, i) => {
                let { url, label, active } = item

                label = label === '&laquo; Previous' ? "&laquo;"
                    : label === 'Next &raquo;' ? '&raquo;' : label

                let disabled = apps.current_page === apps.last_page && label === '&raquo;'
                    || apps.current_page === 1 && label === '&laquo;'
                return (
                    <Fragment key={i}>
                        <button className={cn("bg-gray-400 p-2 rounded py-1 mx-[.1rem] my-2",
                            {
                                "text-white": active,
                                "bg-gray-300 text-gray-400": disabled
                            })}
                            dangerouslySetInnerHTML={{ __html: label }}
                            onClick={() => dispatch(getApps(url))}
                            disabled={disabled}
                        />
                    </Fragment>
                )
            })}
            <FormModalApp title={modalFormTitle} editMode={editMode} valuePerPage={valuePerPage} currentPage={apps?.current_page} />
        </section >
    )
}