import {Button, HStack, Img, Text, chakra, Box} from "@chakra-ui/react";
import {useWeb3React} from "@web3-react/core";
import {helper} from "../../lib/helper";
import ETHBalance from "../../components/ETHBalance";
import useChain from "../../hooks/useChain";
import {ChainInfo} from "../../components/Chain";
import useMetaMaskOnboarding from "../../hooks/useMetaMaskOnboarding";
import {useEffect, useState} from "react";
import {injected} from "../../lib/web3-react";
import {UserRejectedRequestError} from "@web3-react/injected-connector";

import {IotexMainnetConfig} from "../../config/IotexMainnetConfig";
import {metamaskUtils} from "../../lib/metamaskUtils";
import {Web3Error} from "../../components/Error";

export function WalletInfo() {

    const { account, activate, error, setError, active } = useWeb3React();
    const { isMetaMaskInstalled, isWeb3Available } = useMetaMaskOnboarding()
    const [connecting, setConnecting] = useState<boolean>(false);
    const [web3Available, web3AvailableSet] = useState<boolean>(false)
    const chain = useChain();

    useEffect(() => {
       if (error || active) {
           setConnecting(false)
       }
    }, [error, active])

    useEffect(() => {
        web3AvailableSet(!!isWeb3Available)
    }, [isWeb3Available])

    const handleConnect = () => {
        setConnecting(true)
        activate(injected, undefined, true).catch((error) => {
            if (error instanceof UserRejectedRequestError) {
                setConnecting(false)
            } else {
                setError(error);
            }
        })
    }

    const handleSetupNetwork = async () => {
        const changedToIoTeX = await metamaskUtils.setupNetwork(
            {
                chainId: IotexMainnetConfig.chainId,
                chainName: IotexMainnetConfig.name,
                rpcUrls: [IotexMainnetConfig.rpcUrl],
                blockExplorerUrls: [IotexMainnetConfig.explorerURL],
                nativeCurrency: IotexMainnetConfig.Coin
            }
        )
        if (changedToIoTeX) {
            handleConnect()
        }
    }

    // return null if error
    if (error) {
        return (
            <Web3Error error={error} handleSetupNetwork={handleSetupNetwork}/>
        )
    }

    // return connect button if not connected yet
    if (typeof account !== "string") {
        return (
            <HStack>
                {web3Available && (
                    <Button
                        key={'button-without-connect'}
                        w={80} size={'lg'}
                        borderRadius={'full'}
                        bg={'brandColor'}
                        disabled={connecting}
                        onClick={handleConnect}
                    >
                        {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
                    </Button>
                )}
            </HStack>
        );
    }

    // return chain info and wallet balance
    return(
        <HStack>
            <ChainInfo/>
            <Button variant={"ghost"} size={'lg'} pr="0" pl={2} borderRadius={'full'}>
                <Text mr="2">
                    <chakra.span mr={1}><ETHBalance/></chakra.span>
                    <chakra.span>{chain?.Coin.symbol}</chakra.span>
                </Text>
                <HStack
                    h={'full'}
                    borderRadius={'full'}
                    px={4}
                    spacing={4}
                    sx={{
                        color: 'white',
                        bgGradient: chain?.info.theme?.bgGradient,
                        _hover: { bgGradient: chain?.info.theme?.bgGradient },
                        _active: { bgGradient: chain?.info.theme?.bgGradient }
                    }}
                >
                    <Text>{helper.string.truncate(account, 12, '...')}</Text>
                    <Img w={5} src="images/account.svg" />
                </HStack>
            </Button>
        </HStack>
    )
}

export default WalletInfo