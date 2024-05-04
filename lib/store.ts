import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../lib/features/accountHandle/loginSlice'
export const makeStore = () => {
    return configureStore({
        // reducer: {
        //     counter: counterReducer,
        // }
        reducer: {
            LoginState: loginReducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']