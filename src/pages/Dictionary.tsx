import DictionaryList from "../components/dictionary/DictionaryList";
import { useWord } from "api/dictionary/dictionary.api";
import Header from "../components/Header";

const Dictionary = () => {
  const { words } = useWord();
  return (
    <div>
      <div className="">
        <Header>Diccionario</Header>
        <DictionaryList words={words} />
      </div>
    </div>
  );
};

export default Dictionary;
