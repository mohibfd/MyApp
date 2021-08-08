import axios from 'axios';

const API_KEY = 'SX7FAU35M75HT2XI';

export const getAssetsData = async () => {
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
    const monero = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=gbp',
    );
    const chainlink = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=gbp',
    );
    const algorand = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=algorand&vs_currencies=gbp',
    );
    const tron = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=gbp',
    );
    const usdCoin = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=gbp',
    );
    const celsiusDegreeToken = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=celsius-degree-token&vs_currencies=gbp',
    );

    const ETHPrice = ethereum.data.ethereum.gbp;

    const BTCPrice = bitcoin.data.bitcoin.gbp;

    const XRPrice = ripple.data.ripple.gbp;

    const BNBPrice = binanceCoin.data.binancecoin.gbp;

    const ADAPrice = cardano.data.cardano.gbp;

    const MATICPrice = maticNetwork.data['matic-network'].gbp;

    const XLMPrice = stellar.data.stellar.gbp;

    const NANOPrice = nano.data.nano.gbp;

    const XMRPrice = monero.data.monero.gbp;

    const LINKPirce = chainlink.data.chainlink.gbp;

    const ALGOPrice = algorand.data.algorand.gbp;

    const TRXPrice = tron.data.tron.gbp;

    const USDCPrice = usdCoin.data['usd-coin'].gbp;

    const CELPrice = celsiusDegreeToken.data['celsius-degree-token'].gbp;

    const MSCIData = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSCI&interval=5min&apikey=${API_KEY}`,
    );

    const MSCIPrices = MSCIData.data['Time Series (5min)'];

    const mostRecentPriceList = MSCIPrices[Object.keys(MSCIPrices)[0]];

    const mostRecentPrice = mostRecentPriceList['1. open'];

    //we divide by 8 to make the price equal to fidelity's MSCI value

    const MSCIFidelityPrice = mostRecentPrice / 8.03309805825;

    console.log(MSCIFidelityPrice);

    return [
      ETHPrice,
      MSCIFidelityPrice,
      BTCPrice,
      XRPrice,
      BNBPrice,
      ADAPrice,
      MATICPrice,
      XLMPrice,
      NANOPrice,
      XMRPrice,
      LINKPirce,
      ALGOPrice,
      TRXPrice,
      USDCPrice,
      CELPrice,
    ];
  } catch (error) {
    console.error(error.message);
  }
};
