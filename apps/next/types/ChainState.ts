import { TokenState } from "./TokenState";

export class ChainState {
    name: string = '';
    networkKey: string = '';
    chainId: number = 0;
    logoUrl: string = '';
    rpcUrl: string = '';
    explorerName: string = '';
    explorerURL: string = '';
    Coin: TokenState;
    info: {
        blockPerSeconds: number;
        multicallAddr?: string;
        theme?: {
            bgGradient: string;
        };
    };
    constructor(args: Partial<ChainState>) {
        Object.assign(this, args);
    }
}