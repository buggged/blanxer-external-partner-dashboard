import { axiosInstance } from '@helpers/axios.helper';

const dashboardService = {
  getOrderAnalytics: (query: string): Promise<any> => {
    return axiosInstance.get(`/analytics/orders?${query}`);
  },

  getDailySummary: (): Promise<any> => {
    return axiosInstance.get(`/analytics/dashboard/daily`);
  },

  getDashboard: (status: string): Promise<any> => {
    return axiosInstance.get(`/super/stores/qr_request/${status}`);
  },
  updateQrRequest: (payload: any): Promise<any> => {
    return axiosInstance.post(`/super/stores/qr_request/accept`, payload);
  },

  rejectQrRequest: (payload: any): Promise<any> => {
    return axiosInstance.post(`/super/stores/qr_request/reject`, payload);
  },
};

export default dashboardService;
