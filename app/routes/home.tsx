import type { Route } from './+types/home';

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
  return (
    <div>
      welcome page Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Incidunt consectetur vitae porro debitis voluptatibus deleniti pariatur
      recusandae reiciendis, voluptatum ea consequatur rem nobis vero tempora
      accusamus ad et molestias magni.
    </div>
  );
}
