import axios from 'axios';

const getCryptoData = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=gbp',
    );
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};

export default getCryptoData;
