import { RcFile } from 'antd/lib/upload';

export type TCreatedChain = {
  deadline: number;
  detailsDescription: string;
  detailsOccasion: string;
  id: string;
  recipientImg: string;
  recipientName: string;
  chainId: string;
  created: number;
  file?: RcFile;
  finalized: boolean;
  initiatorId: string;
  initiatorName: string;
  initiatorPhone: string;
  initiatorPhoto: string;
  initiatorLink: string;
  stitchedVideoUrl: string;
  stitchingVideo: boolean;
  participantIds: string[];
  transactionId: string;
  recipientId: string;
} | null;

export type TChainVideo = {
  videoName: string;
  url: string;
  snapshotUrl: string;
  initiatorId: string;
  chainId: string;
  id: string;
	initiatedVideo: boolean;
  recipientId: string;
  type: string;
	participantId: string;
	participantPhone: string;
	participantName: string;
	participantPhoto: string;
  stitchPosition: number;
} | null;

export type TNotification = {
  chainId: string;
  created: number;
  id: string;
  initiatorId: string;
  isNew: boolean;
  photo: string;
  text: string;
  type: string;
} | null;

export type TNotLoggedInData = {
  isNotLoggedInParticipant?: boolean;
  isNotLoggedInRecipient?: boolean;
  notAuthChain?: TCreatedChain;
}
