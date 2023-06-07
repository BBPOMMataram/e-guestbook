import cs from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import { getApps } from "../../../services/apps";
import { toggleFormModalApp } from "../../../services/form-modal-app";

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

export default function FormModalApp({ title, editMode, valuePerPage, currentPage }) {
    const modalApp = useRef(null)
    const [nameRef, setNameFocus] = useFocus()
    const accessToken = useSelector(state => state.user.accessToken)

    const dispatch = useDispatch()

    const isFormModalAppOpened = useSelector(state => state.formModalAppReducer.isFormModalAppOpened)
    const app = useSelector(state => state.appsReducer.app)

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [link, setLink] = useState("")

    const emptyForm = () => {
        setId("")
        setName("")
        setDesc("")
        setLink("")
    }

    const closeModal = (evt) => {
        if (modalApp.current && !modalApp.current.contains(evt.target)) {
            dispatch(toggleFormModalApp());
            emptyForm()
        }
    }

    const submitHandler = () => {
        if (!accessToken) return toast.error('No token provided')
        if (!name || !desc || !link) return toast.error('Silahkan lengkapi form !')

        if (editMode) {
            axios.patch(`/applications/${id}`, {
                name, desc, link
            }, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
                .then(() => {
                    toast.success(`Success update app`)
                    dispatch(getApps(`/applications?value_per_page=${valuePerPage}&page=${currentPage}`))
                })
                .catch(err => toast.error(err.response.data.message))
        } else {
            //create mode            
            axios.post(`applications`, {
                name, desc, link
            }, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
                .then(() => {
                    toast.success(`Success create a new app`)
                    emptyForm()
                    dispatch(getApps(`/applications?value_per_page=${valuePerPage}&page=${currentPage}`))
                })
                .catch(err => toast.error(err.response.data.message))
        }
    }

    useEffect(() => {
        setNameFocus
    }, [setNameFocus])

    useEffect(() => {
        if (editMode) {
            setId(app.id)
            setName(app.name)
            setDesc(app.desc)
            setLink(app.link)
        } else {
            setId("")
            setName("")
            setDesc("")
            setLink("")
        }
    }, [editMode, app])

    return (
        <div className={cs("top-0 left-0 right-0 bottom-0 bg-white bg-opacity-60 z-10 flex justify-center items-center",
            { "hidden": !isFormModalAppOpened, "fixed": isFormModalAppOpened })}
            onClick={(e) => closeModal(e)}
        >
            <div className="card bg-gray-400 p-4 rounded flex-1 mx-20" ref={modalApp}>
                <div className="header flex text-center border-b-2 border-black py-2">
                    <h1 className="flex-1 text-2xl capitalize font-bold">{title}</h1>
                    <button className="px-4 font-bold" onClick={() => dispatch(toggleFormModalApp())}>X</button>
                </div>
                <div className="content p-2 [&>div]:mb-4 [&>div>label]:pl-2">
                    <div className="group-input flex flex-col">
                        <label htmlFor="name">Nama</label>
                        <input className="p-2 rounded" type="text" name="name" id="name" ref={nameRef}
                            value={name} onChange={(e) => setName(e.target.value)} placeholder="SiJelapp"
                        />
                    </div>
                    <div className="group-input flex flex-col">
                        <label htmlFor="desc">Keterangan</label>
                        <input className="p-2 rounded" type="text" name="desc" id="desc"
                            value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Sistem Jejak Telusur Laporan Pengujian Pihak Ketiga"
                        />
                    </div>
                    <div className="group-input flex flex-col">
                        <label htmlFor="link">Link</label>
                        <input className="p-2 rounded" type="text" name="link" id="link"
                            value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://contoh.com"
                        />
                    </div>
                    <input className="bg-bpom-b text-white p-2 rounded" type="button" value={"Submit"}
                        onClick={submitHandler} />
                </div>
            </div>
        </div>
    )
}