import cs from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import { fetchAtm, toggleFormAtmModal } from "../../../services/atm";

export default function FormModal({ title, editMode, fetchUrl }) {
    const modal = useRef(null)
    const nameRef = useRef()

    const dispatch = useDispatch()

    const isFormAtmModalOpened = useSelector(state => state.atmReducer.isFormAtmModalOpened)
    const item = useSelector(state => state.atmReducer.item)
    const accessToken = useSelector(state => state.user.accessToken)

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [bankName, setBankName] = useState("")
    const [address, setAddress] = useState("")
    const [maps, setMaps] = useState("#")

    const emptyForm = () => {
        setId("")
        setName("")
        setBankName("")
        setAddress("")
        setMaps("")
    }

    const closeModal = (evt) => {
        if (modal.current && !modal.current.contains(evt.target)) {
            dispatch(toggleFormAtmModal());
            emptyForm()
        }
    }

    const submitHandler = () => {
        if (!name || !bankName || !address || !maps) return toast.error('Silahkan lengkapi form !')

        if (editMode) {
            axios.patch(`/atm/${id}`, {
                name, bankName, address, maps
            }, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
                .then(() => {
                    dispatch(fetchAtm(fetchUrl))
                    toast.success(`Success update item`)
                })
                .catch(err => console.log(err))
        } else {
            //create mode            
            axios.post(`/atm`, {
                name, bankName, address, maps
            }, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
                .then(() => {
                    toast.success(`Success create a new item`)
                    emptyForm()
                    dispatch(fetchAtm(fetchUrl))
                    nameRef.current.focus()
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        if (editMode) {
            setId(item?.id)
            setName(item?.name)
            setBankName(item?.bankName)
            setAddress(item?.address)
            setMaps(item?.maps)
        } else {
            setId("")
            setName("")
            setBankName("")
            setAddress("")
            setMaps("")
        }
    }, [editMode, item])

    return (
        <div className={cs("top-0 left-0 right-0 bottom-0 bg-white bg-opacity-60 z-10 flex justify-center items-center",
            { "hidden": !isFormAtmModalOpened, "fixed": isFormAtmModalOpened })}
            onClick={(e) => closeModal(e)}
        >
            <div className="card bg-gray-400 p-4 rounded flex-1 mx-20" ref={modal}>
                <div className="header flex text-center border-b-2 border-black py-2">
                    <h1 className="flex-1 text-2xl capitalize font-bold">{title}</h1>
                    <button className="px-4 font-bold" onClick={() => dispatch(toggleFormAtmModal())}>X</button>
                </div>
                <div className="content p-2 [&>div]:mb-4 [&>div>label]:pl-2">
                    <div className="group-input flex flex-col">
                        <label htmlFor="atm-name">Nama ATM</label>
                        <input className="p-2 rounded" type="text" name="atm-name" id="atm-name" ref={nameRef}
                            value={name} onChange={(e) => setName(e.target.value)} placeholder="Mandiri RS. Siti Hajar"
                        />
                    </div>
                    <div className="group-input flex flex-col">
                        <label htmlFor="bank-name">Nama Bank</label>
                        <input type="text" className="p-2 rounded" name="bank-name" id="bank-name"
                            onChange={(e) => setBankName(e.target.value)} placeholder="Mandiri" value={bankName}
                        />
                    </div>
                    <div className="group-input flex flex-col">
                        <label htmlFor="address">Alamat</label>
                        <input type="text" className="p-2 rounded" name="address" id="address"
                            onChange={(e) => setAddress(e.target.value)} placeholder="Jalan Caturwarga" value={address}
                        />
                    </div>
                    <div className="group-input flex flex-col">
                        <label htmlFor="link-maps">Link Maps</label>
                        <input className="p-2 rounded" type="text" name="link" id="link-maps"
                            value={maps} onChange={(e) => setMaps(e.target.value)} placeholder="https://maps.app.goo.gl/aiSQSkpdkGPEr6yj9"
                        />
                    </div>
                    <input className="bg-bpom-b text-white p-2 rounded" type="button" value={"Submit"}
                        onClick={submitHandler} />
                </div>
            </div>
        </div>
    )
}