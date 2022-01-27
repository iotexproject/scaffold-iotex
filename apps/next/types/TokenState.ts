import erc20abi from "../contracts/erc20.json"
import { BigNumberState } from "./BigNumberState";

export class TokenState {
    abi = erc20abi;
    name: string = '';
    symbol: string = '';
    address: string = '';
    logoURI: string = '';
    chainId: number = 0;
    decimals: number = 18;
    balance: BigNumberState;

    constructor(args: Partial<TokenState>) {
        Object.assign(this, args);
        this.balance = new BigNumberState({ decimals: this.decimals});
    }
}