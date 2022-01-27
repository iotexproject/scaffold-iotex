import {Button, Stack, Input, Spinner} from "@chakra-ui/react";
import {useState} from "react";
import usePaytokenContract from "../../hooks/contracts/usePebbleCoinContract";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {helper} from "../../lib/helper";
import { useToast } from '@chakra-ui/react'
import BigNumber from "bignumber.js";

export const Transfer = () => {
    const toast = useToast()
    const [amount, setAmount] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const pbl = usePaytokenContract()
    const {library} = useWeb3React<Web3Provider>()

    const handleTransfer = async () => {
        setLoading(true)
        const toTransfer = new BigNumber(amount);
        const decimals = await pbl.decimals()
        const [err, res] = await helper.promise
            .runAsync(pbl.connect(library.getSigner()).transfer(address, toTransfer.multipliedBy(new BigNumber(10).pow(decimals)).toFixed()))

        if (err) {
            toast({
                title: err.name,
                description: err.message,
                status: "error",
                duration: 9000,
                isClosable: true
            })
        } else {
            await res.wait(1)
            toast({
                title: "Transfer successful",
                description: `User: ${address} Amount: ${amount}`,
                status: "success",
                duration: 9000,
                isClosable: true
            })
        }
        setLoading(false)
    }

    return (
        <Stack>
            <Input
                variant={"filled"}
                value={amount}
                onChange={(e) => {setAmount(e.target.value)}}
                placeholder={"Transfer amount"}
            />
            <Input
                variant={"filled"}
                value={address}
                onChange={(e) => {setAddress(e.target.value)}}
                placeholder={"recipient address"}
            />
            <Button
                minW={'100px'}
                disabled={!amount || !address || loading}
                onClick={handleTransfer}
            >
                {loading?<Spinner/>:"Transfer"}
            </Button>
        </Stack>
    )
}