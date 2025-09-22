import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import type { Route } from './+types/home';
import type { Coin } from '~/types';
import { useEffect, useState } from 'react';
import { ChartLine } from 'lucide-react';
import CoinCard from '~/components/coin-card';
import LimitSelector from '~/components/limit-selector';
import FilterInput from '~/components/filter-input';
import SortSelector from '~/components/sort-selector';

const API_URL = import.meta.env.VITE_COINS_API_URL;

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Coin Dashboard' },
    {
      name: 'description',
      content: 'Coin Dashboard - detailed crypto dashboard',
    },
  ];
}

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [limit, setLimit] = useState(12);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase()),
    )
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <div className="mx-auto">
      <h1 className="mb-6 text-center text-4xl font-bold tracking-tight">
        <span className="flex items-center justify-center">
          <ChartLine className="mr-2 h-8 w-8" />
          Coin Dashboard
        </span>
      </h1>
      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && (
        <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>Error</CardTitle>
              <CardDescription>Failed to load data.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-destructive font-semibold">❌ {error}</p>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="my-4 flex w-full justify-end">
        <div className="flex gap-4">
          <FilterInput filter={filter} onFilterChange={setFilter} />
          <LimitSelector limit={limit} onLimitChange={setLimit} />
          <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No coins match your filter.</p>
          )}
        </div>
      )}
    </div>
  );
}
