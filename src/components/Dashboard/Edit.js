import React, { useState } from 'react';
import Swal from 'sweetalert2';


const Edit = ({ words, selectedWord, setWords, setIsEditing }) => {
  const id = selectedWord.id;
  const [word, setWord] = useState(selectedWord.word);
  const [description, setDescription] = useState(selectedWord.description);
  const [category, setCategory] = useState(selectedWord.category);
  const [video, setVideo] = useState(selectedWord.video);

  const handleUpdate = e => {
    e.preventDefault();

    if (!word || !description || !category || !video) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos.',
        showConfirmButton: true,
      });
    }

    const WordAEditar = {
      id,
      word,
      description,
      category,
      video,
      
    };
    /*/aca deberia haber una conexion a firebase qe busqe el id de la palabra a editar
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }
    
    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);
*/

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `La palabra ${WordAEditar.word} a sido editada con éxito`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container">
      <div>
        
      </div>  
      <form className="w-5/6 m-8" onSubmit={handleUpdate}>
        
        <h1 className="bg-[#976DD0]  h-[7rem] shadow-2xl z-1 text-left font-bold indent-12 text-white align-baseline">Nueva palabra</h1>
        <div className='flex items-baseline space-x-5' > 
        <label className="" htmlFor="word">Palabra</label>
        <input
          id="word"
          type="text"
          name="word"
          value={word}
          onChange={e => setWord(e.target.value)}
        />
        </div>
        <div className='flex items-baseline space-x-5'>
        <label htmlFor="description">Descripción</label>
        <input
          className="bg-white"
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        </div>
        <div className='flex items-baseline space-x-5'>
        <label htmlFor="category">Categoría</label>
        <input
          id="category"
          type="text"
          name="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        </div>
        <div className='flex items-baseline space-x-5'>
        <input
          id="video"
          type="button"
          name="video"
          value={"Subir video"}
          onChange={e => setVideo(e.target.value)}
        />
        </div>
        <div style={{ marginTop: '30px' }}>
        <button class="btn btn-success">Añadir</button>
        <button class="btn btn-error" style={{ marginLeft: '12px'}}onClick={() => setIsEditing(false)}>Cancelar</button>

        </div>
      </form>
    </div>
  );
};

export default Edit;
