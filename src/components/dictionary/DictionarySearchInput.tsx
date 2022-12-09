export interface IDictionarySearchInput {
  handleSearch: () => void;
  handleInputChange: (value: string) => void;
}

const DictionarySearchInput: React.FC<IDictionarySearchInput> = (props) => {
  return (
    <div className="block w-full">
      <input
        type="text"
        placeholder="Escribe una palabra"
        className="input input-bordered w-full max-w-xs"
        onChange={(event) => props.handleInputChange(event.target.value)}
      />
      <button className="btn ml-4" onClick={() => props.handleSearch()}>
        Buscar
      </button>
    </div>
  );
};

export default DictionarySearchInput;
