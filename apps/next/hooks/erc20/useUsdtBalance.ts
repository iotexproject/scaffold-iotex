import usePaytokenContract from "../contracts/usePebbleCoinContract";
import {useAppDispatch} from "../useAppDispatch";
import {helper} from "../../lib/helper";
import {setDecimals, setValue} from "../../modules/erc20/balanceSlice";
import {useWeb3React} from "@web3-react/core";
import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import {Web3Provider} from "@ethersproject/providers";

const getUSDTbalance = (library: Web3Provider, usdt: any) => {
    return async (_: string, account: string) => {
        const [err, res] = await helper.promise.runAsync(usdt.balanceOf(account))
        if (err) {
            console.log(err)
            return ""
        } else {
            // @ts-ignore
            return res.toHexString()
        }
    }
}

export const useUsdtBalance = async (suspense = false) => {
    const usdt = usePaytokenContract()
    const dispatch = useAppDispatch()
    const { account, chainId, library } = useWeb3React()

    const shouldFetch = typeof account === "string" && !!library && !!usdt;

    const result = useSWR(
        shouldFetch ? ["USDTBalance", account, chainId] : null,
        getUSDTbalance(library, usdt),
        {
            suspense,
        }
    );

    useKeepSWRDataLiveAsBlocksArrive(result.mutate);

    dispatch(setValue(result.data))
    dispatch(setDecimals(chainId === 4689 ? 6 : 18))
}