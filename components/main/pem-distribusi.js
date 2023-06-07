import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItems } from "../../services/pem-distribusi"
import { Item } from "../profiles"

export default function PemDistribusi() {
    const items = useSelector(state => state.pemDistribusiReducer.items)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchItems('pem-distribusi'))
    }, [dispatch])

    return (
        <section id="pemeriksaandistribusiobat" className="min-h-screen pt-14 px-10 text-center">
            <h2 className="text-2xl m-4 font-semibold">PEMERIKSAAN SARANA DISTRIBUSI OBAT DAN MAKANAN</h2>
            <div className="flex flex-wrap justify-center items-center">
                {
                    items.map(({ name, link, content }, key) =>
                        <Item key={key} textHeader={name} link={link} textContent={content} />
                    )
                }
            </div>
        </section>
    )
}