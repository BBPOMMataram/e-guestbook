import { ArrowDownCircleIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useEffect, useState } from "react";
import ItemApp from "../item-app";


export default function Hero({ applications }) {
  const [appItems, setAppItems] = useState([])

  useEffect(() => {
    setAppItems(applications)
  }, [applications])

  return (
    <motion.section
      className="h-[calc(100vh_-_3rem)]
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
                INFORMATION CENTER
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
              className="list-app overflow-hidden mt-16 h-60 pb-8 cursor-all-scroll 
            bg-gradient-to-t py-2 px-1 text
            md:h-[22rem] md:bg-gradient-to-l from-emerald-400 group"
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
                List Aplikasi <ArrowDownIcon width={20} className="inline" />
              </motion.h2>
              <div className="overflow-auto pr-6 box-content w-full h-full"> {/* hidden scrollbar */}
                {appItems && appItems.map(({ name, desc, link }, i) =>
                  <ItemApp key={i} title={name} desc={desc} link={link} i={i} />
                )}
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className='flex w-fit mx-auto mt-12 text-emerald-400 animate-pulse'
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ y: { delay: 1.5 }, opacity: { delay: 1.5 } }}
          whileHover={{ scale: 1.3, color: '#0BAB62' }}
        >
          <a href="#profilinstansi">
            <ArrowDownCircleIcon width={40} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}