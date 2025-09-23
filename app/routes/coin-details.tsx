import { useParams } from 'react-router';

const CoinDetails = () => {
  const { id } = useParams();

  return <>{id}</>;
};

export default CoinDetails;
