import React from 'react';

const Table = ({ words, setWords, handleEdit, handleDelete }) => {
  
  return (
    <div className="contain-table">
      <table className="striped-table mt-2">
        <thead className='text-3xl'>
          <tr className="bg-secondaryHeader  h-[7rem] shadow-2xl z-1 text-white mr-3">
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
              <td colSpan={7}>No Existen Palabras</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
