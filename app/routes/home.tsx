import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Coin Dashboard" },
    {
      name: "description",
      content: "Coin Dashboard - detailed crypto dashboard",
    },
  ];
}

export default function Home() {
  return <div>welcome page</div>;
}
