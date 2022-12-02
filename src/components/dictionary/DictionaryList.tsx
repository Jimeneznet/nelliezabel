import { Word } from "@lib/types/word.types";
import DictionaryRow from "./DictionaryRow";
import { usePagination } from "hooks/dictionary/pagination.hooks";
import Pagination from "../dictionary/Pagination";

const DictionaryList = ({ words }: { words: Word[] }) => {
  const { currentWords, wordsPerPage, currentPage, paginate } =
    usePagination(words);
  return (
    <div>
      <div className="flex justify-center">
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
