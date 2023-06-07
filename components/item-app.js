import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import cs from "classnames";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function ItemApp({ icon, title, desc, link = '#', i }) {
    const randomColor = useSelector(state => state.sideBar.randomColor)
    const itemVariant = {
        hidden: {
            opacity: 0,
            x: 100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: { default: { delay: i * 0.3, duration: .5 }, scale: { duration: .1 } }
        },
    }
    return (
        <motion.div
            tabIndex="0"
            className={
                cs("item mx-auto md:ml-3 p-3 my-4 w-fit bg-gradient-to-br to-bpom-m rounded shadow-lg",
                    {
                        "from-bpom-g": randomColor,
                        "from-bpom-b": !randomColor
                    })}
            initial="hidden"
            animate="visible"
            variants={itemVariant}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: .9 }}
            onHoverStart={e => {
                e.target.classList.toggle('from-bpom-g')
                e.target.classList.toggle('from-bpom-b')
            }}
            onHoverEnd={e => {
                e.target.classList.toggle('from-bpom-g')
                e.target.classList.toggle('from-bpom-b')
            }}
        >
            <a
                tabIndex="-1"
                href={link}
                className="flex"
            >
                <div className="icon-cont flex items-center">
                    <div className="icon rounded-full bg-bpom-b flex justify-center w-fit h-fit">
                        <ComputerDesktopIcon width={30} className="m-3 stroke-2 stroke-bpom-g" />
                    </div>
                </div>
                <div className="flex flex-col flex-1 px-3">
                    <h2 className="title text-xl">{title}</h2>
                    <div className="desc text-sm">{desc}</div>
                </div>
            </a>
        </motion.div>
    )
} 