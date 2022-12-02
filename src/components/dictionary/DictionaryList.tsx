import { Word } from "@lib/types/word.types";
import DictionaryRow from "./DictionaryRow";

const DictionaryList = ({ words }: { words: Word[] }) => {
  return (
    <div className="flex justify-center">
      <ul className=" w-1/2 mt-6">
        {words.map((word, index) => (
          <DictionaryRow key={index} word={word} />
        ))}
      </ul>
    </div>
  );
};

export default DictionaryList;
