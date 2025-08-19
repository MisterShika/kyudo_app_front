export function KyudoButton({ children, variant = "primary", ...props }) {
    let classes = "px-4 py-2 rounded font-medium shadow ";

    if (variant === "primary") {
        classes += "bg-purple-600 text-white hover:bg-purple-700";
    } else if (variant === "secondary") {
        classes += "bg-gray-200 text-gray-800 hover:bg-gray-300";
    } else if (variant === "danger") {
        classes += "bg-red-600 text-white hover:bg-red-700";
    }

    return (
        <button type="button" className={classes} {...props}>
            {children}
        </button>
    );
};