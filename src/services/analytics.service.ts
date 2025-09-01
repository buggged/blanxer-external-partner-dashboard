import { axiosInstance } from '@helpers/axios.helper';
import { getCurrentStoreId } from '@helpers/general.helper';

const analyticsService = {
  getOrderAnalytics: (query: string): Promise<any> => {
    const store_id = getCurrentStoreId();
    return axiosInstance.get(`/analytics/${store_id}?${query}`);
  },

  getDailySummary: (): Promise<any> => {
    const store_id = getCurrentStoreId();
    return axiosInstance.get(`/analytics/dashboard/daily/${store_id}`);
  },

  getDashboard: (): Promise<any> => {
    const store_id = getCurrentStoreId();
    return axiosInstance.get(`/analytics/dashboard/${store_id}`);
  },
};

export default analyticsService;
