import axios from 'axios';

export const getListings = async (params) => {
  const response = await axios.post(
    'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/Xchange',
    params,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};