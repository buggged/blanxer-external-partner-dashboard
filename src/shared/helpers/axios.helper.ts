import generalConstants from '@constants/general';
import Axios from 'axios';
import notify from './notification.helper';

export const axiosInstance = Axios.create({
  baseURL: generalConstants.api_base,
});

//add token to all request, for authorization header
axiosInstance.interceptors.request.use(function (config) {
  const token =
    window === undefined
      ? ''
      : localStorage.getItem(generalConstants.localStorage.access_token);

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },

  async function (error) {
    console.log("the error from the axios interceptor is: ", error);
    if (error?.response && error?.response?.data) {
      //send error payload only
      //   if (error?.response?.data?.message === 'Session expired, please login again') {
      //     localStorage.clear();
      //     window.location.reload();
      //   } else
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        message: 'Some unusual error occured, please try again',
      });
    }
  },
);

export const decodeForForm = (
  form_keys: any,
  error_obj: any,
  notifyGeneric: boolean = false,
) => {
  let _err: any = {};
  Object.keys(form_keys).forEach((el) => {
    const getErr = decodeErrorMessage(error_obj, el, false);
    _err[el] = getErr || '';
  });
  if (notifyGeneric) {
    notify.genericError('Error', error_obj);
  }
  return _err;
};

export const decodeErrorMessage = (
  payload: any,
  field_name: string = '',
  fetch_message: boolean = true,
) => {
  if (payload?.fields) payload = payload.fields;

  if (!payload) return '';

  if (field_name) {
    const objArr = Object.keys(payload || {});
    if (objArr.includes(field_name)) return payload[field_name];
  }
  const _msg = payload?.message || payload?.errors?.message;
  if (fetch_message && !!_msg) return _msg;

  return '';
};
