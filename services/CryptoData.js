import axios from 'axios';

export const getCryptoData = async () => {
  try {
    const ethereum = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=gbp',
    );
    const bitcoin = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=gbp',
    );

    const ripple = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=gbp',
    );

    const binanceCoin = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=gbp',
    );

    const cardano = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=gbp',
    );

    // const matic-network = await axios.get(
    //   'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=gbp',
    // );

    // const matic-network = await axios.get(
    //   'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=gbp',
    // );

    // const matic-network = await axios.get(
    //   'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=gbp',
    // );

    const ETHPrice = ethereum.data.ethereum.gbp;

    const BTCPrice = bitcoin.data.bitcoin.gbp;

    const MSCIPrice = 77.55;

    const XRPrice = ripple.data.ripple.gbp;

    const BNBPrice = binanceCoin.data.binancecoin.gbp;

    const ADAPrice = cardano.data.cardano.gbp;

    // const ADAPrice = cardano.data.cardano.gbp;

    // const ADAPrice = cardano.data.cardano.gbp;
    // const ADAPrice = cardano.data.cardano.gbp;

    console.log(ADAPrice);

    return [ETHPrice, BTCPrice, MSCIPrice, XRPrice, BNBPrice, ADAPrice];
  } catch (error) {
    console.error(error.message);
  }
};
