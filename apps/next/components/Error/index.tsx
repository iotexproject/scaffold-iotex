import {NoEthereumProviderError} from "@web3-react/injected-connector";
import {Alert, AlertDescription, AlertIcon, HStack, Text} from "@chakra-ui/react";
import Link from "next/link";
import {UnsupportedChainIdError} from "@web3-react/core";

interface ParamTypes {
    error: any
    handleSetupNetwork: any
}

export const Web3Error = ({error, handleSetupNetwork}:ParamTypes) => {

    if (error instanceof NoEthereumProviderError) {
        return (
            <HStack>
                <Alert status='error' borderRadius={'md'} color={'black'}>
                    <AlertIcon />
                    <AlertDescription>
                        Please install{" "}
                        <Link href={"https://metamask.io/download.html"}>
                            <a style={{textDecoration: "underline", color: "white"}} target={"_blank"}>Metamask plugin</a>
                        </Link>
                        {" "} for your browser.
                        {/*or open this page inside [ioPay mobile](deep link to open ioPay browser)*/}
                    </AlertDescription>
                </Alert>
            </HStack>
        )
    }
    if (error instanceof UnsupportedChainIdError) {
        return (
            <HStack>
                <Alert status='error' borderRadius={'md'} color={'black'}>
                    <AlertIcon />
                    <AlertDescription>
                        <HStack>
                            <Text>Make sure you {" "}</Text>
                            <Text textDecoration={"underline"} textColor={"white"} onClick={handleSetupNetwork} _hover={{cursor: "pointer"}}>
                                selected the IoTeX network
                            </Text>
                            <Text>{" "} in Metamask</Text>
                        </HStack>
                        {/*for your browser or open this page inside [ioPay mobile](deep link to open ioPay browser)*/}
                    </AlertDescription>
                </Alert>
            </HStack>
        )
    }

    return(
        <HStack>
            <Alert status='error' borderRadius={'md'} color={'black'}>
                <AlertIcon />
                <AlertDescription>{error.message}</AlertDescription>
            </Alert>
        </HStack>
    )
}