import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    mainColor: '#1C1B30',
    textLight85: 'rgba(255, 255, 255, 0.85)',
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
                bg: 'mainColor',
                color: 'textLight85',
                fontFamily: "Poppins, sans-serif",
                fontWeight: '600'
            },
            button: {
                // color: 'black',
            }
        }
    }
})