import { atom } from 'recoil'

const widgetsState = atom({
    key: 'widgetsState',
    default: []
})

export default widgetsState