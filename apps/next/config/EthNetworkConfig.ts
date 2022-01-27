import {EthNetworkState} from "../types/EthNetworkState";
import {IotexMainnetConfig} from "./IotexMainnetConfig";
import {IotexTestnetConfig} from "./IotexTestnetConfig";
import {MappingState} from "../types/MappingState";

const chains = [IotexMainnetConfig, IotexTestnetConfig]

export const EthNetworkConfig = new EthNetworkState({
    allowChains: chains.map(chain => chain.chainId),
    chain: new MappingState({
        map: chains.reduce((p, c) => {
            p[c.chainId] = c;
            return p;
        }, {})
    })
})