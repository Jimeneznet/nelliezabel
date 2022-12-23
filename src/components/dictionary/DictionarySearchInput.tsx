import React, { RefObject } from "react";
import CSS from "csstype";
import {
  DictionaryCategoryFilterList,
  ICategoryFilterList,
} from "./DictionaryCategoryFilterList";
import { ICategoryFilter } from "./DictionaryCategoryFilterItem";

export interface IDictionarySearchInput {
  handleSearch: () => void;
  handleInputChange: (value: string) => void;
  history: string[];
  searchQuery: string;
  searchButtonRef: RefObject<HTMLButtonElement>;
  categories?: ICategoryFilterList;
}
const inputStyles: CSS.Properties = {
  borderRadius: 0,
  borderTopLeftRadius: "6px",
  borderBottomLeftRadius: "6px",
};

const DictionarySearchInput: React.FC<IDictionarySearchInput> = (props) => {
  const handleSearchLocal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.handleSearch();
    return;
  };
  return (
    <div className="flex gap-2 w-full flex-col md:flex-row my-4">
      <div className="flex-1">
        <div className="input-group">
          <div className="dropdown w-full">
            <input
              type="text"
              placeholder="Escribe una palabra"
              className="input input-bordered w-full"
              style={inputStyles}
              onChange={(event) => props.handleInputChange(event.target.value)}
              value={props.searchQuery}
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
            >
              {props.history.map((word, index) => (
                <li key={index}>
                  <p
                    onClick={() => {
                      props.handleInputChange(word);
                      if (!props.searchButtonRef.current) {
                        return;
                      }
                      props.searchButtonRef.current.focus();
                    }}
                  >
                    {word}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {props.categories ? (
            <DictionaryCategoryFilterList {...props.categories} />
          ) : (
            ""
          )}

          <button
            className="btn btn-square w-full md:w-56 btn-primary"
            onClick={handleSearchLocal}
            ref={props.searchButtonRef}
          >
            Buscar
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DictionarySearchInput;
