import moment, { Moment } from 'moment';

export const getDisabledDatesRange = (firstActiveDate: Moment) => (currentDate: Moment) => (
  // Can not select days before firstActiveDate and lastActiveDate
  currentDate < firstActiveDate.startOf('day')
);

export const getTimeFromNow = (time: number) => moment.unix(time).fromNow();