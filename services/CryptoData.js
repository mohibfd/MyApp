import axios from 'axios';

export const getCryptoData = async () => {
  try {
    const ethereum = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=gbp',
    );
    const bitcoin = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=gbp',
    );

    const ETHPrice = ethereum.data.ethereum.gbp;

    const BTCPrice = bitcoin.data.bitcoin.gbp;

    return [ETHPrice, BTCPrice];
  } catch (error) {
    console.error(error.message);
  }
};
