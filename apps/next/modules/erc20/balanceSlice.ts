import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../store'
import {helper} from "../../lib/helper";
import BigNumber from "bignumber.js";

export interface BalanceState {
    value: string
    loading: boolean
    decimals: number
    fixed: number
    coinAddress: string
}

/// value from BigNumber.toHexString()
const initialState: BalanceState = {
    value: "0",
    loading: false,
    decimals: 18,
    fixed: 6,
    coinAddress: ""
}

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        setDecimals: (state, action: PayloadAction<number>) => {
            state.decimals = action.payload
        },
        setCoinAddress: (state, action: PayloadAction<string>) => {
            state.coinAddress = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const { setValue, setDecimals, setCoinAddress, setLoading } = balanceSlice.actions

export const selectBalance = (state: AppState) => {return new BigNumber(state.erc20.value, 16)}
export const selectCoinAddress = (state: AppState) => state.erc20.coinAddress
export const getFormattedBalance = (state: AppState) => {
    if (state.erc20.loading) return '...';
    return helper.number.toPrecisionFloor(new BigNumber(state.erc20.value).dividedBy(10 ** state.erc20.decimals).toFixed(), {
        decimals: state.erc20.fixed
    });
}

export default balanceSlice.reducer