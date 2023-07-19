import { Moment } from 'moment';
import { RcFile } from 'antd/lib/upload/interface';

import { TCreatedChain, TUser } from 'types';

export interface ICreateChainChild {
  stepIncrease: () => void;
  stepDecrease: () => void;
}

// ------ ToastRecipient
export interface IRecipientImg {
  file: RcFile,
  img: string;
}
export interface IChainRecipient {
  setRecipientImg: ({ file, img }: IRecipientImg) => void;
  setRecipientInfo: (name: string) => void;
  recipientName: string;
  recipientImg?: string;
}
// ------

// ------ ToastDetails
export type TDetailValues = {
  detailsOccasion: string;
  detailsDescription: string;
}
export interface IChainDetails {
  setRecipientDetails: (formData: TDetailValues) => void;
  recipientDetails: TDetailValues | null;
  recipientName: string;
  recipientImg?: string;
}
// ------

// ------ ToastDeadline
export interface IChainDeadline {
  recipientName: string;
  recipientImg?: string;
  deadline: Moment | null;
  setDeadline: (date: Moment | null) => void;
  setReminders: (status: boolean) => void;
}
// ------

// ------ ToastRecord
export interface IChainRecord {
  user: TUser;
  recipientName: string;
  videoSaved: boolean;
  onSave: (status: boolean) => void;
  createdChain: TCreatedChain;
  recipientImg?: string;
}
// ------