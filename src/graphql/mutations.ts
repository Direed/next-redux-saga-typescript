/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createToastChain = /* GraphQL */ `
  mutation CreateToastChain($input: CreateToastChainInput!) {
    createToastChain(input: $input) {
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
export const updateToastChain = /* GraphQL */ `
  mutation UpdateToastChain($input: UpdateToastChainInput!) {
    updateToastChain(input: $input) {
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
export const deleteToastChain = /* GraphQL */ `
  mutation DeleteToastChain($input: DeleteToastChainInput!) {
    deleteToastChain(input: $input) {
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
export const createRecordedVideo = /* GraphQL */ `
  mutation CreateRecordedVideo($input: CreateRecordedVideoInput!) {
    createRecordedVideo(input: $input) {
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
export const updateRecordedVideo = /* GraphQL */ `
  mutation UpdateRecordedVideo($input: UpdateRecordedVideoInput!) {
    updateRecordedVideo(input: $input) {
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
export const deleteRecordedVideo = /* GraphQL */ `
  mutation DeleteRecordedVideo($input: DeleteRecordedVideoInput!) {
    deleteRecordedVideo(input: $input) {
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
export const createNotify = /* GraphQL */ `
  mutation CreateNotify($input: CreateNotifyInput!) {
    createNotify(input: $input) {
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
export const updateNotify = /* GraphQL */ `
  mutation UpdateNotify($input: UpdateNotifyInput!) {
    updateNotify(input: $input) {
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
export const deleteNotify = /* GraphQL */ `
  mutation DeleteNotify($input: DeleteNotifyInput!) {
    deleteNotify(input: $input) {
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
