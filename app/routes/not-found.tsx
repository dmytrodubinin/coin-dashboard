import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-extrabold">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-6 max-w-md">
        Sorry, the page you are looking for does not exist
      </p>
      <Button asChild>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
