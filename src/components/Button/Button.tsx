import "./Button.css"
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    styleType: 'default' | 'success' | 'warning' | 'danger';
}

export default function Button(props: ButtonProps) {
    const { children, styleType='default', ...rest} = props
    return (
        <button className={`btn btn-${styleType}`} {...rest}>
            {children}
        </button>
    )
}
