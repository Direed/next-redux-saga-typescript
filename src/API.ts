/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateToastChainInput = {
  initiatorId: string,
  chainId: string,
  recipientName: string,
  recipientImg?: string | null,
  recipientId?: string | null,
  created: number,
  detailsOccasion?: string | null,
  detailsDescription?: string | null,
  deadline?: number | null,
  initiatorLink: string,
  initiatorName?: string | null,
  initiatorPhone: string,
  initiatorPhoto?: string | null,
  stitchingVideo?: boolean | null,
  stitchedVideoUrl?: string | null,
  participantIds: Array< string | null >,
  finalized?: boolean | null,
  transactionId?: string | null,
};

export type ToastChain = {
  __typename: "ToastChain",
  initiatorId?: string,
  chainId?: string,
  recipientName?: string,
  recipientImg?: string | null,
  recipientId?: string | null,
  created?: number,
  detailsOccasion?: string | null,
  detailsDescription?: string | null,
  deadline?: number | null,
  initiatorLink?: string,
  initiatorName?: string | null,
  initiatorPhone?: string,
  initiatorPhoto?: string | null,
  stitchedVideoUrl?: string | null,
  stitchingVideo?: boolean | null,
  participantIds?: Array< string | null > | null,
  finalized?: boolean | null,
  transactionId?: string | null,
};

export type UpdateToastChainInput = {
  initiatorId?: string | null,
  chainId: string,
  recipientName?: string | null,
  recipientImg?: string | null,
  recipientId?: string | null,
  created?: number | null,
  detailsOccasion?: string | null,
  detailsDescription?: string | null,
  deadline?: number | null,
  initiatorLink?: string | null,
  initiatorName?: string | null,
  initiatorPhone?: string | null,
  initiatorPhoto?: string | null,
  stitchedVideoUrl?: string | null,
  stitchingVideo?: boolean | null,
  participantIds?: Array< string | null > | null,
  finalized?: boolean | null,
  transactionId?: string | null,
};

export type DeleteToastChainInput = {
  chainId: string,
};

export type CreateRecordedVideoInput = {
  videoName?: string | null,
  url?: string | null,
  snapshotUrl?: string | null,
  initiatorId?: string | null,
  chainId: string,
  initiatedVideo?: boolean | null,
  recipientId?: string | null,
  type?: string | null,
  participantId?: string | null,
  participantPhone?: string | null,
  participantName?: string | null,
  participantPhoto?: string | null,
  stitchPosition?: number | null,
};

export type RecordedVideo = {
  __typename: "RecordedVideo",
  id?: string,
  videoName?: string | null,
  url?: string | null,
  snapshotUrl?: string | null,
  initiatorId?: string | null,
  chainId?: string,
  initiatedVideo?: boolean | null,
  participantId?: string | null,
  participantPhone?: string | null,
  participantName?: string | null,
  participantPhoto?: string | null,
  stitchPosition?: number | null,
  recipientId?: string | null,
  type?: string | null,
};

export type UpdateRecordedVideoInput = {
  id: string,
  videoName?: string | null,
  url?: string | null,
  snapshotUrl?: string | null,
  initiatorId?: string | null,
  chainId?: string | null,
  initiatedVideo?: boolean | null,
  participantId?: string | null,
  participantPhone?: string | null,
  participantName?: string | null,
  participantPhoto?: string | null,
  stitchPosition?: number | null,
  recipientId?: string | null,
  type?: string | null,
};

export type DeleteRecordedVideoInput = {
  id: string,
};

export type CreateNotifyInput = {
  chainId: string,
  initiatorId?: string | null,
  photo?: string | null,
  created?: number | null,
  text?: string | null,
  isNew?: boolean | null,
  type?: string | null,
};

export type Notify = {
  __typename: "Notify",
  id?: string,
  chainId?: string,
  initiatorId?: string | null,
  photo?: string | null,
  created?: number | null,
  text?: string | null,
  isNew?: boolean | null,
  type?: string | null,
};

