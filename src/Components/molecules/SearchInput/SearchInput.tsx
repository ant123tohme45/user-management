import { useState, ChangeEvent } from "react";

type SearchInputProps = {
  onSearch: (query: string) => void;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [inputSearch, setInputSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSearch(value);
    onSearch(value);
  };
  return (
    <div className="searchBar-container">
      <input
        className="SearchBar"
        type="text"
        placeholder="Search users..."
        value={inputSearch}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
