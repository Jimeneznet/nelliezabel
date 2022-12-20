import * as React from "react";
import DictionaryList from "../components/dictionary/DictionaryList";
import { useWord } from "api/dictionary/dictionary.api";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { filterWords} from "../components/utils/Filter";
import { Word } from "@lib/types/word.types";
import DictionarySearchInput from "../components/dictionary/DictionarySearchInput";
import Checkbox from "../components/utils/Checkbox";




const Dictionary = () => {
  const { words } = useWord();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [isCheckedA, setIsCheckedA] = useState(false);
  const [isCheckedB, setIsCheckedB] = useState(false);
  const [isCheckedC, setIsCheckedC] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    const filtered = filterWords(words, searchQuery, isCheckedA, isCheckedB, isCheckedC);
    if (filtered){
    setFilteredWords(filtered);
    }
    // ATENCION: Se desactiva el linter ya que no queremos filtrar cada vez que cambia el input
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    const filtered = filterWords(words, searchQuery, isCheckedA, isCheckedB, isCheckedC);
    if (filtered){
      setFilteredWords(filtered);
    }
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
        <div className="block m-auto w-3/4 py-8 ">
          <label htmlFor="">Filtros</label>
          
        <Checkbox
            handleChange={handleChangeA}
            isChecked={isCheckedA}
            label="Educación"
          />
          <Checkbox
            handleChange={handleChangeB}
            isChecked={isCheckedB}
            label="Jurídico"
          />
        
        
          <Checkbox
            handleChange={handleChangeC}
            isChecked={isCheckedC}
            label="Psicología"
          />
        </div>
         
        
        
          
        <div className="block m-auto w-3/4 py-8">
          <DictionarySearchInput
            handleSearch={handleSearch}
            handleInputChange={handleInputChange}
          />
          <DictionaryList words={filteredWords} />
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
