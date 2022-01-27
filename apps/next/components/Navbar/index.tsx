import {
    Container,
    Stack,
    Heading,
    HStack,
} from "@chakra-ui/react";

import Link from "next/link";
import {Menu} from "./Menu";
import Image from 'next/image'
import {WalletInfo} from "../../containers/WalletInfo";

export const Navbar = () => {
    return(
        <header>
            <nav>
                <Stack
                    as={"header"}
                    minH={'60px'}
                    boxShadow={'base'}
                    w={'full'}
                    justify={"center"}
                    position={"fixed"}
                    zIndex={1000}
                >
                    <Container maxW={'7xl'} align={'center'}>
                        <HStack justify={"space-between"}>
                            <Link href={'/'}>
                                <a>
                                    <HStack>
                                        <Image
                                            src="/images/logo/iotex.svg"
                                            alt="Pebble coin logo"
                                            width={'40px'}
                                            height={'40px'}
                                        />
                                        <Heading fontWeight={600} as={'h1'} fontSize={'20px'} display={{ base: 'none', md: 'block' }}>
                                            Pebble Coin
                                        </Heading>
                                    </HStack>
                                </a>
                            </Link>

                            {/*<Menu/>*/}

                            <WalletInfo/>

                        </HStack>
                    </Container>
                </Stack>
            </nav>
        </header>
    )
}

export default Navbar