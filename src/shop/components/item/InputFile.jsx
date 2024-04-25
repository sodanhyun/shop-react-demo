export default function InputFile({title, ...props}) {
    return (
        <div className="custom-file img-div">
            <input 
            type="file" 
            className="custom-file-input" 
            {...props}
            />
            <label className="custom-file-label">
                {title}
            </label>
        </div>
    )
}