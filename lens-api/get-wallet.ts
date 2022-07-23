import apolloClient from './apollo-client.js'
import { gql } from '@apollo/client'
import { useState } from 'react'
import { isCommunityResourcable } from '@ethersproject/providers'

const GET_WALLET = `
  query Profile($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
          type
        }
        ... on RevertFollowModuleSettings {
          type
        }
      }
    }
  }
`
const getWallet = async (handleid: string) => {
  const res = await apolloClient.query({
    query: gql(GET_WALLET),
    variables: {
      request: {
        handle: handleid,
      },
    },
  })
  const empty: string = ''
  return res?.data?.profile?.ownedBy ? res.data.profile.ownedBy : empty
}
export default getWallet
