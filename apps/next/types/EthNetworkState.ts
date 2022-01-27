import {MappingState} from "./MappingState";
import {ChainState} from "./ChainState";

export class EthNetworkState {
    chain: MappingState<ChainState>;
    allowChains: number[] = [];

    constructor(args: Partial<EthNetworkState>) {
        Object.assign(this, args);
    }
}