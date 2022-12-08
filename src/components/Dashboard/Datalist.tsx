import React from "react";
import {useState, useEffect} from "react"
import { getWords } from "hooks/getWords";
import DatalistInput, { useComboboxControls } from 'react-datalist-input';
// import './datalist.css'

const Datalist = () => {
  const [words, setWords]: any = useState([]);
 
  useEffect(() => {
    setWords([]);

    getWords().then((words: any) => words.forEach((element: any) => {
      setWords((old: any) => [...old, element])
      
    }));
  

  }, [])

  const items = 
  words.map((word: any, index: number) => ({
    id: word.data().word,
    value: word.data().word,
  }));

  return (
     <DatalistInput
      className='text-xl position: absolute box-border bg-white border-secondaryHeader'
      placeholder="Ingrese una palabra"
      label=""
      items={items}
      onSelect={(item) => console.log(item.value)}
    />
  );

  
};

export default Datalist;