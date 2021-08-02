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

    const maticNetwork = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=gbp',
    );

    const stellar = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=gbp',
    );

    const nano = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=nano&vs_currencies=gbp',
    );

    const chainlink = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=gbp',
    );
    const monero = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=gbp',
    );
    const algorand = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=algorand&vs_currencies=gbp',
    );

    const tron = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=gbp',
    );

    const ETHPrice = ethereum.data.ethereum.gbp;

    const BTCPrice = bitcoin.data.bitcoin.gbp;

    const MSCIPrice = 77.55;

    const XRPrice = ripple.data.ripple.gbp;

    const BNBPrice = binanceCoin.data.binancecoin.gbp;

    const ADAPrice = cardano.data.cardano.gbp;

    const MATICPrice = maticNetwork.data['matic-network'].gbp;

    const XLMPrice = stellar.data.stellar.gbp;

    const NANOPrice = nano.data.nano.gbp;

    const LINKPirce = chainlink.data.chainlink.gbp;

    const XMRPrice = monero.data.monero.gbp;

    const ALGOPrice = algorand.data.algorand.gbp;

    const TRXPrice = tron.data.tron.gbp;

    return [
      ETHPrice,
      BTCPrice,
      MSCIPrice,
      XRPrice,
      BNBPrice,
      ADAPrice,
      MATICPrice,
      XLMPrice,
      NANOPrice,
      LINKPirce,
      XMRPrice,
      ALGOPrice,
      TRXPrice,
    ];
  } catch (error) {
    console.error(error.message);
  }
};
