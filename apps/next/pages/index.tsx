import type { NextPage } from 'next'
import Head from 'next/head'
import {useEagerConnect} from "../hooks/useEagerConnect";
import {Container, Center, Heading, Stack} from "@chakra-ui/react";
import {useAppSelector} from "../hooks/useAppSelector";
import {getFormattedBalance} from "../modules/erc20/balanceSlice";
import {useUsdtBalance} from "../hooks/erc20/useUsdtBalance";
import {Transfer} from "../containers/Transfer";

const Home: NextPage = () => {
    const tried = useEagerConnect()
    useUsdtBalance()
    const balance = useAppSelector(getFormattedBalance)

    return (
        <div>
            <Head>
                <title>Pebble Coin</title>
                <meta name="description" content="Hold and transfer PBL easily" />
                <link rel="icon" href="/images/iotex_logo.png" />
            </Head>

            <main>
                <Container h={'100vh'}>
                    <Center h={'full'} textAlign={'center'}>
                        <Stack w={'full'} spacing={8}>
                            <Heading>
                                My PBL balance is {balance || 0}
                            </Heading>
                            <Transfer/>
                        </Stack>
                    </Center>
                </Container>
            </main>
        </div>
    )
}

export default Home