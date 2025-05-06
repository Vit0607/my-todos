interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <input
      type="search"
      placeholder="Search todos"
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
