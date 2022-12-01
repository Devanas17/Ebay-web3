import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {TransactionProvider} from "../context/TransactionContract"

const {chains, provider} = configureChains(
  [chain.localhost, chain.goerli, chain.polygonMumbai],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "Ebay Clone",
  chains,
})

const wagmiClient = createClient({
  connectors,
  provider
})



export default function App({ Component, pageProps }: AppProps) {
  return(
      <WagmiConfig client={wagmiClient} >
        <TransactionProvider>
        <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
        </RainbowKitProvider>
        </TransactionProvider>
      </WagmiConfig>
     )
}
