import { toast } from "react-toastify"

const createToast = (type="err", msg) => {
    switch (type) {
        case "err":
            return toast.error(msg)
    
        case "suc":
            return toast.success(msg)
    
        case "war":
            return toast.warning(msg)
    
    
        case "inf":
            return toast.info(msg)
    
        default:
            toast.error(msg)
    }
    
}

// export default create toast
export default createToast