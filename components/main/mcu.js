import classNames from "classnames";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../config/axios";

export function getNameList() {
  const names = [
    "Dra. I Gusti Ayu Adhi Aryapatni, Apt",
    "Dra. Winartutik, Apt.",
    "Firman Rakhman, S.Si., Apt.",
    "Syamsul Hady, S.H.",
    "Nyoman Indra Sidarta",
    "Ni Luh Putu Indri Hapsari",
    "Lalu Ahmad Saikhu",
    "Anas Amirudin",
    "Mohammad Gusti Airlangga, S.M.",
    "Kadek Bagus Khrisna Candra, A.Md.",
    "Miftahul Azizah, A.Md.",
    "Eka Apriani Rahmah, A.Md.",
    "Fatimah Tri Wulandari, A.Md.",
    "Nanang Setyadi Santoso, S.E.",
    "Ramadhan Al Dzahabi Ardy, A.Md.",
    "Otniel Pratama Pangkung, S.E.",
    "Dra. Menik Sri Witarti, Apt, MM",
    "Wayan Krisnayanti, S.Farm, Apt",
    "I Made Durus",
    "Putu Gita Iswari, S.Farm, Apt",
    "Atika Andriani, S.Farm, Apt",
    "Fika Katrin Taufikana, S.Farm, Apt",
    "Budi Ratna Kusumawati",
    "Putu Eka Wahyu Ratnaningsih, S.Si",
    "Ni Luh Putu Eka Murniati",
    "I Dewa Made Dwi Indra Antara, S.Farm.",
    "Ratna Ayu Amalia, S.Farm, Apt.",
    "Tito Veriyanto, S.Si, Apt",
    "Heri Winarni",
    "Else Hanifa, S.Far, Apt",
    "Wanti Kurnia Hadiyati, S.Si",
    "M. Ibnu Fajri, S.Si.",
    "Ahmad Hidayatullah, S.Si.",
    "Mazaya Ghaisani, S.T.P.",
    "Faizah Andarini, S.T.P.",
    "Dian Rositasari, S.TP",
    "Prabawati, S.Si.",
    "Alham Dani Kembang, S.Si.",
    "Sri Muladrianti, A.Md",
    "Widhie Estiningtyas, A.Md",
    "I Gusti Made Aryama Jelantik, S.Si.",
    "Bayang Nuansa Salju, S.T.P.",
    "Ana Fairuza Fajriana, S.TP.",
    "apt, Putu Vera Phinastika Putri, S.Farm.",
    "Abdillah Wibisono, S.Farm, Apt",
    "Eka Rahmi Paramita, S.Farm, Apt",
    "Wahyu Hariyani, S.Si",
    "Nanang Suryana Harahap, S.Far, Apt",
    "Ni Made Dwi Sukmayanti, S.Farm, Apt",
    "Ni Luh Sri Ardani",
    "Yusnida, A.Md.",
    "Sri Dewi Puspita Susilawati, S.Si, Apt",
    "Aniska Arsitaningtyas Angrenani, S.Farm,Apt",
    "Ni Putu Eka Sulastini, S.Farm., Apt.",
    "Shabrina Aulia Putri, S.Farm., Apt.",
    "Muhammad Romadhoni, S.Si",
    "Nur Fatmawati, S.Far., Apt.",
    "Hardiono Adisaputra, S.Farm., Apt.",
    "Ni Wayan Gustini Ayuwati, S.Si.",
    "Dewi Novita, S.Si.",
    "Irfan Zaelani, S.Sos.",
    "Drs. I Nyoman Sumasada, Apt., M.H.",
    "Baiq Suriati, S.Si., M.Si.",
    "I Putu Ngurah Apri Susilawan, S.Si., M.Si.",
    "Lalu Satriawandi, S.Si., Apt.",
    "Rosita Mardiani, S.T.P.",
    "Amalia Sukma Ridhani, S.Si",
    "Arista Dewi Nurita, S.Si",
    "Asih Chomsa Lestari, S.Si",
    "Baiq Lisa Harisanty, S.Si",
    "Dewi Annisatun, S.Si",
    "Emma Zahra, S.Si",
    "Freddy Suryanegara, SE",
    "Haryanti Patmala, S.Si",
    "Hilmi Khairan, S.E",
    "Ismail Soni, A.Md",
    "Linda Kusumawati, S.Si",
    "Nirmala Nurhasanah, STP",
    "Nurhasanah, STP",
    "Yuniar Windiasti, S.Si",
    "Eka Yuliantini Fahmi, S.Farm., Apt.",
    "Muhammad Arfani Hidayat",
    "Apriandi",
    "Hakiki",
    "Hatemah",
    "Arif Purnama",
    "Sinarah",
    "Suhariadi",
    "M. Sukron",
    "Akhmad Irfan Jayadi",
    "Ariadi",
    "I Dewa Gede Juliarsa",
    "I Nengah Agus Ardana",
    "Hari Selfiandi",
    "M. Satriawan",
    "Fahruddin Rozi",
    "M. Amin",
    "Zulhan Hadi"
  ]

  return names
}

