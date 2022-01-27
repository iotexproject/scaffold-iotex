import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import {useEffect, useState} from "react";
import {ChainState} from "../types/ChainState";
import {EthNetworkConfig} from "../config/EthNetworkConfig";

export default function useChain() {
    const { chainId } = useWeb3React<Web3Provider>();
    const [ chain, setChain] = useState<ChainState>()

    useEffect(() => {
        setChain(EthNetworkConfig.chain.map[chainId ?? 4690])
    }, [chainId])

    return chain;
}