export type UpdateNotifyInput = {
  id: string,
  chainId?: string | null,
  initiatorId?: string | null,
  photo?: string | null,
  created?: number | null,
  text?: string | null,
  isNew?: boolean | null,
  type?: string | null,
};

export type DeleteNotifyInput = {
  id: string,
};

export type TableToastChainFilterInput = {
  initiatorId?: TableIDFilterInput | null,
  chainId?: TableIDFilterInput | null,
  recipientName?: TableStringFilterInput | null,
  recipientImg?: TableStringFilterInput | null,
  recipientId?: TableIDFilterInput | null,
  created?: TableIntFilterInput | null,
  detailsOccasion?: TableStringFilterInput | null,
  detailsDescription?: TableStringFilterInput | null,
  deadline?: TableIntFilterInput | null,
  initiatorLink?: TableStringFilterInput | null,
  initiatorName?: TableStringFilterInput | null,
  initiatorPhone?: TableStringFilterInput | null,
  initiatorPhoto?: TableStringFilterInput | null,
  stitchedVideoUrl?: TableStringFilterInput | null,
  stitchingVideo?: TableBooleanFilterInput | null,
  participantIds?: TableStringFilterInput | null,
  finalized?: TableBooleanFilterInput | null,
  transactionId?: TableStringFilterInput | null,
};

export type TableIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type TableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type TableIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type TableBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ToastChainConnection = {
  __typename: "ToastChainConnection",
  items?:  Array<ToastChain | null > | null,
  nextToken?: string | null,
};

export type TableRecordedVideoFilterInput = {
  id?: TableIDFilterInput | null,
  videoName?: TableStringFilterInput | null,
  url?: TableStringFilterInput | null,
  snapshotUrl?: TableStringFilterInput | null,
  initiatorId?: TableStringFilterInput | null,
  chainId?: TableStringFilterInput | null,
  initiatedVideo?: TableBooleanFilterInput | null,
  participantId?: TableIDFilterInput | null,
  participantPhone?: TableStringFilterInput | null,
  participantName?: TableStringFilterInput | null,
  participantPhoto?: TableStringFilterInput | null,
  stitchPosition?: TableIntFilterInput | null,
  recipientId?: TableIDFilterInput | null,
  type?: TableStringFilterInput | null,
};

export type RecordedVideoConnection = {
  __typename: "RecordedVideoConnection",
  items?:  Array<RecordedVideo | null > | null,
  nextToken?: string | null,
};

export type TableNotifyFilterInput = {
  id?: TableIDFilterInput | null,
  chainId?: TableIDFilterInput | null,
  initiatorId?: TableStringFilterInput | null,
  photo?: TableStringFilterInput | null,
  created?: TableIntFilterInput | null,
  text?: TableStringFilterInput | null,
  isNew?: TableBooleanFilterInput | null,
  type?: TableStringFilterInput | null,
};

export type NotifyConnection = {
  __typename: "NotifyConnection",
  items?:  Array<Notify | null > | null,
  nextToken?: string | null,
};

export type CreateToastChainMutationVariables = {
  input?: CreateToastChainInput,
};

export type CreateToastChainMutation = {
  createToastChain?:  {
    __typename: "ToastChain",
    initiatorId: string,
    chainId: string,
    recipientName: string,
    recipientImg?: string | null,
    recipientId?: string | null,
    created: number,
    detailsOccasion?: string | null,
    detailsDescription?: string | null,
    deadline?: number | null,
    initiatorLink: string,
    initiatorName?: string | null,
    initiatorPhone: string,
    initiatorPhoto?: string | null,
    stitchedVideoUrl?: string | null,
    stitchingVideo?: boolean | null,
    participantIds?: Array< string | null > | null,
    finalized?: boolean | null,
    transactionId?: string | null,
  } | null,
};

export type UpdateToastChainMutationVariables = {
  input?: UpdateToastChainInput,
};

