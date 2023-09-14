import { atom } from 'recoil'

const uiState = atom({
    key: 'uiState',
    default: {
        config: {
            itemId: null,
            data: {}
        }
    }
})

export default uiState