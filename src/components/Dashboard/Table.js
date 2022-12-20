import React, { useState } from 'react';

const Table = ({ words, setWords, handleEdit, handleDelete }) => {

  
  const [ search, setSearch ] = useState("")
  const [ filtro, setFiltro ] = useState("")

  //funcion de busqueda
  const Searcher = (e) => {
    setSearch(e.target.value)
  }

  // metodo para buscar
  let results = []
  if (!search) {
      results = words
  }else{
    results = words.filter((dato) => dato.data().word.toLowerCase().includes(search.toLowerCase()) || dato.data().category.toLowerCase().includes(search.toLowerCase()))
    // results = words.filter((dato) => dato.data().category.toLowerCase().includes(search.toLowerCase()))
    words= results
  }
  // console.log(words)
  // console.log(results)
  // const results = !search ? words : words.filter((dato)=> dato.description.toLowerCase().includes(search.toLocaleLowerCase()))

  //metodo para filtrar por categoria
  if (!filtro) {
    results = words
  }else{
    results = words.filter((dato) => dato.data().category.toLowerCase().includes(filtro.toLowerCase()))
    words= results
  }
  const Filtrar = (e) => {
    setFiltro(e.target.value)
    // console.log(e.target.value)
  }

  
  return (
    <div className="contain-table">

      <div className='flex justify-content-center gap-5'>        

        <div className='flex-auto w-16 mr-1'>           
          <input value={search} onChange={Searcher} type="text" placeholder='Buscar palabra' className='form-control'/>      
        </div>

        <div className='text-end '>
          <select 
            className='form-select'
            name="filtrar" 
            id="filtrar"
            onChange={Filtrar}    
          >
            <option value="">Selecciona una categoria</option>
            <option value="Educación">Educación</option>
            <option value="Psicología">Psicología</option>
            <option value="Jurídico">Jurídico</option>
          </select>
        </div>
      </div>


      <table className="striped-table mt-2">
        <thead className='text-3xl'>
          <tr className="bg-secondaryHeader h-[5rem] shadow-lg z-1 text-white mr-3">
            <th>ID.</th>
            {/* <th>Código Serial.</th> */}
            <th>Palabra</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th colSpan={2} className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {words.length > 0 ? (
            words.map((Word, i) => (
              <tr key={Word.id} className='text-2xl'>
                <td>{i + 1}</td>
                {/* <td>{Word.id}</td> */}
                <td>{Word.data().word}</td>
                <td>{Word.data().description}</td>
                <td>{Word.data().category}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(Word.id)}
                    className="button muted-button"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(Word.id)}
                    className="button muted-button"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='text-3xl' colSpan={7}>No Existen Palabras</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default Table;