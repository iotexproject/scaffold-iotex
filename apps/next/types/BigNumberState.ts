import BigNumber from "bignumber.js";
import {helper} from "../lib/helper";

export class BigNumberState {
    value = new BigNumber(0);
    loading: boolean = false;
    decimals = 18;
    fixed = 6;
    formatter?: Function;

    constructor(args: Partial<BigNumberState>) {
        Object.assign(this, args);
    }

    getFormat({ decimals = this.decimals, fixed = this.fixed }: { decimals?: number; fixed?: number } = {}) {
        if (this.loading) return '...';
        if (this.formatter) return this.formatter(this);
        return helper.number.toPrecisionFloor(new BigNumber(this.value).dividedBy(10 ** decimals).toFixed(), {
            decimals: fixed
        });
    }
    setDecimals(decimals: number) {
        this.decimals = decimals;
    }
    setValue(value: BigNumber) {
        this.value = value;
    }
    setLoading(val: boolean) {
        this.loading = val;
    }
}