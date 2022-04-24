import { Flex, Text } from '@chakra-ui/react'
import { useAddress } from '@thirdweb-dev/react'

import ConnectMetamaskButton from './ConnectMetamaskButton'
import NFTSlideshow from './NFTSlideshow'

const Home = () => {
  const address = useAddress()

  return (
    <>
      {address ? (
        <NFTSlideshow />
      ) : (
        <Flex justifyContent="center" alignItems="center" flexDir={'column'}>
          <Text px={8}>Connect Metamask wallet to start posting your NFTs</Text>
          <ConnectMetamaskButton />
        </Flex>
      )}
    </>
  )
}

export default Home
