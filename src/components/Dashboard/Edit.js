import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { editWord } from 'hooks/editWord';
import {doc,getDoc} from 'firebase/firestore';
import {db} from 'lib/config/firebase.config';
import { uploadVideo } from 'lib/config/firebase.config';


const Edit = ({ words, selectedWord, setWords, setIsEditing,setEdited }) => {
  const id = selectedWord.id;
  const [word, setWord] = useState(selectedWord.data().word);
  const [description, setDescription] = useState(selectedWord.data().description);
  const [category, setCategory] = useState(selectedWord.data().category);
  const [video, setVideo] = useState(selectedWord.data().video);
  const [newVideo, setNewVideo] = useState("");

  const handleUpdate = async(e) => {
    e.preventDefault();
    if (!word || !description || !category) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos.',
        showConfirmButton: true,
      });
    }
    let url = ""
    if(newVideo != "")
    {
      url = await uploadVideo(newVideo)
    }else{
      url = video
    }
    const WordAEditar = {
      id,
      word,
      description,
      category,
      url,
    };
    try{
      editWord(WordAEditar)
      setIsEditing(false)
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `La palabra ${WordAEditar.word} a sido editada con éxito`,
        showConfirmButton: false,
        timer: 1500,
      });
      setEdited(true)
    }
    catch(err){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Ha habido un error durante la edición. Intente nuevamente.`,
            showConfirmButton: false,
            timer: 1500,
          });
        console.log(err)
    }

    
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
        <label htmlFor="video">Cambiar video </label>
        <input
          id="video"
          type="file"
          name="video"
          accept="video/mp4,video/x-m4v,video/*"
          onChange={e => setNewVideo(e.target.files[0])}
        />
        </div>
        <div className='flex items-baseline space-x-5'>
        <label >Video actual</label>
        </div>
        <div>
        <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
