import { useEffect } from 'react';
import { connect } from 'react-redux';
import moment, { Moment } from 'moment';
import { RcFile } from 'antd/lib/upload';
import { Spin } from 'antd';

import { createToastChain } from 'graphql/mutations';
import {
  notLoggedInData,
  createChainGraphAction,
  imageAddOrEditRequestAction,
} from 'redux-base/actions';

import Links from 'links';
import { RootState } from 'index';
import { useMemoState } from 'hooks';
import { getName, getRandomId } from 'utils';
import { TCreatedChain, TNotLoggedInData, TUser } from 'types';
import { BUCKET_USER_IMAGES } from 'awsConfig';

import { Steps } from 'components/common';

import {
  ChainRecord, ChainReminders,
  ChainDeadline, ChainDetails, ChainRecipient,
} from './helpers';
import { TDetailValues, IRecipientImg } from './helpers/createChainTypes';
import {useRouter} from "next/router";

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.createChain.isLoading,
  isChainAdded: state.createChain.isChainAdded,
  createdChain: state.createChain.createdChain,
});

const mapDispatchToProps = {
  notLoggedInData,
  createChainGraphAction,
  imageAddOrEditRequestAction,
};

interface ICreateChain {
  isLoading: boolean;
  isLoggedIn: boolean;
  isChainAdded: boolean;
  user: TUser;
  createdChain: TCreatedChain;

  notLoggedInData: (data: TNotLoggedInData) => void;
  createChainGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  imageAddOrEditRequestAction: (albumName: string, file: RcFile, key: string) => void;
}

export const CreateToast = ({
  user,
  isLoggedIn,
  isLoading,
  isChainAdded,
  createdChain,

  notLoggedInData,
  createChainGraphAction,
  imageAddOrEditRequestAction,
}: ICreateChain) => {
  const router = useRouter();
  const [chainId] = useMemoState(getRandomId()); // we need chainId for link data with image/video/userInfo
  const [step, setStep] = useMemoState(0);
  const [videoSaved, setVideoSaved] = useMemoState(false);
  const [reminders, setReminders] = useMemoState(false);
  const [recipientImg, setRecipientImg] = useMemoState<IRecipientImg | null>(null);
  const [deadline, setDeadline] = useMemoState<Moment | null>(null);
  const [recipientName, setRecipientInfo] = useMemoState<string>('');
  const [recipientDetails, setRecipientDetails] = useMemoState<TDetailValues | null>(null);
  const [slectedReminders, setSlectedReminders] = useMemoState<number[]>([]);
  const STEPS_COUNT = 4;

  useEffect(() => {
    // if user logged in and toast had added, you must redirect him on Chain page
    if(isChainAdded && createdChain) {
      router.push(`${Links.Chain}/${createdChain.chainId}/${user?.attributes?.sub}`);
    }
  }, [isChainAdded]);

  const stepDecrease = () => setStep(step - 1);
  const stepIncrease = () => setStep(step + 1);

  const createChain = {
    initiatorId: user?.attributes?.sub,
    chainId,
    recipientName,
    initiatorName: user?.attributes?.name,
    initiatorPhone: user?.username,
    initiatorPhoto: user?.attributes.picture,
    initiatorLink: `toast.video/toast/${getName(recipientName)}/${chainId}`,
    deadline: moment(deadline).unix(),
    created: moment().unix(),
    ...recipientDetails,
  };

  const handleToast = () => {
    if(user && isLoggedIn) {

      if(recipientImg?.file) {
        imageAddOrEditRequestAction(user?.username as string, recipientImg?.file as RcFile, chainId);
      }

      createChainGraphAction({
        schema: createToastChain,
        variables: {
          input: {
            ...createChain,
            participantIds: [user?.attributes?.sub],
            recipientImg: recipientImg ? `https://${BUCKET_USER_IMAGES}.s3.amazonaws.com/%252B${user?.username.replace('+', '')}/${chainId}` : null,
          },
        },
      });

    } else {
      notLoggedInData({
        notAuthChain: {
          ...createChain,
          file: recipientImg?.file,
        } as unknown as TCreatedChain,
      });
      router.push(Links.SignUp);
    }
  };

  // for future MVP
  if(reminders) {
    return (
      <ChainReminders
        setReminders={setReminders}
        slectedReminders={slectedReminders}
        setSlectedReminders={setSlectedReminders}
      />
    );
  }

  if(step === 0) {
    return (
      <Steps stepsCount={STEPS_COUNT} step={step} title='Select your video chain recipient'>
        <ChainRecipient
          stepDecrease={router.back}
          stepIncrease={stepIncrease}
          recipientImg={recipientImg?.img}
          recipientName={recipientName}
          setRecipientImg={setRecipientImg}
          setRecipientInfo={setRecipientInfo}
        />
      </Steps>
    );
  }

  if(step === 1) {
    return (
      <Steps stepsCount={STEPS_COUNT} step={step} title='Add your video chain details'>
        <ChainDetails
          stepDecrease={stepDecrease}
          stepIncrease={stepIncrease}
          recipientImg={recipientImg?.img}
          recipientName={recipientName}
          recipientDetails={recipientDetails}
          setRecipientDetails={setRecipientDetails}
        />
      </Steps>
    );
  }

  if(step === 2) {
    return (
      <Steps stepsCount={STEPS_COUNT} step={step} title='Select video chain due date'>
        <ChainDeadline
          stepDecrease={stepDecrease}
          stepIncrease={stepIncrease}
          deadline={deadline}
          setDeadline={setDeadline}
          setReminders={setReminders}
          recipientImg={recipientImg?.img}
          recipientName={recipientName}
        />
      </Steps>
    );
  }

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Steps stepsCount={STEPS_COUNT} step={step} title='Record your video chain invitation'>
        <ChainRecord
          user={user}
          stepDecrease={stepDecrease}
          stepIncrease={() => handleToast()}
          videoSaved={videoSaved}
          onSave={setVideoSaved}
          createdChain={createChain as unknown as TCreatedChain}
          recipientImg={recipientImg?.img}
          recipientName={recipientName}
        />
      </Steps>
    </Spin>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateToast);