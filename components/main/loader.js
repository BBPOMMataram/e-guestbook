export default function Loader() {
    const style = {
        width: '75px',
        height: '75px',
        margin: 0,
        background: 'transparent',
        borderTop: '4px solid #002E5B',
        borderRight: '4px solid transparent',
        borderRadius: '50%',
        webkitAnimation: '1s spin linear infinite',
        animation: '1s spin linear infinite',
    }
    return (
        <div className="loader-spinner animate-spin" style={style}></div>
    )
}