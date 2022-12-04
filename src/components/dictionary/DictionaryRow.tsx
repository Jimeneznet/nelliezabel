import { Word } from "@lib/types/word.types";
import Education from "../../assets/dictionary/education.png";
import Law from "../../assets/dictionary/law.png";
import Psychology from "../../assets/dictionary/psychology.png";
import NA from "../../assets/dictionary/na.png";

const DictionaryRow = ({ word }: { word: Word }) => {
  const handleCategories = (category: String) => {
    const width = "64px";
    const height = "64px";
    if (category === "education") {
      return (
        <img
          src={Education}
          alt="This is an education icon"
          width={width}
          height={height}
        />
      );
    } else if (category === "law") {
      return (
        <img src={Law} alt="This is a law icon" width={width} height={height} />
      );
    } else if (category === "psychology") {
      return (
        <img
          src={Psychology}
          alt="This is a psychology icon"
          width={width}
          height={height}
        />
      );
    } else {
      return (
        <img src={NA} alt="This is a NA icon" width={width} height={height} />
      );
    }
  };
  return (
    <div>
      <li className="flex justify-evenly py-5 border-t-2 hover:bg-[#D9D7FE] cursor-pointer">
        <div className="flex justify-start w-1/2">
          <p className="text-3xl">{word.word}</p>
        </div>
        <div className="flex justify-around w-1/2">
          <p className="text-xl"> Categoría: </p>
          {handleCategories(word.category)}
        </div>
      </li>
    </div>
  );
};

export default DictionaryRow;
