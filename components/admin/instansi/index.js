import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import { fetchItem } from "../../../services/instansi";

export default function ProfileInstansi() {
    const item = useSelector(state => state.instansiReducer.item)
    const accessToken = useSelector(state => state.user.accessToken)

    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [email, setEmail] = useState("")
    const [about, setAbout] = useState("")

    const [id, setId] = useState("")
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        dispatch(fetchItem('instansi'))
    }, [dispatch])

    useEffect(() => {
        if (item) {
            setId(item.id)
            setName(item.name)
            setAddress(item.address)
            setPhone(item.phone)
            setWhatsapp(item.whatsapp)
            setEmail(item.email)
            setAbout(item.about)
        }
    }, [item])

    const submitHandler = () => {
        if (editMode) {
            axios.patch(`/instansi/${id}`, {
                name, address, phone, whatsapp, email, about
            }, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
                .then(() => {
                    toast.success(`Success update item`)
                    setEditMode(false)
                })
                .catch(err => console.log(err))
        } else {
            setEditMode(true)
        }
    }

    return (
        <section className="my-4">
            <h1 className="text-2xl font-semibold flex mb-2"><ArrowRightIcon width={20} className="mr-2" /> Profil Instansi</h1>
            <div className="[&>div>input]:bg-gray-200 [&>div>textarea]:bg-gray-200 [&>div]:my-2">
                <input type="hidden" name="id" value={id ?? ""} onClick={(e) => setId(e.target.value)} />
                <div className="group-input flex flex-col">
                    <label htmlFor="name">Nama</label>
                    <input type="text" className="p-2 rounded" name="name" id="name" disabled={editMode ? false : true}
                        onChange={(e) => setName(e.target.value)} placeholder="BBPOM di Mataram" value={name ?? ""}
                    />
                </div>
                <div className="group-input flex flex-col">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="p-2 rounded" name="address" id="address" disabled={editMode ? false : true}
                        onChange={(e) => setAddress(e.target.value)} placeholder="Jalan Caturwarga" value={address ?? ""}
                    />
                </div>
                <div className="group-input flex flex-col">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="p-2 rounded" name="phone" id="phone" disabled={editMode ? false : true}
                        onChange={(e) => setPhone(e.target.value)} placeholder="(0370) 666666" value={phone ?? ""}
                    />
                </div>
                <div className="group-input flex flex-col">
                    <label htmlFor="whatsapp">Whatsapp</label>
                    <input type="text" className="p-2 rounded" name="whatsapp" id="whatsapp" disabled={editMode ? false : true}
                        onChange={(e) => setWhatsapp(e.target.value)} placeholder="081907456710" value={whatsapp ?? ""}
                    />
                </div>
                <div className="group-input flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="p-2 rounded" name="email" id="email" disabled={editMode ? false : true}
                        onChange={(e) => setEmail(e.target.value)} placeholder="mail@example.com" value={email ?? ""}
                    />
                </div>
                <div className="group-input flex flex-col">
                    <label htmlFor="about">About</label>
                    <textarea className="p-2 rounded" name="about" id="about" rows={4} disabled={editMode ? false : true}
                        onChange={(e) => setAbout(e.target.value)} placeholder="We are ..." value={about ?? ""}
                    ></textarea>
                </div>
                <input className="bg-bpom-b text-white p-2 rounded" type="button" value={editMode ?? "" ? "Simpan" : "Edit"}
                    onClick={() => submitHandler()}
                />
            </div>
        </section>
    )
}