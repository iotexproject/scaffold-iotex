import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from "../lib/theme";
import {Web3ReactProvider} from "@web3-react/core";
import {getLibrary} from "../lib/web3-react";
import { Provider } from 'react-redux'

import store from "../store";
import Layout from "../containers/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return(
      <ChakraProvider theme={theme}>
          <Web3ReactProvider getLibrary={getLibrary}>
              <Provider store={store}>
                  <Layout>
                      <Component {...pageProps} />
                  </Layout>
              </Provider>
          </Web3ReactProvider>
      </ChakraProvider>
  )
}

export default MyApp