export type UpdateToastChainMutation = {
  updateToastChain?:  {
    __typename: "ToastChain",
    initiatorId: string,
    chainId: string,
    recipientName: string,
    recipientImg?: string | null,
    recipientId?: string | null,
    created: number,
    detailsOccasion?: string | null,
    detailsDescription?: string | null,
    deadline?: number | null,
    initiatorLink: string,
    initiatorName?: string | null,
    initiatorPhone: string,
    initiatorPhoto?: string | null,
    stitchedVideoUrl?: string | null,
    stitchingVideo?: boolean | null,
    participantIds?: Array< string | null > | null,
    finalized?: boolean | null,
    transactionId?: string | null,
  } | null,
};

export type DeleteToastChainMutationVariables = {
  input?: DeleteToastChainInput,
};

export type DeleteToastChainMutation = {
  deleteToastChain?:  {
    __typename: "ToastChain",
    initiatorId: string,
    chainId: string,
    recipientName: string,
    recipientImg?: string | null,
    recipientId?: string | null,
    created: number,
    detailsOccasion?: string | null,
    detailsDescription?: string | null,
    deadline?: number | null,
    initiatorLink: string,
    initiatorName?: string | null,
    initiatorPhone: string,
    initiatorPhoto?: string | null,
    stitchedVideoUrl?: string | null,
    stitchingVideo?: boolean | null,
    participantIds?: Array< string | null > | null,
    finalized?: boolean | null,
    transactionId?: string | null,
  } | null,
};

export type CreateRecordedVideoMutationVariables = {
  input?: CreateRecordedVideoInput,
};

export type CreateRecordedVideoMutation = {
  createRecordedVideo?:  {
    __typename: "RecordedVideo",
    id: string,
    videoName?: string | null,
    url?: string | null,
    snapshotUrl?: string | null,
    initiatorId?: string | null,
    chainId: string,
    initiatedVideo?: boolean | null,
    participantId?: string | null,
    participantPhone?: string | null,
    participantName?: string | null,
    participantPhoto?: string | null,
    stitchPosition?: number | null,
    recipientId?: string | null,
    type?: string | null,
  } | null,
};

export type UpdateRecordedVideoMutationVariables = {
  input?: UpdateRecordedVideoInput,
};

export type UpdateRecordedVideoMutation = {
  updateRecordedVideo?:  {
    __typename: "RecordedVideo",
    id: string,
    videoName?: string | null,
    url?: string | null,
    snapshotUrl?: string | null,
    initiatorId?: string | null,
    chainId: string,
    initiatedVideo?: boolean | null,
    participantId?: string | null,
    participantPhone?: string | null,
    participantName?: string | null,
    participantPhoto?: string | null,
    stitchPosition?: number | null,
    recipientId?: string | null,
    type?: string | null,
  } | null,
};

export type DeleteRecordedVideoMutationVariables = {
  input?: DeleteRecordedVideoInput,
};

export type DeleteRecordedVideoMutation = {
  deleteRecordedVideo?:  {
    __typename: "RecordedVideo",
    id: string,
    videoName?: string | null,
    url?: string | null,
    snapshotUrl?: string | null,
    initiatorId?: string | null,
    chainId: string,
    initiatedVideo?: boolean | null,
    participantId?: string | null,
    participantPhone?: string | null,
    participantName?: string | null,
    participantPhoto?: string | null,
    stitchPosition?: number | null,
    recipientId?: string | null,
    type?: string | null,
  } | null,
};

export type CreateNotifyMutationVariables = {
  input?: CreateNotifyInput,
};

export type CreateNotifyMutation = {
  createNotify?:  {
    __typename: "Notify",
    id: string,
    chainId: string,
    initiatorId?: string | null,
    photo?: string | null,
    created?: number | null,
    text?: string | null,
    isNew?: boolean | null,
    type?: string | null,
  } | null,
};

