import { axiosInstance } from '@helpers/axios.helper';

type IRequestLogin = {
  username: string;
  password: string;
  login_for: 'pathao' | 'cell_pay';
};

const authService = {
  login: (payload: IRequestLogin): Promise<{ success: boolean }> =>
    axiosInstance.post('/super/auth/login', payload),

  changePassword: (payload: any): Promise<any> => {
    return axiosInstance.post(`/super/auth/change-password`, payload);
  }

};

export default authService;
