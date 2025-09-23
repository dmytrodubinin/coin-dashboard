import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import CoinChart from '~/components/coin-chart';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import type { CoinDetail } from '~/types';

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!res.ok) throw new Error('Failed to fetch coin data');
        const data = await res.json();
        setCoin(data);
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

    fetchCoin();
  }, [id]);

  return (
    <div className="container mx-auto">
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/">← Back to Home</Link>
      </Button>

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-48 w-full" />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && coin && (
        <Card>
          <CardHeader>
            <CardTitle>
              {coin.name} ({coin.symbol.toUpperCase()})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <img
                src={coin.image.large}
                alt={coin.name}
                className="h-20 w-20"
              />
              <p className="text-muted-foreground max-w-prose">
                {coin.description.en.split('. ')[0] + '.'}
              </p>
            </div>

            <div className="grid gap-2 text-sm font-bold sm:grid-cols-2">
              <p>Rank: #{coin.market_cap_rank}</p>
              <p>
                Current Price: $
                {coin.market_data.current_price.usd.toLocaleString()}
              </p>
              <p>
                Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
              </p>
              <p>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</p>
              <p>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</p>
              <p>
                24h Price Change: $
                {coin.market_data.price_change_24h.toFixed(2)} (
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
              </p>
              <p>
                Circulating Supply:{' '}
                {coin.market_data.circulating_supply.toLocaleString()}
              </p>
              <p>
                Total Supply:{' '}
                {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
              </p>
              <p>
                Max Supply:{' '}
                {coin.market_data.max_supply?.toLocaleString() || 'N/A'}
              </p>
              <p>
                All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{' '}
                {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
              </p>
              <p>
                All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{' '}
                {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
              </p>
              <p>
                Last Updated: {new Date(coin.last_updated).toLocaleString()}
              </p>
            </div>

            <CoinChart coinId={coin.id} />

            <div className="space-y-2">
              {coin.links.homepage[0] && (
                <p>
                  🌐{' '}
                  <a
                    href={coin.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Website
                  </a>
                </p>
              )}
              {coin.links.blockchain_site[0] && (
                <p>
                  🧩{' '}
                  <a
                    href={coin.links.blockchain_site[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Blockchain Explorer
                  </a>
                </p>
              )}
              {coin.categories.length > 0 && (
                <p>Categories: {coin.categories.join(', ')}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !error && !coin && <p>No data found.</p>}
    </div>
  );
};

export default CoinDetails;
