import * as React from "react";
import DictionaryList from "../components/dictionary/DictionaryList";
import { useWord } from "api/dictionary/dictionary.api";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import { filterWords } from "../components/utils/Filter";
import { Word } from "@lib/types/word.types";
import DictionarySearchInput from "../components/dictionary/DictionarySearchInput";
import Checkbox from "../components/utils/Checkbox";

import { useHandleHistory, useHistory } from "hooks/dictionary/history.hooks";
import { ICategoryFilterList } from "@components/dictionary/DictionaryCategoryFilterList";

const Dictionary = () => {
  const { words } = useWord();
  const { history, setHistory } = useHistory();
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const handleHistory = useHandleHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [isCheckedA, setIsCheckedA] = useState(false);
  const [isCheckedB, setIsCheckedB] = useState(false);
  const [isCheckedC, setIsCheckedC] = useState(false);
  const categories = ["Psicología", "Jurídico", "Educación"];
  const [categoriesControl, setCategories] = useState(
    categories.map((category) => {
      return { categoryName: category, categoryEnabled: true };
    })
  );

  const categoryToggleCallbackFunction = (categoryName: string) => {
    const newCategoriesControl = [...categoriesControl];
    const categoryIndex = newCategoriesControl
      .map((item) => item.categoryName)
      .indexOf(categoryName);
    newCategoriesControl[categoryIndex].categoryEnabled =
      !newCategoriesControl[categoryIndex].categoryEnabled;
    setCategories(newCategoriesControl);
    return;
  };

  useEffect(() => {
    // Update the document title using the browser API
    const filtered = filterWords(words, searchQuery, categoriesControl);
    if (filtered) {
      setFilteredWords(filtered);
    }
    // ATENCION: Se desactiva el linter ya que no queremos filtrar cada vez que cambia el input
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    handleHistory(searchQuery, history, setHistory);
    const filtered = filterWords(words, searchQuery, categoriesControl);
    if (filtered) {
      setFilteredWords(filtered);
    }
  };

  const categoryProp: ICategoryFilterList = {
    categories: categoriesControl,
    callback: categoryToggleCallbackFunction,
  };

  const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedA(e.target.checked);
  };

  const handleChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedB(e.target.checked);
  };

  const handleChangeC = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedC(e.target.checked);
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
            categories={categoryProp}
          />
          <DictionaryList words={filteredWords} />
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
