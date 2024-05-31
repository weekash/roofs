import "./Input.css"
type InputProps = React.InputHTMLAttributes<HTMLInputElement>
interface ExtraAttributes {
    label?: string
}
type InputComponentProps = InputProps & ExtraAttributes
export default function Input(props: InputComponentProps) {
    const { children, label, ...rest } = props
    return (
        <>
            {label && <label className="form-label">{label}</label>}
            <input className="form-input" {...rest} />
            {children}
        </>
    )
}
