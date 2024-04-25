export default function Button({onclick, title}) {
    return (
        <button onClick={() => onclick()} className="btn btn-primary">{title}</button>
    )
}