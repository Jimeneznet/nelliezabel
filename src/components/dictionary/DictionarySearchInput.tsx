import React, { RefObject } from "react";
import CSS from "csstype";
import {
  DictionaryCategoryFilterList,
  ICategoryFilterList,
} from "./DictionaryCategoryFilterList";

export interface IDictionarySearchInput {
  handleSearch: () => void;
  handleInputChange: (value: string) => void;
  history: string[];
  searchQuery: string;
  searchButtonRef: RefObject<HTMLLabelElement>;
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

          <label
            className="btn btn-square btn-primary m-0 w-fit px-2 md:px-4"
            onClick={handleSearchLocal}
            ref={props.searchButtonRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <div className="inline">Buscar</div>
          </label>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DictionarySearchInput;
