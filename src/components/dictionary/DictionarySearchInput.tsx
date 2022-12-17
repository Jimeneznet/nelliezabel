export interface IDictionarySearchInput {
  handleSearch: () => void;
  handleInputChange: (value: string) => void;
  history: string[];
  searchQuery: string;
}

const DictionarySearchInput: React.FC<IDictionarySearchInput> = (props) => {
  return (
    <div className="flex gap-2 w-full flex-col md:flex-row my-4">
      <div className="flex-1">
        <div className="dropdown w-full">
          <input
            type="text"
            placeholder="Escribe una palabra"
            className="input input-bordered w-full"
            onChange={(event) => props.handleInputChange(event.target.value)}
            value={props.searchQuery}
          />
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
          >
            {props.history.map((word, index) => (
              <li key={index}>
                <p onClick={() => props.handleInputChange(word)}>{word}</p>
              </li>
            ))}
          </ul>
        </div>
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
