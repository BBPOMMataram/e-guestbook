import cs from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import { fetchItems, toggleFormPemDistribusiModal } from "../../../services/pem-distribusi";

export default function FormModal({ title, editMode, fetchUrl }) {
    const modal = useRef(null)
    const nameRef = useRef()

    const dispatch = useDispatch()

    const isFormPemDistribusiModalOpened = useSelector(state => state.pemDistribusiReducer.isFormPemDistribusiModalOpened)
    const item = useSelector(state => state.pemDistribusiReducer.item)
    const accessToken = useSelector(state => state.user.accessToken)

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [link, setLink] = useState("#")

    const emptyForm = () => {
        setId("")
        setName("")
        setContent("")
        setLink("")
    }

    const closeModal = (evt) => {
        if (modal.current && !modal.current.contains(evt.target)) {
            dispatch(toggleFormPemDistribusiModal());
            emptyForm()
        }
    }

    const submitHandler = () => {
        if (!name || !content || !link) return toast.error('Silahkan lengkapi form !')

        if (editMode) {
            axios.patch(`/pem-distribusi/${id}`, {
                name, content, link
            }, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
                .then(() => {
                    toast.success(`Success update item`)
                    dispatch(fetchItems(fetchUrl))
                })
                .catch(err => toast.error(err.message))
        } else {
            //create mode            
            axios.post('/pem-distribusi', {
                name, content, link
            }, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
                .then(() => {
                    toast.success(`Success create a new item`)
                    emptyForm()
                    dispatch(fetchItems(fetchUrl))
                    nameRef.current.focus()
                })
                .catch(err => toast.error(err.message))
        }
    }

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        if (editMode) {
            setId(item.id)
            setName(item.name)
            setContent(item.content)
            setLink(item.link)
        } else {
            setId("")
            setName("")
            setContent("")
            setLink("")
        }
    }, [editMode, item])

    return (
        <div className={cs("top-0 left-0 right-0 bottom-0 bg-white bg-opacity-60 z-10 flex justify-center items-center",
            { "hidden": !isFormPemDistribusiModalOpened, "fixed": isFormPemDistribusiModalOpened })}
            onClick={(e) => closeModal(e)}
        >
            <div className="card bg-gray-400 p-4 rounded flex-1 mx-20" ref={modal}>
                <div className="header flex text-center border-b-2 border-black py-2">
                    <h1 className="flex-1 text-2xl capitalize font-bold">{title}</h1>
                    <button className="px-4 font-bold" onClick={() => dispatch(toggleFormPemDistribusiModal())}>X</button>
                </div>
                <div className="content p-2 [&>div]:mb-4 [&>div>label]:pl-2">
                    <div className="group-input flex flex-col">
                        <label htmlFor="pemdistribusi-name">Nama</label>
                        <input className="p-2 rounded" type="text" name="name" id="pemdistribusi-name" ref={nameRef}
                            value={name} onChange={(e) => setName(e.target.value)} placeholder="Jumlah Sarana Distribusi Obat dan Makanan"
                        />
                    </div>
                    <div className="group-input flex flex-col">
                        <label htmlFor="pemdistribusi-content">Isi</label>
                        <textarea className="p-2 rounded" name="pemdistribusi-content" id="pemdistribusi-content" cols="30" rows="10" onChange={(e) => setContent(e.target.value)}
                            placeholder="-" value={content}>
                        </textarea>
                    </div>
                    <div className="group-input flex flex-col">
                        <label htmlFor="pemdistribusi-link">Link</label>
                        <input className="p-2 rounded" type="text" name="link" id="pemdistribusi-link"
                            value={link} onChange={(e) => setLink(e.target.value)} placeholder="Isi dengan '#' jika tidak ada link !"
                        />
                    </div>
                    <input className="bg-bpom-b text-white p-2 rounded" type="button" value={"Submit"}
                        onClick={submitHandler} />
                </div>
            </div>
        </div>
    )
}