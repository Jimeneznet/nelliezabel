import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { editWord } from 'hooks/editWord';
import {doc,getDoc} from 'firebase/firestore';
import {db} from 'lib/config/firebase.config';
import { uploadVideo } from 'lib/config/firebase.config';
import { getWords } from 'hooks/getWords';


const Edit = ({ words, selectedWord, setWords, setIsEditing,setEdited }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const id = selectedWord.id;
  const [word, setWord] = useState(selectedWord.data().word);
  const [description, setDescription] = useState(selectedWord.data().description);
  const [category, setCategory] = useState(selectedWord.data().category);
  const [video, setVideo] = useState(selectedWord.data().video);
  const [newVideo, setNewVideo] = useState("");

  const handleUpdate = async(e) => {
    e.preventDefault();
    setIsWaiting(true)
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
        title: 'Modificado!',
        text: `La palabra ${WordAEditar.word} ha sido editada con éxito`,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsWaiting(false)
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
    <div className="contain-table">
      
      <form className="w-5/6 m-8" onSubmit={handleUpdate}>
        <div className=''>
          <h1 className="bg-secondaryHeader  h-[4rem] shadow-2xl z-1  font-bold indent-12 text-white align-baseline text-center mt-3">Modificar palabra</h1>
        </div>
        <div className='flex items-baseline space-x-5 text-3xl' > 
          <label className="" htmlFor="word">Palabra</label>
        </div>
        <div className='flex items-baseline space-x-5 text-3xl' > 
          <input
            id="word"
            type="text"
            name="word"
            value={word}
            onChange={e => setWord(e.target.value)}
            placeholder="Escriba la palabra.."
          />
        </div>
        <div className='flex items-baseline space-x-5 text-3xl'>
          <label className="" htmlFor="word">Descripción</label>
        </div>
        <div className='flex items-baseline space-x-5 text-3xl' > 
        <input
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Escriba la descripción.."
          />        
          </div>
        

        <div className='flex items-baseline space-x-5 text-3xl'>
          <label htmlFor="category">Categoría</label>
        </div>
        <div className='flex items-baseline space-x-5 text-3xl' > 
          <select 
            className='form-select'
            name="category" 
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}   
          >
            <option value="">Selecciona una categoría</option>
            <option value="Educación">Educación</option>
            <option value="Psicología">Psicología</option>
            <option value="Jurídico">Jurídico</option>
          </select>
        </div>


        <div className='flex items-baseline space-x-5 text-3xl'>
          <label htmlFor="video">Subir video </label>
        </div>

        <div className='flex items-baseline space-x-5 text-3xl' > 
        <input
          id="video"
          type="file"
          name="video"
          accept="video/mp4,video/x-m4v,video/*"
          onChange={e => setVideo(e.target.files[0])}
        />
        </div>

        <div className='flex justify-end space-x-5 text-3xl'>
          <div class='flex justify-start'>
              <label >Video actual</label>
          </div>
          <div class=' justify-end'>
              {!isWaiting &&(
                <button class="btn btn-success disabled:opacity-50">Editar</button>
              )}
            
              {isWaiting &&(
                <div className="flex items-center justify-center ">
                  <div className="w-16 h-16 border-b-2 border-purple-700 rounded-full animate-spin"></div>
                </div>
              )}
              <button hidden={isWaiting == true ? true : false } class="btn btn-error" style={{ marginLeft: '12px'}} onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </div>
        <div>
        <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

      </form>
    </div>
  );
};

export default Edit;
