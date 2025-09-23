export type CoinListItem = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  last_updated: string;
};

export type Image = {
  thumb: string;
  small: string;
  large: string;
};

export type Description = {
  en: string;
};

export type MarketData = {
  current_price: { usd: number };
  market_cap: { usd: number };
  high_24h: { usd: number };
  low_24h: { usd: number };
  price_change_24h: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: { usd: number };
  ath_date: { usd: string };
  atl: { usd: number };
  atl_date: { usd: string };
};

export type Links = {
  homepage: string[];
  blockchain_site: string[];
};

export type CoinDetail = {
  id: string;
  symbol: string;
  name: string;
  image: Image;
  description: Description;
  market_cap_rank: number;
  market_data: MarketData;
  links: Links;
  categories: string[];
  last_updated: string;
};
