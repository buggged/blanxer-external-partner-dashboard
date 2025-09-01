import { v4 as uuidv4 } from 'uuid';

export function onlyVaidChrs(str: string) {
  return str.replace(/[^a-zA-Z0-9-]/g, '');
}

export const isValidNumber = (item: any, acceptUnsigned: boolean = false) => {
  const numbericItem = parseInt(item);
  if (Number.isNaN(numbericItem)) return false;
  if (acceptUnsigned) return true;
  if (numbericItem >= 0) return true;
  return false;
};

export const cleanNumber = (
  item: any,
  replacer: number = 0,
  acceptUnsigned: boolean = false,
) => {
  if (isValidNumber(item, acceptUnsigned)) return parseInt(item);
  return replacer;
};

export const formatCurrency = (
  amount: number,
  currencyCode: string = 'रू ',
) => {
  if (!amount) return `${currencyCode}0`;
  const formatter = new Intl.NumberFormat('en-IN');
  let val = formatter.format(amount);
  return currencyCode + val;
};

export const formatNumber = (amount: number, prefix = '') => {
  if (!amount) return prefix + '0';
  const formatter = new Intl.NumberFormat('en-IN');
  return prefix + formatter.format(amount);
};

export const getImageThumbLink = (link: string) => {
  return `https://wsrv.nl/?w=300&h=300&url=${link}`;
};

export const generateSearchQuery = (obj: any) => {
  const searchParams = new URLSearchParams();

  Object.keys(obj).forEach((el) => {
    searchParams.set(el, obj[el]);
  });

  return searchParams.toString();
};

export const getStartingOfName = (name: string = ''): string => {
  return name
    ?.split(' ')
    ?.map((el: string) => el[0])
    ?.join('')
    ?.substr(0, 2)
    ?.toUpperCase();
};

export const getRandomIdentifier = () => {
  return uuidv4();
};

export const dragReorder = (
  list: any[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
