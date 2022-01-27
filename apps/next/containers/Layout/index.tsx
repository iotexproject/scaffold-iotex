import {DarkMode} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";

export default function Layout({ children }:{children: any}) {
    return (
        <DarkMode>
            <Navbar/>
            <main>{children}</main>
        </DarkMode>
    )
}