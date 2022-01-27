export const metamaskUtils = {
    setupNetwork: async ({
                             chainId,
                             chainName,
                             rpcUrls,
                             blockExplorerUrls,
                             nativeCurrency
                         }: {
                            chainId: number;
                            chainName: string;
                            rpcUrls: string[];
                            blockExplorerUrls: string[];
                            nativeCurrency: {
                            name: string;
                            symbol: string;
                            decimals: number;
        };
    }) => {
        //@ts-ignore
        const provider = window.ethereum;
        if (provider) {
            try {
                //@ts-ignore
                await provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName,
                            nativeCurrency,
                            rpcUrls,
                            blockExplorerUrls
                        }
                    ]
                });
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        } else {
            console.error("Can't setup the IoTeX network on metamask because window.ethereum is undefined");
            return false;
        }
    }
}