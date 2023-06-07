import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItems } from "../../services/pem-produksi"
import { Item } from "../profiles"

export default function PemProduksi() {
    const items = useSelector(state => state.pemProduksiReducer.items)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchItems('pem-produksi'))
    }, [dispatch])

    return (
        <section id="pemeriksaanproduksiobat" className="min-h-screen pt-14 px-10 text-center bg-slate-200">
            <h2 className="text-2xl m-4 font-semibold">PEMERIKSAAN SARANA PRODUKSI OBAT DAN MAKANAN</h2>
            <div className="flex flex-wrap justify-center items-center">
                {
                    items.map(
                        ({ name, link, content }, key) =>
                            <Item key={key} textHeader={name} link={link} textContent={content} />
                    )
                }
            </div>
        </section>
    )
}