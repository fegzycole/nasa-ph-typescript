import moment from 'moment';

export const getTodayDate = ():string => {
  const today = new Date();
  return moment(today).format('YYYY-MM-DD');
};

export const getNormalizedDate = (date: string): string => moment(date).format('YYYY-MM-DD');

export const getPrevDate = (date: string): string => moment(date).subtract(1).format('YYYY-MM-DD');

export const getNextDate = (date: string): string => moment(date).add(1, 'day').format('YYYY-MM-DD');
