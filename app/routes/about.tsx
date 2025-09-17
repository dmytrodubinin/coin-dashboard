import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'About: Coin Dashboard' },
    {
      name: 'description',
      content:
        'Learn more about Coin Dashboard, your detailed crypto tracking app.',
    },
  ];
}

export default function About() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          About Coin Dashboard
        </h1>
        <p className="text-muted-foreground">
          A modern cryptocurrency dashboard built with React, React Router,
          TailwindCSS, and shadcn/ui.
        </p>
      </div>

      {/* Intro Card */}
      <Card>
        <CardHeader>
          <CardTitle>What is Coin Dashboard?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Coin Dashboard is an open-source crypto analytics app that helps you
            track real-time cryptocurrency prices, compare coins, and stay up to
            date with market trends.
          </p>
          <p>
            Built with modern web technologies, it provides a fast, responsive,
            and clean interface for exploring the crypto market.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted-foreground list-inside list-disc space-y-2">
            <li>📈 Live price tracking for top cryptocurrencies</li>
            <li>📊 Charts and visualizations</li>
            <li>🌙 Light, dark, and system themes</li>
            <li>⚡ Built with React Router 7 + Tailwind + shadcn/ui</li>
          </ul>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="text-muted-foreground text-center text-sm">
        Coin Dashboard is a learning project inspired by modern crypto apps.
        Contributions and feedback are always welcome 🚀
      </div>
    </div>
  );
}
