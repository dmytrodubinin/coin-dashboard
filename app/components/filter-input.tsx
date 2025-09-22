import { Input } from './ui/input';

const FilterInput = ({
  filter,
  onFilterChange,
}: {
  filter: string;
  onFilterChange: (value: string) => void;
}) => {
  return (
    <div className="filter">
      <Input
        type="text"
        placeholder="Filter by name or symbol..."
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
