import { createContext, useState } from "react";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [msg, setMsg] = useState("");
    const [type, setType] = useState(-1);

    return (
        <ToastContext.Provider value={{ msg, type, setMsg, setType }}>
            {children}
        </ToastContext.Provider>
    )

}

export default ToastContext;