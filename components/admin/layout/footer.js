
export default function Footer({ bg = "bg-gray-900" }) {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <div className={`flex justify-center p-4 text-gray-400 border-t-2 border-gray-800 ${bg}`}>
                <p><a href="#">BBPOM di Mataram</a> &copy; {currentYear === 2022 ? "2022" : `2022 -  ${currentYear}`}</p>
            </div>
        </>
    )
}