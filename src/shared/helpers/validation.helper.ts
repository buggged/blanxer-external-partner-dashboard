const _regex = {
  nav_collapse_paths:
    /add_product|edit_product|create_order|navigation_editor|footer_editor/,
  phone: /^[0-9]{10}$/,
  user_name: /[A-Za-z0-9]+/,
  hostname:
    /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const nav_collapse_paths = _regex.nav_collapse_paths;

export const validation = {
  email: (val: any, errorMsg?: string) => {
    return _regex.email.test(val) ? null : errorMsg ?? 'Invalid email address';
  },
  emailOtpional: (val: any, errorMsg?: string) => {
    if (!val) return null;
    return _regex.email.test(val) ? null : errorMsg ?? 'Invalid email address';
  },
  phone: (val: any, errorMsg?: string) => {
    const _modifiedVal = String(val).startsWith('+977')
      ? String(val).substring(3)
      : val;

    return _regex.phone.test(_modifiedVal)
      ? null
      : errorMsg ?? 'Invalid phone number';
  },
  password: (val: any, errorMsg?: string) => {
    return val?.length > 5 ? null : errorMsg ?? 'Must be atleast 6 character';
  },
  required: (val: any, errorMsg?: string) => {
    return val?.length > 0 ? null : errorMsg ?? 'This field is required';
  },
  requiredNum: (val: any, errorMsg?: string) => {
    return parseInt(val) > -1 ? null : errorMsg ?? 'This field is required';
  },
  match: (val: string, target: string, errorMsg: string) => {
    return val == target ? null : errorMsg;
  },
  customDomain: (val: string, errorMsg: string) => {
    return !val || _regex.hostname.test(val) ? null : errorMsg;
  },
};
