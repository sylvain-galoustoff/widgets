import { useRecoilState } from 'recoil';
import toastState from '../../stores/toast'

import { MdClose } from 'react-icons/md'

function Toast() {

    const [toast, setToast] = useRecoilState(toastState)

    const closeToast = () => {

        setToast({
            componantId: null,
            type: '',
            message: '',
        })

    }

    return (
        <div className={`toast ${toast.type}`}>

            <div id="close-toast" onClick={closeToast}>
                <MdClose />
            </div>

            <p>{toast.message}</p>
        </div>
    );
}

export default Toast