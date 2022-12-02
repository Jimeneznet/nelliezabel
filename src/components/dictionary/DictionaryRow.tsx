import { Word } from "@lib/types/word.types";

const DictionaryRow = ({ word }: { word: Word }) => {
  return (
    <div>
      <li className="flex justify-evenly py-5 border-t-2 hover:bg-[#D9D7FE] cursor-pointer">
        <div className="flex justify-start w-1/2">
          <p className="text-3xl">{word.word}</p>
        </div>
        <div className="flex justify-around w-1/2">
          <p className="text-xl"> Categoría: </p>
          <p className="text-xl">IMAGEN</p>
        </div>
      </li>
    </div>
  );
};

export default DictionaryRow;
