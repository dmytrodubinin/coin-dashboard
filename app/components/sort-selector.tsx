import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SortSelectorProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortSelector = ({ sortBy, onSortChange }: SortSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="sort">Sort by:</Label>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger id="sort" className="w-[180px]">
          <SelectValue placeholder="Select a sort option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="market_cap_desc">
            Market Cap (High to Low)
          </SelectItem>
          <SelectItem value="price_desc">Price (High to Low)</SelectItem>
          <SelectItem value="price_asc">Price (Low to High)</SelectItem>
          <SelectItem value="change_desc">24h Change (High to Low)</SelectItem>
          <SelectItem value="change_asc">24h Change (Low to High)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelector;
