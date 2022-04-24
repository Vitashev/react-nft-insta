import { createContext, useState } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { ChainId, NFTMetadataOwner } from '@thirdweb-dev/sdk'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import { Buffer } from 'buffer'
// If encounter no Buffer found error during uploading NFT
window.Buffer = Buffer
export const AppContext = createContext<Record<string, any>>({})
function App() {
  const [nftList, setNftList] = useState<NFTMetadataOwner[]>([])
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <AppContext.Provider value={{ nftList, setNftList }}>
        <ChakraProvider>
          <MainLayout>
            <Home />
          </MainLayout>
        </ChakraProvider>
      </AppContext.Provider>
    </ThirdwebProvider>
  )
}

export default App
