import { Input } from './ui/input';

const FilterInput = ({
  filter,
  onFilterChange,
}: {
  filter: string;
  onFilterChange: (value: string) => void;
}) => {
  return (
    <Input
      type="text"
      placeholder="Filter by name or symbol..."
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
    />
  );
};

export default FilterInput;
