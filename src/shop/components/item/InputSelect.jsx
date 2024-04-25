export default function InputSelect({children, ...props}) {
    return (
        <div className="form-group">
            <select 
            className="custom-select"
            required
            {...props}
            >
            {children}
            </select>
        </div>
    )
}