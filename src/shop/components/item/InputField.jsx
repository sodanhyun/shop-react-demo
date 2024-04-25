export default function InputField({title, type='text', ...props}) {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">{title}</span>
            </div>
            <input 
            type={type}
            className="form-control" 
            {...props}
            />
        </div>
    )
}