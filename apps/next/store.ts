import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import balanceReducer from './modules/erc20/balanceSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            erc20: balanceReducer,
        }
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
    >

export default store