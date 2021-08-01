import axios from 'axios';

export const getCryptoData = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=gbp',
    );
    const data = response.data;
    const exactPrice = data.ethereum.gbp;
    return exactPrice;
  } catch (error) {
    console.error(error.message);
  }
};
