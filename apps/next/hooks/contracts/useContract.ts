import { Contract } from "@ethersproject/contracts";
import {useWeb3React} from "@web3-react/core";
import {useMemo} from "react";

export default function useContract<T extends Contract = Contract>(
    address: string,
    ABI: any
): T | null {
    const {library, account, chainId} = useWeb3React();

    return useMemo(() => {
        if (!address || !ABI || !library || !chainId) {
            return null;
        }

        try {
            return new Contract(address, ABI, library.getSigner(account));
        } catch (e) {
            console.error("Failed to Get Contract", e);

            return null
        }
    }, [address, ABI, library, account, chainId]) as T;
}