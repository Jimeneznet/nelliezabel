import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { newWord } from 'hooks/newWord';
import { getWords } from 'hooks/getWords';
import { uploadVideo } from 'lib/config/firebase.config';
const Add = ({ words, setWords, setIsAdding, setAdded }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [id, setId] = useState('');
  const [word, setWord] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [video, setVideo] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  function containsNumbers(x){
    return /\d/.test(x);
  }
  function containsSpecialChars(x){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(x);
  }
  function hasOnlySpecialChars(x){
    const pattern = /^[^a-zA-Z0-9]+$/;
    return pattern.test(x);
  }
  
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAdd = async(e) => {
    e.preventDefault()

    //Se inhabilita el botón mientras que se sube el video
    setIsWaiting(true)
    if (!word || !description || !category || !video) {
      setIsWaiting(false)
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos.',
        showConfirmButton: true,
      });
    }else{
      if (containsNumbers(word) || containsSpecialChars(word) || hasOnlySpecialChars(word)){
        setIsWaiting(false)
        return Swal.fire({
          icon:'error',
          title:'Error!',
          text:'La palabra contiene números o caracteres especiales.',
          showConfirmButton: true,
        });
      }
      if (!isNaN(description) || hasOnlySpecialChars(description)){
        setIsWaiting(false)
        return Swal.fire({
          icon:'error',
          title:'Error!',
          text:' La descripción contiene sólo números o sólo caracteres especiales.',
          showConfirmButton: true,
        });
      }
      if (video.type!="video/mp4" && video.type!="video/x-m4v" && video.type!="video/*"){
        setIsWaiting(false)
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Solo se aceptan formatos de video en mp4.',
          showConfirmButton: true,
        });
      }
    }

    try{
    //AGREGADO
    const url = await uploadVideo(video)    //Se almacena el video en Firebase Storage    
    newWord(word,description,category,url,isChecked)
    Swal.fire({
      icon: 'success',
      title: 'Agregada!',
      text: `La palabra ${word} ha sido añadida.`,
      showConfirmButton: false,
      timer: 1500,
    });
    setAdded(true)
    setIsWaiting(false)
    setIsAdding(false)
    }catch(err){
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Ha ocurrido un error durante la transacción!`,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsWaiting(false)
    }
  };

  return (

    <div className=" overflow-x-auto mx-14  ">
      <div>
        
      </div>  
      <form className="w-5/6 m-8" onSubmit={handleAdd}>
        
        <h1 className="bg-secondaryHeader rounded-lg h-[3rem]  z-1 text-center font-bold text-3xl indent-12 text-white align-baseline">Nueva palabra</h1>

        <div className='flex items-baseline space-x-5 text-3xl mt-4' > 
          <label className="" htmlFor="word" style={{width:'20%'}} >Palabra</label>
          <input
            id="word"
            type="text"
            name="word"
            value={word}
            onChange={e => setWord(e.target.value)}
            placeholder="Escriba la palabra.."
            className='input w-full mb-4'
          />
        </div>

        <div className='flex items-baseline space-x-5 text-3xl' > 
          <label className="" htmlFor="word"style={{width:'20%'}}>Descripción</label>
          <input
              id="description"
              type="text"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Escriba la descripción.."
              className='input w-full mb-4'
            />        
        </div>
        
        <div className='flex items-baseline space-x-5 text-3xl' > 
        <label htmlFor="category" style={{width:'16.3%'}}>Categoría</label>
          <select 
            className='select w-full max-w-xs '
            name="category" 
            id="category"
            onChange={e => setCategory(e.target.value)}  
             
          >
            <option value="">Selecciona una categoría</option>
            <option value="Educación">Educación</option>
            <option value="Psicología">Psicología</option>
            <option value="Jurídico">Jurídico</option>
          </select>
        </div>
        
        <div className='grid grid-flow-col auto-cols-max'>

          <div className='flex items-baseline space-x-5 text-3xl mt-3 '>
            <label htmlFor="isForMobile">Para niños</label> 
          </div>

          <div className="mt-5 ml-10">
            <input
              type="checkbox"
              id="isForMobile"
              name="isForMobile"
              value=""
              checked={isChecked}
              onChange={handleOnChange}
              className="checkbox"
            />
          </div>
        </div>
        
        <div className='flex items-baseline space-x-5 text-3xl mt-5'>
          <label htmlFor="video">Subir video </label>
        </div>

        <div className='flex items-baseline space-x-5 text-3xl mt-4' > 
        <input
          id="video"
          type="file"
          name="video"
          accept="video/mp4,video/x-m4v,video/*"
          className='file-input file-input-bordered w-full max-w-xs '
          onChange={e => setVideo(e.target.files[0])}
        />
        </div>
        
        
        
        <div style={{ marginTop: '30px' }}>
          {!isWaiting &&(
            <button class="btn btn-success disabled:opacity-50">Añadir</button>
          )}
        
          {!isWaiting &&(
            <button hidden={false} class="btn btn-error" style={{ marginLeft: '12px'}}onClick={() => setIsAdding(false)}>Cancelar</button>
          )}

          {isWaiting &&(
            <div className="flex items-center justify-center mt-10">
              <progress className="progress w-80"></progress>
            </div>
          )}


          
        
        </div>
      </form>
      <div class=" mt-40">

        </div>
    </div>
  );
};

export default Add;
