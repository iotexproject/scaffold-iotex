import type {
    ExternalProvider,
    JsonRpcFetchFunc,
} from "@ethersproject/providers";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import {EthNetworkConfig} from "../config/EthNetworkConfig";

export function getLibrary(
    provider: ExternalProvider | JsonRpcFetchFunc
) {
    return new Web3Provider(provider);
}

export const injected = new InjectedConnector({
    supportedChainIds: EthNetworkConfig.allowChains,
});