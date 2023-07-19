import moment from 'moment';
import { getTimeLeftData } from 'utils';

import styles from './TimeLeftComponent.module.scss';

export interface TimeLeftProps {
    deadline?: number;
    created?: number;
    finalized?: boolean;
}

export const TimeLeftComponent = ({ deadline, created, finalized = false }: TimeLeftProps) => {
  const { value, status } = getTimeLeftData({
    deadline: deadline || moment().unix(),
    created: created || moment().unix(),
    finalized,
  });
  return <div className={styles[status]}>{value}</div>;
};
