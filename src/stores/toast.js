import { atom } from "recoil";

const toastState = atom({

    key: 'toastState',
    default: {
        componantId: null,
        type: '',
        message: '',
    }

})

export default toastState