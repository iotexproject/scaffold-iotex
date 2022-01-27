import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {

}

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    config,
    colors,
    styles: {
        global: {
            body: {
                // bg: 'mainColor',
                // color: 'textLight85',
                // fontFamily: "Poppins, sans-serif",
                // fontWeight: '600'
            },
            button: {
                // color: 'black',
            }
        }
    }
})