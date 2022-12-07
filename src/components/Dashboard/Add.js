import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { newWord } from 'hooks/newWord';
const Add = ({ words, setWords, setIsAdding }) => {
  const [id, setId] = useState('');
  const [word, setWord] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [video, setVideo] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!id || !word || !description || !category) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos',
        showConfirmButton: true,
      });
    }
    //aca deberia de haber conexion a firebase para introducir nueva palabra creo qe esta todo 
    // const id = words.length + 1;
    // const newWord = {
    //   id,
    //   word,
    //   description,
    //   category,
    //   video,
    // };

    // words.push(newWord);
    // localStorage.setItem('employees_data', JSON.stringify(words));//
    // setWords(words);
    newWord(word,description,category,video)
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `La palabra ${word} ha sido añadida`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    
    <div className="container">
      <div>
        
      </div>  
      <form className="w-5/6 m-8" onSubmit={handleAdd}>
        
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
        <label className="" htmlFor="word">Descripción</label>
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
        <button class="btn btn-error" style={{ marginLeft: '12px'}}onClick={() => setIsAdding(false)}>Cancelar</button>

        </div>
      </form>
    </div>
  );
};

export default Add;
