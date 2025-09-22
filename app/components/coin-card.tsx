import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import type { Coin } from '~/types';

const CoinCard = ({ coin }: { coin: Coin }) => {
  return (
    <Card
      key={coin.id}
      className="transform transition-transform hover:scale-105"
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={coin.image}
          alt={coin.name}
          className="h-12 w-12 rounded-full"
        />
        <div>
          <CardTitle className="text-lg font-semibold">{coin.name}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm font-medium">
            {coin.symbol.toUpperCase()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-base font-medium">
          Price:{' '}
          <span className="text-primary font-semibold">
            ${coin.current_price.toLocaleString()}
          </span>
        </p>
        <p
          className={`text-sm font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}
        >
          24h Change:{' '}
          <span className="font-semibold">
            {typeof coin.price_change_percentage_24h === 'number'
              ? `${coin.price_change_percentage_24h.toFixed(2)}%`
              : 'N/A'}
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Market Cap:{' '}
          <span className="font-semibold">
            ${coin.market_cap.toLocaleString()}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default CoinCard;
