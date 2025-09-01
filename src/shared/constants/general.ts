const baseURLDev = 'https://api-dev.blanxer.com';
const baseURL = 'https://api.blanxer.com';
const baseURLLocal = 'http://localhost:7777';

const mode = import.meta.env.VITE_MODE;

const baseUrl: Record<string, string> = {
  dev: baseURLDev,
  local: baseURLLocal,
  prod: baseURL,
};

const generalConstants = {
  api_base: baseUrl?.[mode] ?? baseURL,

  google_map_key: 'AIzaSyCFVVOaKNCDnO9naUa07WeMh9tn98SmiHs',

  isDevMode: mode == 'dev',
  shopDev: 'buggged.com',
  shopProd: 'blanxer.io',

  google_redirect: {
    dev: 'https://app-dev.blanxer.com/oauth/google',
    prod: 'https://app.blanxer.com/oauth/google',
    local: 'http://localhost:3005/oauth/google',
  },

  mainURLS: ['blanxer.io'], // redirectirection url is always the one at zero index

  localStorage: {
    access_token: 'blanxer_access_token',
    refresh_token: 'blanxer_refresh_token',
    user_data: 'blanxer_user_data',
    store_id: 'current_store_id',
  },

  file_purpose: {
    product_image: 'product_image',
    product_description: 'product_description',
  },

  date_format: {
    full_readable: 'MMM D, YYYY h:mm A',
    full_readable_no_time: 'MMM D, YYYY',
    full_readable_no_year: 'MMM D, h:mm A',
  },

  images: {
    not_found: '/image_not_found.jpeg',
    dummy_face_girl: 'https://www.w3schools.com/howto/img_avatar2.png',
    dummy_face_boy: 'https://www.w3schools.com/w3images/avatar2.png',
  },

  timeFilter: [
    { label: 'Custom', value: '', disabled: true },
    { label: 'Today', value: '0' },
    { label: 'Last 2 days', value: '1' },
    { label: 'Last 7 days', value: '7' },
    { label: 'Last 30 days', value: '30' },
    { label: 'This year', value: '365' },
  ],
  salesTimeFilter: [
    { label: 'Custom', value: '', disabled: true },
    { label: 'Today', value: '0' },
    { label: 'Last 7 days', value: '7' },
    { label: 'Last 30 days', value: '30' },
    { label: 'This year', value: '365' },
  ],

  orderStatusFilter: [
    { label: 'Processing', value: 'Processing' },
    { label: 'Dispatched', value: 'Dispatched' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Returned', value: 'Returned' },
  ],
  order_channel: {
    MANNUAL: 1,
    WEB: 2,
    POS: 3,
  },

  business_categories: [
    { id: 1, label: 'General' },
    { id: 2, label: 'Fashion, Shoes & Accessories' },
    { id: 3, label: 'Beauty & Cosmetics' },
    { id: 4, label: 'Pharma & Medical Care' },
    { id: 21, label: 'Plants & Nursary' },
    { id: 5, label: 'Jwellery, Golds & Gems' },
    { id: 6, label: 'Mobile, Computers & Other Accessories' },
    { id: 7, label: 'Gym & Sports' },
    { id: 8, label: 'Hardware & Construction Tools' },
    { id: 9, label: 'Transportation, Taxi, Travel & Tourism' },
    { id: 10, label: 'Fruits & Vegetables' },
    { id: 11, label: 'Grocery' },
    { id: 12, label: 'Restaurants & Hotels' },
    { id: 13, label: 'Books & Stationery' },
    { id: 14, label: 'Bakery & Cake Shops' },
    { id: 15, label: 'Home Decoration & Electronic Appliances' },
    { id: 16, label: 'Meat & Fish' },
    { id: 17, label: 'Vehical & Vehical Accessories' },
    { id: 18, label: 'Local & Online Service' },
    { id: 19, label: 'Insurance & Finance Services' },
    { id: 20, label: 'Educational Institutions, Schools & Teachers' },
  ],
};

export default generalConstants;