export type UpdateNotifyMutationVariables = {
  input?: UpdateNotifyInput,
};

export type UpdateNotifyMutation = {
  updateNotify?:  {
    __typename: "Notify",
    id: string,
    chainId: string,
    initiatorId?: string | null,
    photo?: string | null,
    created?: number | null,
    text?: string | null,
    isNew?: boolean | null,
    type?: string | null,
  } | null,
};

export type DeleteNotifyMutationVariables = {
  input?: DeleteNotifyInput,
};

export type DeleteNotifyMutation = {
  deleteNotify?:  {
    __typename: "Notify",
    id: string,
    chainId: string,
    initiatorId?: string | null,
    photo?: string | null,
    created?: number | null,
    text?: string | null,
    isNew?: boolean | null,
    type?: string | null,
  } | null,
};

export type GetToastChainQueryVariables = {
  chainId?: string,
};

export type GetToastChainQuery = {
  getToastChain?:  {
    __typename: "ToastChain",
    initiatorId: string,
    chainId: string,
    recipientName: string,
    recipientImg?: string | null,
    recipientId?: string | null,
    created: number,
    detailsOccasion?: string | null,
    detailsDescription?: string | null,
    deadline?: number | null,
    initiatorLink: string,
    initiatorName?: string | null,
    initiatorPhone: string,
    initiatorPhoto?: string | null,
    stitchedVideoUrl?: string | null,
    stitchingVideo?: boolean | null,
    participantIds?: Array< string | null > | null,
    finalized?: boolean | null,
    transactionId?: string | null,
  } | null,
};

