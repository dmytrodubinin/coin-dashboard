import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import type { Route } from './+types/home';
import type { Coin } from '~/types';
import { useEffect, useState } from 'react';
import { ChartLine } from 'lucide-react';
import CoinCard from '~/components/coin-card';

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(API_URL);
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
  }, []);

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

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
}
