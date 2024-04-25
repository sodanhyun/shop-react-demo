export default function InputArea({title, ...props}) {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">{title}</span>
            </div>
            <textarea 
            className="form-control" 
            aria-label="With textarea" 
            {...props}
            ></textarea>
        </div>
    )
}