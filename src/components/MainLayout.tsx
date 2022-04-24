import { Box, Container, Flex, Stack, Icon } from '@chakra-ui/react'

import { AiFillInstagram } from 'react-icons/ai'
import ConnectMetamaskButton from './ConnectMetamaskButton'
import UploadNFTButton from './UploadNFTButton'
interface MainLayoutProps {
  children: JSX.Element
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Box borderBottom="2px" borderColor="gray.200" px={4} position="sticky">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Icon color="pink.500" w={10} h={10} as={AiFillInstagram} />
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <UploadNFTButton />
              <ConnectMetamaskButton />
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Container as="main" mt={5}>
        {children}
      </Container>
    </>
  )
}

export default MainLayout
