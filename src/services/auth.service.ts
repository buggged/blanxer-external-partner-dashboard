import { axiosInstance } from '@helpers/axios.helper';

type IRequestLogin = {
  username: string;
  password: string;
  login_for: 'pathao' | 'cell_pay';
};

const authService = {
  login: (payload: IRequestLogin): Promise<{ success: boolean }> =>
    axiosInstance.post('/auth/login', payload),
};

export default authService;
