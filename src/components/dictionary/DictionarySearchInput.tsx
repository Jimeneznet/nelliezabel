export interface IDictionarySearchInput {
  handleSearch: () => void;
  handleInputChange: (value: string) => void;
}

const DictionarySearchInput: React.FC<IDictionarySearchInput> = (props) => {
  return (
    <div className="flex gap-2 w-full flex-col md:flex-row my-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Escribe una palabra"
          className="input input-bordered w-full"
          onChange={(event) => props.handleInputChange(event.target.value)}
        />
      </div>
      <div>
        <button
          className="btn w-full md:w-56"
          onClick={() => props.handleSearch()}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default DictionarySearchInput;
