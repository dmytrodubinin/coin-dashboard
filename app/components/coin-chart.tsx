import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import type { ChartData, ChartDataItem } from '~/types';
import { Skeleton } from '~/components/ui/skeleton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
);

const CoinChart = ({ coinId }: { coinId: string }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
        );
        const data = await res.json();

        const prices: ChartDataItem[] = data.prices.map((price: number[]) => ({
          x: price[0],
          y: price[1],
        }));

        setChartData({
          datasets: [
            {
              label: 'Price (USD)',
              data: prices,
              fill: true,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [coinId]);

  if (loading) {
    return (
      <div className="mt-6 flex flex-col items-center gap-3">
        <Skeleton className="h-64 w-full rounded-lg" />
        <p className="text-muted-foreground text-sm">Loading chart data…</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Line
        data={chartData as ChartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
          },
          scales: {
            x: {
              type: 'time',
              time: { unit: 'day' },
              ticks: { autoSkip: true, maxTicksLimit: 7 },
            },
            y: {
              ticks: {
                callback: (value) => `$${(value as number).toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;
