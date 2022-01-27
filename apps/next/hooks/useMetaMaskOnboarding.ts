import {useEffect, useState} from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export default function useMetaMaskOnboarding() {
    const [isMetaMaskInstalled, isMetaMaskInstalledSet] = useState<boolean>();

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        async function checkForMetamask() {
            const provider = detectEthereumProvider({
                timeout: 1000,
                mustBeMetaMask: true,
            });

            if (provider) isMetaMaskInstalledSet(true);
            else isMetaMaskInstalledSet(false);
        }

        checkForMetamask()
    })

    const isWeb3Available = typeof window !== 'undefined' &&  window?.ethereum;

    return {
        isMetaMaskInstalled,
        isWeb3Available
    }
}