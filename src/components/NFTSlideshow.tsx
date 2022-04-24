import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Icon,
  CircularProgress,
} from '@chakra-ui/react'
import { useNFTCollection } from '@thirdweb-dev/react'
import { NFTMetadataOwner } from '@thirdweb-dev/sdk'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { NFT_COLLECTION_MUMBAI_CONTRACT } from '../config/contracts'
import { AiFillHeart } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import UploadNFTButton from './UploadNFTButton'

const NFTSlideshow = () => {
  const nftCollection = useNFTCollection(NFT_COLLECTION_MUMBAI_CONTRACT)
  const { nftList, setNftList } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (!nftList.length) {
      nftCollection?.getAll().then((nftsRes: NFTMetadataOwner[]) => {
        setNftList(nftsRes)
        setIsLoading(false)
      })
    }
  }, [])

  const ProgressCircleTemplate = () => (
    <Flex justifyContent="center" alignItems="center">
      <CircularProgress isIndeterminate color="pink.500" boxSize={200} />
    </Flex>
  )

  const NoNFTTemplate = () => (
    <Flex justifyContent="center" alignItems="center">
      <Text px={8}>You don't have NFT yet, start uploading your first NFT</Text>
      <UploadNFTButton />
    </Flex>
  )

  const NFTListTemplate = () => {
    return (
      <>
        {nftList.map((nft: any, index: number) => (
          <Box
            key={index}
            p={5}
            shadow="md"
            borderWidth="1px"
            mb={5}
            borderRadius={10}
          >
            <Heading fontSize="xl">{nft.metadata.name}</Heading>
            <Flex justifyContent="space-around" alignItems="center">
              <Image
                width={300}
                height={450}
                objectFit="cover"
                src={nft.metadata.image}
                alt="Dan Abramov"
              />
            </Flex>
            <Flex justifyContent="flex-end" alignItems="center" gap={4}>
              <Icon
                color="pink.500"
                w={10}
                h={10}
                as={AiFillHeart}
                cursor="pointer"
              />
              <Icon
                color="pink.500"
                w={10}
                h={10}
                as={BiCommentDetail}
                cursor="pointer"
              />
            </Flex>
            <Text mt={4}>{nft.metadata.description}</Text>
          </Box>
        ))}
      </>
    )
  }

  return (
    <Box h="80vh" overflow="auto" p={5}>
      {isLoading ? (
        <ProgressCircleTemplate />
      ) : nftList.length ? (
        <NFTListTemplate />
      ) : (
        <NoNFTTemplate />
      )}
    </Box>
  )
}

export default NFTSlideshow
