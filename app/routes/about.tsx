import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About: Coin Dashboard" },
    {
      name: "description",
      content: "About: Coin Dashboard - detailed crypto dashboard",
    },
  ];
}

export default function About() {
  return <div>about page</div>;
}
