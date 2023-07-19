/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getToastChain = /* GraphQL */ `
  query GetToastChain($chainId: ID!) {
    getToastChain(chainId: $chainId) {
      initiatorId
      chainId
      recipientName
      recipientImg
      recipientId
      created
      detailsOccasion
      detailsDescription
      deadline
      initiatorLink
      initiatorName
      initiatorPhone
      initiatorPhoto
      stitchedVideoUrl
      stitchingVideo
      participantIds
      finalized
      transactionId
    }
  }
`;
export const listToastChains = /* GraphQL */ `
  query ListToastChains(
    $filter: TableToastChainFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listToastChains(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        initiatorId
        chainId
        recipientName
        recipientImg
        recipientId
        created
        detailsOccasion
        detailsDescription
        deadline
        initiatorLink
        initiatorName
        initiatorPhone
        initiatorPhoto
        stitchedVideoUrl
        stitchingVideo
        participantIds
        finalized
        transactionId
      }
      nextToken
    }
  }
`;
export const getRecordedVideo = /* GraphQL */ `
  query GetRecordedVideo($id: ID!) {
    getRecordedVideo(id: $id) {
      id
      videoName
      url
      snapshotUrl
      initiatorId
      chainId
      initiatedVideo
      participantId
      participantPhone
      participantName
      participantPhoto
      stitchPosition
      recipientId
      type
    }
  }
`;
export const listRecordedVideos = /* GraphQL */ `
  query ListRecordedVideos(
    $filter: TableRecordedVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordedVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        videoName
        url
        snapshotUrl
        initiatorId
        chainId
        initiatedVideo
        participantId
        participantPhone
        participantName
        participantPhoto
        stitchPosition
        recipientId
        type
      }
      nextToken
    }
  }
`;
export const queryRecordedVideosByChainId = /* GraphQL */ `
  query QueryRecordedVideosByChainId(
    $chainId: String!
    $first: Int
    $after: String
  ) {
    queryRecordedVideosByChainId(
      chainId: $chainId
      first: $first
      after: $after
    ) {
      items {
        id
        videoName
        url
        snapshotUrl
        initiatorId
        chainId
        initiatedVideo
        participantId
        participantPhone
        participantName
        participantPhoto
        stitchPosition
        recipientId
        type
      }
      nextToken
    }
  }
`;
export const getNotify = /* GraphQL */ `
  query GetNotify($id: ID!) {
    getNotify(id: $id) {
      id
      chainId
      initiatorId
      photo
      created
      text
      isNew
      type
    }
  }
`;
export const listNotifies = /* GraphQL */ `
  query ListNotifies(
    $filter: TableNotifyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chainId
        initiatorId
        photo
        created
        text
        isNew
        type
      }
      nextToken
    }
  }
`;
