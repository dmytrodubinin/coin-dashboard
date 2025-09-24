import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import type { Route } from './+types/home';
import type { CoinListItem } from '~/types';
import { useEffect, useState } from 'react';
import CoinCard from '~/components/coin-card';
import LimitSelector from '~/components/limit-selector';
import FilterInput from '~/components/filter-input';
import SortSelector from '~/components/sort-selector';
import { Skeleton } from '~/components/ui/skeleton';

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
  const [coins, setCoins] = useState<CoinListItem[]>([]);
  const [limit, setLimit] = useState(12);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          `${API_URL}/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <div className="mx-auto">
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
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <FilterInput filter={filter} onFilterChange={setFilter} />
          <LimitSelector limit={limit} onLimitChange={setLimit} />
          <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: limit }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </Card>
          ))}
        </div>
      )}

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
