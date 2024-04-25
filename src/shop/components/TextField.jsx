import { useId } from "react";

export default function TextField({title, name, type='text', ...props}) {
    const id = useId();

    return (
        <div className="form-group">
            <label htmlFor={id}>{title}</label>
            <input 
            type={type}
            id={id}
            className="form-control"
            {...props}
            />
        </div>
    )
}