import moment from 'moment';

enum STATUS {
    NEW = 'new',
    TODAY = 'today',
    SOON = 'soon',
    LATER = 'later',
    CLOSED = 'closed',
    EXPIRED = 'expired'
}

interface DaysLeftResult {
    value: string;
    status: STATUS
}

interface GetDaysLeftProps {
    deadline: number;
    created: number;
    finalized: boolean;
}

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const getTimeLeftData = ({
  deadline,
  created,
  finalized,
}: GetDaysLeftProps): DaysLeftResult => {
  if(finalized) {
    return {
      value: 'Closed',
      status: STATUS.CLOSED,
    };
  }

  const { days: daysLeft, hours } = getTimeDiff(deadline);
  if(daysLeft > 0){
    return {
      value: 'Expired',
      status: STATUS.EXPIRED,
    };
  }

  const { days } = getTimeDiff(created);
  if( days === 0 ) {
    return {
      value: 'New',
      status: STATUS.NEW,
    };
  }

  if (daysLeft === 0) {
    return {
      value: getValue(Math.abs(hours), 'hour'),
      status: STATUS.TODAY,
    };
  }

  const amountOfDays = Math.abs(daysLeft);
  return {
    value: getValue(amountOfDays, 'day'),
    status: amountOfDays < 4 ? STATUS.SOON : STATUS.LATER,
  };
};

const getValue = (amount: number, type: 'hour' | 'day'): string => `${amount} ${type}${amount > 1 ? 's' : ''} left`;

const getTimeDiff = (time: number) => {
  const deadlineDate = moment(time, 'X').format(DATE_FORMAT);
  const now = moment().format(DATE_FORMAT);
  return {
    days: moment(now).diff(deadlineDate, 'days'),
    hours: moment(now).diff(deadlineDate, 'hours'),
  };
};
