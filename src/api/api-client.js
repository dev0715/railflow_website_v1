import axios from 'axios';

const createApiClient = () => {
  const baseURL = 'https://api.railflow.io';
  //baseURL = 'http://localhost:9000';
  const apiClient = axios.create({
    baseURL: baseURL + '/api',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'allowed-party-secret': 'shhhsecret',
      token: process.env.GATSBY_ALLOWED_PARTY_SECRET,
    },
  });

  return apiClient;
};

export default createApiClient();

export { createApiClient };
