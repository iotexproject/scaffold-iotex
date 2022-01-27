import useContract from "./useContract";
import {PebbleCoin} from "@scaffoldex/hardhat/typechain-types";
import ABI from "../../contracts/hardhat_contracts.json";
import erc20 from "../../contracts/erc20.json";
import {useWeb3React} from "@web3-react/core";
import {useEffect, useState} from "react";

export default function usePaytokenContract() {
    const { chainId } = useWeb3React()
    const [contract, setContract] = useState<PebbleCoin | null>()

    const usdt = useContract<PebbleCoin>(ABI[chainId ?? 0]?.iotex_testnet.contracts.PebbleCoin.address, erc20)

    useEffect(() => {
        setContract(usdt)
    }, [usdt])

    return contract
}