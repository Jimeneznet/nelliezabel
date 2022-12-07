import React from 'react';

const Table = ({ words, setWords, handleEdit, handleDelete }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
    
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID.</th>
            <th>Código Serial.</th>
            <th>Palabra</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {words.length > 0 ? (
            words.map((Word, i) => (
              <tr key={Word.id}>
                <td>{i + 1}</td>
                <td>{Word.id}</td>
                <td>{Word.data().word}</td>
                <td>{Word.data().description}</td>
                <td>{Word.data().category}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(Word.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(Word.id)}
                    className="button muted-button"
                  >
                    Delete
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
