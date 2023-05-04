import { FC, FormEvent, useState } from "react";
interface Props {
  handleSearch: (str: string) => void;
}
const Search: FC<Props> = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };
  return (
    <div className="gap-2 d-flex align-items-center justify-content-center w-100">
      <input
        value={search}
        onChange={handleChange}
        type="search"
        className="input search "
        placeholder="search note"
      />
      <button
        onClick={() => handleSearch(search.toLocaleLowerCase())}
        className="btns p-2 d-flex align-items-center justify-content-center"
      >
        <span className="material-symbols-outlined fw-bold fs-3">search</span>
      </button>
    </div>
  );
};

export default Search;
