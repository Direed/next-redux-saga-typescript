import moment from 'moment';
import { getTimeLeftData } from 'utils';

describe('getTimeLeftData', () => {
  it('returns data for today', () => {
    const timeLeftPropsMock = {
      deadline: moment().unix(),
      created: moment().unix(),
      finalized: false,
    };
    const result = getTimeLeftData(timeLeftPropsMock);
    expect(result).toStrictEqual({
      value: 'New',
      status: 'new',
    });
  });
  it('returns data for finalized', () => {
    const timeLeftPropsMock = {
      deadline: moment().unix(),
      created: moment().unix(),
      finalized: true,
    };
    const result = getTimeLeftData(timeLeftPropsMock);
    expect(result).toStrictEqual({
      value: 'Closed',
      status: 'closed',
    });
  });
  it('returns data for expired', () => {
    const timeLeftPropsMock = {
      deadline: moment().add(-1,'days').unix(),
      created: moment().add(-2,'days').unix(),
      finalized: false,
    };
    const result = getTimeLeftData(timeLeftPropsMock);
    expect(result).toStrictEqual({
      value: 'Expired',
      status: 'expired',
    });
  });
  it('returns data for the soon future', () => {
    const timeLeftPropsMock = {
      deadline: moment().add(2,'days').unix(),
      created: moment().add(-2,'days').unix(),
      finalized: false,
    };
    const result = getTimeLeftData(timeLeftPropsMock);
    expect(result).toStrictEqual({
      value: '2 days left',
      status: 'soon',
    });
  });
  it('returns data for tomorrow', () => {
    const timeLeftPropsMock = {
      deadline: moment().add(1,'days').unix(),
      created: moment().add(-2,'days').unix(),
      finalized: false,
    };
    const result = getTimeLeftData(timeLeftPropsMock);
    expect(result).toStrictEqual({
      value: '1 day left',
      status: 'soon',
    });
  });
  it('returns data for later future', () => {
    const timeLeftPropsMock = {
      deadline: moment().add(12,'days').unix(),
      created: moment().add(-2,'days').unix(),
      finalized: false,
    };
    const result = getTimeLeftData(timeLeftPropsMock);
    expect(result).toStrictEqual({
      value: '12 days left',
      status: 'later',
    });
  });
  it('returns data for today', () => {
    const timeLeftPropsMock = {
      deadline: moment().add(6, 'hours').unix(),
      created: moment().add(-2,'days').unix(),
      finalized: false,
    };
    const result = getTimeLeftData(timeLeftPropsMock);
    expect(result).toStrictEqual({
      value: '6 hours left',
      status: 'today',
    });
  });
});

