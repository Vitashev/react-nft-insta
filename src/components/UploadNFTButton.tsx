import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useAddress, useNFTCollection } from '@thirdweb-dev/react'
import { CgAddR } from 'react-icons/cg'
import { useState, FunctionComponent, useContext } from 'react'

import { NFT_COLLECTION_MUMBAI_CONTRACT } from '../config/contracts'
import { AppContext } from '../App'
import { NFTMetadataOwner } from '@thirdweb-dev/sdk'

interface Props {}

const UploadNFTButton: FunctionComponent<Props> = () => {
  const { setNftList } = useContext(AppContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [file, setFile] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const address = useAddress()

  const nft = useNFTCollection(NFT_COLLECTION_MUMBAI_CONTRACT)

  const onChangeHandle = (event: any) => {
    setFile(event.target.files[0])
  }

  const uploadHandle = () => {
    if (!address) {
      return
    }
    setIsLoading(true)
    nft
      ?.mintTo(address, {
        name,
        description,
        image: file,
      })
      .then(() => {
        return nft?.getAll()
      })
      .then((nftsRes: NFTMetadataOwner[]) => {
        setNftList(nftsRes)
      })
      .finally(() => {
        setIsLoading(false)
        onClose()
      })
  }

  return (
    <>
      {address && (
        <>
          <Icon
            onClick={onOpen}
            color="pink.500"
            w={10}
            h={10}
            as={CgAddR}
            cursor="pointer"
          ></Icon>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Upload NFT</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">File</FormLabel>
                  <Input id="email" type="file" onChange={onChangeHandle} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="pink"
                  isLoading={isLoading}
                  onClick={uploadHandle}
                >
                  Upload
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>{' '}
        </>
      )}
    </>
  )
}

export default UploadNFTButton
