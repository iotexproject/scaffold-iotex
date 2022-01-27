import {Box, Button, Img} from "@chakra-ui/react";
import useChain from "../../hooks/useChain";

export const ChainInfo = () => {
    const chain = useChain();

    return(
        <Button variant={"ghost"} size={'lg'} pl={1} borderRadius="40">
            <Img src={chain?.logoUrl}/>
            <Box ml={2}>{chain?.name}</Box>
        </Button>
    )
}