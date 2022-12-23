import { Word } from "@lib/types/word.types";
import DictionaryRow from "./DictionaryRow";
import { usePagination } from "hooks/dictionary/pagination.hooks";
import Pagination from "../dictionary/Pagination";

const DictionaryList = ({ words }: { words: Word[] }) => {
  const { currentWords, wordsPerPage, currentPage, paginate } =
    usePagination(words);

  if (currentWords.length === 0) {
    return (
      <div className="flex justify-center mt-10 flex-col items-center gap-4">
        <h2 className="text-3xl">No hay palabras para mostrar.</h2>
        <h2 className=" italic">(O se están cargando)</h2>
        <progress className="progress w-1/2 progress-primary" />
      </div>
    );
  }
  return (
    <div>
      <ul className="">
        {currentWords.map((word, index) => (
          <DictionaryRow key={index} word={word} />
        ))}
      </ul>
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
