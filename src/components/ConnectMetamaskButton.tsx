import { Button, Text } from '@chakra-ui/react'
import { useMetamask, useAddress } from '@thirdweb-dev/react'
import { MdAccountBalanceWallet } from 'react-icons/md'

const ConnectMetamaskButton = () => {
  const connectWithMetamask = useMetamask()

  const address = useAddress()
  return (
    <>
      {address ? (
        <Button
          colorScheme="pink"
          onClick={connectWithMetamask}
          leftIcon={<MdAccountBalanceWallet />}
        >
          <>
            Connected as{' '}
            <Text isTruncated maxW={50}>
              {address}{' '}
            </Text>
          </>
        </Button>
      ) : (
        <Button
          colorScheme="pink"
          onClick={connectWithMetamask}
          leftIcon={<MdAccountBalanceWallet />}
        >
          Connect Metamask
        </Button>
      )}
    </>
  )
}

export default ConnectMetamaskButton