export type ListToastChainsQueryVariables = {
  filter?: TableToastChainFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListToastChainsQuery = {
  listToastChains?:  {
    __typename: "ToastChainConnection",
    items?:  Array< {
      __typename: "ToastChain",
      initiatorId: string,
      chainId: string,
      recipientName: string,
      recipientImg?: string | null,
      recipientId?: string | null,
      created: number,
      detailsOccasion?: string | null,
      detailsDescription?: string | null,
      deadline?: number | null,
      initiatorLink: string,
      initiatorName?: string | null,
      initiatorPhone: string,
      initiatorPhoto?: string | null,
      stitchedVideoUrl?: string | null,
      stitchingVideo?: boolean | null,
      participantIds?: Array< string | null > | null,
      finalized?: boolean | null,
      transactionId?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetRecordedVideoQueryVariables = {
  id?: string,
};

export type GetRecordedVideoQuery = {
  getRecordedVideo?:  {
    __typename: "RecordedVideo",
    id: string,
    videoName?: string | null,
    url?: string | null,
    snapshotUrl?: string | null,
    initiatorId?: string | null,
    chainId: string,
    initiatedVideo?: boolean | null,
    participantId?: string | null,
    participantPhone?: string | null,
    participantName?: string | null,
    participantPhoto?: string | null,
    stitchPosition?: number | null,
    recipientId?: string | null,
    type?: string | null,
  } | null,
};

export type ListRecordedVideosQueryVariables = {
  filter?: TableRecordedVideoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecordedVideosQuery = {
  listRecordedVideos?:  {
    __typename: "RecordedVideoConnection",
    items?:  Array< {
      __typename: "RecordedVideo",
      id: string,
      videoName?: string | null,
      url?: string | null,
      snapshotUrl?: string | null,
      initiatorId?: string | null,
      chainId: string,
      initiatedVideo?: boolean | null,
      participantId?: string | null,
      participantPhone?: string | null,
      participantName?: string | null,
      participantPhoto?: string | null,
      stitchPosition?: number | null,
      recipientId?: string | null,
      type?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryRecordedVideosByChainIdQueryVariables = {
  chainId?: string,
  first?: number | null,
  after?: string | null,
};

export type QueryRecordedVideosByChainIdQuery = {
  queryRecordedVideosByChainId?:  {
    __typename: "RecordedVideoConnection",
    items?:  Array< {
      __typename: "RecordedVideo",
      id: string,
      videoName?: string | null,
      url?: string | null,
      snapshotUrl?: string | null,
      initiatorId?: string | null,
      chainId: string,
      initiatedVideo?: boolean | null,
      participantId?: string | null,
      participantPhone?: string | null,
      participantName?: string | null,
      participantPhoto?: string | null,
      stitchPosition?: number | null,
      recipientId?: string | null,
      type?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetNotifyQueryVariables = {
  id?: string,
};

export type GetNotifyQuery = {
  getNotify?:  {
    __typename: "Notify",
    id: string,
    chainId: string,
    initiatorId?: string | null,
    photo?: string | null,
    created?: number | null,
    text?: string | null,
    isNew?: boolean | null,
    type?: string | null,
  } | null,
};

export type ListNotifiesQueryVariables = {
  filter?: TableNotifyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotifiesQuery = {
  listNotifies?:  {
    __typename: "NotifyConnection",
    items?:  Array< {
      __typename: "Notify",
      id: string,
      chainId: string,
      initiatorId?: string | null,
      photo?: string | null,
      created?: number | null,
      text?: string | null,
      isNew?: boolean | null,
      type?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateToastChainSubscriptionVariables = {
  initiatorId?: string | null,
  chainId?: string | null,
  recipientName?: string | null,
  created?: number | null,
  detailsOccasion?: string | null,
};

export type OnCreateToastChainSubscription = {
  onCreateToastChain?:  {
    __typename: "ToastChain",
    initiatorId: string,
    chainId: string,
    recipientName: string,
    recipientImg?: string | null,
    recipientId?: string | null,
    created: number,
    detailsOccasion?: string | null,
    detailsDescription?: string | null,
    deadline?: number | null,
    initiatorLink: string,
    initiatorName?: string | null,
    initiatorPhone: string,
    initiatorPhoto?: string | null,
    stitchedVideoUrl?: string | null,
    stitchingVideo?: boolean | null,
    participantIds?: Array< string | null > | null,
    finalized?: boolean | null,
    transactionId?: string | null,
  } | null,
};

export type OnUpdateToastChainSubscriptionVariables = {
  initiatorId?: string | null,
  chainId?: string | null,
  recipientName?: string | null,
  created?: number | null,
  detailsOccasion?: string | null,
};

export type OnUpdateToastChainSubscription = {
  onUpdateToastChain?:  {
    __typename: "ToastChain",
    initiatorId: string,
    chainId: string,
    recipientName: string,
    recipientImg?: string | null,
    recipientId?: string | null,
    created: number,
    detailsOccasion?: string | null,
    detailsDescription?: string | null,
    deadline?: number | null,
    initiatorLink: string,
    initiatorName?: string | null,
    initiatorPhone: string,
    initiatorPhoto?: string | null,
    stitchedVideoUrl?: string | null,
    stitchingVideo?: boolean | null,
    participantIds?: Array< string | null > | null,
    finalized?: boolean | null,
    transactionId?: string | null,
  } | null,
};

export type OnDeleteToastChainSubscriptionVariables = {
  initiatorId?: string | null,
  chainId?: string | null,
  recipientName?: string | null,
  created?: number | null,
  detailsOccasion?: string | null,
};

export type OnDeleteToastChainSubscription = {
  onDeleteToastChain?:  {
    __typename: "ToastChain",
    initiatorId: string,
    chainId: string,
    recipientName: string,
    recipientImg?: string | null,
    recipientId?: string | null,
    created: number,
    detailsOccasion?: string | null,
    detailsDescription?: string | null,
    deadline?: number | null,
    initiatorLink: string,
    initiatorName?: string | null,
    initiatorPhone: string,
    initiatorPhoto?: string | null,
    stitchedVideoUrl?: string | null,
    stitchingVideo?: boolean | null,
    participantIds?: Array< string | null > | null,
    finalized?: boolean | null,
    transactionId?: string | null,
  } | null,
};

export type OnCreateRecordedVideoSubscriptionVariables = {
  id?: string | null,
  videoName?: string | null,
  url?: string | null,
  snapshotUrl?: string | null,
  initiatorId?: string | null,
};

export type OnCreateRecordedVideoSubscription = {
  onCreateRecordedVideo?:  {
    __typename: "RecordedVideo",
    id: string,
    videoName?: string | null,
    url?: string | null,
    snapshotUrl?: string | null,
    initiatorId?: string | null,
    chainId: string,
    initiatedVideo?: boolean | null,
    participantId?: string | null,
    participantPhone?: string | null,
    participantName?: string | null,
    participantPhoto?: string | null,
    stitchPosition?: number | null,
    recipientId?: string | null,
    type?: string | null,
  } | null,
};

export type OnUpdateRecordedVideoSubscriptionVariables = {
  id?: string | null,
  videoName?: string | null,
  url?: string | null,
  snapshotUrl?: string | null,
  initiatorId?: string | null,
};

export type OnUpdateRecordedVideoSubscription = {
  onUpdateRecordedVideo?:  {
    __typename: "RecordedVideo",
    id: string,
    videoName?: string | null,
    url?: string | null,
    snapshotUrl?: string | null,
    initiatorId?: string | null,
    chainId: string,
    initiatedVideo?: boolean | null,
    participantId?: string | null,
    participantPhone?: string | null,
    participantName?: string | null,
    participantPhoto?: string | null,
    stitchPosition?: number | null,
    recipientId?: string | null,
    type?: string | null,
  } | null,
};

export type OnDeleteRecordedVideoSubscriptionVariables = {
  id?: string | null,
  videoName?: string | null,
  url?: string | null,
  snapshotUrl?: string | null,
  initiatorId?: string | null,
};

export type OnDeleteRecordedVideoSubscription = {
  onDeleteRecordedVideo?:  {
    __typename: "RecordedVideo",
    id: string,
    videoName?: string | null,
    url?: string | null,
    snapshotUrl?: string | null,
    initiatorId?: string | null,
    chainId: string,
    initiatedVideo?: boolean | null,
    participantId?: string | null,
    participantPhone?: string | null,
    participantName?: string | null,
    participantPhoto?: string | null,
    stitchPosition?: number | null,
    recipientId?: string | null,
    type?: string | null,
  } | null,
};

export type OnCreateNotifySubscriptionVariables = {
  id?: string | null,
  chainId?: string | null,
  initiatorId?: string | null,
  photo?: string | null,
  created?: number | null,
};

export type OnCreateNotifySubscription = {
  onCreateNotify?:  {
    __typename: "Notify",
    id: string,
    chainId: string,
    initiatorId?: string | null,
    photo?: string | null,
    created?: number | null,
    text?: string | null,
    isNew?: boolean | null,
    type?: string | null,
  } | null,
};

export type OnUpdateNotifySubscriptionVariables = {
  id?: string | null,
  chainId?: string | null,
  initiatorId?: string | null,
  photo?: string | null,
  created?: number | null,
};

export type OnUpdateNotifySubscription = {
  onUpdateNotify?:  {
    __typename: "Notify",
    id: string,
    chainId: string,
    initiatorId?: string | null,
    photo?: string | null,
    created?: number | null,
    text?: string | null,
    isNew?: boolean | null,
    type?: string | null,
  } | null,
};

export type OnDeleteNotifySubscriptionVariables = {
  id?: string | null,
  chainId?: string | null,
  initiatorId?: string | null,
  photo?: string | null,
  created?: number | null,
};

export type OnDeleteNotifySubscription = {
  onDeleteNotify?:  {
    __typename: "Notify",
    id: string,
    chainId: string,
    initiatorId?: string | null,
    photo?: string | null,
    created?: number | null,
    text?: string | null,
    isNew?: boolean | null,
    type?: string | null,
  } | null,
};
