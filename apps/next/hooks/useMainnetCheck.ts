import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {IotexMainnetConfig} from "../config/IotexMainnetConfig";
import {useEffect, useState} from "react";

export const useMainnetCheck = () => {
    const {chainId} = useWeb3React<Web3Provider>()
    const [isMainnet, setIsMainnet] = useState<boolean>(false)

    useEffect(() => {
        setIsMainnet(chainId == IotexMainnetConfig.chainId)
    }, [chainId])

    return isMainnet
}