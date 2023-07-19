const commonConfig = {
  development: {
    apiUrl: 'https://qyfj94yj0b.execute-api.us-east-1.amazonaws.com/v1',
    stripeApiKey: 'pk_test_yoJkDMAQkAJlDTc7W26QkBIo00uPE3LSqH',
  },
  test: {
    apiUrl: 'https://qyfj94yj0b.execute-api.us-east-1.amazonaws.com/v1',
    stripeApiKey: 'pk_test_yoJkDMAQkAJlDTc7W26QkBIo00uPE3LSqH',
  },
  production: {
    apiUrl: 'https://qyfj94yj0b.execute-api.us-east-1.amazonaws.com/v1',
    stripeApiKey: 'pk_live_ZnI6yOt4pVNbMTSkwXM6MlOY008G6RsTtY',
  },
}[process.env.NODE_ENV || 'development'];

export const config = {
  api: {
    timeout: 30000,
    url: commonConfig.apiUrl,
    stripeApiKey: commonConfig.stripeApiKey,
  },
};

export const mediaQueries = {
  xs: '(max-width: 576px)',
  sm: '(min-width: 577px) and (max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 991px)',
  lg: '(min-width: 992px) and (max-width: 1199px)',
  xl: '(min-width: 1200px) and (max-width: 1599px)',
  xxl: '(min-width: 1600px)',
  smallScreen: { maxWidth: 991 },
  bigScreen: { minWidth: 992 },
};