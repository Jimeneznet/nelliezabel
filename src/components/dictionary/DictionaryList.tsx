import { Word } from "@lib/types/word.types";
import DictionaryRow from "./DictionaryRow";
import { usePagination } from "hooks/dictionary/pagination.hooks";
import Pagination from "../dictionary/Pagination";
import Datalist from "@components/Datalist";
import { useState } from "react";

const filterWords = (words: Word[], filters: string[]) => {
  const parsedFilter = [];
  for (let index = 0; index < filters.length; index++) {
    const element = filters[index];
    parsedFilter.push(element);
  }
  for (let index = 0; index < words.length; index++) {
    const element = words[index];
    console.log(element.word);

  }
}




const DictionaryList = ({ words }: { words: Word[] }) => {
  const [searchQuery,setSearchQuery] = useState(['']);
  const { currentWords, wordsPerPage, currentPage, paginate } =
  usePagination(words);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    
  }

  if (currentWords.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <progress className="progress w-1/2 progress-primary" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center items-center flex-col pt-4">
      <div className="block w-1/2">
      <input type="text" placeholder="Escribe una palabra" className="input input-bordered w-full max-w-xs" onChange={handleInputChange} />
      <button className="btn ml-4" onClick={() => filterWords(currentWords,searchQuery)}>Buscar</button>
      </div>
        <ul className=" w-1/2 mt-10">
          {currentWords.map((word, index) => (
            <DictionaryRow key={index} word={word} />
          ))}
        </ul>
      </div>
      <Pagination
        totalWords={words.length}
        wordsPerPage={wordsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default DictionaryList;
