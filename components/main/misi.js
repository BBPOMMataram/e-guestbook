export default function Misi() {
    return (
        <section id="misi" className="section flex flex-col md:flex-row md:h-screen">
            <div className="flex justify-center items-center px-12 pb-20 pt-6 font-serif text-justify
                lg:text-xl">
                <ol className="[&>li]:pl-2">
                    <li>Membangun SDM unggul terkait Obat dan Makanan dengan mengembangkan kemitraan bersama seluruh komponen bangsa dalam rangka peningkatan kualitas manusia Indonesia</li>
                    <li>Memfasilitasi percepatan pengembangan dunia usaha Obat dan Makanan dengan keberpihakan terhadap UMKM dalam rangka membangun struktur ekonomi yang produktif dan berdaya saing untuk kemandirian bangsa</li>
                    <li>Meningkatkan efektivitas pengawasan Obat dan Makanan serta penindakan kejahatan Obat dan Makanan melalui sinergi pemerintah pusat dan daerah dalam kerangka Negara Kesatuan guna perlindungan bagi segenap bangsa dan memberikan rasa aman pada seluruh warga</li>
                    <li>Pengelolaan pemerintahan yang bersih, efektif, dan terpercaya untuk memberikan pelayanan publik yang prima di bidang Obat dan Makanan</li>
                </ol>
            </div>
            <div className="flex-1 flex justify-center items-center 
                bg-[url('/images/gedung-kantor.jpeg')] bg-cover bg-no-repeat bg-fixed
                order-first md:order-last"
            >
                <h2 className="rounded px-6 py-3 my-6 bg-gray-900 text-white 
                font-extrabold text-2xl tracking-[.3rem] bg-opacity-80 mx-20">MISI</h2>
            </div>
        </section>
    )
}