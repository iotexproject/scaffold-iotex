import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useETHBalance from "../../hooks/useEthBalance";
import { helper } from "../../lib/helper";

const ETHBalance = () => {
    const { account } = useWeb3React<Web3Provider>();
    const { data } = useETHBalance(account);

    return <>{helper.number.parseBalance(data ?? 0)}</>;
};

export default ETHBalance;