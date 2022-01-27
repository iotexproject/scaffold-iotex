import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'

export const Menu = () => {

    return(
        <Breadcrumb separator={''} spacing={8} letterSpacing={"1.1px"}>
            <BreadcrumbItem>
                <Link href={'/'}>
                    <BreadcrumbLink>
                        Home
                    </BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

        </Breadcrumb>
    )
}