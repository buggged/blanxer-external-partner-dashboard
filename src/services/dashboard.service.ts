import { axiosInstance } from '@helpers/axios.helper';


const dashboardService = {
  getOrderAnalytics: (query: string): Promise<any> => {

    return axiosInstance.get(`/analytics/orders?${query}`);
  },

  getDailySummary: (): Promise<any> => {

    return axiosInstance.get(`/analytics/dashboard/daily`);
  },

  getDashboard: (): Promise<any> => {

    return axiosInstance.get(`/analytics/dashboard`);
  },
};

export default dashboardService;
