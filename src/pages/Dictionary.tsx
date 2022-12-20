import DictionaryList from "../components/dictionary/DictionaryList";
import { useWord } from "api/dictionary/dictionary.api";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import { filterWords } from "../components/utils/Filter";
import { Word } from "@lib/types/word.types";
import DictionarySearchInput from "../components/dictionary/DictionarySearchInput";
import { useHandleHistory, useHistory } from "hooks/dictionary/history.hooks";

const Dictionary = () => {
  const { words } = useWord();
  const { history, setHistory } = useHistory();
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const handleHistory = useHandleHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  useEffect(() => {
    // Update the document title using the browser API
    const filtered = filterWords(words, searchQuery);
    setFilteredWords(filtered);

    // ATENCION: Se desactiva el linter ya que no queremos filtrar cada vez que cambia el input
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    handleHistory(searchQuery, history, setHistory);
    setFilteredWords(filterWords(words, searchQuery));
  };
  return (
    <div>
      <div className="">
        <Header>Diccionario</Header>
        <div className="block m-auto w-3/4 py-8">
          <DictionarySearchInput
            handleSearch={handleSearch}
            handleInputChange={handleInputChange}
            history={history}
            searchQuery={searchQuery}
            searchButtonRef={searchButtonRef}
          />
          <DictionaryList words={filteredWords} />
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