export default function Mcu() {
  const nameRef = useRef()
  const [nameList, setNameList] = useState([])

  const [name, setName] = useState(0)
  const [date, setDate] = useState(1)
  const [reason, setReason] = useState("")
  const [disableSubmit, setDisableSubmit] = useState(false)

  useEffect(() => {
    removeNamesExist()
  }, [])

  const removeNamesExist = async () => {
    const names = getNameList()
    const res = await axios('mcu-namelist')
    const namesExist = res.data

    namesExist.forEach(el => {
      const index = names.indexOf(el.name)
      names.splice(index, 1)
    });
    setNameList(names)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisableSubmit(true)

    if (name === 0) {
      setDisableSubmit(false)
      return toast.error('Pilih nama Anda !')
    }

    const sumOfDate = await axios.post('mcu-check-datelimit', {
      date
    })
      .catch(({ message }) => toast.error(message))

    console.log(sumOfDate);
    if (sumOfDate.data >= 35) {
      setDisableSubmit(false)
      return toast.error('Tanggal yang Anda pilih sudah penuh ! Silahkan pilih tanggal yang lain.')
    }

    const savingData = await axios.post('mcu', {
      name, date, reason
    })

    if (savingData.status) {
      removeNamesExist() //to update list
      setName(0)  //cari cara yang lebih baik
      setDisableSubmit(false)
      return toast.success('Terima kasih ! Data berhasil disimpan.')
    } else {
      setDisableSubmit(false)
      return toast.error('Failed.')
    }

  }

  return (
    <motion.section
      className="h-screen
      bg-[url('/images/gedung-kantor.jpeg')] bg-cover bg-no-repeat bg-fixed
      "
    >
      <div className="h-full w-full bg-black bg-opacity-70">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <motion.div
              initial={{ y: -40 }}
              animate={{ y: 0 }}
              transition={{ duration: .7 }}
              className="logo-cont w-fit mt-7 text-center mx-auto 
            md:mt-32"
            >
              <motion.div className="img-logo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: .9 }}
              >
                <Image src={"/images/logo-withoutlabel.png"} width={97} height={120} alt="logo badan pom" />
              </motion.div>
              <motion.h1
                className="text-bbpom custom-text-color transition-all duration-300
               bg-emerald-300
               "
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                onMouseEnter={(r) => r.target.style.fontWeight = '700'}
                onMouseLeave={(r) => r.target.style.fontWeight = '400'}
              >
                BBPOM DI MATARAM
              </motion.h1>
              <motion.h1
                className="text-ic custom-text-color transition-all duration-300 bg-emerald-300"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.4 }}
                onMouseEnter={(r) => r.target.style.fontWeight = '700'}
                onMouseLeave={(r) => r.target.style.fontWeight = '400'}
              >
                PENDATAAN MCU
              </motion.h1>

              <motion.div
                className="text-line h-1 transition duration-700 bg-gradient-to-r to-bpom-g from-bpom-b rounded px-3"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ opacity: { delay: 0.7 }, width: { duration: 1, delay: 1 }, scale: { duration: 0 } }}
                whileHover={{ scale: 1.2 }}
              />
            </motion.div>
          </div>
          <div className="flex-1">
            <motion.div
              className="list-app overflow-hidden mt-16 pb-8 cursor-all-scroll 
            bg-gradient-to-t py-2 px-1 text
             md:bg-gradient-to-l from-emerald-400 group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <motion.h2
                className='text-lg text-emerald-300 underline underline-offset-8 tracking-wide text-center mb-4
                md:text-left md:ml-3'
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                FORM PENDATAAN MCU
              </motion.h2>
              <div className="overflow-auto pr-6 box-content w-full h-full"> {/* hidden scrollbar */}
                <form onSubmit={(e) => handleSubmit(e)} className="[&>div]:my-3">
                  <div className="flex flex-col">
                    <label className="text-white ml-2" htmlFor="name">Nama</label>
                    <select className="w-fit p-2 rounded bg-gray-100" name="name" value={name} onChange={e => setName(e.target.value)} ref={nameRef}>
                      <option value="0">==pilih nama anda==</option>
                      {nameList.map((item, i) => {
                        return (
                          <Fragment key={i}>
                            <option value={item}>{item}</option>
                          </Fragment>
                        )
                      })}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-white ml-2" htmlFor="date">Tanggal</label>
                    <select className="w-fit p-2 rounded bg-gray-100" name="date"
                      value={date} onChange={e => setDate(e.target.value)}
                    >
                      <option value="1">Rabu, 1 Maret 2023</option>
                      <option value="2">Kamis, 2 Maret 2023</option>
                      <option value="3">Jumat, 3 Maret 2023</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-white ml-2" htmlFor="alasan">Alasan</label>
                    <input className="w-fit p-2 rounded bg-gray-100" type="text" name="alasan"
                      value={reason} onChange={(e) => setReason(e.target.value)} placeholder="contoh: DL"
                    />
                  </div>

                  <button className={classNames("p-2 mt-3 px-4 rounded font-bold",
                    { "bg-green-700": disableSubmit, "bg-green-400": !disableSubmit })} type="submit"
                    disabled={disableSubmit}>SUBMIT</button>
                  <a href="mcu/rekap" className="bg-gray-200 p-2 ml-2 mt-3 px-4 rounded font-bold" type="button">LIHAT DATA</a>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}