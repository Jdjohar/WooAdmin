import WooCommerceAPI from 'react-native-woocommerce-api';

const WooCommerceAPI_Woo = new WooCommerceAPI({
  url: 'https://jdwebservices.com/aman', // Your store URL
  ssl: true,
  consumerKey: 'ck_169efa4f8234008f585604685ced1d8ae88e9635', // Your consumer secret
  consumerSecret: 'cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true,

});

export default WooCommerceAPI_Woo;