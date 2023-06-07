export default function Visi() {
    return (
        <section id="visi" className="section flex flex-col md:flex-row h-screen">
            <VisiBgImage />
            <VisiContent />
        </section>
    )
}

const VisiBgImage = () => (
    <div
        className="flex-1 flex
    bg-[url('/images/gedung-kantor.jpeg')] bg-cover bg-no-repeat bg-fixed"
    >
        <div className="h-full w-full flex justify-center items-center bg-gray-900 bg-opacity-60">
            <h2 className="rounded px-6 py-3 bg-gray-900 bg-opacity-90 text-white 
                font-extrabold text-2xl tracking-[.3rem] mx-20">VISI</h2>
        </div>
    </div>
)

const VisiContent = () => (
    <div className="flex justify-center items-center px-12 pb-20 pt-6 
    bg-gradient-to-b from-emerald-100 to-blue-300
    md:text-2xl font-serif text-justify">
        <q>Obat dan Makanan aman, bermutu, dan berdaya saing untuk mewujudkan Indonesia maju yang berdaulat, mandiri, dan berkepribadian berlandaskan gotong royong</q>
    </div>
)