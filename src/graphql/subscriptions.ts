/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateToastChain = /* GraphQL */ `
  subscription OnCreateToastChain(
    $initiatorId: ID
    $chainId: ID
    $recipientName: String
    $created: Int
    $detailsOccasion: String
  ) {
    onCreateToastChain(
      initiatorId: $initiatorId
      chainId: $chainId
      recipientName: $recipientName
      created: $created
      detailsOccasion: $detailsOccasion
    ) {
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
export const onUpdateToastChain = /* GraphQL */ `
  subscription OnUpdateToastChain(
    $initiatorId: ID
    $chainId: ID
    $recipientName: String
    $created: Int
    $detailsOccasion: String
  ) {
    onUpdateToastChain(
      initiatorId: $initiatorId
      chainId: $chainId
      recipientName: $recipientName
      created: $created
      detailsOccasion: $detailsOccasion
    ) {
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
export const onDeleteToastChain = /* GraphQL */ `
  subscription OnDeleteToastChain(
    $initiatorId: ID
    $chainId: ID
    $recipientName: String
    $created: Int
    $detailsOccasion: String
  ) {
    onDeleteToastChain(
      initiatorId: $initiatorId
      chainId: $chainId
      recipientName: $recipientName
      created: $created
      detailsOccasion: $detailsOccasion
    ) {
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
export const onCreateRecordedVideo = /* GraphQL */ `
  subscription OnCreateRecordedVideo(
    $id: ID
    $videoName: String
    $url: String
    $snapshotUrl: String
    $initiatorId: String
  ) {
    onCreateRecordedVideo(
      id: $id
      videoName: $videoName
      url: $url
      snapshotUrl: $snapshotUrl
      initiatorId: $initiatorId
    ) {
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
export const onUpdateRecordedVideo = /* GraphQL */ `
  subscription OnUpdateRecordedVideo(
    $id: ID
    $videoName: String
    $url: String
    $snapshotUrl: String
    $initiatorId: String
  ) {
    onUpdateRecordedVideo(
      id: $id
      videoName: $videoName
      url: $url
      snapshotUrl: $snapshotUrl
      initiatorId: $initiatorId
    ) {
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
export const onDeleteRecordedVideo = /* GraphQL */ `
  subscription OnDeleteRecordedVideo(
    $id: ID
    $videoName: String
    $url: String
    $snapshotUrl: String
    $initiatorId: String
  ) {
    onDeleteRecordedVideo(
      id: $id
      videoName: $videoName
      url: $url
      snapshotUrl: $snapshotUrl
      initiatorId: $initiatorId
    ) {
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
export const onCreateNotify = /* GraphQL */ `
  subscription OnCreateNotify(
    $id: ID
    $chainId: ID
    $initiatorId: String
    $photo: String
    $created: Int
  ) {
    onCreateNotify(
      id: $id
      chainId: $chainId
      initiatorId: $initiatorId
      photo: $photo
      created: $created
    ) {
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
export const onUpdateNotify = /* GraphQL */ `
  subscription OnUpdateNotify(
    $id: ID
    $chainId: ID
    $initiatorId: String
    $photo: String
    $created: Int
  ) {
    onUpdateNotify(
      id: $id
      chainId: $chainId
      initiatorId: $initiatorId
      photo: $photo
      created: $created
    ) {
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
export const onDeleteNotify = /* GraphQL */ `
  subscription OnDeleteNotify(
    $id: ID
    $chainId: ID
    $initiatorId: String
    $photo: String
    $created: Int
  ) {
    onDeleteNotify(
      id: $id
      chainId: $chainId
      initiatorId: $initiatorId
      photo: $photo
      created: $created
    ) {
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
