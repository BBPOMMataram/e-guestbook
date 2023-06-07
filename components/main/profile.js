import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItems } from "../../services/profile"
import { Item } from "../profiles"

export default function Profile() {
    const items = useSelector(state => state.profileReducer.items)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchItems(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`))
    }, [dispatch])

    return (
        <section id="profilinstansi" className="min-h-screen pt-14 px-10 text-center">
            <h2 className="text-2xl m-4 font-semibold">PROFIL INSTANSI</h2>
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