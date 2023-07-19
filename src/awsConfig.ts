import Amplify from '@aws-amplify/core';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client } from '@aws-sdk/client-s3';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const BUCKET_USER_IMAGES = 'user-images-main';
const BUCKET_USER_VIDEOS = 'toast-user-videos';
const BUCKET_REGION = 'us-east-1';
const IDENTITY_POOL_ID = 'us-east-1:cf75d1c5-6327-48e8-b78b-4f8d2a4757f6';

const s3 = new S3Client({
  region: BUCKET_REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: BUCKET_REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

export {
  s3,
  BUCKET_REGION,
  BUCKET_USER_IMAGES,
  BUCKET_USER_VIDEOS,
};