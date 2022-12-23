import React, { useState } from 'react';
import { Word } from "@lib/types/word.types";

const DictionaryFilter = ({ words}: { words: Word[] }) => {
    const [ filtro, setFiltro ]: any = useState("")
    let results = []
    if (!filtro) {
        results = words
    }
    else{
        results = words.filter((dato: any) => dato.data().category.toLowerCase().includes(filtro.toLowerCase()))
        words= results
    }
    const Filtrar = (e: any) => {
    setFiltro(e.target.value)
    // console.log(e.target.value)
    }
  return (
    <div className='flex justify-content-center gap-5'>

        <div className='text-end '>
          <select 
            className='form-select'
            name="filtrar" 
            id="filtrar"
            onChange={Filtrar}
          >
            <option value="">Selecciona una categoria</option>
            <option value="Acciones">Acciones</option>
            <option value="Saludos">Saludos</option>
          </select>
        </div>
      </div>
  )
}
export default DictionaryFilter;